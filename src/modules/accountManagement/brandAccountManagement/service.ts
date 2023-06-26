import { HttpException, Injectable } from "@nestjs/common";
import { BrandService } from "@src/globalServices/brand/brand.service";
import { UpdateBrandDto } from "./dto/UpdateBrandDto";

@Injectable()
export class BrandAccountManagementService {
  constructor(private readonly brandService: BrandService) {}

  async updateBrand(body: UpdateBrandDto, userId: string) {
    try {
      const brand = await this.brandService.getBrandByUserId(userId);
      return this.brandService.update(body, brand.id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
