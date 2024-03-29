import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsNumber } from "class-validator";

export class RemoveMeCreditsDto {
  @ApiProperty()
  @IsUUID()
  brandId: string;

  @ApiProperty()
  @IsNumber()
  amount: number;

}