import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, jwtConfigurations } from '@src/config/jwt.config';
import { isNumber } from '@src/utils/helpers/isNumber';
import { TwoFAType } from '@src/utils/enums/TwoFAType';
import { LoginType } from '@src/utils/enums/LoginType';
import { EmailSignupDto } from './dto/EmailSignupDto.dto';
import { PhoneSignupDto } from './dto/PhoneSignupDto.dto';
import { LoginDto } from './dto/LoginDto.dto';
import { Verify2FADto } from './dto/Verify2FADto.dto';
import { UpdateUserDto } from './dto/UpdateUserDto.dto';
import { PasswordDto } from './dto/PasswordDto.dto';
import { ChangeEmailDto } from './dto/ChangeEmailDto.dto';
import { ChangePhoneDto, StartChangePhoneDto } from './dto/ChangePhoneDto.dto';
import { ForgotPasswordDto } from './dto/ForgotPasswordDto.dto';
import { ResetPasswordDto } from './dto/ResetPasswordDto.dto';
import { UpdateDeviceTokenDto } from './dto/UpdateDeviceTokenDto.dto';
import { MailService } from '@src/globalServices/mail/mail.service';
import { SmsService } from '@src/globalServices/sms/sms.service';
import { UserService } from '@src/globalServices/user/user.service';
import { User } from '@src/globalServices/user/entities/user.entity';
import { Device } from '@src/globalServices/user/entities/device.entity';
import { CustomerService } from '@src/globalServices/customer/customer.service';
import { BrandService } from '@src/globalServices/brand/brand.service';
import { UserAppType } from '@src/utils/enums/UserAppType';
import { Role } from '@src/utils/enums/Role';
import { FiatWalletService } from '@src/globalServices/fiatWallet/fiatWallet.service';
import { logger } from '@src/globalServices/logger/logger.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const geoip = require('geoip-lite');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const DeviceDetector = require('node-device-detector');

const deviceDetector = new DeviceDetector();

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly mailService: MailService,
    private jwtService: JwtService,
    private smsService: SmsService,
    private userService: UserService,
    private customerService: CustomerService,
    private brandService: BrandService,
    private walletService: FiatWalletService,
  ) {}

  // Signs a token
  async signToken(payload: JwtPayload): Promise<string> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: jwtConfigurations.secret,
      expiresIn: jwtConfigurations.signOptions.expiresIn,
    });

    return accessToken;
  }

  // Registers a user device and generates a token for the device
  async registerDevice(
    user: User,
    userAgent: string,
    clientIp: string,
  ): Promise<any> {
    const deviceData = deviceDetector.detect(userAgent);

    const location = geoip.lookup(clientIp);

    const device = new Device();
    device.user = user;
    device.name = deviceData.device.name;
    device.type = deviceData.device.type;
    device.agent = deviceData.client.name;
    device.userId = user.id;
    device.ip = clientIp;
    device.location = `${location?.city ?? ''}, ${location?.country ?? ''}`;
    device.timezone = location?.timezone;
    device.lat_lng = location?.ll;
    device.range = location?.range;

    const checkDevice = await this.userService.checkDevice(
      clientIp,
      user.id,
      device.type,
    );

    if (checkDevice) {
      return checkDevice.token;
    }

    const token = await this.signToken({
      email: user.email,
      id: user.id,
      phone: user.phone,
      username: user.username,
      device: device.id,
    });

    device.token = token;
    await this.userService.saveDevice(device);
    user.last_login = new Date();
    await this.userService.saveUser(user);

    return token;
  }

  async getUserDevices(userId: string): Promise<Device[]> {
    const devices = await this.userService.getUserDevices(userId);
    return devices;
  }

  // For mobile notifications
  async updateDeviceToken(
    userId: string,
    id: string,
    { device_token }: UpdateDeviceTokenDto,
  ): Promise<any> {
    const device = await this.userService.getDeviceById(userId, id);

    if (!device) throw new HttpException('Device not found', 404);

    device.device_token = device_token;
    await this.userService.saveDevice(device);

    return 'ok';
  }

  async sendEmailVerificationCode(email: string, name: string): Promise<any> {
    email = email.toLowerCase();

    try {
      const user = await this.userService.getUserByEmail(email);

      if (!user) throw new Error('User not found');

      user.accountVerificationCode = Math.floor(1000 + Math.random() * 9000);
      await this.userService.saveUser(user);

      await this.mailService.sendMail({
        to: email,
        subject: 'Verify your email address',
        text: 'Verify your email address',
        html: `
        <p>Hello ${name},</p><br/>
        <p>Use the code below to verify your email address.</p><br/>
        <b><p>Code: ${user.accountVerificationCode}</p></b>
        `,
      });
    } catch (error) {
      logger.error(error);
      throw new HttpException(error?.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async sendPhoneVerificationCode(
    phoneNumber: string,
    user?: User,
  ): Promise<any> {
    try {
      const phone = phoneNumber.replace(/\D/g, '');

      if (!user) {
        user = await this.userService.getUserByPhone(phone);

        if (!user) throw new Error('User not found');
      }

      user.accountVerificationCode = Math.floor(1000 + Math.random() * 9000);
      await this.userService.saveUser(user);

      this.smsService.sendSms({
        to: `+${phone}`,
        body: `Hello 👋🏻, Use the code below to verify your phone number. Code: ${user.accountVerificationCode}`,
      });
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async signupEmail({
    email,
    password,
    confirmPassword,
    name,
    userType,
  }: EmailSignupDto): Promise<any> {
    email = email.toLowerCase();
    try {
      const user = await this.userService.getUserByEmail(email);
      if (user) {
        throw new Error('Email already exists');
      }

      if (userType === UserAppType.BRAND) {
        const checkBrandName = await this.brandService.getBrandByName(name);
        if (checkBrandName) {
          throw new Error(`Brand with name ${name} already exists`);
        }
      }

      const newUser = new User();
      newUser.email = email?.toLowerCase();
      newUser.username = email.split('@')[0].toLowerCase();
      newUser.twoFAType = TwoFAType.EMAIL;

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      newUser.password = hashedPassword;
      newUser.salt = salt;
      newUser.userType = userType;

      const saveUser = await this.userService.saveUser(newUser);

      if (userType === UserAppType.USER) {
        await this.customerService.create({
          name,
          userId: saveUser.id,
        });
        saveUser.role = Role.CUSTOMER;
      } else {
        await this.brandService.create({
          userId: saveUser.id,
          name,
        });
        // Create customer incase user wants to login as customer
        await this.customerService.create({
          name,
          userId: saveUser.id,
        });
        saveUser.role = Role.BRAND;
      }

      await this.userService.saveUser(saveUser);

      const token = await this.signToken({
        email: newUser.email,
        id: saveUser.id,
        phone: newUser.phone,
        username: newUser.username,
        device: null,
      });

      await this.sendEmailVerificationCode(email, name);

      return token;
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async verifyEmail(
    user: User,
    code: number,
    userAgent: string,
    clientIp: string,
    is2Fa?: boolean,
  ): Promise<any> {
    try {
      if (!user) {
        throw new Error('User not found');
      }

      if (user.emailVerified && !is2Fa) {
        throw new Error('Email already verified');
      }

      if (user.accountVerificationCode !== Number(code)) {
        throw new Error('Invalid code');
      }

      user.emailVerified = true;
      user.accountVerificationCode = null;
      await this.userService.saveUser(user);

      if (!is2Fa) {
        if (user.userType === UserAppType.BRAND) {
          const brand = await this.brandService.getBrandByUserId(user.id);

          await this.walletService.createWallet({
            brand,
          });
        }

        await this.walletService.createWallet({
          user,
        });
      }

      const token = await this.registerDevice(user, userAgent, clientIp);

      // welcome email
      if (user.email) {
        await this.mailService.sendMail({
          to: user.email,
          subject: `Welcome to ${process.env.APP_NAME}`,
          text: `Welcome to ${process.env.APP_NAME}`,
          html: `
        <p>Thanks for signing up to ${process.env.APP_NAME}. We're excited to have you on board!</p>
        `,
        });
      }

      return token;
    } catch (error) {
      logger.error(error);
      throw new HttpException(error?.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async signupPhone({
    phone,
    countryCode,
    countryAbbr,
    password,
    confirmPassword,
    name,
    userType,
  }: PhoneSignupDto): Promise<any> {
    try {
      phone = phone.replace(/\D/g, '');

      const user = await this.userService.getUserByPhone(phone);
      if (user) {
        throw new Error('Phone already exists');
      }

      const newUser = new User();
      newUser.phone = phone.replace(/\D/g, '').replace(countryCode, '');
      newUser.countryCode = countryCode;
      newUser.countryName = countryAbbr;
      newUser.username = Math.random().toString(36).substring(7);
      newUser.twoFAType = TwoFAType.SMS;

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      newUser.password = hashedPassword;
      newUser.salt = salt;
      newUser.userType = userType;

      await this.sendPhoneVerificationCode(phone);
      const saveUser = await this.userService.saveUser(newUser);

      if (userType === UserAppType.USER) {
        await this.customerService.create({
          name,
          userId: saveUser.id,
        });
        saveUser.role = Role.CUSTOMER;
      } else {
        await this.brandService.create({
          userId: saveUser.id,
          name,
        });
        saveUser.role = Role.BRAND;
      }

      await this.userService.saveUser(saveUser);

      const token = await this.signToken({
        email: newUser.email,
        id: newUser.id,
        phone: newUser.phone,
        username: newUser.username,
        device: null,
      });

      return token;
    } catch (error) {
      logger.error(error);
      throw new HttpException(error?.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async verifyPhone(
    user: User,
    code: number,
    userAgent: string,
    clientIp: string,
    is2Fa?: boolean,
  ): Promise<any> {
    try {
      if (!user) {
        throw new Error('User not found');
      }

      if (user.phoneVerified && !is2Fa) {
        throw new Error('Phone already verified');
      }

      if (user.accountVerificationCode !== Number(code)) {
        throw new Error('Invalid code');
      }

      user.phoneVerified = true;
      user.accountVerificationCode = null;
      await this.userService.saveUser(user);

      if (!is2Fa) {
        if (!is2Fa) {
          if (user.userType === UserAppType.BRAND) {
            const brand = await this.brandService.getBrandByUserId(user.id);

            await this.walletService.createWallet({
              brand,
            });
          }

          await this.walletService.createWallet({
            user,
          });
        }
      }

      const token = await this.registerDevice(user, userAgent, clientIp);

      return token;
    } catch (error) {
      logger.error(error);
      throw new HttpException(error?.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async login(
    { identifier, password }: LoginDto,
    userAgent: string,
    clientIp: string,
  ): Promise<any> {
    try {
      let user: User;
      identifier = identifier.trim().toLocaleLowerCase();

      if (identifier.includes('@')) {
        user = await this.userService.getUserByEmail(identifier);

        if (!user) {
          throw new Error('Invalid login details');
        }

        if (!user.emailVerified) {
          throw new Error('Email not verified');
        }
      } else if (isNumber(identifier)) {
        user = await this.userService.getUserByPhone(identifier);

        if (!user) {
          throw new Error('Invalid login details');
        }

        if (!user.phoneVerified) {
          throw new Error('Phone not verified');
        }
      } else {
        user = await this.userService.getUserByUsername(identifier);

        if (!user) {
          throw new Error('Invalid login details');
        }

        if (user.email && !user.emailVerified) {
          throw new Error('Email not verified');
        }

        if (user.phone && !user.phoneVerified) {
          throw new Error('Phone not verified');
        }
      }

      if (!user) {
        throw new Error('Invalid login details');
      }

      if (!user.password) {
        throw new Error(
          'Please use the forgot password button to create a password',
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error('Invalid login details');
      }

      if (user.is2faEnabled) {
        if (user.twoFAType === TwoFAType.EMAIL) {
          await await this.sendEmailVerificationCode(user.email, user.username);
        } else if (user.twoFAType === TwoFAType.SMS) {
          await await this.sendPhoneVerificationCode(user.phone);
        } else {
          throw new HttpException('Invalid 2FA type', 400);
        }

        return {
          message: `Verify 2FA`,
          userId: user.id,
        };
      }

      const token = await this.registerDevice(user, userAgent, clientIp);

      return token;
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async verify2FALogin(
    { code, userId }: Verify2FADto,
    userAgent: string,
    ip: string,
  ): Promise<any> {
    const user = await this.userService.getUserById(userId);

    if (!user) throw new HttpException('User not found.', 404);

    let token: Promise<any>;

    if (user.twoFAType === TwoFAType.EMAIL) {
      token = await this.verifyEmail(user, code, userAgent, ip, true);
    } else {
      token = await this.verifyPhone(user, code, userAgent, ip, true);
    }

    return token;
  }

  async logout(userId: string, deviceId: string): Promise<any> {
    try {
      const device = await this.userService.getDeviceById(userId, deviceId);
      if (!device) {
        return 'Logged out! See you soon :)';
      }

      await this.userService.deleteDeviceById(userId, deviceId);

      return 'Logged out! See you soon :)';
    } catch (error) {
      logger.error(error);
      throw new HttpException(error?.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async changeUsername(user: User, { username }: UpdateUserDto): Promise<any> {
    try {
      const existingUser = await this.userService.getUserByUsername(username);

      if (existingUser && existingUser.id !== user.id) {
        throw new HttpException('Username already exists', 400);
      }

      user.username = username.toLocaleLowerCase();

      await this.userService.saveUser(user);

      return user;
    } catch (error) {
      logger.error(error);
      throw new HttpException(error?.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async changePassword(
    user: User,
    { password, confirmPassword, currentPassword }: PasswordDto,
  ): Promise<any> {
    try {
      if (!user.password && user.loginType !== LoginType.DEFAULT) {
        throw new Error('Please create a password');
      }

      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password,
      );

      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      user.password = hashedPassword;
      user.salt = salt;

      await this.userService.saveUser(user);

      return 'Password changed';
    } catch (error) {
      logger.error(error);
      throw new HttpException(error?.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async changeEmail(user: User, { email }: EmailSignupDto): Promise<any> {
    try {
      const existingUser = await this.userService.getUserByEmail(email);

      if (existingUser && existingUser.id !== user.id) {
        throw new Error('Email already exists');
      }

      if (!user.email) {
        await this.sendEmailVerificationCode(email, user.username);

        return 'Please verify your new email';
      }

      if (user.email === email) {
        throw new Error('Email already exists');
      }

      await this.sendEmailVerificationCode(user.email, user.username);

      return 'Please verify your current email';
    } catch (error) {
      logger.error(error);
      throw new HttpException(error?.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async verifyAndChangeEmail(
    user: User,
    { email, code }: ChangeEmailDto,
  ): Promise<any> {
    try {
      const existingUser = await this.userService.getUserByEmail(email);
      if (existingUser) {
        throw new Error('Email already exists');
      }

      if (Number(code) !== user.accountVerificationCode) {
        throw new Error('Code is invalid');
      }

      user.email = email;
      user.emailVerified = true;
      user.accountVerificationCode = null;

      await this.userService.saveUser(user);

      return 'Email changed';
    } catch (error) {
      logger.error(error);
      throw new HttpException(error?.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async changePhone(
    user: User,
    { phone, countryCode }: StartChangePhoneDto,
  ): Promise<any> {
    try {
      const phoneNumber = phone.replace(/\D/g, '').replace(countryCode, '');

      const existingUser = await this.userService.getUserByPhone(phoneNumber);

      if (existingUser && existingUser.id !== user.id) {
        throw new Error('Phone number already exists');
      }

      if (!user.phone) {
        await this.sendPhoneVerificationCode(phone, user);

        return 'Please verify your new phone number';
      }

      if (user.phone === phoneNumber) {
        throw new Error('You are already using this phone number');
      }

      await this.sendPhoneVerificationCode(user.phone);

      return 'Please verify your current phone number';
    } catch (error) {
      logger.error(error);
      throw new HttpException(error?.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async verifyAndChangePhone(
    user: User,
    { phone, code, countryName, countryCode }: ChangePhoneDto,
  ): Promise<any> {
    try {
      const phoneNumber = phone.replace(/\D/g, '');

      const existingUser = await this.userService.getUserByPhone(phoneNumber);
      if (existingUser) {
        throw new Error('Phone number already exists');
      }

      if (Number(code) !== user.accountVerificationCode) {
        throw new Error('Code is invalid');
      }

      user.phone = phoneNumber.replace(/\D/g, '').replace(countryCode, '');
      user.countryName = countryName;
      user.countryCode = countryCode;
      user.phoneVerified = true;
      user.accountVerificationCode = null;

      await this.userService.saveUser(user);

      return 'Phone number changed';
    } catch (error) {
      logger.error(error);
      throw new HttpException(error?.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async socialAuth(data: {
    email: string;
    accessToken: string;
    refreshToken: string;
    provider: LoginType;
    name: string;
    profileImage: string;
    coverImage: string;
    bio: string;
    location: string;
    website: string;
    username: string;
    userAgent: string;
    ip: string;
    userType: UserAppType;
  }): Promise<any> {
    const {
      email,
      userType,
      accessToken,
      refreshToken,
      provider,
      name,
      userAgent,
      ip,
      username,
    } = data;

    const user = await this.userService.getUserByEmail(email);

    if (user) {
      if (user.loginType !== provider) {
        if (provider === LoginType.FACEBOOK) {
          user.facebookAuth = {
            accessToken,
            refreshToken,
            username: username,
          };
        }

        return {
          token: null,
          provider: user.loginType,
        };
      } else {
        if (provider === LoginType.FACEBOOK) {
          user.facebookAuth = {
            accessToken,
            refreshToken,
            username: username,
          };
        } else if (provider === LoginType.GOOGLE) {
          user.googleAuth = {
            accessToken,
            refreshToken,
            username: username,
          };
        } else if (provider === LoginType.TWITTER) {
          user.twitterAuth = {
            accessToken,
            refreshToken,
            username: username,
          };
        }

        const token = await this.registerDevice(user, userAgent, ip);
        return {
          token,
          provider,
        };
      }
    }

    const newUser = new User();
    newUser.email = email;
    newUser.emailVerified = true;

    if (provider === LoginType.FACEBOOK) {
      newUser.facebookAuth = {
        accessToken,
        refreshToken,
        username: username,
      };
    } else if (provider === LoginType.GOOGLE) {
      newUser.googleAuth = {
        accessToken,
        refreshToken,
        username: username,
      };
    } else if (provider === LoginType.TWITTER) {
      newUser.twitterAuth = {
        accessToken,
        refreshToken,
        username: username,
      };
    }

    const savedUser = await this.userService.saveUser(newUser);

    if (userType === UserAppType.USER) {
      await this.customerService.create({
        name,
        userId: savedUser.id,
      });
      savedUser.role = Role.CUSTOMER;
    } else {
      await this.brandService.create({
        userId: savedUser.id,
        name,
      });
      savedUser.role = Role.BRAND;
    }

    await this.userService.saveUser(savedUser);

    if (userType === UserAppType.BRAND) {
      const brand = await this.brandService.getBrandByUserId(user.id);

      await this.walletService.createWallet({
        brand,
      });
    }

    await this.walletService.createWallet({
      user: savedUser,
    });

    await this.mailService.sendMail({
      to: email,
      subject: `Welcome to ${process.env.APP_NAME}`,
      text: `Welcome to ${process.env.APP_NAME}`,
      html: `
        <p>Thanks for signing up to ${process.env.APP_NAME}. We're excited to have you on board!</p>
        `,
    });

    const token = await this.registerDevice(savedUser, userAgent, ip);

    return {
      token,
      provider,
    };
  }

  async forgotPassword({ identifier }: ForgotPasswordDto): Promise<any> {
    let user: User;

    if (identifier.includes('@')) {
      user = await this.userService.getUserByEmail(identifier);

      if (!user.emailVerified) {
        throw new HttpException('Email not verified', 400);
      }
    } else if (isNumber(identifier)) {
      user = await this.userService.getUserByPhone(identifier);

      if (!user.phoneVerified) {
        throw new HttpException('Phone not verified', 400);
      }
    } else {
      user = await this.userService.getUserByUsername(identifier);

      if (user.email && !user.emailVerified) {
        throw new HttpException('Email not verified', 400);
      }

      if (user.phone && !user.phoneVerified) {
        throw new HttpException('Phone not verified', 400);
      }
    }

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    if (isNumber(identifier)) {
      await this.sendPhoneVerificationCode(user.phone);
    } else {
      await this.sendEmailVerificationCode(user.email, user.username);
    }

    return {
      message: `Please verify your ${isNumber(identifier) ? 'phone' : 'email'}`,
      userId: user.id,
    };
  }

  async resetPassword({
    userId,
    code,
    password,
    confirmPassword,
  }: ResetPasswordDto): Promise<any> {
    const user = await this.userService.getUserById(userId);

    if (Number(code) !== user.accountVerificationCode) {
      throw new HttpException('Code is invalid', 400);
    }

    if (password !== confirmPassword) {
      throw new HttpException('Passwords do not match', 400);
    }

    if (password !== confirmPassword) {
      throw new HttpException('Passwords do not match', 400);
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.salt = salt;
    user.accountVerificationCode = null;

    await this.userService.saveUser(user);

    return 'Password changed';
  }
}
