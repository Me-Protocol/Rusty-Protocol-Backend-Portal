import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
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

@ApiTags('Notification')
@UseInterceptors(ResponseInterceptor)
@Controller('notification')
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

  @UseGuards(AuthGuard())
  @Get(':id')
  async getNotificationById(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: any,
  ) {
    return await this.notificationService.getNotificationById(id, req.user.id);
  }
}
