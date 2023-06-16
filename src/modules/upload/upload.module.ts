import { Module } from '@nestjs/common';
import { UploadProvider } from './upload';
import { UploadService } from './upload.service';

@Module({
  providers: [UploadProvider, UploadService],
  exports: [UploadProvider, UploadService],
})
export class UploadModule {}
