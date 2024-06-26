import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { UpdateCustomerDto } from '@src/modules/accountManagement/customerAccountManagement/dto/UpdateCustomerDto.dto';
import { SettingsService } from '../settings/settings.service';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,

    private readonly settingService: SettingsService,
  ) {}

  async create({
    userId,
    name,
    walletAddress,
  }: {
    userId: string;
    name: string;
    walletAddress: string;
  }) {
    const { walletVersion } = await this.settingService.getPublicSettings();

    const customer = new Customer();
    customer.walletAddress = walletAddress;
    customer.walletVersion = walletVersion;
    customer.userId = userId;
    customer.name = name;

    return await this.customerRepo.save(customer);
  }

  save(customer: Customer) {
    return this.customerRepo.save(customer);
  }

  getByUserId(userId: string) {
    return this.customerRepo.findOneBy({ userId });
  }

  getById(id: string) {
    return this.customerRepo.findOneBy({ id });
  }

  // update(body: UpdateCustomerDto, customerId: string) {
  //   return this.customerRepo.update({ id: customerId }, body);
  // }
}
