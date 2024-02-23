import {
  Controller,
  Body,
  UseGuards,
  ValidationPipe,
  Req,
  Put,
  Query,
  Param,
  Get,
  Post,
  Res,
  ParseUUIDPipe,
  Delete,
  HttpException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BrandAccountManagementService } from './service';
import { UpdateBrandDto } from './dto/UpdateBrandDto.dto';
import { BrandJwtStrategy } from '@src/middlewares/brand-jwt-strategy.middleware';
import { ApiTags } from '@nestjs/swagger';
import { FilterBrandDto } from './dto/FilterBrandDto.dto';
import { UpdateMemberDto } from './dto/UpdateMemberDto.dto';
import { User } from '@src/globalServices/user/entities/user.entity';
import { CreateMemberDto } from './dto/CreateMemberDto.dto';
import {
  FilterActivePendingCustomerDto,
  FilterCustomerDto,
} from './dto/FilterCustomerDto.dto';
import { OnboardBrandDto } from './dto/OnboardBrandDto.dto';
import { CreateCustomerDto } from './dto/CreateCustomerDto.dto';
import { ApiBearerAuth } from '@node_modules/@nestjs/swagger';
import { AdminRoles } from '@src/decorators/admin_roles.decorator';
import { AdminRole } from '@src/utils/enums/AdminRole';
import { AdminJwtStrategy } from '@src/middlewares/admin-jwt-strategy.middleware';
import { ApiKeyJwtStrategy } from '@src/middlewares/api-jwt-strategy.middleware';

@ApiTags('Brand')
@Controller('brand')
@ApiBearerAuth()
export class BrandManagementController {
  constructor(
    private readonly brandAccountManagementService: BrandAccountManagementService,
  ) {}

  @UseGuards(BrandJwtStrategy)
  @Put()
  async updateCustomer(
    @Body(ValidationPipe) updateBrandDto: UpdateBrandDto,
    @Req() req: any,
  ) {
    const brandId = req.user.brand.id;

    return await this.brandAccountManagementService.updateBrand(
      updateBrandDto,
      brandId,
    );
  }

  @Get()
  async getAllFilteredBrands(@Query(ValidationPipe) query: FilterBrandDto) {
    return await this.brandAccountManagementService.getAllFilteredBrands(query);
  }

  // @AdminRoles([AdminRole.SUPER_ADMIN])
  @UseGuards(AdminJwtStrategy)
  @Get('/admin/brands')
  async issueMeCredits(
    @Query(ValidationPipe) query: FilterBrandDto,
    @Req() req: any,
  ) {
    return await this.brandAccountManagementService.getAllBrandsForAdmin(query);
  }

  @UseGuards(AuthGuard())
  @Get(':id')
  async getBrandById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.brandAccountManagementService.getBrandById(id);
  }

  @UseGuards(BrandJwtStrategy)
  @Get('member/roles/owner')
  async getBrandOwner(@Req() req: any) {
    const brandId = req.user.brand.id;
    return await this.brandAccountManagementService.getBrandOwner(brandId);
  }

  @UseGuards(BrandJwtStrategy)
  @Get('members/all')
  async getBrandMembers(@Req() req: any) {
    const brandId = req.user.brand.id;
    return await this.brandAccountManagementService.getBrandMembers(brandId);
  }

  @UseGuards(BrandJwtStrategy)
  @Put('member/:id/role')
  async updateBrandMemberRole(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: any,
    @Body(ValidationPipe) body: UpdateMemberDto,
  ) {
    body.brandMemberId = id;
    body.brandId = req.user.brand.id;
    return await this.brandAccountManagementService.updateBrandMemberRole(body);
  }

  @UseGuards(BrandJwtStrategy)
  @Put('member/:id')
  async updateBrandMember(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: any,
    @Body(ValidationPipe) body: UpdateMemberDto,
  ) {
    body.brandMemberId = id;
    body.brandId = req.user.brand.id;

    const user = req.user as User;
    const brandOwner = await this.brandAccountManagementService.getBrandOwner(
      body.brandId,
    );

    if (brandOwner.id !== user.id) {
      throw new HttpException(
        "You don't have permission to update this member",
        403,
      );
    }

    return await this.brandAccountManagementService.updateBrandMember(body);
  }

  @UseGuards(BrandJwtStrategy)
  @Put('member')
  async updateBrandMemberDetail(
    @Req() req: any,
    @Body(ValidationPipe) body: UpdateMemberDto,
  ) {
    body.brandMemberId = req.user.brandMember.id;
    body.brandId = req.user.brand.id;
    return await this.brandAccountManagementService.updateBrandMember(body);
  }

  @UseGuards(BrandJwtStrategy)
  @Post('member')
  async createBrandMember(
    @Req() req: any,
    @Body(ValidationPipe) body: CreateMemberDto,
  ) {
    const user = req.user as User;
    body.brandId = user.brand.id;

    return await this.brandAccountManagementService.createBrandMember(body);
  }

  @UseGuards(BrandJwtStrategy)
  @Delete('member/:id')
  async removeBrandMember(@Req() req: any, @Param('id') id: string) {
    const user = req.user as User;

    return await this.brandAccountManagementService.removeBrandMember(
      user.brand.id,
      id,
    );
  }

  @UseGuards(BrandJwtStrategy)
  @Get('customers/all')
  async getCustomers(
    @Req() req: any,
    @Query(ValidationPipe) body: FilterCustomerDto,
  ) {
    const user = req.user as User;
    body.brandId = user.brand.id;

    return await this.brandAccountManagementService.getCustomers(body);
  }

  @UseGuards(BrandJwtStrategy)
  @Get('customers/active')
  async getActivelySpendingCustomers(
    @Req() req: any,
    @Query(ValidationPipe)
    body: { page: number; limit: number },
  ) {
    const user = req.user as User;

    return await this.brandAccountManagementService.getActivelySpendingBrandCustomers(
      user.brand.id,
      body.page,
      body.limit,
    );
  }

  @UseGuards(BrandJwtStrategy)
  @Post('customers/create')
  async createBrandCustomer(
    @Req() req: any,
    @Body(ValidationPipe) body: CreateCustomerDto,
  ) {
    const user = req.user as User;
    body.brandId = user.brand.id;

    return await this.brandAccountManagementService.createBrandCustomer(body);
  }

  @UseGuards(BrandJwtStrategy)
  @Post('customers/bulk-create')
  async bulkCreateBrandCustomers(
    @Req() req: any,
    @Body(ValidationPipe) body: { customers: CreateCustomerDto[] },
  ) {
    const user = req.user as User;

    const customers = body.customers;

    const updatedBody = customers.map((item) => {
      return {
        ...item,
        brandId: user.brand.id,
      };
    });

    this.brandAccountManagementService.batchCreateBrandCustomers(updatedBody);
    return { success: true, message: 'Processing' };
  }

  @UseGuards(ApiKeyJwtStrategy)
  @Post('customers/api_key/create')
  async createBrandCustomerWithApiKey(
    @Req() req: any,
    @Body(ValidationPipe) body: CreateCustomerDto,
  ) {
    body.brandId = req.brand.id;

    return await this.brandAccountManagementService.createBrandCustomer(body);
  }

  @UseGuards(ApiKeyJwtStrategy)
  @Post('customers/api_key/bulk-create')
  async bulkCreateBrandCustomersWithApiKey(
    @Req() req: any,
    @Body(ValidationPipe) body: { customers: CreateCustomerDto[] },
  ) {
    const customers = body.customers;

    const updatedBody = customers.map((item) => {
      return {
        ...item,
        brandId: req.brand.id,
      };
    });

    this.brandAccountManagementService.batchCreateBrandCustomers(updatedBody);
    return { success: true, message: 'Processing' };
  }

  @Get('member/verify-email/:code/:brandId')
  async verifyBrandMemberEmail(
    @Param('code') code: number,
    @Param('brandId') brandId: string,
    @Req() req: any,
    @Res() res: any,
  ) {
    await this.brandAccountManagementService.verifyBrandMemberEmail(
      code,
      brandId,
    );

    return res
      .status(302)
      .redirect(`${process.env.BUSINESS_APP_URL}/create-password`);
  }

  @Get('member/join/:email/:brandId')
  async verifyBrandMemberExistingUser(
    @Param('email') email: string,
    @Param('brandId') brandId: string,
    @Req() req: any,
    @Res() res: any,
  ) {
    await this.brandAccountManagementService.verifyBrandMemberExistingUser(
      email,
      brandId,
    );

    return res
      .status(302)
      .redirect(`${process.env.BUSINESS_APP_URL}/create-password`);
  }

  @UseGuards(BrandJwtStrategy)
  @Post('onboard')
  async onboardBrand(
    @Body(ValidationPipe) body: OnboardBrandDto,
    @Req() req: any,
  ) {
    const brandId = req.user.brand.id;
    body.brandId = brandId;

    return await this.brandAccountManagementService.onboardBrand(body);
  }
}
