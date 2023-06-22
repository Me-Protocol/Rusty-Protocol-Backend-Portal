import { UserAppType } from "@src/utils/enums/UserAppType";
import { IsEnum } from "class-validator";

export class switchUserAppTypeDto {
  @IsEnum(UserAppType, {
    message: "App type is invalid",
  })
  appType: UserAppType;
}
