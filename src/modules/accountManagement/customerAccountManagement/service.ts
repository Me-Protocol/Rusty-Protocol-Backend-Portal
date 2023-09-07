import { HttpException, Injectable } from '@nestjs/common';
import { CustomerService } from '@src/globalServices/customer/customer.service';
import { UpdateCustomerDto } from '../customerAccountManagement/dto/UpdateCustomerDto';
import { logger } from '@src/globalServices/logger/logger.service';

@Injectable()
export class CustomerAccountManagementService {
  constructor(private readonly customerService: CustomerService) {}

  async updateCustomer(body: UpdateCustomerDto, userId: string) {
    try {
      const customer = await this.customerService.getByUserId(userId);
      if (!customer) throw new HttpException('Customer not found', 404);

      if (body.name) customer.name = body.name;
      if (body.profilePicture) customer.profilePicture = body.profilePicture;
      if (body.country) customer.country = body.country;
      if (body.bio) customer.bio = body.bio;
      if (body.location) customer.location = body.location;
      if (body.weight) customer.weight = body.weight;
      if (body.height) customer.height = body.height;
      if (body.walletAddress) customer.walletAddress = body.walletAddress;
      if (body.login_2fa) customer.login_2fa = body.login_2fa;
      if (body.deposit_2fa) customer.deposit_2fa = body.deposit_2fa;
      if (body.withdraw_2fa) customer.withdraw_2fa = body.withdraw_2fa;
      if (body.sizes) customer.sizes = body.sizes;
      if (body.news_notifications)
        customer.news_notifications = body.news_notifications;
      if (body.offer_notifications) {
        customer.offer_notifications = body.offer_notifications;
      }
      if (body.brand_notifications)
        customer.brand_notifications = body.brand_notifications;
      if (body.expiring_notifications)
        customer.expiring_notifications = body.expiring_notifications;
      if (body.point_notifications)
        customer.point_notifications = body.point_notifications;
      if (body.order_notifications)
        customer.order_notifications = body.order_notifications;
      if (body.other_notifications)
        customer.other_notifications = body.other_notifications;

      return this.customerService.update(customer, customer.id);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }
}
