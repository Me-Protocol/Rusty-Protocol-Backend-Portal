import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { FilterCategoryDto } from '@src/modules/storeManagement/category/dto/FilterCategoryDto';
import { CreateCategoryDto } from '@src/modules/storeManagement/category/dto/CreateCategoryDto';
import { ElasticIndex } from '@src/modules/search/index/search.index';
import { categoryIndex } from '@src/modules/search/interface/search.interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    private readonly elasticIndex: ElasticIndex,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = this.categoryRepo.create(createCategoryDto);
    const category = await this.categoryRepo.save(newCategory);

    this.elasticIndex.insertDocument(category, categoryIndex);

    return category;
  }

  async update(id: string, category: Category) {
    await this.categoryRepo.save(category);

    const cate = await this.categoryRepo.findOneBy({ id });

    this.elasticIndex.updateDocument(cate, categoryIndex);

    return cate;
  }

  async findAll(query: FilterCategoryDto) {
    const { page, limit, type } = query;

    const categoryQuery = this.categoryRepo
      .createQueryBuilder('category')
      .orderBy('category.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (type) {
      categoryQuery.andWhere('category.type = :type', { type: query.type });
    }

    const total = await categoryQuery.getCount();
    const categories = await categoryQuery.getMany();

    return {
      total,
      categories,
      nextPage: total > page * limit ? Number(page) + 1 : null,
      previousPage: page > 1 ? Number(page) - 1 : null,
    };
  }

  findOne(id: string) {
    return this.categoryRepo.findOneBy({ id });
  }

  findOneBySlug(slug: string) {
    return this.categoryRepo.findOneBy({ slug });
  }

  async findOneByName(name: string) {
    return await this.categoryRepo.findOne({
      where: {
        name,
      },
    });
  }

  remove(id: string) {
    this.elasticIndex.deleteDocument(categoryIndex, id);

    return this.categoryRepo.softDelete({ id });
  }

  // @Cron(CronExpression.EVERY_5_MINUTES)
  // async syncElasticSearchIndex() {
  //   const allCategories = await this.categoryRepo.find();
  //   this.elasticIndex.batchCreateIndex(allCategories, categoryIndex);
  // }
}
