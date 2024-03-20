/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ResponseInterceptor } from '@src/interceptors/response.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthStrategy } from '@src/middlewares/jwt-auth-strategy.middleware';
import { LoginType } from '@src/utils/enums/LoginType';
import { User } from '@src/globalServices/user/entities/user.entity';
import { EmailSignupDto } from './dto/EmailSignupDto.dto';
import { EmailVerifyDto } from './dto/EmailVerifyDto.dto';
import { PhoneSignupDto } from './dto/PhoneSignupDto.dto';
import { PhoneVerifyDto } from './dto/PhoneVerifyDto.dto';
import { LoginDto } from './dto/LoginDto.dto';
import { Verify2FADto } from './dto/Verify2FADto.dto';
import { UpdateUserDto } from './dto/UpdateUserDto.dto';
import { PasswordDto } from './dto/PasswordDto.dto';
import { ChangeEmailDto, StartChangeEmailDto } from './dto/ChangeEmailDto.dto';
import { ChangePhoneDto, StartChangePhoneDto } from './dto/ChangePhoneDto.dto';
import { ForgotPasswordDto } from './dto/ForgotPasswordDto.dto';
import { ResetPasswordDto } from './dto/ResetPasswordDto.dto';
import { UpdateDeviceTokenDto } from './dto/UpdateDeviceTokenDto.dto';
import { AuthenticationService } from './service';
import { UserAppType } from '@src/utils/enums/UserAppType';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Enable2FADto } from './dto/Enable2FADto.dto';
import { UpdatePreferenceDto } from './dto/UpdatePreferenceDto.dto';
import { LogoutDeviceDto } from './dto/LogoutDeviceDto.dto';
import { SocialAuthenticationService } from './socialAuth';
import { CLIENT_APP_URI } from '@src/config/env.config';
import { RealIP } from 'nestjs-real-ip';

@ApiTags('Authentication')
@Controller('user')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly socialAuth: SocialAuthenticationService,
  ) {}

  @Post('google-spreadsheet')
  async googleSheet(): Promise<any> {
    return await this.authService.authorizeGoogle();
  }

  @Post('signup/email')
  async signupWithEmail(
    @Body(ValidationPipe) body: EmailSignupDto,
    @RealIP() ip: string,
    @Req() req: any,
  ): Promise<any> {
    return await this.authService.signupEmail({
      ...body,
      userAgent: req.headers['user-agent'],
      ip,
    });
  }

  @Post('signup/email/with-brand/:brandId')
  async signupAsBrandCustomerWithEmail(
    @Body(ValidationPipe) body: EmailSignupDto,
    @RealIP() ip: string,
    @Req() req: any,
    @Param('brandId', ParseUUIDPipe) brandId: string,
  ): Promise<any> {
    return await this.authService.signupEmail({
      ...body,
      brandId,
      userAgent: req.headers['user-agent'],
      ip,
    });
  }

  @UseGuards(JwtAuthStrategy)
  @Post('signup/email/resend')
  async resendEmailOTP(@Req() req: any): Promise<any> {
    const user = req.user as User;

    if (!user.email) {
      throw new HttpException('Please signup with email first', 400);
    }

    await this.authService.sendEmailVerificationCode(user.email, user.username);

    return 'ok';
  }

  @UseGuards(JwtAuthStrategy)
  @Post('signup/email/verify')
  async verifyEmail(
    @Body() body: EmailVerifyDto,
    @Req() req: any,
    @RealIP() ip: string,
  ): Promise<any> {
    const user = req.user as User;

    return await this.authService.verifyEmail(
      user,
      body.code,
      req.headers['user-agent'],
      ip,
    );
  }

  @Post('signup/phone')
  async signupWithPhone(
    @Body(ValidationPipe) body: PhoneSignupDto,
  ): Promise<any> {
    return await this.authService.signupPhone(body);
  }

  @UseGuards(JwtAuthStrategy)
  @Post('signup/phone/resend')
  async resendPhoneOTP(@Req() req: any): Promise<any> {
    const user = req.user as User;

    if (!user.phone) {
      throw new HttpException('Please signup with phone first', 400);
    }

    await this.authService.sendPhoneVerificationCode(user.phone);

    return 'ok';
  }

  @UseGuards(JwtAuthStrategy)
  @Post('signup/phone/verify')
  async verifyPhone(
    @Body() body: PhoneVerifyDto,
    @Req() req: any,
    @RealIP() ip: string,
  ): Promise<any> {
    const user = req.user as User;

    return await this.authService.verifyPhone(
      user,
      body.code,
      req.headers['user-agent'],
      ip,
    );
  }

  @Post('login')
  async login(
    @Body(ValidationPipe) body: LoginDto,
    @Req() req: any,
    @RealIP() ip: string,
  ): Promise<any> {
    return await this.authService.login(body, req.headers['user-agent'], ip);
  }

  @Post('login/2fa')
  async verifyLogin(
    @Body() body: Verify2FADto,
    @Req() req: any,
    @RealIP() ip: string,
  ): Promise<any> {
    return await this.authService.verify2FALogin(
      body,
      req.headers['user-agent'],
      ip,
    );
  }

  @UseGuards(AuthGuard())
  @Get('me')
  async me(@Req() req: any): Promise<any> {
    const user = req.user as User;

    const {
      password,
      createdAt,
      updatedAt,
      accountVerificationCode,
      passwordResetCode,
      salt,
      banned,
      suspended,
      last_login,
      facebookAuth,
      twitterAuth,
      googleAuth,
      ...userWithoutPassword
    } = user;

    return {
      ...userWithoutPassword,
      twitterUsername: twitterAuth?.username ?? null,
      // dob: moment(new Date(user.dob)).format('DD, MMMM'),
    };
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post('logout')
  async logout(
    @Req() req: any,
    @Body(ValidationPipe) params: LogoutDeviceDto,
  ): Promise<any> {
    const user = req.user as User;

    return await this.authService.logout(user.id, params.deviceId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Put('me/username')
  async updateUsername(
    @Req() req: any,
    @Body() body: UpdateUserDto,
  ): Promise<any> {
    const user = req.user as User;

    await this.authService.changeUsername(user, body);

    return 'ok';
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Put('me/password')
  async updatePassword(
    @Req() req: any,
    @Body(ValidationPipe) body: PasswordDto,
  ): Promise<any> {
    const user = req.user as User;

    await this.authService.changePassword(user, body);

    return 'ok';
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Put('me/email')
  async updateEmail(
    @Req() req: any,
    @Body(ValidationPipe) body: StartChangeEmailDto,
  ): Promise<any> {
    const user = req.user as User;

    return await this.authService.changeEmail(user, body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post('me/email/verify')
  async verifyUpdateEmail(
    @Req() req: any,
    @Body(ValidationPipe) body: ChangeEmailDto,
  ): Promise<any> {
    const user = req.user as User;

    return await this.authService.verifyAndChangeEmail(user, body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Put('me/phone')
  async updatePhone(
    @Req() req: any,
    @Body(ValidationPipe) body: StartChangePhoneDto,
  ): Promise<any> {
    const user = req.user as User;

    return await this.authService.changePhone(user, body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Put('me/2fa')
  async enableDisable2FA(
    @Req() req: any,
    @Body(ValidationPipe) body: Enable2FADto,
  ): Promise<any> {
    const user = req.user as User;
    body.userId = user.id;

    return await this.authService.enableDisable2FA(body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Put('me/preferences')
  async updatePreferences(
    @Req() req: any,
    @Body(ValidationPipe) body: UpdatePreferenceDto,
  ): Promise<any> {
    const user = req.user as User;
    body.userId = user.id;

    return await this.authService.updatePreferences(body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post('me/phone/verify')
  async verifyUpdatePhone(
    @Req() req: any,
    @Body(ValidationPipe) body: ChangePhoneDto,
  ): Promise<any> {
    const user = req.user as User;

    return await this.authService.verifyAndChangePhone(user, body);
  }

  // initialize a twitter login
  @Get('twitter')
  async twitter(@Res() res: any) {
    const url = await this.socialAuth.twitterAuth({});
    return res.status(302).redirect(url);
  }

  // // redirect back the user to the website after login
  @Get('twitter/callback')
  async twitterCallback(
    @Query() query: { oauth_verifier: string; oauth_token: string },
    @Res() res: any,
    @Req() req: any,
    @RealIP() ip: string,
  ) {
    const { oauth_verifier, oauth_token } = query;
    // const clientIP = req.socket.remoteAddress;

    const access_token = await this.socialAuth.handleTwitterRedirect(
      oauth_token,
      oauth_verifier,
      req.headers['user-agent'],
      ip,
    );

    if (access_token.token) {
      return res
        .status(302)
        .redirect(
          `${process.env.CLIENT_APP_URI}/login/?access_token=null&message=Something went wrong. Please try again later.`,
        );
    }

    return res
      .status(302)
      .redirect(
        `${process.env.CLIENT_APP_URI}/login/?token=${access_token.token}&provider=${access_token.provider}`,
      );
  }

  @Get('link_twitter')
  async linkTwitter(
    @Req() req: any,
    @Res() res: any,
    @Query() query: { user_id: string; redirectUrl: string },
  ) {
    const url = await this.socialAuth.twitterAuth({
      user: query.user_id,
      redirectUrl: query.redirectUrl,
    });
    return res.status(302).redirect(url);
  }

  @Get('link_twitter/callback')
  async linkTwitterCallback(
    @Query()
    query: {
      oauth_verifier: string;
      oauth_token: string;
      user_id: string;
      redirectUrl: string;
    },
    @Res() res: any,
    @Req() req: any,
  ) {
    const { oauth_verifier, oauth_token, user_id, redirectUrl }: any =
      req.query;
    await this.socialAuth.handleLinkTwitterRedirect(
      oauth_token,
      oauth_verifier,
      user_id,
    );

    if (redirectUrl) {
      return res.status(302).redirect(redirectUrl);
    }

    return res.status(302).redirect(`${CLIENT_APP_URI}?status=SUCCESS`);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    // This will redirect the user to Twitter for authentication
  }

  // @Get('google/brand')
  // @UseGuards(AuthGuard('google'))
  // async googleLoginBrand() {
  //   // This will redirect the user to Twitter for authentication
  // }

  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  async googleCallback(
    @Req() req: any,
    @Res({ passthrough: true }) res: any,
    @RealIP() ip: string,
  ): Promise<any> {
    const user = req.user;

    if (!user) {
      return res
        .status(302)
        .redirect(
          `${process.env.CLIENT_APP_URI}/login/?token=null&provider=null`,
        );
    } else {
      const newUser = await this.authService.socialAuth({
        email: user.profile._json.email,
        name: user.profile.displayName,
        accessToken: user?.accessToken,
        refreshToken: user?.refreshToken,
        provider: LoginType.GOOGLE,
        profileImage: user.profile._json.picture,
        coverImage: '',
        bio: '',
        location: '',
        website: '',
        username: null,
        userAgent: req.headers['user-agent'],
        ip,
        userType: UserAppType.USER,
      });

      return res
        .status(302)
        .redirect(
          `${process.env.CLIENT_APP_URI}/login/?token=${newUser.token}&provider=${newUser.provider}`,
        );
    }
  }

  @Get('google/brand/callback')
  @UseGuards(AuthGuard('google'))
  async googleBrandCallback(
    @Req() req: any,
    @Res({ passthrough: true }) res: any,
    @RealIP() ip: string,
  ): Promise<any> {
    const user = req.user;

    if (!user) {
      return res
        .status(302)
        .redirect(
          `${process.env.CLIENT_APP_URI}/login/?token=null&provider=null`,
        );
    } else {
      const newUser = await this.authService.socialAuth({
        email: user.profile._json.email,
        name: user.profile.displayName,
        accessToken: user?.accessToken,
        refreshToken: user?.refreshToken,
        provider: LoginType.GOOGLE,
        profileImage: user.profile._json.picture,
        coverImage: '',
        bio: '',
        location: '',
        website: '',
        username: null,
        userAgent: req.headers['user-agent'],
        ip,
        userType: UserAppType.BRAND,
      });

      return res
        .status(302)
        .redirect(
          `${process.env.CLIENT_APP_URI}/login/?token=${newUser.token}&provider=${newUser.provider}`,
        );
    }
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin() {
    // This will redirect the user to Facebook for authentication
  }

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookCallback(
    @Req() req: any,
    @Res({ passthrough: true }) res: any,
    @RealIP() ip: string,
  ) {
    const user = req.user;

    if (!user) {
      return res
        .status(302)
        .redirect(
          `${process.env.CLIENT_APP_URI}/login/?token=null&provider=null`,
        );
    } else {
      const newUser = await this.authService.socialAuth({
        email:
          user.profile._json.email ?? user.profile._json.id + '@facebook.com',
        name: user.profile.displayName,
        accessToken: user?.accessToken,
        refreshToken: user?.refreshToken,
        provider: LoginType.FACEBOOK,
        profileImage: user.profile._json.profileUrl,
        coverImage: '',
        bio: '',
        location: '',
        website: '',
        username: null,
        userAgent: req.headers['user-agent'],
        ip,
        userType: UserAppType.USER,
      });

      return res
        .status(302)
        .redirect(
          `${process.env.CLIENT_APP_URI}/login/?token=${newUser.token}&provider=${newUser.provider}`,
        );
    }
  }

  @Post('password/forgot')
  async forgotPassword(
    @Body(ValidationPipe) body: ForgotPasswordDto,
  ): Promise<any> {
    return await this.authService.forgotPassword(body);
  }

  @Post('password/reset')
  async resetPassword(@Body() body: ResetPasswordDto): Promise<any> {
    return await this.authService.resetPassword(body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('me/devices')
  async getDevices(@Req() req: any): Promise<any> {
    const user = req.user as User;

    return await this.authService.getUserDevices(user.id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Put('me/devices/:id')
  async updateDevice(
    @Req() req: any,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) body: UpdateDeviceTokenDto,
  ): Promise<any> {
    const user = req.user as User;

    return await this.authService.updateDeviceToken(user.id, id, body);
  }
}
