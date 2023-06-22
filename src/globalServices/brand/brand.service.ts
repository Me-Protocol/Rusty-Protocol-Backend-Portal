import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Brand } from "./entities/brand.entity";
import { Repository } from "typeorm";
import { ElasticIndex } from "@src/modules/search/index/search.index";
import { brandIndex } from "@src/modules/search/interface/search.interface";

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepo: Repository<Brand>,
    private readonly elasticIndex: ElasticIndex
  ) {}

  create({ userId }: { userId: string }) {
    const brand = this.brandRepo.create({ userId });

    this.elasticIndex.insertDocument(brand, brandIndex);

    return this.brandRepo.save(brand);
  }

  save(brand: Brand) {
    return this.brandRepo.save(brand);
  }

  // async update(body: UpdateBrandDto, id: string) {
  //   if (body.name) {
  //     body.slug = body.name.toLowerCase().replace(/\s/g, "-");

  //     const checkSlug = await this.brandRepo.findOneBy({ slug: body.slug });
  //     if (checkSlug) {
  //       throw new HttpException("Name/Slug already exists", 400);
  //     }
  //   }

  //   await this.brandRepo.update({ userId: id }, body);

  //   const brand = await this.brandRepo.findOneBy({ userId: id });

  //   this.elasticIndex.updateDocument(brand, brandIndex);

  //   return brand;
  // }
}
