import {
  Controller,
  Body,
  UseInterceptors,
  UseGuards,
  ValidationPipe,
  Post,
  Param,
  Get,
  Query,
  Req,
} from '@nestjs/common';
import { ResponseInterceptor } from '@src/interceptors/response.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { FollowManagementService } from './service';
import { FollowDto } from './dto/FollowDto.dto';
import { FilteUserFollowDto, FilterFollowDto } from './dto/FilterFollowDto.dto';

@ApiTags('Follow')
@UseInterceptors(ResponseInterceptor)
@Controller('follow')
export class FollowManagementController {
  constructor(
    private readonly followManagementService: FollowManagementService,
  ) {}

  @UseGuards(AuthGuard())
  @Post()
  async follow(@Body(ValidationPipe) body: FollowDto, @Req() req: any) {
    const userId = req.user.id;
    body.userId = userId;

    await this.followManagementService.followBrand(body);
  }

  @UseGuards(AuthGuard())
  @Post('unfollow')
  async unfollow(@Body(ValidationPipe) body: FollowDto, @Req() req: any) {
    const userId = req.user.id;
    body.userId = userId;

    await this.followManagementService.unfollowBrand(body);
  }

  @UseGuards(AuthGuard())
  @Get('brand')
  async getBrandFollow(
    @Query(ValidationPipe) query: FilterFollowDto,
    @Req() req: any,
  ) {
    return await this.followManagementService.getBrandsFollowers(query);
  }

  @UseGuards(AuthGuard())
  @Get('user')
  async getUserFollowedBrands(
    @Query(ValidationPipe) query: FilteUserFollowDto,
    @Req() req: any,
  ) {
    return await this.followManagementService.getUserFollowedBrands(query);
  }

  @UseGuards(AuthGuard())
  @Get('check/:brandId')
  async checkIsFollowing(@Param('brandId') brandId: string, @Req() req: any) {
    const userId = req.user.id;
    return await this.followManagementService.checkIfFollowing(brandId, userId);
  }
}
