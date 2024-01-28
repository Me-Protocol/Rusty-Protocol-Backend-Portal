import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { FindOptionsOrderValue, Repository } from 'typeorm';
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

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepo: Repository<Brand>,

    @InjectRepository(BrandMember)
    private readonly brandMemberRepo: Repository<BrandMember>,

    @InjectRepository(BrandCustomer)
    private readonly brandCustomerRepo: Repository<BrandCustomer>,

    private readonly elasticIndex: ElasticIndex,

    private readonly eventEmitter: EventEmitter2,
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

  save(brand: Brand) {
    return this.brandRepo.save(brand);
  }

  async update(dto: UpdateBrandDto, brandId: string) {
    try {
      // if (dto.name) {
      //   dto.slug = dto.name.toLowerCase().replace(/\s/g, '-');

      //   const checkSlug = await this.brandRepo.findOneBy({ slug: dto.slug });
      //   if (checkSlug) {
      //     throw new Error('Name/Slug already exists');
      //   }
      // }

      const brand = await this.brandRepo.findOneBy({ id: brandId });

      if (!brand) {
        throw new NotFoundException('Brand not found');
      }

      // if (dto.name) brand.name = dto.name;
      brand.website = dto.website;
      brand.location = dto.location;
      brand.categoryId = dto.categoryId;
      brand.revenueRange = dto.revenueRange;
      brand.vatTaxId = dto.vatTaxId;

      brand.ecommercePlatform = dto.ecommercePlatform;
      brand.loyaltyProgram = dto.loyaltyProgram;
      brand.slogan = dto.slogan;
      brand.socialMediaLinks = dto.socialMediaLinks;
      brand.logo_icon = dto.logo_icon;
      brand.description = dto.description;
      brand.logo_white = dto.logo_white;
      brand.logo_white_icon = dto.logo_white_icon;
      brand.logo = dto.logo;
      brand.banners = dto.banners;

      brand.supportPhoneNumber = dto.supportPhoneNumber;
      brand.listOnStore = dto.listOnStore;
      brand.vaultPercentage = dto.vaultPercentage;
      brand.noOfCustomers = dto.noOfCustomers;

      brand.currency = dto.currency;
      brand.countryCode = dto.countryCode;
      brand.country = dto.country;
      brand.region = dto.region;
      brand.additionalAddress = dto.additionalAddress;
      brand.city = dto.city;
      brand.postalCode = dto.postalCode;
      brand.firstTimeLogin = dto.firstTimeLogin === 'true' ? true : false;

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

  async getAllFilteredBrands({
    categoryId,
    page,
    limit,
  }: {
    categoryId: string;
    page: number;
    limit: number;
  }) {
    const brandQuery = this.brandRepo
      .createQueryBuilder('brand')
      .leftJoinAndSelect('brand.category', 'category')
      .where('brand.listOnStore = :listOnStore', { listOnStore: true });

    if (categoryId) {
      brandQuery.andWhere('brand.categoryId = :categoryId', { categoryId });
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

  async createBrandCustomer(
    brandId: string,
    identifier: string,
    identifierType: SyncIdentifierType,
  ) {
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
    brandCustomer.identifier = identifier;
    brandCustomer.identifierType = identifierType;

    await this.brandCustomerRepo.save(brandCustomer);

    return await this.brandCustomerRepo.findOne({
      where: {
        brandId,
      },
      relations: ['brand'],
    });
  }

  async saveBrandCustomer(brandCustomer: BrandCustomer) {
    return await this.brandCustomerRepo.save(brandCustomer);
  }

  async getBrandCustomer(brandId: string, userId: string) {
    return await this.brandCustomerRepo.findOne({
      where: {
        brandId,
        userId,
      },
      relations: ['brand'],
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

  async getBrandCustomers(
    brandId: string,
    page: number,
    limit: number,
    filterBy: FilterBrandCustomer,
    sort?: {
      createdAt: FindOptionsOrderValue;
    },
  ) {
    const brandCustomerQuery = this.brandCustomerRepo
      .createQueryBuilder('brandCustomer')
      .leftJoinAndSelect('brandCustomer.brand', 'brand')
      .leftJoinAndSelect('brandCustomer.user', 'user')
      .leftJoinAndSelect('user.customer', 'customer')
      .leftJoinAndSelect('brandCustomer.registry', 'registry');

    brandCustomerQuery.where('brandCustomer.brandId = :brandId', { brandId });

    if (filterBy === FilterBrandCustomer.MOST_ACTIVE) {
      // where customer redeemed greater than 2
      brandCustomerQuery.andWhere('customer.totalRedeemed > 2');
      brandCustomerQuery.orderBy('customer.totalRedeemed', 'DESC');
    }

    if (filterBy === FilterBrandCustomer.MOST_RECENT) {
      // brand customer createdAt now to 1 month ago

      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);

      const endDate = new Date();

      // where createdAt is between now to date ago

      brandCustomerQuery.andWhere(
        'brandCustomer.createdAt BETWEEN :startDate AND :endDate',
        {
          startDate,
          endDate,
        },
      );
    }

    if (sort) {
      if (sort.createdAt === 'ASC') {
        brandCustomerQuery.orderBy('brandCustomer.createdAt', 'ASC');
      } else if (sort.createdAt === 'DESC') {
        brandCustomerQuery.orderBy('brandCustomer.createdAt', 'DESC');
      }
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

  @Cron(CronExpression.EVERY_5_MINUTES)
  async syncElasticSearchIndex() {
    const allBrands = await this.brandRepo.find();
    this.elasticIndex.batchCreateIndex(allBrands, brandIndex);
  }

  async removeBrandMember(brandMember: BrandMember) {
    return await this.brandMemberRepo.remove(brandMember);
  }
}
