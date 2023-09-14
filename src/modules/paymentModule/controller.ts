import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UseGuards,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { ResponseInterceptor } from '@src/interceptors/response.interceptor';
import { LinkCardDto } from './dto/LinkCardDto.dto';
import { ApiTags } from '@nestjs/swagger';
import { BrandJwtStrategy } from '@src/middlewares/brand-jwt-strategy.middleware';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { PaymentModuleService } from './service';

@ApiTags('Payment')
@Controller('payment')
export class PaymentModuleController {
  constructor(private readonly paymentService: PaymentModuleService) {}

  @UseGuards(BrandJwtStrategy)
  @Post('add-payment-method')
  async savePaymentMethodToWallet(
    @Body(ValidationPipe) body: LinkCardDto,
    @Req() req: any,
  ) {
    const brand = req.user.brand as Brand;

    return await this.paymentService.savePaymentMethodBrand(
      body.paymentMethodId,
      brand.id,
    );
  }
}
