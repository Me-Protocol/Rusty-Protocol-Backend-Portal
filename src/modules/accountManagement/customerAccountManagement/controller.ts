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
import { UpdateCustomerDto } from './dto/UpdateCustomerDto';
import { CustomerAccountManagementService } from './service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Customer')
@UseInterceptors(ResponseInterceptor)
@Controller('customer')
export class CustomerManagementController {
  constructor(
    private readonly customerAccountManagementService: CustomerAccountManagementService,
  ) {}

  @UseGuards(AuthGuard())
  @Put()
  async updateCustomer(
    @Body(ValidationPipe) updateCustomerDto: UpdateCustomerDto,
    @Req() req: any,
  ) {
    const userId = req.user.id;

    return await this.customerAccountManagementService.updateCustomer(
      updateCustomerDto,
      userId,
    );
  }
}
