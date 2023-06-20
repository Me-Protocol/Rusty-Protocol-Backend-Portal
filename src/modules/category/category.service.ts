import { Injectable } from "@nestjs/common";
import {
  CreateCategoryDto,
  FilterCategoryDto,
  UpdateCategoryDto,
} from "./dto/category.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { Repository } from "typeorm";
import { ElasticIndex } from "../search/index/search.index";
import { categoryIndex } from "../search/interface/search.interface";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,

    private readonly elasticIndex: ElasticIndex
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepo.create(createCategoryDto);

    this.elasticIndex.insertDocument(category, categoryIndex);

    return this.categoryRepo.save(category);
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = this.categoryRepo.create(updateCategoryDto);

    this.elasticIndex.updateDocument(category, categoryIndex);

    return this.categoryRepo.update({ id }, category);
  }

  async findAll(query: FilterCategoryDto) {
    const { page, limit, type } = query;

    const categoryQuery = this.categoryRepo
      .createQueryBuilder("category")
      .skip((page - 1) * limit)
      .take(limit);

    if (type) {
      categoryQuery.andWhere("category.type = :type", { type: query.type });
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

  remove(id: string) {
    return this.categoryRepo.softDelete({ id });
  }
}
