import { IsString, MaxLength, MinLength } from "class-validator";

export class Verify2FADto {
  @IsString()
  userId: string;

  @MinLength(4, {
    message: "Code is invalid",
  })
  @MaxLength(4, {
    message: "Code is invalid",
  })
  code: number;
}
