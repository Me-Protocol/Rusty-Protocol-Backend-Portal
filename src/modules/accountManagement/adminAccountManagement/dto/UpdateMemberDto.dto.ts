import { ApiProperty } from '@nestjs/swagger';
import { AdminRole } from '@src/utils/enums/AdminRole';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateMemberDto {
  @ApiProperty()
  @IsOptional()
  @IsString({
    message: 'Enter a valid name',
  })
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  profilePicture: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
    },
  })
  @IsOptional()
  @IsArray()
  roles: AdminRole[];

  brandMemberId: string;
}
