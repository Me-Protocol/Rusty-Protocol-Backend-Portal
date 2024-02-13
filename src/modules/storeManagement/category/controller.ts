import {
  Controller,
  Body,
  UseInterceptors,
  UseGuards,
  ValidationPipe,
  Put,
  Post,
  Param,
  Get,
  Query,
  Delete,
} from '@nestjs/common';
import { ResponseInterceptor } from '@src/interceptors/response.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { CategoryManagementService } from './service';
import { CreateCategoryDto } from './dto/CreateCategoryDto';
import { UpdateCategoryDto } from './dto/UpdateCategoryDto';
import { FilterCategoryDto } from './dto/FilterCategoryDto';
import { ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@node_modules/@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
@ApiBearerAuth()
export class CategoryManagementController {
  constructor(
    private readonly categoryManagementService: CategoryManagementService,
  ) {}

  // @UseGuards(AuthGuard())
  @Post()
  async createCategory(
    @Body(ValidationPipe) createCategoryDto: CreateCategoryDto,
  ) {
    return await this.categoryManagementService.createCategory(
      createCategoryDto,
    );
  }

  // @UseGuards(AuthGuard())
  @Put(':categoryId')
  async updateCategory(
    @Body(ValidationPipe) updateCategoryDto: UpdateCategoryDto,
    @Param('categoryId') categoryId: string,
  ) {
    return await this.categoryManagementService.updateCategory(
      categoryId,
      updateCategoryDto,
    );
  }

  @Get('')
  async getAllCategories(@Query(ValidationPipe) query: FilterCategoryDto) {
    return await this.categoryManagementService.findAllCategory(query);
  }

  @Delete(':categoryId')
  async deleteCategory(@Param('categoryId') categoryId: string) {
    return await this.categoryManagementService.deleteCategory(categoryId);
  }
}
