import { HttpException, Injectable } from '@nestjs/common';
import { CustomerService } from '@src/globalServices/customer/customer.service';
import { UpdateCustomerDto } from './dto/UpdateCustomerDto.dto';
import { logger } from '@src/globalServices/logger/logger.service';
import { RewardService } from '@src/globalServices/reward/reward.service';
import { SyncRewardService } from '@src/globalServices/reward/sync/sync.service';
import { UserService } from '@src/globalServices/user/user.service';
import { SyncIdentifierType } from '@src/utils/enums/SyncIdentifierType';
import { User } from '@src/globalServices/user/entities/user.entity';
import { CampaignService } from '@src/globalServices/campaign/campaign.service';
import { BrandService } from '@src/globalServices/brand/brand.service';
import sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY, SENDGRID_EMAIL } from '@src/config/env.config';

sgMail.setApiKey(SENDGRID_API_KEY);
@Injectable()
export class CustomerAccountManagementService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly rewardService: RewardService,
    private readonly syncService: SyncRewardService,
    private readonly userService: UserService,
    private readonly campaignService: CampaignService,
    private readonly brandService: BrandService,
  ) {}

  private async sendEmailToUserWithRewards(
    email: string,
    first_name: string,
    amount_of_rewards: number,
    amount_of_reward: number,
    name_of_reward: string,
  ) {
    const payload = {
      to: email,
      from: `"Me Marketplace" <${SENDGRID_EMAIL}>`,
      templateId: 'd-530024c9419f4c4ab6512ce3df29c566',
      dynamic_template_data: {
        name: first_name,
        NameOfReward: name_of_reward,
        AmountOfReward: amount_of_reward,
        AmountOfRewards: amount_of_rewards,
      },
    };
    sgMail.send(payload).then(
      () => {},
      (error) => {
        console.error(error);
        if (error.response) {
          console.error(error.response.body);
        }
      },
    );
  }

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

  async setWalletAddress(
    walletAddress: string,
    walletVersion: number,
    userId: string,
  ) {
    try {
      if (!walletAddress) {
        return 'Wallet address is required';
      }

      // 1. We retrieve the customer based on the userId and the user based on the userId.
      const customer = await this.customerService.getByUserId(userId);
      const user = await this.userService.getUserById(userId);

      // 4. We check if the customer exists.
      if (!customer) {
        throw new HttpException('Customer not found', 404, {
          cause: new Error('Customer not found'),
        });
      }

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

      // 6. We assign the walletAddress to the customer.
      customer.walletAddress = walletAddress
        ? walletAddress
        : customer.walletAddress;
      customer.walletVersion = walletVersion;
      await this.customerService.save(customer);

      // 8. We check if the user has undistributed points.
      const undistributedRewards =
        await this.syncService.getUndistributedReward(userId);

      if (undistributedRewards.length > 0) {
        // 9. We iterate through the undistributed points and distribute them to the new walletAddress.
        for (const point of undistributedRewards) {
          const distribute =
            await this.syncService.distributeRewardWithPrivateKey({
              rewardId: point.rewardId,
              walletAddress: walletAddress,
              amount: point.undistributedBalance,
              email: user.email,
            });

          if (distribute.error) {
            throw new Error('Distribution failed');
          }

          await this.sendEmailToUserWithRewards(
            user.email,
            customer.name,
            point.undistributedBalance,
            point.undistributedBalance,
            point.reward.rewardName,
          );
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
    } else if (identifierType === SyncIdentifierType.PHONE) {
      user = await this.userService.getUserByPhone(identifier);
    } else {
      user = null;
    }

    if (user) {
      return true;
    } else {
      return false;
    }
  }

  async rewardForCampaign({
    userId,
    brandId,
  }: {
    userId: string;
    brandId: string;
  }) {
    try {
      const campaign = await this.campaignService.getBrandSignUpCampaign(
        brandId,
      );
      console.log('There is campaign', campaign);

      if (campaign) {
        if (
          Number(campaign.availableUsers) <= 0 ||
          Number(campaign.availableRewards <= 0)
        ) {
          return;
        }

        const user = await this.userService.getUserById(userId);
        const reward = await this.rewardService.getRewardById(
          campaign.rewardId,
        );
        campaign.availableRewards =
          campaign.availableRewards - campaign.rewardPerUser;
        campaign.availableUsers = Number(campaign.availableUsers) - 1;

        const distribute =
          await this.syncService.distributeRewardWithPrivateKey({
            rewardId: campaign.rewardId,
            walletAddress: user.customer.walletAddress,
            amount: campaign.rewardPerUser,
            email: user.email,
            keySource: 'campaign',
          });

        if (distribute.error) {
          throw new Error('Distribution failed');
        }

        const brandCustomer =
          await this.brandService.getBrandCustomerByIdentifier({
            identifier: user.email,
            brandId: reward.brandId,
            identifierType: SyncIdentifierType.EMAIL,
          });

        brandCustomer.totalDistributed =
          Number(brandCustomer.totalDistributed) +
          Number(campaign.rewardPerUser);
        await this.brandService.saveBrandCustomer(brandCustomer);

        const registry = await this.syncService.getRegistryRecordByIdentifer(
          user.email,
          reward.id,
          SyncIdentifierType.EMAIL,
        );

        await this.syncService.disbutributeRewardToExistingUsers({
          registryId: registry.id,
          amount: campaign.rewardPerUser,
          description: `Campaign reward distributed to ${user.customer.walletAddress}`,
        });

        await this.rewardService.reduceVaultAvailableSupply({
          rewardId: reward.id,
          amount: campaign.rewardPerUser,
        });

        await this.campaignService.save(campaign);
      }
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }
}
