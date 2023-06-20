import {
  Controller,
  Body,
  UseInterceptors,
  Put,
  UseGuards,
  Req,
  ValidationPipe,
} from "@nestjs/common";
import { BrandService } from "./brand.service";
import { UpdateBrandDto } from "./dto/brand.dto";
import { ResponseInterceptor } from "@src/interceptors/response.interceptor";
import { AuthGuard } from "@nestjs/passport";

@UseInterceptors(ResponseInterceptor)
@Controller("brand")
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @UseGuards(AuthGuard())
  @Put()
  async update(@Body(ValidationPipe) body: UpdateBrandDto, @Req() req: any) {
    const userId = req.user.id;

    return this.brandService.update(body, userId);
  }
}
