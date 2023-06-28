import {
  Controller,
  Body,
  UseInterceptors,
  UseGuards,
  ValidationPipe,
  Req,
  Put,
} from '@nestjs/common';
import { ResponseInterceptor } from '@src/interceptors/response.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { BrandAccountManagementService } from './service';
import { UpdateBrandDto } from './dto/UpdateBrandDto';
import { BrandJwtStrategy } from '@src/middlewares/brand-jwt-strategy.middleware';

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
}
