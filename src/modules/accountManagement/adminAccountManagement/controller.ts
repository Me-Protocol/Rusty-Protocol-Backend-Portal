import {
  Controller,
  Body,
  UseGuards,
  ValidationPipe,
  Req,
  Put,
  Param,
  Get,
  Post,
  Res,
  ParseUUIDPipe,
  Delete,
} from '@nestjs/common';
import { BrandJwtStrategy } from '@src/middlewares/brand-jwt-strategy.middleware';
import { ApiTags } from '@nestjs/swagger';
import { UpdateMemberDto } from './dto/UpdateMemberDto.dto';
import { CreateMemberDto } from './dto/CreateMemberDto.dto';
import { ApiBearerAuth } from '@node_modules/@nestjs/swagger';
import { AdminAccountManagementService } from './service';
import { AdminJwtStrategy } from '@src/middlewares/admin-jwt-strategy.middleware';
import { AdminRoles } from '@src/decorators/admin_roles.decorator';
import { AdminRole } from '@src/utils/enums/AdminRole';

@ApiTags('Admin')
@Controller('admin')
@ApiBearerAuth()
export class BrandManagementController {
  constructor(
    private readonly adminAccountManagementService: AdminAccountManagementService,
  ) {}

  @UseGuards(AdminJwtStrategy)
  @Get('members/all')
  async getBrandMembers(@Req() req: any) {
    return await this.adminAccountManagementService.getAdminMembers();
  }

  @AdminRoles([AdminRole.SUPER_ADMIN])
  @UseGuards(AdminJwtStrategy)
  @Put('member/:id')
  async updateBrandMember(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: any,
    @Body(ValidationPipe) body: UpdateMemberDto,
  ) {
    body.brandMemberId = id;

    return await this.adminAccountManagementService.updateAdminMember(body);
  }

  @AdminRoles([AdminRole.SUPER_ADMIN])
  @UseGuards(BrandJwtStrategy)
  @Put('member')
  async updateBrandMemberDetail(
    @Req() req: any,
    @Body(ValidationPipe) body: UpdateMemberDto,
  ) {
    body.brandMemberId = req.user.brandMember.id;
    return await this.adminAccountManagementService.updateAdminMember(body);
  }

  @AdminRoles([AdminRole.SUPER_ADMIN])
  @UseGuards(BrandJwtStrategy)
  @Post('member')
  async createBrandMember(
    @Req() req: any,
    @Body(ValidationPipe) body: CreateMemberDto,
  ) {
    return await this.adminAccountManagementService.createAdminMember(body);
  }

  @AdminRoles([AdminRole.SUPER_ADMIN])
  @UseGuards(BrandJwtStrategy)
  @Delete('member/:id')
  async removeBrandMember(@Req() req: any, @Param('id') id: string) {
    return await this.adminAccountManagementService.removeBrandMember(id);
  }

  @Get('member/verify-email/:code')
  async verifyBrandMemberEmail(
    @Param('code') code: number,
    @Param('brandId') brandId: string,
    @Req() req: any,
    @Res() res: any,
  ) {
    await this.adminAccountManagementService.verifyBrandMemberEmail(code);

    return res
      .status(302)
      .redirect(`${process.env.BUSINESS_APP_URL}/create-password`);
  }

  @Get('member/join/:email')
  async verifyBrandMemberExistingUser(
    @Param('email') email: string,
    @Param('brandId') brandId: string,
    @Req() req: any,
    @Res() res: any,
  ) {
    await this.adminAccountManagementService.verifyBrandMemberExistingUser(
      email,
    );

    return res
      .status(302)
      .redirect(`${process.env.BUSINESS_APP_URL}/create-password`);
  }
}
