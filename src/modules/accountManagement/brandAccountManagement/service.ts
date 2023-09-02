import { HttpException, Injectable } from '@nestjs/common';
import { BrandService } from '@src/globalServices/brand/brand.service';
import { UpdateBrandDto } from './dto/UpdateBrandDto.dto';
import { logger } from '@src/globalServices/logger/logger.service';
import { FilterBrandDto } from './dto/FilterBrandDto.dto';

@Injectable()
export class BrandAccountManagementService {
  constructor(private readonly brandService: BrandService) {}

  async updateBrand(body: UpdateBrandDto, userId: string) {
    try {
      const brand = await this.brandService.getBrandByUserId(userId);
      return this.brandService.update(body, brand.id);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async getAllBrands(query: FilterBrandDto) {
    try {
      const { categoryId, page, limit } = query;
      const brands = await this.brandService.getAllFilteredBrands({
        categoryId,
        page,
        limit,
      });
      return brands;
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async getBrandById(id: string) {
    try {
      const brand = await this.brandService.getBrandById(id);

      if (!brand) {
        throw new HttpException('Brand not found', 404);
      }

      return brand;
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }
}
