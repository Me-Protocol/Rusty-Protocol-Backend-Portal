import { ApiProperty } from '@nestjs/swagger';
import { UserAppType } from '@src/utils/enums/UserAppType';
import { IsEnum } from 'class-validator';

export class switchUserAppTypeDto {
  @ApiProperty()
  @IsEnum(UserAppType, {
    message: 'App type is invalid',
  })
  appType: UserAppType;
}
