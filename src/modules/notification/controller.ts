import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { NotificationService } from '@src/globalServices/notification/notification.service';
import { ResponseInterceptor } from '@src/interceptors/response.interceptor';
import { FilterNotificationDto } from './dto/FilterNotificationDto.dto';
import { ApiBearerAuth } from '@node_modules/@nestjs/swagger';
import { SendBulkNotificationDto } from '@src/modules/notification/dto/SendBulkNotification.dto';
import { BrandJwtStrategy } from '@src/middlewares/brand-jwt-strategy.middleware';

@ApiTags('Notification')
@Controller('notification')
@ApiBearerAuth()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(AuthGuard())
  @Get()
  async getNotifications(
    @Req() req: any,
    @Query(ValidationPipe) query: FilterNotificationDto,
  ) {
    query.userId = req.user.id;

    return await this.notificationService.getAllNotifications(query);
  }

  @Post('send-bulk')
  @UseGuards(BrandJwtStrategy)
  async sendBulkNotification(
    @Req() req: any,
    @Body(ValidationPipe) body: SendBulkNotificationDto,
  ) {
    const brandId = req.user.brand.id;

    return await this.notificationService.sendBulkNotification(brandId, body);
  }
  @Get(':id')
  async getNotificationById(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: any,
  ) {
    return await this.notificationService.getNotificationById(id, req.user.id);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  async deleteNotificationById(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: any,
  ) {
    return await this.notificationService.deleteNotification(id, req.user.id);
  }

  @UseGuards(AuthGuard())
  @Delete('clear/all')
  async clearNotification(@Req() req: any) {
    return await this.notificationService.clearAllNotifications(req.user.id);
  }
}
