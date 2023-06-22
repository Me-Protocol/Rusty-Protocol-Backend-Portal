import { MaxLength, MinLength } from "class-validator";

export class PhoneVerifyDto {
  @MinLength(4, {
    message: "Code is invalid",
  })
  @MaxLength(4, {
    message: "Code is invalid",
  })
  code: number;
}
