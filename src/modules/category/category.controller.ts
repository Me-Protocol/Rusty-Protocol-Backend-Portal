import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Query,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import {
  CreateCategoryDto,
  FilterCategoryDto,
  UpdateCategoryDto,
} from "./dto/category.dto";
import { ResponseInterceptor } from "@src/interceptors/response.interceptor";

@UseInterceptors(ResponseInterceptor)
@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll(@Query() query: FilterCategoryDto) {
    return this.categoryService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.categoryService.remove(id);
  }
}
