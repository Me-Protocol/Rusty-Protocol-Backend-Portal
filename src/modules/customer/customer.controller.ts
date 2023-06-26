import {
  Body,
  Controller,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ResponseInterceptor } from '@src/interceptors/response.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { CustomerService } from '@src/globalServices/customer/customer.service';
import { UpdateCustomerDto } from '../accountManagement/customerAccountManagement/dto/UpdateCustomerDto';

@UseInterceptors(ResponseInterceptor)
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @UseGuards(AuthGuard())
  @Put()
  async update(@Body(ValidationPipe) body: UpdateCustomerDto, @Req() req: any) {
    const userId = req.user.id;
    // return this.customerService.update(body, userId);
  }
}
