import { UserAppType } from "@src/utils/enums/UserAppType";
import { IsEmail, IsEnum, IsString, Matches, MinLength } from "class-validator";

export class EmailSignupDto {
  @IsEmail(
    {},
    {
      message: "Email is invalid",
    }
  )
  email: string;

  @IsString()
  @MinLength(6, {
    message: "Password is too short",
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter and one number",
  })
  password: string;

  @IsString()
  @MinLength(6, {
    message: "Password is too short",
  })
  confirmPassword: string;

  @IsString()
  name: string;

  @IsEnum(UserAppType, {
    message: "User type is invalid",
  })
  userType: UserAppType;
}
