import { IsString, MinLength } from "class-validator";

export class LoginDto {
  @IsString({
    message: "Please provide an identifier",
  })
  identifier: string;

  @MinLength(6, {
    message: "Password is too short",
  })
  password: string;
}
