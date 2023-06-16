import { Gender } from "@src/utils/enums/Gender";
import { TwoFAType } from "@src/utils/enums/TwoFAType";
import { UserAppType } from "@src/utils/enums/UserAppType";
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class PhoneSignupDto {
  @IsPhoneNumber(undefined, {
    message: "Phone number is invalid",
  })
  phone: string;

  @IsString()
  countryCode: string;

  @IsString()
  countryAbbr: string;

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
}

export class PhoneVerifyDto {
  @MinLength(4, {
    message: "Code is invalid",
  })
  @MaxLength(4, {
    message: "Code is invalid",
  })
  code: number;
}

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
}

export class EmailVerifyDto {
  @MinLength(4, {
    message: "Code is invalid",
  })
  @MaxLength(4, {
    message: "Code is invalid",
  })
  code: number;
}

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

export class ChangePhoneDto {
  @MinLength(4, {
    message: "Code is invalid",
  })
  @MaxLength(4, {
    message: "Code is invalid",
  })
  code: number;

  @IsPhoneNumber(undefined, {
    message: "Phone number is invalid",
  })
  phone: string;

  @IsString()
  countryCode: string;

  @IsString()
  countryAbbr: string;
}

export class PasswordDto {
  @MinLength(6, {
    message: "Password is too short",
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter and one number",
  })
  password: string;

  @MinLength(6, {
    message: "Password is too short",
  })
  confirmPassword: string;

  currentPassword?: string;
}

export class LoginDto {
  @IsString()
  identifier: string;

  @MinLength(6, {
    message: "Password is too short",
  })
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  profileImage: string;

  @IsOptional()
  @IsString()
  coverImage: string;

  @IsOptional()
  @MinLength(3, {
    message: "Bio is too short",
  })
  @MaxLength(160, {
    message: "Bio is too long",
  })
  bio: string;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsUrl({
    require_protocol: false,
  })
  website: string;

  @IsOptional()
  @IsString()
  dob: string;

  username: string;

  @IsOptional()
  @IsBoolean()
  is2faEnabled: boolean;

  @IsOptional()
  @IsBoolean()
  private: boolean;

  @IsOptional()
  @IsBoolean()
  showActivity: boolean;

  @IsOptional()
  @IsEnum(TwoFAType)
  twoFAType: TwoFAType;

  allow_contact_sync: boolean;

  allow_notification: boolean;

  allow_location: boolean;

  appType: UserAppType;

  location_lat: number;

  location_lng: number;

  completedOnboarding: boolean;

  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;
}

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

export class ForgotPasswordDto {
  @IsString()
  identifier: string;
}

export class ResetPasswordDto extends PasswordDto {
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

export class UpdateDeviceTokenDto {
  @IsString()
  device_token: string;
}

export class switchUserAppTypeDto {
  @IsEnum(UserAppType, {
    message: "App type is invalid",
  })
  appType: UserAppType;
}
