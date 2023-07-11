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
  Req,
} from '@nestjs/common';
import { ResponseInterceptor } from '@src/interceptors/response.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { CollectionManagementService } from './service';
import Api from 'twilio/lib/rest/Api';
import { ApiTags } from '@nestjs/swagger';
import { CreateCollectionDto } from './dto/CreateCollectionDto.dto';
import { BrandJwtStrategy } from '@src/middlewares/brand-jwt-strategy.middleware';
import { User } from '@src/globalServices/user/entities/user.entity';
import { UpdateCollectionDto } from './dto/UpdateCollectionDto.dto';
import { FIlterCollectionDto } from './dto/FilterCollectionDto.dto';

ApiTags('Collection');
@UseInterceptors(ResponseInterceptor)
@Controller('collections')
export class CollectionManagementController {
  constructor(
    private readonly collectionManagementService: CollectionManagementService,
  ) {}

  @UseGuards(AuthGuard())
  @Post()
  async create(
    @Body(ValidationPipe) createCollectionDto: CreateCollectionDto,
    @Req() req: any,
  ) {
    const user = req.user as User;
    createCollectionDto.brandId = user.brand.id;
    createCollectionDto.userId = user.id;

    return await this.collectionManagementService.create(createCollectionDto);
  }

  @UseGuards(AuthGuard())
  @Put(':id')
  async createCategory(
    @Body(ValidationPipe) updateCollectionDto: UpdateCollectionDto,
    @Req() req: any,
    @Param('id') id: string,
  ) {
    const user = req.user as User;
    updateCollectionDto.brandId = user.brand.id;
    updateCollectionDto.userId = user.id;

    return await this.collectionManagementService.update(
      id,
      updateCollectionDto,
    );
  }

  @UseGuards(AuthGuard())
  @Get()
  async get(@Query() filterDto: FIlterCollectionDto, @Req() req: any) {
    const user = req.user as User;
    filterDto.brandId = user.brand.id;
    filterDto.userId = user.id;

    return await this.collectionManagementService.findAll(filterDto);
  }

  @UseGuards(AuthGuard())
  @Get(':id')
  async getById(@Param('id') id: string, @Req() req: any) {
    const user = req.user as User;
    return await this.collectionManagementService.findOne(
      id,
      user.id,
      user.brand.id,
    );
  }
}
