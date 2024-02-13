import {
  Controller,
  UseGuards,
  Post,
  Get,
  Req,
  ValidationPipe,
  Body,
  Query,
  HttpException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BrandJwtStrategy } from '@src/middlewares/brand-jwt-strategy.middleware';
import { ReviewManagementService } from './service';
import { AuthGuard } from '@nestjs/passport';
import { ReviewDto } from './dto/ReviewDto.dto';
import { FilterReviewDto } from './dto/FilterReviewsDto.dto';
import { ApiBearerAuth } from '@node_modules/@nestjs/swagger';

@ApiTags('Reviews')
@Controller('review')
@ApiBearerAuth()
export class ReviewManagementController {
  constructor(
    private readonly reviewManagementService: ReviewManagementService,
  ) {}

  @UseGuards(AuthGuard())
  @Post()
  async createApiKey(@Req() req: any, @Body(ValidationPipe) body: ReviewDto) {
    const userId = req.user.id;
    body.userId = userId;

    return await this.reviewManagementService.createReview(body);
  }

  @UseGuards(BrandJwtStrategy)
  @Get('/brand')
  async getBrandReviews(
    @Req() req: any,
    @Query(ValidationPipe) query: FilterReviewDto,
  ) {
    const brandId = req.user.brand.id;
    query.brandId = brandId;

    return await this.reviewManagementService.getReviews(query);
  }

  @UseGuards(AuthGuard())
  @Get('/user')
  async getUserReviews(
    @Req() req: any,
    @Query(ValidationPipe) query: FilterReviewDto,
  ) {
    const userId = req.user.id;
    query.userId = userId;

    return await this.reviewManagementService.getReviews(query);
  }

  @UseGuards(AuthGuard())
  @Get('/offer')
  async getOfferReviews(
    @Req() req: any,
    @Query(ValidationPipe) query: FilterReviewDto,
  ) {
    if (!query.offerId) {
      throw new HttpException('Offer id is required', 400, {
        cause: new Error('Offer id is required'),
      });
    }

    return await this.reviewManagementService.getReviews(query);
  }
}
