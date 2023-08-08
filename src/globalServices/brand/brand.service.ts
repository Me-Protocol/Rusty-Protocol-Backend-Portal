import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';
import { ElasticIndex } from '@src/modules/search/index/search.index';
import { brandIndex } from '@src/modules/search/interface/search.interface';
import { UpdateBrandDto } from '@src/modules/accountManagement/brandAccountManagement/dto/UpdateBrandDto';
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
    return this.brandRepo.findOneBy({ id });
  }

  getBrandByUserId(userId: string) {
    return this.brandRepo.findOneBy({ userId });
  }

  getAllBrands() {
    return this.brandRepo.find();
  }
}
