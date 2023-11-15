import { ApiProperty } from '@nestjs/swagger';
import { BrandRole } from '@src/utils/enums/BrandRole';
import { IsEnum, IsOptional, IsString } from 'class-validator';

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
    type: 'enum',
    enum: BrandRole,
  })
  @IsOptional()
  @IsEnum({
    enum: BrandRole,
    message: 'Enter a valid role',
  })
  role: BrandRole;

  brandMemberId: string;

  brandId: string;

  userId: string;
}
