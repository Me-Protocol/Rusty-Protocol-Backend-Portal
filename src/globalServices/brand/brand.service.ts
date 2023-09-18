import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';
import { ElasticIndex } from '@src/modules/search/index/search.index';
import { brandIndex } from '@src/modules/search/interface/search.interface';
import { UpdateBrandDto } from '@src/modules/accountManagement/brandAccountManagement/dto/UpdateBrandDto.dto';
import { getSlug } from '@src/utils/helpers/getSlug';
import { BrandMember } from './entities/brand_member.entity';
import { BrandRole } from '@src/utils/enums/BrandRole';
import { BrandCustomer } from './entities/brand_customer.entity';
import { FilterBrandCustomer } from '@src/utils/enums/FilterBrandCustomer';
import { generateBrandIdBytes10 } from '@developeruche/protocol-core';

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

    await this.brandMemberRepo.save(brandMember);

    // Generate brand id on protocol
    const brandId = generateBrandIdBytes10(saveBrand.id);
    saveBrand.brandProtocolId = brandId.toString();

    return await this.brandRepo.save(saveBrand);
  }

  save(brand: Brand) {
    return this.brandRepo.save(brand);
  }

  async update(body: UpdateBrandDto, brandId: string) {
    try {
      if (body.name) {
        body.slug = body.name.toLowerCase().replace(/\s/g, '-');

        const checkSlug = await this.brandRepo.findOneBy({ slug: body.slug });
        if (checkSlug) {
          throw new Error('Name/Slug already exists');
        }
      }

      let brand = await this.brandRepo.findOneBy({ id: brandId });

      if (body.name) brand.name = body.name;
      if (body.website) brand.website = body.website;
      if (body.location) brand.location = body.location;
      if (body.categoryId) brand.categoryId = body.categoryId;
      if (body.revenueRange) brand.revenueRange = body.revenueRange;
      if (body.vatTaxId) brand.vatTaxId = body.vatTaxId;
      if (body.ecommercePlatform)
        brand.ecommercePlatform = body.ecommercePlatform;
      if (body.loyaltyProgram) brand.loyaltyProgram = body.loyaltyProgram;
      if (body.slogan) brand.slogan = body.slogan;
      if (body.socialMediaLinks) brand.socialMediaLinks = body.socialMediaLinks;
      if (body.logo_icon) brand.logo_icon = body.logo_icon;
      if (body.description) brand.description = body.description;
      if (body.logo_white) brand.logo_white = body.logo_white;
      if (body.logo_white_icon) brand.logo_white_icon = body.logo_white_icon;
      if (body.logo) brand.logo = body.logo;
      if (body.banners) brand.banners = body.banners;
      if (body.supportPhoneNumber)
        brand.supportPhoneNumber = body.supportPhoneNumber;
      if (body.listOnStore) brand.listOnStore = body.listOnStore;

      await this.brandRepo.update({ id: brandId }, brand);

      this.elasticIndex.updateDocument(brand, brandIndex);

      return brand;
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
      .leftJoinAndSelect('brand.category', 'category');

    if (categoryId) {
      brandQuery.where('brand.categoryId = :categoryId', { categoryId });
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

  async createBrandCustomer(userId: string, brandId: string) {
    const checkCustomer = await this.brandCustomerRepo.findOne({
      where: {
        userId,
        brandId,
      },
      relations: ['brand', 'user', 'user.customer'],
    });

    if (checkCustomer) {
      return checkCustomer;
    }

    const brandCustomer = new BrandCustomer();
    brandCustomer.brandId = brandId;
    brandCustomer.userId = userId;

    await this.brandCustomerRepo.save(brandCustomer);

    return await this.brandCustomerRepo.findOne({
      where: {
        userId,
        brandId,
      },
      relations: ['brand', 'user', 'user.customer'],
    });
  }

  async getBrandCustomer(brandId: string, userId: string) {
    return await this.brandCustomerRepo.findOne({
      where: {
        brandId,
        userId,
      },
      relations: ['brand', 'user', 'user.customer'],
    });
  }

  async getBrandCustomers(
    brandId: string,
    page: number,
    limit: number,
    filterBy: FilterBrandCustomer,
  ) {
    const brandCustomerQuery = this.brandCustomerRepo
      .createQueryBuilder('brandCustomer')
      .leftJoinAndSelect('brandCustomer.brand', 'brand')
      .leftJoinAndSelect('brandCustomer.user', 'user')
      .leftJoinAndSelect('user.customer', 'customer');

    brandCustomerQuery.where('brandCustomer.brandId = :brandId', { brandId });

    if (filterBy === FilterBrandCustomer.MOST_ACTIVE) {
      // where customer redeemed greater than 2
      brandCustomerQuery.andWhere('customer.totalRedeemed > 2');
      brandCustomerQuery.orderBy('customer.totalRedeemed', 'DESC');
    }

    if (filterBy === FilterBrandCustomer.MOST_RECENT) {
      // brand customer createdAt 7 days ago
      const date = new Date();
      date.setDate(date.getDate() - 7);
      brandCustomerQuery.andWhere('brandCustomer.createdAt > :date', { date });
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

  async getBrandMemberByUserEmail(email: string) {
    return await this.brandMemberRepo.findOne({
      where: {
        verifyingEmail: email,
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
}
