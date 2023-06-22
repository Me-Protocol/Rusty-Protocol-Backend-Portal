import { IsString, MinLength } from "class-validator";

export class LoginDto {
  @IsString()
  identifier: string;

  @MinLength(6, {
    message: "Password is too short",
  })
  password: string;
}
