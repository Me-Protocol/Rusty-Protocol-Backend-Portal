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
import { PaymentService } from './payment.service';
import { ApiTags } from '@nestjs/swagger';
import { BrandJwtStrategy } from '@src/middlewares/brand-jwt-strategy.middleware';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';

@ApiTags('Payment')
@UseInterceptors(ResponseInterceptor)
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(BrandJwtStrategy)
  @Post('add-payment-method')
  async savePaymentMethodToWallet(
    @Body(ValidationPipe) body: LinkCardDto,
    @Req() req: any,
  ) {
    const brand = req.user.brand as Brand;

    return await this.paymentService.savePaymentMethodBrand(
      body.paymentMethodId,
      brand,
    );
  }
}
