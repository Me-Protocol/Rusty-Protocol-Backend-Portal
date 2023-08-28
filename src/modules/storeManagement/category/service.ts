import { HttpException, Injectable } from '@nestjs/common';
import { FilterCategoryDto } from '@src/modules/storeManagement/category/dto/FilterCategoryDto';
import { CategoryService } from '@src/globalServices/category/category.service';
import { CreateCategoryDto } from './dto/CreateCategoryDto';
import { UpdateCategoryDto } from './dto/UpdateCategoryDto';
import { getSlug } from '@src/utils/helpers/getSlug';
import { logger } from '@src/globalServices/logger/logger.service';

@Injectable()
export class CategoryManagementService {
  constructor(private readonly categoryService: CategoryService) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    try {
      const checkCategory = await this.categoryService.findOneByName(
        createCategoryDto.name,
      );
      if (checkCategory) {
        throw new Error('Category already exists');
      }

      createCategoryDto.slug = getSlug(createCategoryDto.name);

      return await this.categoryService.create(createCategoryDto);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async updateCategory(id: string, category: UpdateCategoryDto) {
    try {
      const checkCategory = await this.categoryService.findOneByName(
        category.name,
      );
      if (checkCategory && checkCategory.id !== id) {
        throw new Error('Category already exists');
      }

      if (category.name !== checkCategory.name) {
        category.slug = getSlug(category.name);
      }

      return this.categoryService.update(id, category);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async findAllCategory(query: FilterCategoryDto) {
    return await this.categoryService.findAll(query);
  }
}
