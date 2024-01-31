import {
  Controller,
  Body,
  UseGuards,
  ValidationPipe,
  Put,
  Post,
  Param,
  Get,
  Query,
  Req,
  Delete,
} from '@nestjs/common';
import { BrandJwtStrategy } from '@src/middlewares/brand-jwt-strategy.middleware';
import { ApiTags } from '@nestjs/swagger';
import { OfferManagementService } from './service';
import { CreateOfferDto } from './dto/CreateOfferDto.dto';
import { UpdateOfferDto } from './dto/UpdateOfferDto.dto';
import { AuthGuard } from '@nestjs/passport';
import { FilterOfferDto, FilterUserOfferDto } from './dto/FilterOfferDto.dto';
import { GetOfferDto } from './dto/GetOfferDto.dto';
import { ApiBearerAuth } from '@node_modules/@nestjs/swagger';

ApiTags('Offers');
@Controller('store/offer')
@ApiBearerAuth()
export class OfferManagementController {
  constructor(
    private readonly offerManagementService: OfferManagementService,
  ) {}

  @UseGuards(BrandJwtStrategy)
  @Post()
  async createOffer(
    @Body(ValidationPipe) body: CreateOfferDto,
    @Req() req: any,
  ) {
    const brandId = req.user.brand.id;
    body.brandId = brandId;

    return await this.offerManagementService.createOffer(body);
  }

  @UseGuards(BrandJwtStrategy)
  @Put(':offerId')
  async updateOffer(
    @Body(ValidationPipe) body: UpdateOfferDto,
    @Param('offerId') offerId: string,
    @Req() req: any,
  ) {
    const brandId = req.user.brand.id;
    body.brandId = brandId;
    return await this.offerManagementService.updateOffer(offerId, body);
  }

  @UseGuards(BrandJwtStrategy)
  @Delete(':offerId')
  async deleteProduct(@Param('offerId') offerId: string, @Req() req: any) {
    const brandId = req.user.brand.id;
    return await this.offerManagementService.deleteOffer(offerId, brandId);
  }

  @Get('')
  async getOffers(
    @Query(ValidationPipe) query: FilterOfferDto,
    @Req() req: any,
  ) {
    return await this.offerManagementService.getOffers(query);
  }

  @UseGuards(AuthGuard())
  @Get('top/user')
  async getTopOffersForUser(
    @Query(ValidationPipe) query: FilterOfferDto,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    query.userId = userId;

    return await this.offerManagementService.getTopOffersForUser(query);
  }

  @UseGuards(BrandJwtStrategy)
  @Get('brand')
  async getBrandOffers(
    @Query(ValidationPipe) query: FilterOfferDto,
    @Req() req: any,
  ) {
    const brandId = req.user.brand.id;
    query.brandId = brandId;

    return await this.offerManagementService.getBrandOffers(query);
  }

  @UseGuards(BrandJwtStrategy)
  @Get('/detail/:offerId')
  async getOfferById(@Param('offerId') offerId: string) {
    return await this.offerManagementService.getOfferById(offerId);
  }

  @Get(':offerCode')
  async getOfferByCode(
    @Param('offerCode') offerCode: string,
    @Query(ValidationPipe) query: GetOfferDto,
  ) {
    return await this.offerManagementService.getOfferByofferCode(
      offerCode,
      query.sessionId,
    );
  }

  @UseGuards(AuthGuard())
  @Get(':offerCode/user')
  async getOfferForLoggedInUser(
    @Param('offerCode') offerCode: string,
    @Req() req: any,
    @Query(ValidationPipe) query: GetOfferDto,
  ) {
    const userId = req.user.id;

    return await this.offerManagementService.getOfferForLoggedInUser(
      userId,
      offerCode,
      query.sessionId,
    );
  }

  @UseGuards(AuthGuard())
  @Get('user/redeemed')
  async geOffersBasedOnRedeemedOffers(
    @Req() req: any,
    @Query(ValidationPipe) query: FilterUserOfferDto,
  ) {
    const userId = req.user.id;
    query.userId = userId;

    return await this.offerManagementService.geOffersBasedOnRedeemedOffers(
      query,
    );
  }
}
