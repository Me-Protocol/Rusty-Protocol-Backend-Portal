import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { BrandService } from '@src/globalServices/brand/brand.service';
import { UpdateBrandDto } from './dto/UpdateBrandDto.dto';
import { logger } from '@src/globalServices/logger/logger.service';
import { FilterBrandDto } from './dto/FilterBrandDto.dto';
import { UpdateMemberDto } from './dto/UpdateMemberDto.dto';
import { CreateMemberDto } from './dto/CreateMemberDto.dto';
import { UserService } from '@src/globalServices/user/user.service';
import { User } from '@src/globalServices/user/entities/user.entity';
import { TwoFAType } from '@src/utils/enums/TwoFAType';
import * as bcrypt from 'bcryptjs';
import { UserAppType } from '@src/utils/enums/UserAppType';
import { BrandMember } from '@src/globalServices/brand/entities/brand_member.entity';
import { MailService } from '@src/globalServices/mail/mail.service';
import { emailButton } from '@src/utils/helpers/email';
import { CustomerService } from '@src/globalServices/customer/customer.service';
import { FilterCustomerDto } from './dto/FilterCustomerDto.dto';
import { SettingsService } from '@src/globalServices/settings/settings.service';
import { BigNumber, ethers } from 'ethers';
import {
  CHAIN_ID,
  JSON_RPC_URL,
  OPEN_REWARD_DIAMOND,
  adminService,
  generateWalletRandom,
  getBrandIdHex,
} from '@developeruche/protocol-core';
import { OnboardBrandDto } from './dto/OnboardBrandDto.dto';
import { CostModuleManagementService } from '@src/modules/costModule/service';
import { PaymentRequestTnxType } from '@src/utils/enums/PaymentRequestTnxType';
import { PaymentOrigin } from '@src/utils/enums/PaymentOrigin';
import { supportedNetworks } from '@src/globalServices/costManagement/symbol-finder.service';
import {
  CallWithERC2771Request,
  ERC2771Type,
  GelatoRelay,
} from '@gelatonetwork/relay-sdk';
import { ProcessBrandColorEvent } from '@src/globalServices/brand/events/process-brand-color.event';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BrandRole } from '@src/utils/enums/BrandRole';
import {
  get_user_reward_balance_with_url,
  onboard_brand_with_url,
} from '@developeruche/runtime-sdk';
import { RUNTIME_URL } from '@src/config/env.config';
import { CreateCustomerDto } from './dto/CreateCustomerDto.dto';
import { Role } from '@src/utils/enums/Role';
import { BrandUploadGateway } from './socket/brand-upload.gateway';
import { FiatWalletService } from '@src/globalServices/fiatWallet/fiatWallet.service';
import { AuditTrailService } from '@src/globalServices/auditTrail/auditTrail.service';
import { SyncRewardService } from '@src/globalServices/reward/sync/sync.service';
import { CampaignService } from '@src/globalServices/campaign/campaign.service';
import { Campaign } from '@src/globalServices/campaign/entities/campaign.entity';
import { RewardService } from '@src/globalServices/reward/reward.service';
import { CreateCampaignDto, UpdateCampaignDto } from './dto/CreateCampaignDto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CampaignStatus } from '@src/utils/enums/CampaignStatus';
import { KeyManagementService } from '@src/globalServices/key-management/key-management.service';
import { KeyIdentifier } from '@src/globalServices/key-management/entities/keyIdentifier.entity';
import { KeyIdentifierType } from '@src/utils/enums/KeyIdentifierType';
import { SendTransactionData } from '@src/modules/storeManagement/reward/dto/distributeBatch.dto';
import { BullService } from '@src/globalServices/task-queue/bull.service';

@Injectable()
export class BrandAccountManagementService {
  constructor(
    private readonly brandService: BrandService,
    private readonly auditTrailService: AuditTrailService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly customerService: CustomerService,
    private readonly settingsService: SettingsService,
    private readonly costModuleManagementService: CostModuleManagementService,
    private readonly walletService: FiatWalletService,
    private eventEmitter: EventEmitter2,
    private BrandUploadGateway: BrandUploadGateway,
    private readonly syncService: SyncRewardService,
    private readonly campaignService: CampaignService,
    private readonly rewardService: RewardService,
    private readonly keyManagementService: KeyManagementService,

    @Inject(forwardRef(() => BullService))
    private readonly bullService: BullService,
  ) {}

  async updateBrand(body: UpdateBrandDto, brandId: string) {
    try {
      if (body.logo || body.logo_white) {
        const img = body.logo || body.logo_white;
        const processBrandColorPayload = new ProcessBrandColorEvent();
        processBrandColorPayload.url = img;
        processBrandColorPayload.brandId = brandId;
        this.eventEmitter.emit('process.brand.color', processBrandColorPayload);
      }

      return this.brandService.update(body, brandId);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async getAllFilteredBrands(query: FilterBrandDto) {
    try {
      const { categoryId, page, limit, order, search, regionId } = query;
      const brands = await this.brandService.getAllFilteredBrands({
        categoryId,
        page,
        limit,
        order,
        search,
        regionId,
      });
      return brands;
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async getBrandById(id: string) {
    try {
      const brand = await this.brandService.getBrandById(id);

      if (!brand) {
        throw new HttpException('Brand not found', 404);
      }

      return brand;
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async getBrandOwner(brandId: string) {
    try {
      const brand = await this.brandService.getBrandById(brandId);

      if (!brand) {
        throw new HttpException('Brand not found', 404);
      }

      return brand.user;
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async getBrandMembers(brandId: string) {
    try {
      return await this.brandService.getBrandMembers(brandId);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async updateBrandMemberRole(body: UpdateMemberDto) {
    try {
      const brandMember = await this.brandService.getBrandMember(
        body.brandId,
        body.brandMemberId,
      );

      if (!brandMember) {
        throw new HttpException('Brand member not found', 404);
      }

      const brandOwner = await this.getBrandOwner(body.brandId);
      const brandOwnerMember =
        await this.brandService.getBrandMemberByUserIdAndBrandId(
          brandOwner.id,
          body.brandId,
        );
      const ownerMemberRecord = await this.brandService.getBrandMember(
        body.brandId,
        brandOwnerMember.id,
      );

      if (body.role === BrandRole.OWNER && body.userId !== brandOwner.id) {
        throw new HttpException('You cannot assign owner role to a user', 400);
      }

      ownerMemberRecord.role = BrandRole.COLLABORATOR;
      await this.brandService.saveBrandMember(ownerMemberRecord);

      brandMember.role = body.role;
      return await this.brandService.saveBrandMember(brandMember);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async updateBrandMember(body: UpdateMemberDto) {
    try {
      const brandMember = await this.brandService.getBrandMember(
        body.brandId,
        body.brandMemberId,
      );

      if (!brandMember) {
        throw new HttpException('Brand member not found', 404);
      }

      if (body.name) brandMember.name = body.name;
      if (body.profilePicture) brandMember.profilePicture = body.profilePicture;

      return await this.brandService.saveBrandMember(brandMember);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async createBrandMember(body: CreateMemberDto) {
    let { email } = body;
    const { name, role, brandId } = body;

    email = email.toLowerCase();
    try {
      const brand = await this.brandService.getBrandById(brandId);
      const user = await this.userService.getUserByEmail(email);

      if (role === BrandRole.OWNER) {
        throw new HttpException('You cannot assign owner role to a user', 400);
      }

      if (user) {
        const checkBrandMember =
          await this.brandService.getBrandMemberByUserEmail(email, brandId);

        if (checkBrandMember && checkBrandMember.isAccepted) {
          throw new HttpException('Brand member already exists', 400);
        }

        if (checkBrandMember && !checkBrandMember.isAccepted) {
          await this.mailService.sendMail({
            to: email,
            subject: `Join ${brand.name} on Me Protocol`,
            text: `Join ${brand.name} on Me Protocol`,
            html: `
            <p>Hello ${name},</p>
            <p>${
              brand.name
            } has invited you to join their brand on Me Protocol. Click the link below to verify your email address and join the brand.</p>
            
            ${emailButton({
              text: 'Accept Invitation',
              url: `${process.env.SERVER_URL}/brand/member/join/${user.email}/${brandId}`,
            })}
          `,
          });

          return {
            message: 'Brand member created successfully',
          };
        }

        user.role = Role.BRAND_MEMBER;
        await this.userService.saveUser(user);

        const brandMember = new BrandMember();
        brandMember.brandId = brandId;
        brandMember.name = name;
        brandMember.role = role;
        brandMember.verifyingEmail = email;

        await this.brandService.saveBrandMember(brandMember);

        await this.mailService.sendMail({
          to: email,
          subject: `Join ${brand.name} on Me Protocol`,
          text: `Join ${brand.name} on Me Protocol`,
          html: `
            <p>Hello ${name},</p>
            <p>${
              brand.name
            } has invited you to join their brand on Me Protocol. Click the link below to verify your email address and join the brand.</p>
            
            ${emailButton({
              text: 'Accept Invitation',
              url: `${process.env.SERVER_URL}/brand/member/join/${user.email}/${brandId}`,
            })}
          `,
        });

        return {
          message: 'Brand member created successfully',
        };
      }

      const newUser = new User();
      newUser.email = email?.toLowerCase();
      newUser.username = email.split('@')[0].toLowerCase();
      newUser.twoFAType = TwoFAType.EMAIL;
      newUser.role = Role.BRAND_MEMBER;

      const password = Math.random().toString(36).slice(-8);

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const code = Math.floor(1000 + Math.random() * 9000);

      newUser.password = hashedPassword;
      newUser.salt = salt;
      newUser.userType = UserAppType.BRAND_MEMBER;
      newUser.accountVerificationCode = code;

      const saveUser = await this.userService.saveUser(newUser);

      await this.customerService.create({
        name,
        userId: saveUser.id,
        walletAddress: '',
      });

      const brandMember = new BrandMember();
      brandMember.brandId = brandId;
      brandMember.name = name;
      brandMember.role = role;
      brandMember.verifyingEmail = email;

      await this.brandService.saveBrandMember(brandMember);

      await this.mailService.sendMail({
        to: email,
        subject: 'Verify your email address',
        text: 'Verify your email address',
        html: `
        <p>Hello ${name},</p>
        <p>${
          brand.name
        } has invited you to join their brand on Me Protocol. Click the link below to verify your email address and join the brand.</p>
        <p>
          Login Details:<br/>
          Email: ${email}<br/>
          Password: ${password}
        </p>
        ${emailButton({
          text: 'Verify Email',
          url: `${process.env.SERVER_URL}/brand/member/verify-email/${code}/${brandId}`,
        })}
        `,
      });

      return {
        message: 'Brand member created successfully',
      };
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async verifyBrandMemberEmail(code: number, brandId: string) {
    try {
      const user = await this.userService.getUserByVerificationCode(code);

      if (!user) {
        throw new HttpException('User not found', 404);
      }

      user.accountVerificationCode = null;
      user.emailVerified = true;

      await this.userService.saveUser(user);

      const brandMember = await this.brandService.getBrandMemberByUserEmail(
        user.email,
        brandId,
      );

      brandMember.userId = user.id;
      brandMember.isAccepted = true;

      await this.brandService.saveBrandMember(brandMember);

      return user;
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async verifyBrandMemberExistingUser(email: string, brandId: string) {
    try {
      const user = await this.userService.getUserByEmail(email);

      if (!user) {
        throw new HttpException('User not found', 404);
      }

      user.accountVerificationCode = null;
      user.emailVerified = true;

      await this.userService.saveUser(user);

      const brandMember = await this.brandService.getBrandMemberByUserEmail(
        email,
        brandId,
      );

      if (!brandMember) {
        throw new HttpException('Brand member not found', 404);
      }

      brandMember.userId = user.id;
      brandMember.isAccepted = true;

      await this.brandService.saveBrandMember(brandMember);

      return user;
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async getActivelySpendingBrandCustomers(
    brandId: string,
    page: number,
    limit: number,
  ) {
    try {
      return await this.brandService.getActivelySpendingBrandCustomers(
        brandId,
        page,
        limit,
      );
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async getCustomers(query: FilterCustomerDto) {
    try {
      return await this.brandService.getBrandCustomers(
        query.brandId,
        query.page,
        query.limit,
        query.filterBy,
        query.order,
        query.isOnboarded,
        query.sort,
        query.search,
      );
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async deleteBrandCustomer(brandId: string, brandCustomerId: string) {
    return await this.brandService.deleteBrandCustomer(
      brandId,
      brandCustomerId,
    );
  }

  async onboardBrandToProtocol({
    brandId,
    website,
    walletAddress,
  }: {
    brandId: string;
    website: string;
    walletAddress: string;
  }) {
    try {
      const brand = await this.brandService.getBrandById(brandId);

      const { onboardWallet } = await this.settingsService.settingsInit();
      const provider = new ethers.providers.JsonRpcProvider(JSON_RPC_URL);
      const wallet = new ethers.Wallet(onboardWallet, provider);

      let ts2: any;

      try {
        ts2 = await adminService.registerBrand(
          brand.name,
          website,
          walletAddress,
          getBrandIdHex(BigNumber.from(brand.brandProtocolId)),
        );
      } catch (error) {
        throw Error(error.message ?? 'Error onboarding to protocol');
      }

      if (!ts2?.data) {
        throw Error('Error onboarding to protocol');
      }

      const relay = new GelatoRelay();

      const input = {
        data: ts2?.data,
        from: wallet.address,
        to: OPEN_REWARD_DIAMOND,
      };

      const request: CallWithERC2771Request = {
        chainId: CHAIN_ID,
        target: OPEN_REWARD_DIAMOND,
        data: input.data,
        user: input.from,
      };

      // const register_tx = await wallet.sendTransaction({
      //   to: OPEN_REWARD_DIAMOND,
      //   data: input.data,
      // });

      // console.log('register_tx', register_tx);

      const { struct, signature } = await relay.getSignatureDataERC2771(
        request,
        wallet,
        ERC2771Type.SponsoredCall,
      );

      const data = {
        data: struct,
        narration: '1',
        signature,
        brandId: brandId,
        tnxType: PaymentRequestTnxType.RELAYER,
        network: supportedNetworks.MUMBAI,
      };

      const paymentRequest =
        await this.costModuleManagementService.createPaymentRequest(
          data,
          PaymentOrigin.IN_APP,
          true,
        );

      return paymentRequest;
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async onboardBrandToRuntime({
    brandId,
    walletAddress,
  }: {
    brandId: string;
    walletAddress: string;
  }) {
    try {
      const brand = await this.brandService.getBrandById(brandId);

      const { onboardWallet } = await this.settingsService.settingsInit();
      const provider = new ethers.providers.JsonRpcProvider(JSON_RPC_URL);
      const wallet = new ethers.Wallet(onboardWallet, provider);

      const brandProtocolId = getBrandIdHex(
        BigNumber.from(brand.brandProtocolId),
      );

      const onboardBrand = await onboard_brand_with_url(
        BigNumber.from(brandProtocolId),
        walletAddress,
        ethers.constants.AddressZero,
        wallet,
        RUNTIME_URL,
      );

      if (onboardBrand.data.error) {
        throw new Error(onboardBrand.data.error.message);
      }
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async onboardBrand({ brandId, walletAddress, website }: OnboardBrandDto) {
    try {
      const brand = await this.brandService.getBrandById(brandId);

      if (brand.isOnboarded && brand.walletAddress) {
        throw new HttpException('Brand already onboarded', 400);
      }

      // const onboardProtocol = await this.onboardBrandToProtocol({
      //   brandId,
      //   website,
      //   walletAddress,
      // });
      // await this.onboardBrandToRuntime({ brandId, walletAddress });

      brand.walletAddress = walletAddress;
      brand.isOnboarded = true;

      await this.brandService.save(brand);

      return true;
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async removeBrandMember(brandId: string, brandMemberId: string) {
    try {
      const brandMember = await this.brandService.getBrandMember(
        brandId,
        brandMemberId,
      );

      if (!brandMember) {
        throw new HttpException('Brand member not found', 404);
      }

      await this.brandService.removeBrandMember(brandMember);

      return {
        message: 'Brand member removed successfully',
      };
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async batchCreateBrandCustomers(body: CreateCustomerDto[]) {
    const totalUsers = body.length;
    let usersProcessed = 0;
    for (const customer of body) {
      try {
        await this.brandService
          .createBrandCustomer({
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            brandId: customer.brandId,
          })
          .then(() => {
            usersProcessed++;
            const progress = (usersProcessed / totalUsers) * 100;
            this.BrandUploadGateway.sendProgress(customer.brandId, progress);
          });
      } catch (error) {
        this.BrandUploadGateway.sendFailure(customer.brandId, error.message);
      }
    }
  }

  async createBrandCustomer(body: CreateCustomerDto) {
    return await this.brandService.createBrandCustomer({
      name: body.name,
      email: body.email,
      phone: body.phone,
      brandId: body.brandId,
    });
  }

  async getAllBrandsForAdmin(query: FilterBrandDto, userId: string) {
    try {
      const brands = await this.brandService.getAllBrandsForAdmin(query);

      // TODO No need
      // const auditTrailEntry = {
      //   userId: userId,
      //   auditType: 'GET_ALL_BRANDS_FOR_ADMIN',
      //   description: `User ${userId} retrieved all brands for admin with query parameters: ${JSON.stringify(
      //     query,
      //   )}.`,
      //   reportableId: '',
      // };

      // await this.auditTrailService.createAuditTrail(auditTrailEntry);

      return brands;
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async disableBrand(brandId: string) {
    try {
      const brand = await this.brandService.getBrandById(brandId);

      if (!brand) {
        throw new HttpException('Brand not found', 404);
      }

      brand.disabled = true;

      return await this.brandService.save(brand);
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async createCampaign({
    totalUsers,
    rewardPerUser,
    type,
    brandId,
    rewardId,
    name,
    description,
    end_date,
  }: CreateCampaignDto) {
    try {
      const activeCampaign = await this.campaignService.getActiveCampaign(
        brandId,
      );

      if (activeCampaign) {
        throw new Error('Brand already has an active campaign');
      }

      const pendingCampaign = await this.campaignService.getPendingCampaign(
        brandId,
      );

      if (pendingCampaign) {
        throw new Error('Brand already has a pending campaign');
      }

      const reward = await this.rewardService.getRewardByIdAndBrandId(
        rewardId,
        brandId,
      );

      if (!reward) {
        throw new Error('Reward not found');
      }

      // Create campaign wallet if it doesn't exist
      if (!reward.campaignKeyIdentifierId) {
        const { pubKey, privKey } = generateWalletRandom();

        // Encrypt private key
        const campaignEncryptedKey = await this.keyManagementService.encryptKey(
          privKey,
        );

        // Create key identifier
        const campaignKeyIdentifier = new KeyIdentifier();
        campaignKeyIdentifier.identifier = campaignEncryptedKey;
        campaignKeyIdentifier.identifierType = KeyIdentifierType.REDISTRIBUTION;

        const newCampaignKeyIdentifier =
          await this.keyManagementService.createKeyIdentifer(
            campaignKeyIdentifier,
          );

        reward.campaignPublicKey = pubKey;
        reward.campaignKeyIdentifierId = newCampaignKeyIdentifier.id;

        await this.rewardService.save(reward);
      }

      const totalRewardToDistribute = totalUsers * rewardPerUser;

      const campaign = new Campaign();
      campaign.type = type;
      campaign.totalUsers = totalUsers;
      campaign.rewardPerUser = rewardPerUser;
      campaign.brandId = brandId;
      campaign.availableUsers = totalUsers;
      campaign.status = CampaignStatus.PENDING;
      campaign.availableRewards = totalRewardToDistribute;
      campaign.rewardId = reward.id;
      campaign.name = name;
      campaign.description = description;
      campaign.end_date = end_date;

      const newCampaign = await this.campaignService.save(campaign);

      const campaignWalletBalance = await get_user_reward_balance_with_url(
        {
          address: reward.campaignPublicKey,
          reward_address: reward.contractAddress,
        },
        RUNTIME_URL,
      );

      if (!campaignWalletBalance.data?.result) {
        throw new Error('Error fetching campaign wallet balance');
      }

      const formattedBalance = ethers.utils.formatEther(
        campaignWalletBalance.data.result,
      );
      const balance = Number(formattedBalance);

      if (balance < totalRewardToDistribute) {
        return {
          amount: totalRewardToDistribute - balance,
          walletAddress: reward.campaignPublicKey,
          balance,
          id: newCampaign.id,
        };
      }

      newCampaign.status = CampaignStatus.ACTIVE;
      return await this.campaignService.save(campaign);
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async fundAndActivateCampaign({
    brandId,
    campaignId,
    params,
  }: {
    brandId: string;
    campaignId: string;
    params: SendTransactionData;
  }) {
    try {
      const campaign = await this.campaignService.findByIdAndBrandId(
        campaignId,
        brandId,
      );

      if (!campaign) {
        throw new Error('Campaign is not found');
      }

      const reward = await this.rewardService.getRewardByIdAndBrandId(
        campaign.rewardId,
        brandId,
      );

      if (!reward) {
        throw new Error('Reward is not found');
      }

      await this.syncService.pushTransactionToRuntime(params);

      const amountToFund = campaign.totalUsers * campaign.rewardPerUser;

      const campaignWalletBalance = await get_user_reward_balance_with_url(
        {
          address: reward.campaignPublicKey,
          reward_address: reward.contractAddress,
        },
        RUNTIME_URL,
      );

      if (!campaignWalletBalance.data?.result) {
        throw new Error('Error fetching campaign wallet balance');
      }

      const formattedBalance = ethers.utils.formatEther(
        campaignWalletBalance.data.result,
      );
      const balance = Number(formattedBalance);

      if (balance < amountToFund) {
        throw new Error('Insufficient funds in campaign wallet');
      }

      campaign.status = CampaignStatus.ACTIVE;

      return await this.campaignService.save(campaign);
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async updateCampaign({
    totalUsers,
    rewardPerUser,
    brandId,
    id,
    name,
    description,
    end_date,
  }: UpdateCampaignDto) {
    try {
      const campaign = await this.campaignService.findByIdAndBrandId(
        id,
        brandId,
      );

      if (!campaign) {
        throw new Error('Campaign is not found');
      }

      const reward = await this.rewardService.getRewardByIdAndBrandId(
        campaign.rewardId,
        brandId,
      );

      if (!reward) {
        throw new Error('Reward is not found');
      }

      campaign.isUpdating = true;
      await this.campaignService.save(campaign);

      const newTotaUser = totalUsers ? totalUsers : campaign.totalUsers;
      const newRewardPeruser = rewardPerUser
        ? rewardPerUser
        : campaign.rewardPerUser;
      const oldTotalRewardToDistribute =
        campaign.totalUsers * campaign.rewardPerUser;
      let newTotalRewardToDistribute = 0;

      if (
        newTotaUser !== campaign.totalUsers ||
        newRewardPeruser !== campaign.rewardPerUser
      ) {
        newTotalRewardToDistribute = newTotaUser * newRewardPeruser;
      }

      const campaignWalletBalance = await get_user_reward_balance_with_url(
        {
          address: reward.campaignPublicKey,
          reward_address: reward.contractAddress,
        },
        RUNTIME_URL,
      );

      if (!campaignWalletBalance.data?.result) {
        throw new Error('Error fetching campaign wallet balance');
      }

      const formattedBalance = ethers.utils.formatEther(
        campaignWalletBalance.data.result,
      );
      const balance = Number(formattedBalance);

      if (newTotalRewardToDistribute > oldTotalRewardToDistribute) {
        const checkBalanceDifference =
          newTotalRewardToDistribute - oldTotalRewardToDistribute;

        if (balance < checkBalanceDifference + campaign.availableRewards) {
          return {
            amount:
              checkBalanceDifference + campaign.availableRewards - balance,
            walletAddress: reward.campaignPublicKey,
            balance,
          };
        }

        campaign.availableRewards =
          checkBalanceDifference + campaign.availableRewards;
      }

      if (newTotaUser !== campaign.totalUsers) {
        const userDifference = newTotaUser - campaign.totalUsers;

        if (userDifference > 0) {
          campaign.availableUsers = campaign.availableUsers + userDifference;
        } else if (userDifference < 0) {
          if (campaign.availableUsers < Math.abs(userDifference)) {
            throw new Error('Cannot reduce total users below available users');
          } else {
            campaign.availableUsers =
              campaign.availableUsers - Math.abs(userDifference);
          }
        }
      }

      if (name) campaign.name = name;
      if (description) campaign.description = description;
      if (end_date) campaign.end_date = end_date;
      if (totalUsers) campaign.totalUsers = totalUsers;
      if (rewardPerUser) campaign.rewardPerUser = rewardPerUser;
      campaign.isUpdating = false;

      await this.bullService.retryCampaignFailedJobs();

      const savedCampaign = await this.campaignService.save(campaign);

      return {
        campaign: savedCampaign,
        balance,
      };
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async endCampaign(brandId: string, id: string) {
    try {
      const campaign = await this.campaignService.findByIdAndBrandId(
        id,
        brandId,
      );

      if (!campaign) {
        throw new Error('Campaign is not found');
      }

      // TODO Refund logic
      campaign.status = CampaignStatus.ENDED;

      return await this.campaignService.save(campaign);
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async getCampaigns(brandId: string, status: CampaignStatus) {
    try {
      return await this.campaignService.findByBrandId(brandId, status);
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async checkCampaigns() {
    const campaigns = await this.campaignService.getAllActiveCampaigns();
    for (const campaign of campaigns) {
      if (campaign.end_date < new Date()) {
        campaign.status = CampaignStatus.ENDED;
        await this.campaignService.save(campaign);
      }
    }
  }
}
