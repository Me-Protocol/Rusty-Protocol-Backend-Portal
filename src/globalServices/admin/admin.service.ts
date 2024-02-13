import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from '@src/globalServices/user/entities/user.entity';
import { AdminMember } from './entities/admin_member.entity';
import { AdminRole } from '@src/utils/enums/AdminRole';
import { Role } from '@src/utils/enums/Role';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminMember)
    private readonly adminMemberRepo: Repository<AdminMember>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async getAdminMemberByRole(role: AdminRole) {
    return await this.adminMemberRepo.findOne({
      where: {
        roles: In([role]),
      },
    });
  }

  async saveAdminMember(adminMember: AdminMember) {
    return await this.adminMemberRepo.save(adminMember);
  }

  async getAdminMember(id: string) {
    return await this.adminMemberRepo.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });
  }

  async getAdminMemberByUserEmail(email: string) {
    return await this.adminMemberRepo.findOne({
      where: {
        verifyingEmail: email,
      },
    });
  }

  async getAdminMemberById(id: string) {
    return await this.adminMemberRepo.findOne({
      where: {
        id,
      },
    });
  }

  async getAdminMembers() {
    return await this.adminMemberRepo.find({});
  }

  async getAdminMemberByUserId(userId: string) {
    return await this.adminMemberRepo.findOne({
      where: {
        userId,
      },
    });
  }

  async removeBrandMember(adminMember: AdminMember) {
    const user = await this.userRepo.findOne({
      where: {
        id: adminMember.userId,
      },
    });

    if (user) {
      user.role = Role.CUSTOMER;
      await this.userRepo.save(user);
    }

    return await this.adminMemberRepo.remove(adminMember);
  }
}
