import { HttpException, Injectable } from '@nestjs/common';
import { CustomerService } from '@src/globalServices/customer/customer.service';
import { UpdateCustomerDto } from '../customerAccountManagement/dto/UpdateCustomerDto';
import { logger } from '@src/globalServices/logger/logger.service';
import { RewardService } from '@src/globalServices/reward/reward.service';
import { SyncRewardService } from '@src/globalServices/reward/sync/sync.service';
import { UserService } from '@src/globalServices/user/user.service';
import { SyncIdentifierType } from '@src/utils/enums/SyncIdentifierType';
import { User } from '@src/globalServices/user/entities/user.entity';

@Injectable()
export class CustomerAccountManagementService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly rewardService: RewardService,
    private readonly syncService: SyncRewardService,
    private readonly userService: UserService,
  ) {}

  async updateCustomer(body: UpdateCustomerDto, userId: string) {
    try {
      const customer = await this.customerService.getByUserId(userId);
      if (!customer) throw new HttpException('Customer not found', 404);

      if (body.firstTimeLogin) {
        customer.firstTimeLogin = body.firstTimeLogin === 'true' ? true : false;
      }
      if (body.name) customer.name = body.name;
      if (body.profilePicture) customer.profilePicture = body.profilePicture;
      if (body.country) customer.country = body.country;
      if (body.bio) customer.bio = body.bio;
      if (body.location) customer.location = body.location;
      if (body.weight) customer.weight = body.weight;
      if (body.height) customer.height = body.height;
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

      return this.customerService.save(customer);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async setWalletAddress(walletAddress: string, userId: string) {
    try {
      // 1. We retrieve the customer based on the userId and the user based on the userId.
      const customer = await this.customerService.getByUserId(userId);
      const user = await this.userService.getUserById(userId);

      // 2. We get all the rewards registered with the user's email that do not have a userId field. This is because the rewards were registered before the user account was created.
      const rewardRegistry =
        await this.syncService.getAllRegistryRecordsByIdentifer(user.email);

      if (rewardRegistry.length > 0) {
        // 3. We iterate through the rewards and assign the userId field to each of them.
        for (const registry of rewardRegistry) {
          if (!registry.userId) {
            registry.userId = user.id;
            await this.syncService.saveRegistry(registry);
          }
        }
      }

      // 4. We check if the customer exists.
      if (!customer) {
        throw new HttpException('Customer not found', 404, {
          cause: new Error('Customer not found'),
        });
      }

      // 5. We check if the walletAddress is already set.
      if (customer.walletAddress) {
        throw new HttpException('Wallet address already set', 400, {
          cause: new Error('Wallet address already set'),
        });
      }

      // 6. We assign the walletAddress to the customer.
      customer.walletAddress = walletAddress;
      await this.customerService.save(customer);

      // 8. We check if the user has undistributed points.
      const undistributedRewards =
        await this.syncService.getUndistributedReward(userId);

      console.log('undistributedRewards', undistributedRewards);

      if (undistributedRewards.length > 0) {
        // 9. We iterate through the undistributed points and distribute them to the new walletAddress.
        for (const point of undistributedRewards) {
          await this.syncService.distributeRewardWithPrivateKey({
            rewardId: point.rewardId,
            walletAddress: walletAddress,
            amount: point.undistributedBalance,
            email: user.email,
          });
        }
      }

      return {
        message: 'Wallet address updated successfully',
      };
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async checkIfCustomerExist(
    identifier: string,
    identifierType: SyncIdentifierType,
  ) {
    let user: User;

    if (identifierType === SyncIdentifierType.EMAIL) {
      user = await this.userService.getUserByEmail(identifier);
    }

    if (identifierType === SyncIdentifierType.PHONE) {
      user = await this.userService.getUserByPhone(identifier);
    }

    if (user) {
      return true;
    } else {
      return false;
    }
  }
}
