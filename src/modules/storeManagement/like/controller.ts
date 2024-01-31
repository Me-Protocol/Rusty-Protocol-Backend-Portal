import {
  Controller,
  Body,
  UseInterceptors,
  UseGuards,
  ValidationPipe,
  Post,
  Get,
  Query,
  Req,
} from '@nestjs/common';
import { ResponseInterceptor } from '@src/interceptors/response.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { LikeManagementService } from './service';
import { LikeDto } from './dto/LikeDto.dto';
import { FilterLikeDto } from './dto/FilterLikeDto.dto';
import { ApiBearerAuth } from '@node_modules/@nestjs/swagger';

@ApiTags('Like')
@Controller('like')
@ApiBearerAuth()
export class LikeManagementController {
  constructor(private readonly likeManagementService: LikeManagementService) {}

  @UseGuards(AuthGuard())
  @Post()
  async like(@Body(ValidationPipe) body: LikeDto, @Req() req: any) {
    body.userId = req.user.id;
    await this.likeManagementService.createLike(body);
  }

  @UseGuards(AuthGuard())
  @Post('unlike')
  async unlike(@Body(ValidationPipe) body: LikeDto, @Req() req: any) {
    body.userId = req.user.id;
    await this.likeManagementService.unlike(body);
  }

  @UseGuards(AuthGuard())
  @Get('user')
  async getUserLikedBrands(
    @Query(ValidationPipe) query: FilterLikeDto,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    query.userId = userId;

    return await this.likeManagementService.getUserLikes(query);
  }

  @UseGuards(AuthGuard())
  @Get('check')
  async checkLike(@Query(ValidationPipe) body: LikeDto, @Req() req: any) {
    const userId = req.user.id;
    body.userId = userId;

    return await this.likeManagementService.checkIfOfferIsLiked(body);
  }
}
