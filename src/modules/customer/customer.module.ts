import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from '@src/globalServices/customer/customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '@src/globalServices/customer/entities/customer.entity';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService],
  imports: [TypeOrmModule.forFeature([Customer])],
})
export class CustomerModule {}
