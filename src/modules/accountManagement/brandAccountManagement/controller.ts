import {
  Controller,
  Body,
  UseInterceptors,
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
} from '@nestjs/common';
import { ResponseInterceptor } from '@src/interceptors/response.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { BrandAccountManagementService } from './service';
import { UpdateBrandDto } from './dto/UpdateBrandDto.dto';
import { BrandJwtStrategy } from '@src/middlewares/brand-jwt-strategy.middleware';
import { ApiTags } from '@nestjs/swagger';
import { FilterBrandDto } from './dto/FilterBrandDto.dto';
import { UpdateMemberDto } from './dto/UpdateMemberDto.dto';
import { User } from '@src/globalServices/user/entities/user.entity';
import { CreateMemberDto } from './dto/CreateMemberDto.dto';
import { FilterCustomerDto } from './dto/FilterCustomerDto.dto';
import { OnboardBrandDto } from './dto/OnboardBrandDto.dto';

@ApiTags('Brand')
@Controller('brand')
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
  async getAllBrands(@Query(ValidationPipe) query: FilterBrandDto) {
    return await this.brandAccountManagementService.getAllBrands(query);
  }

  @UseGuards(AuthGuard())
  @Get(':id')
  async getBrandById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.brandAccountManagementService.getBrandById(id);
  }

  @UseGuards(BrandJwtStrategy)
  @Get('owner')
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
    return await this.brandAccountManagementService.updateBrandMember(body);
  }

  @UseGuards(BrandJwtStrategy)
  @Put('member')
  async updateBrandMemberDetail(
    @Param('id') id: string,
    @Req() req: any,
    @Body(ValidationPipe) body: UpdateMemberDto,
  ) {
    body.brandMemberId = id;
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
  @Get('customers/all')
  async getCustomers(
    @Req() req: any,
    @Query(ValidationPipe) body: FilterCustomerDto,
  ) {
    const user = req.user as User;
    body.brandId = user.brand.id;

    return await this.brandAccountManagementService.getCustomers(body);
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

    return res.redirect(process.env.CLIENT_APP_URI);
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

    return res.redirect(process.env.CLIENT_APP_URI);
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
