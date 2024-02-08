import { ApiProperty } from '@nestjs/swagger';
import { AdminRole } from '@src/utils/enums/AdminRole';
import { IsArray, IsString } from 'class-validator';

export class CreateMemberDto {
  @ApiProperty()
  @IsString({
    message: 'Enter a valid name',
  })
  name: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
    },
  })
  @IsArray()
  roles: AdminRole[];

  @ApiProperty()
  @IsString()
  email: string;
}
