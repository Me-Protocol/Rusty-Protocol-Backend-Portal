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
import { ChangeEmailDto } from './dto/ChangeEmailDto.dto';
import { ChangePhoneDto } from './dto/ChangePhoneDto.dto';
import { ForgotPasswordDto } from './dto/ForgotPasswordDto.dto';
import { ResetPasswordDto } from './dto/ResetPasswordDto.dto';
import { UpdateDeviceTokenDto } from './dto/UpdateDeviceTokenDto.dto';
import { AuthenticationService } from './service';
import { UserAppType } from '@src/utils/enums/UserAppType';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const requestIp = require('request-ip');

@ApiTags('Authentication')
@UseInterceptors(ResponseInterceptor)
@Controller('user')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('signup/email')
  async signupWithEmail(
    @Body(ValidationPipe) body: EmailSignupDto,
  ): Promise<any> {
    return await this.authService.signupEmail(body);
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
  ): Promise<any> {
    const user = req.user as User;
    const clientIp = requestIp.getClientIp(req);

    return await this.authService.verifyEmail(
      user,
      body.code,
      req.headers['user-agent'],
      clientIp,
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
  ): Promise<any> {
    const user = req.user as User;
    const clientIp = requestIp.getClientIp(req);

    return await this.authService.verifyPhone(
      user,
      body.code,
      req.headers['user-agent'],
      clientIp,
    );
  }

  @Post('login')
  async login(
    @Body(ValidationPipe) body: LoginDto,
    @Req() req: any,
  ): Promise<any> {
    const clientIp = requestIp.getClientIp(req);

    return await this.authService.login(
      body,
      req.headers['user-agent'],
      clientIp,
    );
  }

  @Post('login/2fa')
  async verifyLogin(@Body() body: Verify2FADto, @Req() req: any): Promise<any> {
    const clientIp = requestIp.getClientIp(req);

    return await this.authService.verify2FALogin(
      body,
      req.headers['user-agent'],
      clientIp,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('me')
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

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post('logout')
  async logout(
    @Req() req: any,
    @Body() params: { deviceId: string },
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
    @Body(ValidationPipe) body: EmailSignupDto,
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
    @Body(ValidationPipe) body: PhoneSignupDto,
  ): Promise<any> {
    const user = req.user as User;

    return await this.authService.changePhone(user, body);
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

  @Get('twitter')
  @UseGuards(AuthGuard('twitter'))
  async twitterLogin() {
    // This will redirect the user to Twitter for authentication
  }

  @Get('twitter/callback')
  @UseGuards(AuthGuard('twitter'))
  async twitterCallback(
    @Req() req: any,
    @Res({ passthrough: true }) res: any,
  ): Promise<any> {
    const user = req.user;

    if (!user) {
      return res
        .status(302)
        .redirect(`${process.env.CLIENT_APP_URI}?token=null&provider=null`);
    } else {
      const newUser = await this.authService.socialAuth({
        email: user.profile._json.email,
        name: user.profile.displayName,
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
        provider: LoginType.TWITTER,
        profileImage: user.profile._json.profile_image_url_https,
        coverImage: user.profile._json.profile_banner_url,
        bio: user.profile._json.description,
        location: user.profile._json.location,
        website: '',
        username: user.profile.username,
        userAgent: req.headers['user-agent'],
        ip: requestIp.getClientIp(req),
        userType: UserAppType.USER,
      });

      return res
        .status(302)
        .redirect(
          `${process.env.CLIENT_APP_URI}?token=${newUser.token}&provider=${newUser.provider}`,
        );
    }
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

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(
    @Req() req: any,
    @Res({ passthrough: true }) res: any,
  ): Promise<any> {
    const user = req.user;

    if (!user) {
      return res
        .status(302)
        .redirect(`${process.env.CLIENT_APP_URI}?token=null&provider=null`);
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
        username: '',
        userAgent: req.headers['user-agent'],
        ip: requestIp.getClientIp(req),
        userType: UserAppType.USER,
      });

      return res
        .status(302)
        .redirect(
          `${process.env.CLIENT_APP_URI}?token=${newUser.token}&provider=${newUser.provider}`,
        );
    }
  }

  @Get('google/brand/callback')
  @UseGuards(AuthGuard('google'))
  async googleBrandCallback(
    @Req() req: any,
    @Res({ passthrough: true }) res: any,
  ): Promise<any> {
    const user = req.user;

    if (!user) {
      return res
        .status(302)
        .redirect(`${process.env.CLIENT_APP_URI}?token=null&provider=null`);
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
        username: '',
        userAgent: req.headers['user-agent'],
        ip: requestIp.getClientIp(req),
        userType: UserAppType.BRAND,
      });

      return res
        .status(302)
        .redirect(
          `${process.env.CLIENT_APP_URI}?token=${newUser.token}&provider=${newUser.provider}`,
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
  ) {
    const user = req.user;

    if (!user) {
      return res
        .status(302)
        .redirect(`${process.env.CLIENT_APP_URI}?token=null&provider=null`);
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
        username: '',
        userAgent: req.headers['user-agent'],
        ip: requestIp.getClientIp(req),
        userType: UserAppType.USER,
      });

      return res
        .status(302)
        .redirect(
          `${process.env.CLIENT_APP_URI}?token=${newUser.token}&provider=${newUser.provider}`,
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
    @Param('id') id: string,
    @Body(ValidationPipe) body: UpdateDeviceTokenDto,
  ): Promise<any> {
    const user = req.user as User;

    return await this.authService.updateDeviceToken(user.id, id, body);
  }
}
