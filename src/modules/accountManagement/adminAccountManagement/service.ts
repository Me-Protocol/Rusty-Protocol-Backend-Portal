import { HttpException, Injectable } from '@nestjs/common';
import { logger } from '@src/globalServices/logger/logger.service';
import { UserService } from '@src/globalServices/user/user.service';
import { User } from '@src/globalServices/user/entities/user.entity';
import { TwoFAType } from '@src/utils/enums/TwoFAType';
import * as bcrypt from 'bcryptjs';
import { UserAppType } from '@src/utils/enums/UserAppType';
import { MailService } from '@src/globalServices/mail/mail.service';
import { emailButton } from '@src/utils/helpers/email';
import { CustomerService } from '@src/globalServices/customer/customer.service';
import { Role } from '@src/utils/enums/Role';
import { AdminService } from '@src/globalServices/admin/admin.service';
import { AdminRole } from '@src/utils/enums/AdminRole';
import { UpdateMemberDto } from './dto/UpdateMemberDto.dto';
import { CreateMemberDto } from './dto/CreateMemberDto.dto';
import { AdminMember } from '@src/globalServices/admin/entities/admin_member.entity';

@Injectable()
export class AdminAccountManagementService {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly customerService: CustomerService,
  ) {}

  async getSuperAdmin() {
    try {
      return this.adminService.getAdminMemberByRole(AdminRole.SUPER_ADMIN);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async getAdminMembers() {
    try {
      return await this.adminService.getAdminMembers();
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async updateAdminMember(body: UpdateMemberDto) {
    try {
      const brandMember = await this.adminService.getAdminMember(
        body.brandMemberId,
      );

      if (!brandMember) {
        throw new HttpException('Brand member not found', 404);
      }

      if (body.name) brandMember.name = body.name;
      if (body.profilePicture) brandMember.profilePicture = body.profilePicture;
      if (body?.roles && body?.roles?.length > 0)
        brandMember.roles = body.roles;

      return await this.adminService.saveAdminMember(brandMember);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async createAdminMember(body: CreateMemberDto) {
    let { email } = body;
    const { name, roles } = body;

    email = email.toLowerCase();
    try {
      const user = await this.userService.getUserByEmail(email);

      if (roles.includes(AdminRole.SUPER_ADMIN)) {
        const superAdmin = await this.adminService.getAdminMemberByRole(
          AdminRole.SUPER_ADMIN,
        );

        if (superAdmin) {
          throw new HttpException('Super admin already exists', 400);
        }
      }

      if (user) {
        const checkBrandMember =
          await this.adminService.getAdminMemberByUserEmail(email);

        if (checkBrandMember && checkBrandMember.isAccepted) {
          throw new HttpException('Brand member already exists', 400);
        }

        if (checkBrandMember && !checkBrandMember.isAccepted) {
          await this.mailService.sendMail({
            to: email,
            subject: 'Verify your email address',
            text: 'Verify your email address',
            html: `
            <p>Hello ${name},</p>
            <p>Click the link below to verify your email address.</p>
            ${emailButton({
              text: 'Accept Invitation',
              url: `${process.env.SERVER_URL}/admin/member/join/${user.email}`,
            })}
          `,
          });

          return {
            message: 'Admin member created successfully',
          };
        }

        user.role = Role.ADMIN;
        await this.userService.saveUser(user);

        const adminMember = new AdminMember();
        adminMember.name = name;
        adminMember.roles = roles;
        adminMember.verifyingEmail = email;

        await this.adminService.saveAdminMember(adminMember);

        await this.mailService.sendMail({
          to: email,
          subject: 'Verify your email address',
          text: 'Verify your email address',
          html: `
            <p>Hello ${name},</p>
            <p>Click the link below to verify your email address.</p>
            ${emailButton({
              text: 'Accept Invitation',
              url: `${process.env.SERVER_URL}/admin/member/join/${user.email}`,
            })}
          `,
        });

        return {
          message: 'Admin member created successfully',
        };
      }

      const newUser = new User();
      newUser.email = email?.toLowerCase();
      newUser.username = email.split('@')[0].toLowerCase();
      newUser.twoFAType = TwoFAType.EMAIL;
      newUser.role = Role.ADMIN;

      const password = Math.random().toString(36).slice(-8);

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      newUser.password = hashedPassword;
      newUser.salt = salt;
      newUser.userType = UserAppType.ADMIN;
      newUser.accountVerificationCode = Math.floor(1000 + Math.random() * 9000);

      const saveUser = await this.userService.saveUser(newUser);

      await this.customerService.create({
        name,
        userId: saveUser.id,
      });

      const adminMember = new AdminMember();
      adminMember.name = name;
      adminMember.roles = roles;
      adminMember.verifyingEmail = email;

      await this.adminService.saveAdminMember(adminMember);

      await this.mailService.sendMail({
        to: email,
        subject: 'Verify your email address',
        text: 'Verify your email address',
        html: `
          <p>Hello ${name},</p>
          <p>Click the link below to verify your email address.</p>
          ${emailButton({
            text: 'Verify Email',
            url: `${process.env.SERVER_URL}/admin/member/verify-email/${user?.accountVerificationCode}`,
          })}
        `,
      });

      return {
        message: 'Brand member created successfully',
      };
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async verifyBrandMemberEmail(code: number) {
    try {
      const user = await this.userService.getUserByVerificationCode(code);

      if (!user) {
        throw new HttpException('User not found', 404);
      }

      user.accountVerificationCode = null;
      user.emailVerified = true;

      await this.userService.saveUser(user);

      const adminMember = await this.adminService.getAdminMember(
        user.adminMember.id,
      );
      adminMember.userId = user.id;

      await this.adminService.saveAdminMember(adminMember);

      return user;
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async verifyBrandMemberExistingUser(email: string) {
    try {
      const user = await this.userService.getUserByEmail(email);

      if (!user) {
        throw new HttpException('User not found', 404);
      }

      user.accountVerificationCode = null;
      user.emailVerified = true;

      await this.userService.saveUser(user);

      const adminMember = await this.adminService.getAdminMemberByUserEmail(
        email,
      );

      if (!adminMember) {
        throw new HttpException('Brand member not found', 404);
      }

      adminMember.userId = user.id;

      await this.adminService.saveAdminMember(adminMember);

      return user;
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async removeBrandMember(memberId: string) {
    try {
      const adminMember = await this.adminService.getAdminMember(memberId);

      if (!adminMember) {
        throw new HttpException('Admin member not found', 404);
      }

      await this.adminService.removeBrandMember(adminMember);

      return {
        message: 'Brand member removed successfully',
      };
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }
}
