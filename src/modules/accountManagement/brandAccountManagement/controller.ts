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

@ApiTags('Brand')
@UseInterceptors(ResponseInterceptor)
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
    const userId = req.user.id;

    return await this.brandAccountManagementService.updateBrand(
      updateBrandDto,
      userId,
    );
  }

  @Get()
  async getAllBrands(@Query(ValidationPipe) query: FilterBrandDto) {
    return await this.brandAccountManagementService.getAllBrands(query);
  }

  @UseGuards(AuthGuard())
  @Get(':id')
  async getBrandById(@Param('id') id: string) {
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
    @Param('id') id: string,
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
    @Param('id') id: string,
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
}
