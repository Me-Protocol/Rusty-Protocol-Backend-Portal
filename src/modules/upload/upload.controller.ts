import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { AuthGuard } from '@nestjs/passport';
import { ResponseInterceptor } from '@src/interceptors/response.interceptor';

@UseInterceptors(ResponseInterceptor)
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @UseGuards(AuthGuard())
  @Get('/image-signature')
  getUploadImageSignature(): Record<string, string | number> {
    return this.uploadService.generateUploadSignature();
  }
}
