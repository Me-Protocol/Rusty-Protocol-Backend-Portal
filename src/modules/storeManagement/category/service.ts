import { HttpException, Injectable } from '@nestjs/common';
import { FilterCategoryDto } from '@src/modules/storeManagement/category/dto/FilterCategoryDto';
import { CategoryService } from '@src/globalServices/category/category.service';
import { CreateCategoryDto } from './dto/CreateCategoryDto';
import { UpdateCategoryDto } from './dto/UpdateCategoryDto';

@Injectable()
export class CategoryManagementService {
  constructor(private readonly categoryService: CategoryService) {}

  createCategory(createCategoryDto: CreateCategoryDto) {
    try {
      const checkCategory = this.categoryService.findOneByName(
        createCategoryDto.name,
      );
      if (checkCategory) {
        throw new Error('Category already exists');
      }

      return this.categoryService.create(createCategoryDto);
    } catch (error) {
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

      return this.categoryService.update(id, category);
    } catch (error) {
      throw new HttpException(error.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async findAllCategory(query: FilterCategoryDto) {
    return this.categoryService.findAll(query);
  }
}
