import { IsEmail, MaxLength, MinLength } from "class-validator";

export class ChangeEmailDto {
  @MinLength(4, {
    message: "Code is invalid",
  })
  @MaxLength(4, {
    message: "Code is invalid",
  })
  code: number;

  @IsEmail(
    {},
    {
      message: "Email is invalid",
    }
  )
  email: string;
}
