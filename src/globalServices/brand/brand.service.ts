/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { FindOptionsOrderValue, In, Repository } from 'typeorm';
import { ElasticIndex } from '@src/modules/search/index/search.index';
import { brandIndex } from '@src/modules/search/interface/search.interface';
import { UpdateBrandDto } from '@src/modules/accountManagement/brandAccountManagement/dto/UpdateBrandDto.dto';
import { getSlug } from '@src/utils/helpers/getSlug';
import { BrandMember } from './entities/brand_member.entity';
import { BrandRole } from '@src/utils/enums/BrandRole';
import { BrandCustomer } from './entities/brand_customer.entity';
import { FilterBrandCustomer } from '@src/utils/enums/FilterBrandCustomer';
import { generateBrandIdBytes10 } from '@developeruche/protocol-core';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ProcessBrandColorEvent } from './events/process-brand-color.event';
import { SyncIdentifierType } from '@src/utils/enums/SyncIdentifierType';
import { BrandSubscriptionPlan } from './entities/brand_subscription_plan.entity';
import { BillerService } from '../biller/biller.service';
import { PaymentService } from '../fiatWallet/payment.service';
import { FiatWallet } from '../fiatWallet/entities/fiatWallet.entity';
import { UserAppType } from '@src/utils/enums/UserAppType';
import { User } from '@src/globalServices/user/entities/user.entity';
import { TopupEventBlock } from './entities/topup_event_block.entity';
import { isEmail } from 'class-validator';
import { RewardService } from '../reward/reward.service';
import {
  StatusType,
  TransactionSource,
  TransactionsType,
} from '@src/utils/enums/Transactions';
import { PaymentMethodEnum } from '@src/utils/enums/PaymentMethodEnum';
import { FiatWalletService } from '../fiatWallet/fiatWallet.service';
import { Transaction } from '../fiatWallet/entities/transaction.entity';
import { logger } from '../logger/logger.service';
import { Role } from '@src/utils/enums/Role';
import { CurrencyService } from '../currency/currency.service';
import { OrderService } from '../order/order.service';
import { OnlineStoreType } from '@src/utils/enums/OnlineStoreType';
import { checkBrandOnlineStore } from '../online-store-handler/check-store';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepo: Repository<Brand>,
    @InjectRepository(BrandMember)
    private readonly brandMemberRepo: Repository<BrandMember>,
    @InjectRepository(BrandCustomer)
    private readonly brandCustomerRepo: Repository<BrandCustomer>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(TopupEventBlock)
    private readonly topupEventBlock: Repository<TopupEventBlock>,
    @InjectRepository(BrandSubscriptionPlan)
    private readonly brandSubscriptionPlanRepo: Repository<BrandSubscriptionPlan>,
    private readonly elasticIndex: ElasticIndex,
    private readonly eventEmitter: EventEmitter2,
    private readonly billerService: BillerService,
    private readonly paymentService: PaymentService,
    private readonly currencyService: CurrencyService,
    private readonly ordersService: OrderService,

    @InjectRepository(FiatWallet)
    private readonly walletRepo: Repository<FiatWallet>,

    @Inject(forwardRef(() => RewardService))
    private readonly rewardService: RewardService,

    private readonly walletService: FiatWalletService,
  ) {}

  async create({ userId, name }: { userId: string; name: string }) {
    const slug = getSlug(name);

    const brand = this.brandRepo.create({ userId, name, slug });

    this.elasticIndex.insertDocument(brand, brandIndex);

    const saveBrand = await this.brandRepo.save(brand);

    const brandMember = new BrandMember();
    brandMember.brandId = saveBrand.id;
    brandMember.name = saveBrand.name;
    brandMember.role = BrandRole.OWNER;
    brandMember.userId = userId;
    brandMember.isAccepted = true;

    await this.brandMemberRepo.save(brandMember);

    // Generate brand id on protocol
    const brandId = generateBrandIdBytes10(saveBrand.id);
    saveBrand.brandProtocolId = brandId.toString();

    return await this.brandRepo.save(saveBrand);
  }

  async getBrandOwner(brandId: string) {
    return await this.brandMemberRepo.findOne({
      where: {
        brandId,
        role: BrandRole.OWNER,
      },
      relations: ['user'],
    });
  }

  save(brand: Brand) {
    return this.brandRepo.save(brand);
  }

  /**
   * Updates a brand with the provided data.
   * @param dto - The data to update the brand.
   * @param brandId - The ID of the brand to update.
   * @returns The updated brand.
   * @throws {NotFoundException} If the brand with the specified ID is not found.
   * @throws {HttpException} If there is an error during the update process.
   */
  async update(dto: UpdateBrandDto, brandId: string) {
    try {
      if (dto.name) {
        dto.slug = dto.name.toLowerCase().replace(/\s/g, '-');

        const checkSlug = await this.brandRepo.findOneBy({ slug: dto.slug });
        if (checkSlug) {
          throw new Error('Name/Slug already exists');
        }
      }

      const brand = await this.brandRepo.findOneBy({ id: brandId });

      if (!brand) {
        throw new NotFoundException('Brand not found');
      }

      if (dto.regions) {
        const regions = [];

        for (const region of dto.regions) {
          const checkRegion = await this.currencyService.getRegionById(region);
          if (checkRegion) {
            regions.push(checkRegion);
          }
        }

        brand.regions = regions;
      }

      if (dto.name) brand.name = dto.name;
      if (dto.website) brand.website = dto.website;
      if (dto.location) brand.location = dto.location;
      if (dto.categoryId) brand.categoryId = dto.categoryId;
      if (dto.revenueRange) brand.revenueRange = dto.revenueRange;
      if (dto.vatTaxId) brand.vatTaxId = dto.vatTaxId;

      if (dto.ecommercePlatform)
        brand.ecommercePlatform = dto.ecommercePlatform;
      if (dto.loyaltyProgram) brand.loyaltyProgram = dto.loyaltyProgram;
      if (dto.slogan) brand.slogan = dto.slogan;
      if (dto.socialMediaLinks) brand.socialMediaLinks = dto.socialMediaLinks;
      if (dto.logo_icon) brand.logo_icon = dto.logo_icon;
      if (dto.description) brand.description = dto.description;
      if (dto.logo_white) brand.logo_white = dto.logo_white;
      if (dto.logo_white_icon) brand.logo_white_icon = dto.logo_white_icon;
      if (dto.logo) brand.logo = dto.logo;
      if (dto.banners) brand.banners = dto.banners;

      if (dto.supportPhoneNumber)
        brand.supportPhoneNumber = dto.supportPhoneNumber;
      if (dto.listOnStore !== null || dto.listOnStore !== undefined)
        brand.listOnStore = dto.listOnStore;
      if (dto.vaultPercentage) brand.vaultPercentage = dto.vaultPercentage;
      if (dto.noOfCustomers) brand.noOfCustomers = dto.noOfCustomers;

      if (dto.currency) brand.currency = dto.currency;
      if (dto.countryCode) brand.countryCode = dto.countryCode;
      if (dto.country) brand.country = dto.country;
      if (dto.region) brand.region = dto.region;
      if (dto.additionalAddress)
        brand.additionalAddress = dto.additionalAddress;
      if (dto.city) brand.city = dto.city;
      if (dto.postalCode) brand.postalCode = dto.postalCode;
      if (dto.firstTimeLogin)
        brand.firstTimeLogin = dto.firstTimeLogin === 'true' ? true : false;
      if (dto.brandStore) brand.brandStore = dto.brandStore;
      if (dto.onlineStoreType) brand.online_store_type = dto.onlineStoreType;
      if (dto.woocommerceConsumerKey)
        brand.woocommerce_consumer_key = dto.woocommerceConsumerKey;
      if (dto.woocommerceConsumerSecret)
        brand.woocommerce_consumer_secret = dto.woocommerceConsumerSecret;

      if (dto.online_store_url) {
        if (brand.online_store_type === OnlineStoreType.SHOPIFY) {
          brand.shopify_online_store_url = dto.online_store_url;
        } else if (brand.online_store_type === OnlineStoreType.WOOCOMMERCE) {
          brand.woocommerce_online_store_url = dto.online_store_url;
        }
      }
      if (dto.shopify_consumer_key)
        brand.shopify_consumer_key = dto.shopify_consumer_key;

      if (dto.shopify_consumer_secret)
        brand.shopify_consumer_secret = dto.shopify_consumer_secret;

      if (
        dto.onlineStoreType === OnlineStoreType.WOOCOMMERCE &&
        (dto.woocommerceConsumerKey ||
          dto.woocommerceConsumerSecret ||
          dto.online_store_url)
      ) {
        await checkBrandOnlineStore({
          // @ts-ignore
          brand: {
            woocommerce_consumer_key: dto.woocommerceConsumerKey,
            woocommerce_consumer_secret: dto.woocommerceConsumerSecret,
            woocommerce_online_store_url: dto.online_store_url,
            online_store_type: dto.onlineStoreType,
          },
        });
      }

      if (
        dto.onlineStoreType === OnlineStoreType.SHOPIFY &&
        (dto.shopify_consumer_secret || dto.online_store_url)
      ) {
        if (!dto.online_store_url.includes('myshopify.com')) {
          throw new HttpException(
            'Invalid shopify store url',
            HttpStatus.BAD_REQUEST,
          );
        }
        await checkBrandOnlineStore({
          // @ts-ignore
          brand: {
            shopify_consumer_secret: dto.shopify_consumer_secret,
            shopify_consumer_key: dto.shopify_consumer_key,
            shopify_online_store_url: dto.online_store_url,
            online_store_type: dto.onlineStoreType,
          },
        });
      }

      // await this.brandRepo.update({ id: brandId }, brand);
      const newBrand = await this.brandRepo.save(brand);
      this.elasticIndex.updateDocument(newBrand, brandIndex);

      const brandProcessColorEvent = new ProcessBrandColorEvent();
      brandProcessColorEvent.brandId = brandId;
      brandProcessColorEvent.url =
        newBrand.logo || newBrand.logo_white || newBrand.logo_icon;
      this.eventEmitter.emit('process.brand.color', brandProcessColorEvent);

      return newBrand;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  getBrandById(id: string) {
    return this.brandRepo.findOne({
      where: {
        id,
      },
      relations: ['category'],
    });
  }

  getBrandByUserId(userId: string) {
    return this.brandRepo.findOneBy({ userId });
  }

  async getAllBrands() {
    return this.brandRepo.find();
  }

  async getSubscribedBrands() {
    return this.brandRepo.find({
      where: {
        isPlanActive: true,
      },
    });
  }

  async getAllFilteredBrands({
    categoryId,
    page,
    limit,
    order,
    search,
    regionId,
  }: {
    categoryId: string;
    page: number;
    limit: number;
    order: string;
    search: string;
    regionId: string;
  }) {
    const brandQuery = this.brandRepo
      .createQueryBuilder('brand')
      .leftJoinAndSelect('brand.category', 'category')
      .leftJoinAndSelect('brand.regions', 'regions');

    const defaultRegion = await this.currencyService.getDefaultRegion();

    if (regionId) {
      console.log(regionId);
      // where brand regions contains regionId or contains the default region
      brandQuery
        .where('regions.id = :regionId', { regionId })
        .orWhere('regions.id = :defaultRegion', {
          defaultRegion: defaultRegion.id,
        });

      if (order) {
        const formatedOrder = order.split(':')[0];
        const acceptedOrder = ['name', 'createdAt', 'updatedAt'];

        if (!acceptedOrder.includes(formatedOrder)) {
          throw new Error('Invalid order param');
        }

        brandQuery.orderBy(
          `brand.${order.split(':')[0]}`,
          order.split(':')[1] === 'ASC' ? 'ASC' : 'DESC',
        );
      }

      if (search) {
        brandQuery.andWhere('brand.name ILIKE :search', {
          search: `%${search}%`,
        });
      }

      if (categoryId) {
        brandQuery.andWhere('brand.categoryId = :categoryId', { categoryId });
      }

      brandQuery.andWhere('brand.listOnStore = :listOnStore', {
        listOnStore: true,
      });

      brandQuery.andWhere('brand.disabled = :disabled', {
        disabled: false,
      });
    } else {
      // regions is empty
      // brandQuery.where('regions.id IS NULL');

      if (order) {
        const formatedOrder = order.split(':')[0];
        const acceptedOrder = ['name', 'createdAt', 'updatedAt'];

        if (!acceptedOrder.includes(formatedOrder)) {
          throw new Error('Invalid order param');
        }

        brandQuery.orderBy(
          `brand.${order.split(':')[0]}`,
          order.split(':')[1] === 'ASC' ? 'ASC' : 'DESC',
        );
      }

      if (search) {
        brandQuery.andWhere('brand.name ILIKE :search', {
          search: `%${search}%`,
        });
      }

      if (categoryId) {
        brandQuery.andWhere('brand.categoryId = :categoryId', { categoryId });
      }

      brandQuery.andWhere('brand.listOnStore = :listOnStore', {
        listOnStore: true,
      });

      brandQuery.andWhere('brand.disabled = :disabled', {
        disabled: false,
      });

      // where brand regions is not empty
      brandQuery.andWhere('regions.id IS NOT NULL');
    }

    brandQuery.skip((page - 1) * limit).take(limit);
    const brands = await brandQuery.getMany();
    const total = await brandQuery.getCount();

    return {
      brands,
      total,
      nextPage: total > page * limit ? Number(page) + 1 : null,
      previousPage: page > 1 ? Number(page) - 1 : null,
    };
  }

  getBrandByName(name: string) {
    return this.brandRepo.findOneBy({ name });
  }

  async saveBrandMember(brandMember: BrandMember) {
    return await this.brandMemberRepo.save(brandMember);
  }

  async getBrandMember(brandId: string, id: string) {
    return await this.brandMemberRepo.findOne({
      where: {
        brandId,
        id,
      },
    });
  }

  async getActiveBrandCustomers(
    brandId: string,
  ): Promise<{ emailUsers: User[]; phoneUsers: User[] }> {
    const whereCondition: any = {
      brandId,
      identifierType: In([SyncIdentifierType.EMAIL, SyncIdentifierType.PHONE]),
    };

    const brandCustomers = await this.brandCustomerRepo.find({
      where: whereCondition,
      relations: ['brand'],
    });

    const identifiersByType: Record<SyncIdentifierType, string[]> = {
      [SyncIdentifierType.EMAIL]: [],
      [SyncIdentifierType.PHONE]: [],
    };

    for (const brandCustomer of brandCustomers) {
      if (brandCustomer.identifierType && brandCustomer.identifier) {
        identifiersByType[brandCustomer.identifierType].push(
          brandCustomer.identifier,
        );
      }
    }

    const emailUsers: User[] = [];
    const phoneUsers: User[] = [];

    for (const identifierType in identifiersByType) {
      if (identifiersByType[identifierType].length > 0) {
        const usersOfType = await this.userRepo.find({
          where: {
            [identifierType]: In(identifiersByType[identifierType]),
            userType: UserAppType.USER,
          },
        });

        if (identifierType === SyncIdentifierType.EMAIL) {
          emailUsers.push(...usersOfType);
        } else if (identifierType === SyncIdentifierType.PHONE) {
          phoneUsers.push(...usersOfType);
        }
      }
    }

    return { emailUsers, phoneUsers };
  }

  async getActiveBrandCustomer(
    brandId: string,
    identifier: string,
    identifierType: SyncIdentifierType,
  ): Promise<User | null> {
    const whereCondition: any = {
      brandId,
      identifierType,
      identifier,
    };

    const brandCustomer = await this.brandCustomerRepo.findOne({
      where: whereCondition,
      relations: ['brand'],
    });

    if (!brandCustomer) {
      return null;
    }

    const user = await this.userRepo.findOne({
      where: {
        [identifierType]: identifier,
        userType: UserAppType.USER,
      },
    });

    return user || null;
  }

  async createBrandCustomer({
    email,
    name,
    phone,
    brandId,
  }: {
    brandId: string;
    name?: string;
    email: string;
    phone?: string;
  }) {
    email = email ? email.toLowerCase() : email;

    const identifier = isEmail(email) ? email : phone;
    const identifierType = isEmail(email)
      ? SyncIdentifierType.EMAIL
      : SyncIdentifierType.PHONE;

    const checkCustomer = await this.brandCustomerRepo.findOne({
      where: {
        brandId,
        identifier,
        identifierType,
      },
      relations: ['brand', 'user', 'user.customer'],
    });

    if (checkCustomer) {
      return checkCustomer;
    }

    const brandCustomer = new BrandCustomer();
    brandCustomer.brandId = brandId;
    brandCustomer.identifier = identifier?.toLowerCase();
    brandCustomer.identifierType = identifierType;
    brandCustomer.phone = phone;
    brandCustomer.email = email.toLowerCase();
    brandCustomer.name = name;

    await this.brandCustomerRepo.save(brandCustomer);

    return await this.brandCustomerRepo.findOne({
      where: {
        brandId,
        email,
      },
      relations: ['brand'],
    });
  }

  async saveBrandCustomer(brandCustomer: BrandCustomer) {
    return await this.brandCustomerRepo.save(brandCustomer);
  }

  async deleteBrandCustomer(brandId: string, brandCustomerId: string) {
    try {
      const customer = await this.brandCustomerRepo.findOne({
        where: {
          id: brandCustomerId,
          brandId: brandId,
        },
      });

      if (customer) {
        await this.brandCustomerRepo.remove(customer);
        return { deleted: true };
      } else {
        throw new HttpException(
          `Customer does not exist on brand`,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async getBrandCustomer(brandId: string, userId: string) {
    const customer = await this.brandCustomerRepo.findOne({
      where: {
        brandId,
        userId,
      },
      relations: ['brand'],
    });

    if (!customer) {
      const user = await this.userRepo.findOne({
        where: {
          id: userId,
        },
      });

      return await this.createBrandCustomer({
        email: user?.email,
        name: user?.customer?.name,
        phone: user?.phone,
        brandId,
      });
    }

    return customer;
  }

  async getBrandCustomersByEmailAddress(email: string) {
    return await this.brandCustomerRepo.find({
      where: {
        email,
      },
      relations: ['brand'],
    });
  }

  async getBrandCustomerByEmailAddress(email: string, brandId: string) {
    return await this.brandCustomerRepo.findOne({
      where: {
        email,
        brandId,
      },
      relations: ['brand'],
    });
  }

  async getBrandCustomerByIdentifier({
    identifier,
    identifierType,
    brandId,
  }: {
    identifier: string;
    brandId: string;
    identifierType: SyncIdentifierType;
  }) {
    const customer = await this.brandCustomerRepo.findOne({
      where: {
        brandId,
        identifier,
        identifierType,
      },
    });

    if (customer) {
      return customer;
    }

    return await this.createBrandCustomer({
      email: identifier,
      brandId,
    });
  }

  async getBrandCustomerByUserId(userId: string) {
    return await this.brandCustomerRepo.findOne({
      where: {
        userId,
      },
      relations: ['brand'],
    });
  }

  async getActivelySpendingBrandCustomers(
    brandId: string,
    page: number,
    limit: number,
  ) {
    const activeCustomers: Array<BrandCustomer> = [];
    // Get all brandCustomers that have redemption greater than 0
    const brandCustomersQuery = await this.brandCustomerRepo
      .createQueryBuilder('brandCustomer')
      .leftJoinAndSelect('brandCustomer.brand', 'brand')
      .leftJoinAndSelect('brandCustomer.user', 'user')
      .leftJoinAndSelect('brand.rewards', 'rewards')
      .where('brandCustomer.brandId = :brandId', { brandId });

    const eligibleBrandCustomers = await brandCustomersQuery.getMany();

    for (const customer of eligibleBrandCustomers) {
      const user = customer.user;
      let totalRedemptionAmount = 0;
      // Check if each customer has order in the last 30 days
      if (user) {
        const { orders } = await this.ordersService.getOrders({
          userId: user.id,
          page: page,
          limit: limit,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          startDate: new Date(
            Date.now() - 24 * 60 * 60 * 1000 * 30,
          ).toISOString(),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          endDate: new Date().toISOString(),
        });

        orders.forEach((order) => {
          const isUsingBrandReward = !!customer.brand.rewards.find(
            (i) => i.id === order?.offer?.reward?.id,
          );
          console.log('brandRewardUsed', order?.offer?.reward);
          if (order.status === StatusType.SUCCEDDED && isUsingBrandReward)
            totalRedemptionAmount += Number(order?.points || 0);
        });

        if (totalRedemptionAmount > 0) {
          activeCustomers.push(customer);
        }
      }
    }

    activeCustomers.sort(
      (a, b) => b.totalRedemptionAmount - a.totalRedemptionAmount,
    );

    // Calculate pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedData = activeCustomers.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      total: activeCustomers.length,
      nextPage: endIndex < activeCustomers.length ? Number(page) + 1 : null,
      previousPage: Number(page) > 1 ? Number(page) - 1 : null,
    };
  }

  async getBrandCustomers(
    brandId: string,
    page: number,
    limit: number,
    filterBy: FilterBrandCustomer,
    order: string,
    isOnboarded: boolean,
    sort?: {
      createdAt: FindOptionsOrderValue;
    },
    search?: string,
  ) {
    const brandCustomerQuery = this.brandCustomerRepo
      .createQueryBuilder('brandCustomer')
      .leftJoinAndSelect('brandCustomer.brand', 'brand');

    brandCustomerQuery.where('brandCustomer.brandId = :brandId', { brandId });
    brandCustomerQuery.orderBy('brandCustomer.identifier', 'ASC');

    if (filterBy === FilterBrandCustomer.MOST_ACTIVE) {
      // where customer redeemed greater than 2
      // brandCustomerQuery.andWhere('brandCustomer.totalRedeemed > 2');
      brandCustomerQuery.andWhere('brandCustomer.totalRedeemed > 2');
    }

    if (filterBy === FilterBrandCustomer.MOST_RECENT) {
      brandCustomerQuery.orderBy('brandCustomer.createdAt', 'DESC');
    }

    if (sort) {
      if (sort.createdAt === 'ASC') {
        brandCustomerQuery.orderBy('brandCustomer.createdAt', 'ASC');
      } else if (sort.createdAt === 'DESC') {
        brandCustomerQuery.orderBy('brandCustomer.createdAt', 'DESC');
      }
    }

    if (search) {
      brandCustomerQuery.andWhere(
        '(brandCustomer.name ILIKE :search OR brandCustomer.email ILIKE :search OR brandCustomer.phone ILIKE :search)',
        {
          search: `%${search}%`,
        },
      );
    }

    if (isOnboarded) {
      brandCustomerQuery.andWhere('brandCustomer.isOnboarded = :isOnboarded', {
        isOnboarded,
      });
    }

    if (order) {
      let formatedOrder = order.split(':')[0];
      const acceptedOrder = [
        'totalRedeemed',
        'totalRedemptionAmount',
        'totalExternalRedeemed',
        'totalExternalRedemptionAmount',
        'totalIssued',
        'status',
      ];

      if (!acceptedOrder.includes(formatedOrder)) {
        throw new Error('Invalid order param');
      }

      if (formatedOrder === 'status') {
        formatedOrder = 'isOnboarded';
      }

      brandCustomerQuery.orderBy(
        `brandCustomer.${formatedOrder}`,
        order.split(':')[1] === 'ASC' ? 'ASC' : 'DESC',
      );
    }

    brandCustomerQuery.skip((page - 1) * limit).take(limit);
    const brandCustomers = await brandCustomerQuery.getMany();
    const total = await brandCustomerQuery.getCount();

    return {
      data: brandCustomers,
      total,
      nextPage: total > page * limit ? Number(page) + 1 : null,
      previousPage: page > 1 ? Number(page) - 1 : null,
    };
  }

  async getBrandMemberByUserEmail(email: string, brandId: string) {
    return await this.brandMemberRepo.findOne({
      where: {
        verifyingEmail: email,
        brandId,
      },
    });
  }

  async getBrandMemberById(id: string) {
    return await this.brandMemberRepo.findOne({
      where: {
        id,
      },
    });
  }

  async getBrandMembers(brandId: string) {
    return await this.brandMemberRepo.find({
      where: {
        brandId,
      },
    });
  }

  async getBrandMemberByUserId(userId: string) {
    return await this.brandMemberRepo.findOne({
      where: {
        userId,
      },
    });
  }

  async getBrandMemberByUserIdAndBrandId(userId: string, brandId: string) {
    return await this.brandMemberRepo.findOne({
      where: {
        userId,
        brandId,
      },
    });
  }

  // @Cron(CronExpression.EVERY_5_MINUTES)
  // async syncElasticSearchIndex() {
  //   const allBrands = await this.brandRepo.find();
  //   this.elasticIndex.batchCreateIndex(allBrands, brandIndex);
  // }

  async removeBrandMember(brandMember: BrandMember) {
    const user = await this.userRepo.findOne({
      where: {
        id: brandMember.userId,
      },
    });

    if (user) {
      user.role = Role.CUSTOMER;

      await this.userRepo.save(user);
    }

    return await this.brandMemberRepo.remove(brandMember);
  }

  async createBrandSubscriptionPlan({
    name,
    amount,
    description,
  }: {
    name: string;
    amount: number;
    description: string;
  }) {
    const plan = new BrandSubscriptionPlan();
    plan.name = name;
    plan.description = description;
    plan.monthlyAmount = amount;

    return await this.brandSubscriptionPlanRepo.save(plan);
  }

  async getBrandSubscriptionPlans() {
    return await this.brandSubscriptionPlanRepo.find();
  }

  async getBrandSubscriptionPlanById(id: string) {
    return await this.brandSubscriptionPlanRepo.findOne({ where: { id } });
  }

  async subscribeBrandToPlan(brandId: string, planId: string) {
    const brand = await this.getBrandById(brandId);

    await this.billerService.getActiveInvoiceOrCreate(brandId);

    brand.planId = planId;
    brand.lastPlanRenewalDate = new Date();
    brand.nextPlanRenewalDate = new Date(
      brand.lastPlanRenewalDate.setMonth(
        brand.lastPlanRenewalDate.getMonth() + 1,
      ),
    );
    brand.isPlanActive = true;

    return await this.brandRepo.save(brand);
  }

  async subscribePlan(
    brandId: string,
    planId: string,
    paymentMethodId: string,
    useMeCredit: boolean,
  ) {
    try {
      const brand = await this.getBrandById(brandId);
      if (!brand) {
        throw new NotFoundException('Brand not found');
      }

      const plan = await this.getBrandSubscriptionPlanById(planId);
      if (!plan) {
        throw new NotFoundException('Plan not found');
      }

      const wallet = await this.walletRepo.findOne({
        where: {
          brandId,
        },
      });

      let amount = {
        amountToPay: plan.monthlyAmount,
        meCreditsUsed: 0,
      };

      if (useMeCredit) {
        const newAmount = await this.walletService.applyMeCredit({
          walletId: wallet.id,
          amount: amount.amountToPay,
        });

        amount = newAmount;
      }

      if (amount.amountToPay > 0) {
        const paymentMethod =
          await this.paymentService.getPaymentMethodByStripePaymentMethodId(
            paymentMethodId,
          );

        if (!paymentMethod?.stripePaymentMethodId) {
          throw new HttpException('Please link your card first.', 400, {});
        }

        await this.paymentService.chargePaymentMethod({
          amount: amount.amountToPay * 100,
          paymentMethodId,
          wallet,
          narration: `Payment for ${plan.name} subscription`,
          source: TransactionSource.SUBSCRIPTION,
          paymentMethod: PaymentMethodEnum.STRIPE,
          appliedMeCredit: useMeCredit,
        });

        if (amount.meCreditsUsed > 0) {
          await this.walletService.debitMeCredits({
            walletId: wallet.id,
            amount: amount.meCreditsUsed,
          });
        }

        await this.subscribeBrandToPlan(brandId, planId);

        return 'ok';
      } else {
        await this.subscribeBrandToPlan(brandId, planId);

        const transaction = new Transaction();
        transaction.amount = amount.amountToPay;
        transaction.balance = wallet.balance;
        transaction.status = StatusType.SUCCEDDED;
        transaction.transactionType = TransactionsType.DEBIT;
        transaction.narration = `Payment for ${plan.name} subscription`;
        transaction.walletId = wallet.id;
        transaction.paymentMethod = PaymentMethodEnum.ME_CREDIT;
        transaction.source = TransactionSource.SUBSCRIPTION;
        transaction.appliedMeCredit = true;

        await this.paymentService.createTransaction(transaction);

        return 'ok';
      }
    } catch (error) {
      console.log('error', error);
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async getLastTopupEventBlock() {
    return await this.topupEventBlock.find({
      order: {
        lastBlock: 'DESC',
      },
      take: 1,
    })[0];
  }

  async saveTopupEventBlock(blockNumber) {
    const topupEventBlock = new TopupEventBlock();
    topupEventBlock.lastBlock = blockNumber;

    return await this.topupEventBlock.save(topupEventBlock);
  }

  async getBrandByMeTokenAddress(meTokenAddress: string) {
    const reward = await this.rewardService.getRewardByContractAddress(
      meTokenAddress,
    );

    if (!reward) {
      return null;
    }

    return await this.brandRepo.findOne({
      where: {
        id: reward.brandId,
      },
    });
  }

  async getAllBrandsForAdmin({
    page,
    limit,
    search,
    disabled,
  }: {
    page: number;
    limit: number;
    search: string;
    disabled: boolean;
  }) {
    const brandQuery = this.brandRepo.createQueryBuilder('brand');

    if (search) {
      brandQuery.andWhere('brand.name ILIKE :search', {
        search: `%${search}%`,
      });
      brandQuery.orWhere('brand.slug ILIKE :search', {
        search: `%${search}%`,
      });
    }

    if (disabled) {
      brandQuery.andWhere('brand.disabled = :disabled', {
        disabled,
      });
    } else {
      brandQuery.andWhere('brand.disabled = :disabled', {
        disabled: false,
      });
    }

    brandQuery.skip((page - 1) * limit).take(limit);
    const [brands, total] = await brandQuery.getManyAndCount();

    const brandList = [];

    for (const brand of brands) {
      const meCredits = await this.walletService.getMeCredits(brand.id);

      brandList.push({
        ...brand,
        meCredits,
      });
    }

    return {
      data: brandList,
      total,
      nextPage: total > page * limit ? Number(page) + 1 : null,
      previousPage: page > 1 ? Number(page) - 1 : null,
    };
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async syncBrandCustomer() {
    const brandCustomers = await this.brandCustomerRepo.find();

    for (const brandCustomer of brandCustomers) {
      const user = await this.userRepo.findOne({
        where: {
          [brandCustomer.identifierType]: brandCustomer.identifier,
        },
      });

      if (!user) {
        continue;
      }

      if (brandCustomer.userId !== user.id) {
        brandCustomer.userId = user.id;
        brandCustomer.isOnboarded = true;
        await this.brandCustomerRepo.save(brandCustomer);
      }
    }
  }

  async getBrandWithOnlineCreds(brandId: string) {
    return this.brandRepo.findOne({
      where: {
        id: brandId,
      },
      select: {
        woocommerce_consumer_key: true,
        woocommerce_consumer_secret: true,
        woocommerce_online_store_url: true,
        shopify_online_store_url: true,
        shopify_consumer_secret: true,
        shopify_consumer_key: true,
        online_store_type: true,
        id: true,
        currency: true,
        location: true,
        regions: true,
        shopify_access_token: true,
        shopify_access_token_updated_date: true,
      },
      relations: ['regions'],
    });
  }
}
