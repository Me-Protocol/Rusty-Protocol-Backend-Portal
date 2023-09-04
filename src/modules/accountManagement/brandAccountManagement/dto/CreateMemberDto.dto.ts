import { ApiProperty } from '@nestjs/swagger';
import { BrandRole } from '@src/utils/enums/BrandRole';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateMemberDto {
  @ApiProperty()
  @IsString({
    message: 'Enter a valid name',
  })
  name: string;

  @ApiProperty({
    type: 'enum',
    enum: BrandRole,
  })
  @IsEnum({
    enum: BrandRole,
    message: 'Enter a valid role',
  })
  role: BrandRole;

  @ApiProperty()
  @IsString()
  email: string;

  brandId: string;
}
