import { HttpException, Injectable } from "@nestjs/common";
import { CustomerService } from "@src/globalServices/customer/customer.service";
import { UpdateCustomerDto } from "../customerAccountManagement/dto/UpdateCustomerDto";

@Injectable()
export class CustomerAccountManagementService {
  constructor(private readonly customerService: CustomerService) {}

  async updateCustomer(body: UpdateCustomerDto, userId: string) {
    try {
      const customer = await this.customerService.getByUserId(userId);
      if (!customer) throw new HttpException("Customer not found", 404);

      return this.customerService.update(body, customer.id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
