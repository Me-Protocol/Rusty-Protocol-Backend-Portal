import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';
import { ElasticIndex } from '@src/modules/search/index/search.index';
import { brandIndex } from '@src/modules/search/interface/search.interface';
import { UpdateBrandDto } from '@src/modules/accountManagement/brandAccountManagement/dto/UpdateBrandDto.dto';
import { getSlug } from '@src/utils/helpers/getSlug';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepo: Repository<Brand>,
    private readonly elasticIndex: ElasticIndex,
  ) {}

  create({ userId, name }: { userId: string; name: string }) {
    const slug = getSlug(name);

    const brand = this.brandRepo.create({ userId, name, slug });

    this.elasticIndex.insertDocument(brand, brandIndex);

    return this.brandRepo.save(brand);
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
}
