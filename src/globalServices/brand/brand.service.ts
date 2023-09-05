import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';
import { ElasticIndex } from '@src/modules/search/index/search.index';
import { brandIndex } from '@src/modules/search/interface/search.interface';
import { UpdateBrandDto } from '@src/modules/accountManagement/brandAccountManagement/dto/UpdateBrandDto.dto';
import { getSlug } from '@src/utils/helpers/getSlug';
import { BrandMember } from './entities/brand_member.entity';
import { async } from 'rxjs';
import { BrandRole } from '@src/utils/enums/BrandRole';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepo: Repository<Brand>,

    @InjectRepository(BrandMember)
    private readonly brandMemberRepo: Repository<BrandMember>,

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

    return saveBrand;
  }

  save(brand: Brand) {
    return this.brandRepo.save(brand);
  }

  async update(body: UpdateBrandDto, brandId: string) {
    if (body.name) {
      body.slug = body.name.toLowerCase().replace(/\s/g, '-');

      const checkSlug = await this.brandRepo.findOneBy({ slug: body.slug });
      if (checkSlug) {
        throw new Error('Name/Slug already exists');
      }
    }

    await this.brandRepo.update({ id: brandId }, body);

    const brand = await this.brandRepo.findOneBy({ id: brandId });

    this.elasticIndex.updateDocument(brand, brandIndex);

    return brand;
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
      nextPage: total > page * limit ? page + 1 : null,
      previousPage: page > 1 ? page - 1 : null,
    };
  }

  getBrandByName(name: string) {
    return this.brandRepo.findOneBy({ name });
  }

  async saveBrandMember(brandMember: BrandMember) {
    return await this.brandMemberRepo.save(brandMember);
  }

  async getBrandMember(brandId: string, userId: string) {
    return await this.brandMemberRepo.findOne({
      where: {
        brandId,
        userId,
      },
    });
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
