import { HttpException, Injectable } from '@nestjs/common';
import { BrandService } from '@src/globalServices/brand/brand.service';
import { UpdateBrandDto } from './dto/UpdateBrandDto.dto';
import { logger } from '@src/globalServices/logger/logger.service';
import { FilterBrandDto } from './dto/FilterBrandDto.dto';
import { UpdateMemberDto } from './dto/UpdateMemberDto.dto';
import { CreateMemberDto } from './dto/CreateMemberDto.dto';
import { UserService } from '@src/globalServices/user/user.service';
import { User } from '@src/globalServices/user/entities/user.entity';
import { TwoFAType } from '@src/utils/enums/TwoFAType';
import * as bcrypt from 'bcrypt';
import { UserAppType } from '@src/utils/enums/UserAppType';
import { BrandMember } from '@src/globalServices/brand/entities/brand_member.entity';
import { MailService } from '@src/globalServices/mail/mail.service';
import { emailButton } from '@src/utils/helpers/emailButton';

@Injectable()
export class BrandAccountManagementService {
  constructor(
    private readonly brandService: BrandService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  async updateBrand(body: UpdateBrandDto, userId: string) {
    try {
      const brand = await this.brandService.getBrandByUserId(userId);
      return this.brandService.update(body, brand.id);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async getAllBrands(query: FilterBrandDto) {
    try {
      const { categoryId, page, limit } = query;
      const brands = await this.brandService.getAllFilteredBrands({
        categoryId,
        page,
        limit,
      });
      return brands;
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async getBrandById(id: string) {
    try {
      const brand = await this.brandService.getBrandById(id);

      if (!brand) {
        throw new HttpException('Brand not found', 404);
      }

      return brand;
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async getBrandOwner(brandId: string) {
    try {
      const brand = await this.brandService.getBrandById(brandId);

      if (!brand) {
        throw new HttpException('Brand not found', 404);
      }

      return brand.user;
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async getBrandMembers(brandId: string) {
    try {
      return await this.brandService.getBrandMembers(brandId);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async updateBrandMemberRole(body: UpdateMemberDto) {
    try {
      const brandMember = await this.brandService.getBrandMember(
        body.brandId,
        body.brandMemberId,
      );

      if (!brandMember) {
        throw new HttpException('Brand member not found', 404);
      }

      brandMember.role = body.role;

      return await this.brandService.saveBrandMember(brandMember);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async updateBrandMember(body: UpdateMemberDto) {
    try {
      const brandMember = await this.brandService.getBrandMember(
        body.brandId,
        body.brandMemberId,
      );

      if (!brandMember) {
        throw new HttpException('Brand member not found', 404);
      }

      if (body.name) brandMember.name = body.name;
      if (body.profilePicture) brandMember.profilePicture = body.profilePicture;
      if (body.role) brandMember.role = body.role;

      return await this.brandService.saveBrandMember(brandMember);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async createBrandMember(body: CreateMemberDto) {
    let { name, email, role, brandId } = body;

    email = email.toLowerCase();
    try {
      const brand = await this.brandService.getBrandById(brandId);

      const user = await this.userService.getUserByEmail(email);
      if (user) {
        // TODO: Check if user is already a member of the brand
      }

      const newUser = new User();
      newUser.email = email?.toLowerCase();
      newUser.username = email.split('@')[0].toLowerCase();
      newUser.twoFAType = TwoFAType.EMAIL;

      const password = Math.random().toString(36).slice(-8);

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      newUser.password = hashedPassword;
      newUser.salt = salt;
      newUser.userType = UserAppType.BRAND_MEMBER;

      const saveUser = await this.userService.saveUser(newUser);

      const brandMember = new BrandMember();
      brandMember.brandId = brandId;
      brandMember.name = name;
      brandMember.role = role;
      brandMember.userId = saveUser.id;

      await this.brandService.saveBrandMember(brandMember);

      await this.userService.saveUser(saveUser);

      user.accountVerificationCode = Math.floor(1000 + Math.random() * 9000);
      await this.userService.saveUser(user);

      await this.mailService.sendMail({
        to: email,
        subject: 'Verify your email address',
        text: 'Verify your email address',
        html: `
        <p>Hello ${name},</p><br/>
        <p>${
          brand.name
        } has invited you to join their brand on Me Protocol.</p><br/>
        <p>Click the link below to verify your email address and join the brand.</p><br/>
        ${emailButton({
          text: 'Verify Email',
          url: `${process.env.SERVER_URL}/brand/member/verify-email/${user.accountVerificationCode}`,
        })}
        `,
      });

      return user;
    } catch (error) {
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

      return user;
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }
}
