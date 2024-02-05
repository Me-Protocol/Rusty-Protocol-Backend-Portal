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
      console.log(category.name);

      const categoryExist = await this.categoryService.findOne(id);

      if (!categoryExist) {
        throw new Error('Category does not exist');
      }

      const checkCategory = await this.categoryService.findOneByName(
        category.name,
      );

      if (
        checkCategory &&
        checkCategory.name === category.name &&
        checkCategory.id !== id
      ) {
        throw new Error('Category already exists');
      }

      if (category.name && category.name !== checkCategory.name) {
        category.slug = getSlug(category.name);
      }

      if (category.image) checkCategory.image = category.image;
      if (category.banner) checkCategory.banner = category.banner;
      if (category.description)
        checkCategory.description = category.description;
      if (category.name) checkCategory.name = category.name;
      if (category.type) checkCategory.type = category.type;

      return this.categoryService.update(id, checkCategory);
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
