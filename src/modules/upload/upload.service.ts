import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UploadService {
  public generateUploadSignature(): Record<string, string | number> {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const upload_preset = 'zrhqsswu';
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
      },
      cloudinary.config().api_secret,
    );
    return {
      signature,
      timestamp,
      cloudName: cloudinary.config().cloud_name,
      apiKey: cloudinary.config().api_key,
      upload_preset,
      sec: cloudinary.config().api_secret,
    };
  }
}
