import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { FilterCategoryDto } from '@src/modules/storeManagement/category/dto/FilterCategoryDto';
import { UpdateCategoryDto } from '@src/modules/storeManagement/category/dto/UpdateCategoryDto';
import { CreateCategoryDto } from '@src/modules/storeManagement/category/dto/CreateCategoryDto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepo.create(createCategoryDto);

    return this.categoryRepo.save(category);
  }

  update(id: string, category: UpdateCategoryDto) {
    return this.categoryRepo.update({ id }, category);
  }

  async findAll(query: FilterCategoryDto) {
    const { page, limit, type } = query;

    const categoryQuery = this.categoryRepo
      .createQueryBuilder('category')
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
      nextPage: total > page * limit ? page + 1 : null,
      previousPage: page > 1 ? page - 1 : null,
    };
  }

  findOne(id: string) {
    return this.categoryRepo.findOneBy({ id });
  }

  findOneBySlug(slug: string) {
    return this.categoryRepo.findOneBy({ slug });
  }

  findOneByName(name: string) {
    return this.categoryRepo.findOneBy({ name });
  }

  remove(id: string) {
    return this.categoryRepo.softDelete({ id });
  }
}
