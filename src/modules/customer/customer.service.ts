import { Injectable } from "@nestjs/common";
import { CreateCustomerDto } from "./dto/customer.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "./entities/customer.entity";
import { Repository } from "typeorm";

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>
  ) {}

  create(createCustomerDto: CreateCustomerDto) {
    const customer = this.customerRepo.create(createCustomerDto);
    return this.customerRepo.save(customer);
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
}
