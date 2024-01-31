import {
  Controller,
  Body,
  UseGuards,
  ValidationPipe,
  Req,
  Put,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  UpdateCustomerDto,
  UpdateCustomerWalletDto,
} from './dto/UpdateCustomerDto.dto';
import { CustomerAccountManagementService } from './service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CheckCustomerDto } from './dto/CheckCustomerDto.dto';

@ApiTags('Customer')
@ApiBearerAuth()
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

  @UseGuards(AuthGuard())
  @Put('/setup-wallet-address')
  async setWalletAddress(
    @Body(ValidationPipe) body: UpdateCustomerWalletDto,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    // return 'Deprecated';

    return await this.customerAccountManagementService.setWalletAddress(
      body.walletAddress,
      userId,
    );
  }

  @UseGuards(AuthGuard())
  @Get('customer-exist')
  async verifyBrandMemberExistingUser(
    @Query(ValidationPipe) { identifier, identifierType }: CheckCustomerDto,
  ) {
    return this.customerAccountManagementService.checkIfCustomerExist(
      identifier,
      identifierType,
    );
  }
}
