/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  HttpException,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from "@nestjs/common";
import { UserService } from "./user.service";
import {
  ChangeEmailDto,
  ChangePhoneDto,
  EmailSignupDto,
  EmailVerifyDto,
  ForgotPasswordDto,
  LoginDto,
  PasswordDto,
  PhoneSignupDto,
  PhoneVerifyDto,
  ResetPasswordDto,
  UpdateDeviceTokenDto,
  UpdateUserDto,
  Verify2FADto,
} from "./dto/user.dto";
import { ResponseInterceptor } from "@src/interceptors/response.interceptor";
import { AuthGuard } from "@nestjs/passport";
import { User } from "./entities/user.entity";
import { JwtAuthStrategy } from "@src/middlewares/jwt-auth-strategy.middleware";
import { LoginType } from "@src/utils/enums/LoginType";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const requestIp = require("request-ip");

@UseInterceptors(ResponseInterceptor)
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("signup/email")
  async signupWithEmail(
    @Body(ValidationPipe) body: EmailSignupDto
  ): Promise<any> {
    return await this.userService.signupEmail(body);
  }

  @UseGuards(JwtAuthStrategy)
  @Post("signup/email/resend")
  async resendEmailOTP(@Req() req: any): Promise<any> {
    const user = req.user as User;

    if (!user.email) {
      throw new HttpException("Please signup with email first", 400);
    }

    await this.userService.sendEmailVerificationCode(user.email);

    return "ok";
  }

  @UseGuards(JwtAuthStrategy)
  @Post("signup/email/verify")
  async verifyEmail(
    @Body() body: EmailVerifyDto,
    @Req() req: any
  ): Promise<any> {
    const user = req.user as User;
    const clientIp = requestIp.getClientIp(req);

    return await this.userService.verifyEmail(
      user,
      body.code,
      req.headers["user-agent"],
      clientIp
    );
  }

  @Post("signup/phone")
  async signupWithPhone(
    @Body(ValidationPipe) body: PhoneSignupDto
  ): Promise<any> {
    return await this.userService.signupPhone(body);
  }

  @UseGuards(JwtAuthStrategy)
  @Post("signup/phone/resend")
  async resendPhoneOTP(@Req() req: any): Promise<any> {
    const user = req.user as User;

    if (!user.phone) {
      throw new HttpException("Please signup with phone first", 400);
    }

    await this.userService.sendPhoneVerificationCode(user.phone);

    return "ok";
  }

  @UseGuards(JwtAuthStrategy)
  @Post("signup/phone/verify")
  async verifyPhone(
    @Body() body: PhoneVerifyDto,
    @Req() req: any
  ): Promise<any> {
    const user = req.user as User;
    const clientIp = requestIp.getClientIp(req);

    return await this.userService.verifyPhone(
      user,
      body.code,
      req.headers["user-agent"],
      clientIp
    );
  }

  @Post("login")
  async login(
    @Body(ValidationPipe) body: LoginDto,
    @Req() req: any
  ): Promise<any> {
    const clientIp = requestIp.getClientIp(req);

    return await this.userService.login(
      body,
      req.headers["user-agent"],
      clientIp
    );
  }

  @Post("login/2fa")
  async verifyLogin(@Body() body: Verify2FADto, @Req() req: any): Promise<any> {
    const clientIp = requestIp.getClientIp(req);

    return await this.userService.verify2FALogin(
      body,
      req.headers["user-agent"],
      clientIp
    );
  }

  @UseGuards(AuthGuard())
  @Get("me")
  async me(@Req() req: any): Promise<any> {
    const user = req.user as User;

    const {
      password,
      emailVerified,
      phoneVerified,
      createdAt,
      updatedAt,
      accountVerificationCode,
      passwordResetCode,
      salt,
      banned,
      suspended,
      last_login,
      twitterAuth,
      facebookAuth,
      googleAuth,
      ...userWithoutPassword
    } = user;

    return {
      ...userWithoutPassword,
      // dob: moment(new Date(user.dob)).format('DD, MMMM'),
    };
  }

  @UseGuards(AuthGuard())
  @Put("me")
  async updateMe(
    @Req() req: any,
    @Body(ValidationPipe) body: UpdateUserDto
  ): Promise<any> {
    const user = req.user as User;

    await this.userService.updateUser(user, body);

    return "ok";
  }

  @UseGuards(AuthGuard())
  @Post("logout")
  async logout(
    @Req() req: any,
    @Body() params: { deviceId: string }
  ): Promise<any> {
    const user = req.user as User;

    return await this.userService.logout(user.id, params.deviceId);
  }

  @UseGuards(AuthGuard())
  @Put("me/username")
  async updateUsername(
    @Req() req: any,
    @Body() body: UpdateUserDto
  ): Promise<any> {
    const user = req.user as User;

    await this.userService.changeUsername(user, body);

    return "ok";
  }

  @UseGuards(AuthGuard())
  @Put("me/password")
  async updatePassword(
    @Req() req: any,
    @Body(ValidationPipe) body: PasswordDto
  ): Promise<any> {
    const user = req.user as User;

    await this.userService.changePassword(user, body);

    return "ok";
  }

  @UseGuards(AuthGuard())
  @Put("me/email")
  async updateEmail(
    @Req() req: any,
    @Body(ValidationPipe) body: EmailSignupDto
  ): Promise<any> {
    const user = req.user as User;

    return await this.userService.changeEmail(user, body);
  }

  @UseGuards(AuthGuard())
  @Post("me/email/verify")
  async verifyUpdateEmail(
    @Req() req: any,
    @Body(ValidationPipe) body: ChangeEmailDto
  ): Promise<any> {
    const user = req.user as User;

    return await this.userService.verifyAndChangeEmail(user, body);
  }

  @UseGuards(AuthGuard())
  @Put("me/phone")
  async updatePhone(
    @Req() req: any,
    @Body(ValidationPipe) body: PhoneSignupDto
  ): Promise<any> {
    const user = req.user as User;

    return await this.userService.changePhone(user, body);
  }

  @UseGuards(AuthGuard())
  @Post("me/phone/verify")
  async verifyUpdatePhone(
    @Req() req: any,
    @Body(ValidationPipe) body: ChangePhoneDto
  ): Promise<any> {
    const user = req.user as User;

    return await this.userService.verifyAndChangePhone(user, body);
  }

  @Get("twitter")
  @UseGuards(AuthGuard("twitter"))
  async twitterLogin() {
    // This will redirect the user to Twitter for authentication
  }

  @Get("twitter/callback")
  @UseGuards(AuthGuard("twitter"))
  async twitterCallback(
    @Req() req: any,
    @Res({ passthrough: true }) res: any
  ): Promise<any> {
    const user = req.user;

    if (!user) {
      return res
        .status(302)
        .redirect(`${process.env.CLIENT_APP_URI}?token=null&provider=null`);
    } else {
      const newUser = await this.userService.socialAuth({
        email: user.profile._json.email,
        name: user.profile.displayName,
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
        provider: LoginType.TWITTER,
        profileImage: user.profile._json.profile_image_url_https,
        coverImage: user.profile._json.profile_banner_url,
        bio: user.profile._json.description,
        location: user.profile._json.location,
        website: "",
        username: user.profile.username,
        userAgent: req.headers["user-agent"],
        ip: requestIp.getClientIp(req),
      });

      return res
        .status(302)
        .redirect(
          `${process.env.CLIENT_APP_URI}?token=${newUser.token}&provider=${newUser.provider}`
        );
    }
  }

  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleLogin() {
    // This will redirect the user to Twitter for authentication
  }

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  async googleCallback(
    @Req() req: any,
    @Res({ passthrough: true }) res: any
  ): Promise<any> {
    const user = req.user;

    if (!user) {
      return res
        .status(302)
        .redirect(`${process.env.CLIENT_APP_URI}?token=null&provider=null`);
    } else {
      const newUser = await this.userService.socialAuth({
        email: user.profile._json.email,
        name: user.profile.displayName,
        accessToken: user?.accessToken,
        refreshToken: user?.refreshToken,
        provider: LoginType.GOOGLE,
        profileImage: user.profile._json.picture,
        coverImage: "",
        bio: "",
        location: "",
        website: "",
        username: "",
        userAgent: req.headers["user-agent"],
        ip: requestIp.getClientIp(req),
      });

      return res
        .status(302)
        .redirect(
          `${process.env.CLIENT_APP_URI}?token=${newUser.token}&provider=${newUser.provider}`
        );
    }
  }

  @Get("facebook")
  @UseGuards(AuthGuard("facebook"))
  async facebookLogin() {
    // This will redirect the user to Facebook for authentication
  }

  @Get("facebook/callback")
  @UseGuards(AuthGuard("facebook"))
  async facebookCallback(
    @Req() req: any,
    @Res({ passthrough: true }) res: any
  ) {
    const user = req.user;

    if (!user) {
      return res
        .status(302)
        .redirect(`${process.env.CLIENT_APP_URI}?token=null&provider=null`);
    } else {
      const newUser = await this.userService.socialAuth({
        email:
          user.profile._json.email ?? user.profile._json.id + "@facebook.com",
        name: user.profile.displayName,
        accessToken: user?.accessToken,
        refreshToken: user?.refreshToken,
        provider: LoginType.FACEBOOK,
        profileImage: user.profile._json.profileUrl,
        coverImage: "",
        bio: "",
        location: "",
        website: "",
        username: "",
        userAgent: req.headers["user-agent"],
        ip: requestIp.getClientIp(req),
      });

      return res
        .status(302)
        .redirect(
          `${process.env.CLIENT_APP_URI}?token=${newUser.token}&provider=${newUser.provider}`
        );
    }
  }

  @Post("password/forgot")
  async forgotPassword(
    @Body(ValidationPipe) body: ForgotPasswordDto
  ): Promise<any> {
    return await this.userService.forgotPassword(body);
  }

  @Post("password/reset")
  async resetPassword(@Body() body: ResetPasswordDto): Promise<any> {
    return await this.userService.resetPassword(body);
  }

  @UseGuards(AuthGuard())
  @Get("me/devices")
  async getDevices(@Req() req: any): Promise<any> {
    const user = req.user as User;

    return await this.userService.getUserDevices(user.id);
  }

  @UseGuards(AuthGuard())
  @Put("me/devices/:id")
  async updateDevice(
    @Req() req: any,
    @Param("id") id: string,
    @Body(ValidationPipe) body: UpdateDeviceTokenDto
  ): Promise<any> {
    const user = req.user as User;

    return await this.userService.updateDeviceToken(user.id, id, body);
  }

  @UseGuards(AuthGuard())
  @Get("/:id")
  async getUser(@Req() req: any, @Param() params: any): Promise<any> {
    const user = await this.userService.getUserById(params.id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const {
      password,
      emailVerified,
      phoneVerified,
      createdAt,
      updatedAt,
      accountVerificationCode,
      passwordResetCode,
      salt,
      banned,
      suspended,
      last_login,
      twitterAuth,
      facebookAuth,
      googleAuth,
      countryCode,
      countryAbbr,
      ...userWithoutPassword
    } = user;

    return {
      ...userWithoutPassword,
    };
  }
}
