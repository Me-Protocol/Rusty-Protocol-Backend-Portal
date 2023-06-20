import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { MailService } from '../mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { SmsService } from '../sms/sms.service';
import {
  ChangeEmailDto,
  ChangePhoneDto,
  EmailSignupDto,
  ForgotPasswordDto,
  LoginDto,
  PasswordDto,
  PhoneSignupDto,
  ResetPasswordDto,
  UpdateDeviceTokenDto,
  UpdateUserDto,
  Verify2FADto,
} from './dto/user.dto';
import { JwtPayload, jwtConfigurations } from '@src/config/jwt.config';
import { Device } from './entities/device.entity';
import { ElasticIndex } from '../search/index/search.index';
import { isNumber } from '@src/utils/helpers/isNumber';
import { selectUser } from '@src/utils/helpers/selectUser';
import { TwoFAType } from '@src/utils/enums/TwoFAType';
import { LoginType } from '@src/utils/enums/LoginType';
import { CustomerService } from '../customer/customer.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const geoip = require('geoip-lite');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const DeviceDetector = require('node-device-detector');

const deviceDetector = new DeviceDetector();

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
    private readonly mailService: MailService,
    private jwtService: JwtService,
    private smsService: SmsService,
    private readonly elasticIndex: ElasticIndex,
    private customerService: CustomerService,
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
    const location = 'Lagos, NG'; //TODO:: please remove the hard coded location

    const device = this.deviceRepository.create({
      name: deviceData?.device?.model,
      type: deviceData?.device?.type,
      agent: deviceData?.client?.name,
      userId: user.id,
      ip: clientIp,
      location: location,
    });

    const token = await this.signToken({
      email: user.email,
      id: user.id,
      phone: user.phone,
      username: user.username,
      device: device.id,
    });

    device.token = token;
    await this.deviceRepository.save(device);
    user.last_login = new Date();
    await this.saveUser(user);

    return token;
  }

  async getDeviceById(userId: string, id: string): Promise<Device> {
    const device = await this.deviceRepository.findOne({
      where: {
        id,
        userId,
      },
    });

    return device;
  }

  private async saveUserPrivate(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async getUserDevices(userId: string): Promise<Device[]> {
    const devices = await this.deviceRepository.find({
      where: {
        userId,
      },
      select: [
        'id',
        'name',
        'type',
        'agent',
        'ip',
        'location',
        'createdAt',
        'device_token',
      ],
    });
    return devices;
  }

  // For mobile notifications
  async updateDeviceToken(
    userId: string,
    id: string,
    { device_token }: UpdateDeviceTokenDto,
  ): Promise<any> {
    const device = await this.deviceRepository.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!device) throw new HttpException('Device not found', 404);

    device.device_token = device_token;
    await this.deviceRepository.save(device);

    return 'ok';
  }

  async getUserById(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['customer', 'brand'],
    });
  }

  async getPublicUserById(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id,
      },
      select: selectUser,
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  async getUserByUsername(username: string): Promise<User> {
    return await this.userRepository.findOneBy({ username });
  }

  async getUserByPhone(phone: string): Promise<User> {
    return await this.userRepository.findOneBy({ phone });
  }

  async saveUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findUsersByPhone(phone: Array<string>): Promise<User[]> {
    return await this.userRepository.find({
      where: {
        phone: In(phone),
      },
    });
  }

  async sendEmailVerificationCode(email: string): Promise<any> {
    email = email.toLowerCase();

    try {
      const user = await this.getUserByEmail(email);

      if (!user) throw new HttpException('User not found', 404);

      user.accountVerificationCode = Math.floor(1000 + Math.random() * 9000);
      await this.saveUser(user);

      await this.mailService.sendMail({
        to: email,
        subject: 'Verify your email address',
        text: 'Verify your email address',
        html: `
        <p>Hello 👋🏻,</p>
        <p>Use the code below to verify your email address.</p>
        <p>Code: ${user.accountVerificationCode}</p>
        `,
      });
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async sendPhoneVerificationCode(phoneNumber: string): Promise<any> {
    try {
      const phone = phoneNumber.replace(/\D/g, '');

      const user = await this.getUserByPhone(phone);

      if (!user) throw new HttpException('User not found', 404);

      user.accountVerificationCode = Math.floor(1000 + Math.random() * 9000);
      await this.saveUser(user);

      this.smsService.sendSms({
        to: `+${phone}`,
        body: `Hello 👋🏻, Use the code below to verify your phone number. Code: ${user.accountVerificationCode}`,
      });
    } catch (error) {
      throw new HttpException(error, 500);
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
      const user = await this.getUserByEmail(email);
      if (user) {
        throw new HttpException('Email already exists', 400);
      }

      const newUser = new User();
      newUser.email = email?.toLowerCase();
      newUser.username = email.split('@')[0].toLowerCase();
      newUser.twoFAType = TwoFAType.EMAIL;

      if (password !== confirmPassword) {
        throw new HttpException('Passwords do not match', 400);
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      newUser.password = hashedPassword;
      newUser.salt = salt;
      newUser.userType = userType;

      const saveUser = await this.saveUser(newUser);
      await this.sendEmailVerificationCode(email);
      await this.customerService.create({
        name,
        userId: saveUser.id,
      });

      const token = await this.signToken({
        email: newUser.email,
        id: saveUser.id,
        phone: newUser.phone,
        username: newUser.username,
        device: null,
      });

      return token;
    } catch (error) {
      throw new HttpException(error, 400);
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
      console.log(user);

      if (!user) {
        throw new HttpException('User not found', 404);
      }

      if (user.emailVerified && !is2Fa) {
        throw new HttpException('Email already verified', 400);
      }

      if (user.accountVerificationCode !== Number(code)) {
        throw new HttpException('Invalid code', 400);
      }

      user.emailVerified = true;
      user.accountVerificationCode = null;
      await this.saveUser(user);

      if (!is2Fa) {
        // TODO CREATE WALLET
      }

      const token = await this.registerDevice(user, userAgent, clientIp);

      // welcome email
      if (user.email) {
        await this.mailService.sendMail({
          to: user.email,
          subject: 'Welcome to Me Protocol',
          text: 'Welcome to Me Protocol',
          html: `
        <p>Thanks for signing up to Me Protocol. We're excited to have you on board!</p>
        `,
        });
      }

      return token;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
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

      const user = await this.getUserByPhone(phone);
      if (user) {
        throw new HttpException('Phone already exists', 400);
      }

      const newUser = new User();
      newUser.phone = phone.replace(/\D/g, '').replace(countryCode, '');
      newUser.countryCode = countryCode;
      newUser.countryAbbr = countryAbbr;
      newUser.username = Math.random().toString(36).substring(7);
      newUser.twoFAType = TwoFAType.SMS;

      if (password !== confirmPassword) {
        throw new HttpException('Passwords do not match', 400);
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      newUser.password = hashedPassword;
      newUser.salt = salt;
      newUser.userType = userType;

      await this.saveUser(newUser);
      await this.sendPhoneVerificationCode(phone);
      const saveUser = await this.saveUser(newUser);
      await this.customerService.create({
        name,
        userId: saveUser.id,
      });

      const token = await this.signToken({
        email: newUser.email,
        id: newUser.id,
        phone: newUser.phone,
        username: newUser.username,
        device: null,
      });

      return token;
    } catch (error) {
      throw new HttpException(error, 500);
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
        throw new HttpException('User not found', 404);
      }

      if (user.phoneVerified && !is2Fa) {
        throw new HttpException('Phone already verified', 400);
      }

      if (user.accountVerificationCode !== Number(code)) {
        throw new HttpException('Invalid code', 400);
      }

      user.phoneVerified = true;
      user.accountVerificationCode = null;
      await this.saveUser(user);

      if (!is2Fa) {
        // TODO CREATE WALLET
      }

      const token = await this.registerDevice(user, userAgent, clientIp);

      return token;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
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
        user = await this.getUserByEmail(identifier);

        if (!user) {
          throw new HttpException('Invalid login details', 404);
        }

        if (!user.emailVerified) {
          throw new HttpException('Email not verified', 400);
        }
      } else if (isNumber(identifier)) {
        user = await this.getUserByPhone(identifier);

        if (!user) {
          throw new HttpException('Invalid login details', 404);
        }

        if (!user.phoneVerified) {
          throw new HttpException('Phone not verified', 400);
        }
      } else {
        user = await this.getUserByUsername(identifier);

        if (!user) {
          throw new HttpException('Invalid login details', 404);
        }

        if (user.email && !user.emailVerified) {
          throw new HttpException('Email not verified', 400);
        }

        if (user.phone && !user.phoneVerified) {
          throw new HttpException('Phone not verified', 400);
        }
      }

      if (!user) {
        throw new HttpException('Invalid login details', 404);
      }

      if (!user.password) {
        throw new HttpException(
          'Please use the forgot password button to create a password',
          400,
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new HttpException('Invalid login details', 400);
      }

      if (user.is2faEnabled) {
        if (user.twoFAType === TwoFAType.EMAIL) {
          await await this.sendEmailVerificationCode(user.email);
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
      console.log(error);
      throw new HttpException(error, 500);
    }
  }

  async verify2FALogin(
    { code, userId }: Verify2FADto,
    userAgent: string,
    ip: string,
  ): Promise<any> {
    const user = await this.getUserById(userId);

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
      const device = await this.getDeviceById(userId, deviceId);
      if (!device) {
        return 'Logged out! See you soon :)';
      }

      await this.deviceRepository.delete({
        id: device.id,
      });

      return 'Logged out! See you soon :)';
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }

  async changeUsername(user: User, { username }: UpdateUserDto): Promise<any> {
    try {
      const existingUser = await this.getUserByUsername(username);

      if (existingUser && existingUser.id !== user.id) {
        throw new HttpException('Username already exists', 400);
      }

      user.username = username.toLocaleLowerCase();

      await this.saveUser(user);

      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }

  async changePassword(
    user: User,
    { password, confirmPassword, currentPassword }: PasswordDto,
  ): Promise<any> {
    try {
      if (!user.password && user.loginType !== LoginType.DEFAULT) {
        throw new HttpException('Please create a password', 400);
      }

      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password,
      );

      if (!isPasswordValid) {
        throw new HttpException('Invalid password', 400);
      }

      if (password !== confirmPassword) {
        throw new HttpException('Passwords do not match', 400);
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      user.password = hashedPassword;
      user.salt = salt;

      await this.saveUser(user);

      return 'Password changed';
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }

  async changeEmail(user: User, { email }: EmailSignupDto): Promise<any> {
    try {
      const existingUser = await this.getUserByEmail(email);

      if (existingUser && existingUser.id !== user.id) {
        throw new HttpException('Email already exists', 400);
      }

      if (!user.email) {
        await this.sendEmailVerificationCode(email);

        return 'Please verify your new email';
      }

      if (user.email === email) {
        throw new HttpException('Email already exists', 400);
      }

      await this.sendEmailVerificationCode(user.email);

      return 'Please verify your current email';
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }

  async verifyAndChangeEmail(
    user: User,
    { email, code }: ChangeEmailDto,
  ): Promise<any> {
    try {
      const existingUser = await this.getUserByEmail(email);
      if (existingUser) {
        throw new HttpException('Email already exists', 400);
      }

      if (Number(code) !== user.accountVerificationCode) {
        throw new HttpException('Code is invalid', 400);
      }

      user.email = email;
      user.emailVerified = true;
      user.accountVerificationCode = null;

      await this.saveUser(user);

      return 'Email changed';
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }

  async changePhone(
    user: User,
    { phone, countryCode }: PhoneSignupDto,
  ): Promise<any> {
    try {
      const phoneNumber = phone.replace(/\D/g, '').replace(countryCode, '');

      const existingUser = await this.getUserByPhone(phoneNumber);

      if (existingUser && existingUser.id !== user.id) {
        throw new HttpException('Phone number already exists', 400);
      }

      if (!user.phone) {
        await this.sendPhoneVerificationCode(phone);

        return 'Please verify your new phone number';
      }

      if (user.phone === phoneNumber) {
        throw new HttpException('Phone number already exists', 400);
      }

      await this.sendPhoneVerificationCode(user.phone);

      return 'Please verify your current phone number';
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }

  async verifyAndChangePhone(
    user: User,
    { phone, code, countryAbbr, countryCode }: ChangePhoneDto,
  ): Promise<any> {
    try {
      const phoneNumber = phone.replace(/\D/g, '');

      const existingUser = await this.getUserByPhone(phoneNumber);
      if (existingUser) {
        throw new HttpException('Phone number already exists', 400);
      }

      if (Number(code) !== user.accountVerificationCode) {
        throw new HttpException('Code is invalid', 400);
      }

      user.phone = phoneNumber.replace(/\D/g, '').replace(countryCode, '');
      user.countryAbbr = countryAbbr;
      user.countryCode = countryCode;
      user.phoneVerified = true;
      user.accountVerificationCode = null;

      await this.saveUser(user);

      return 'Phone number changed';
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
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
  }): Promise<any> {
    const {
      email,
      accessToken,
      refreshToken,
      provider,
      name,
      profileImage,
      coverImage,
      bio,
      location,
      website,
      userAgent,
      ip,
    } = data;

    const user = await this.getUserByEmail(email);

    if (user) {
      if (user.loginType !== provider) {
        if (provider === LoginType.FACEBOOK) {
          user.facebookAuth = {
            accessToken,
            refreshToken,
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
          };
        } else if (provider === LoginType.GOOGLE) {
          user.googleAuth = {
            accessToken,
            refreshToken,
          };
        } else if (provider === LoginType.TWITTER) {
          user.twitterAuth = {
            accessToken,
            refreshToken,
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
      };
    } else if (provider === LoginType.GOOGLE) {
      newUser.googleAuth = {
        accessToken,
        refreshToken,
      };
    } else if (provider === LoginType.TWITTER) {
      newUser.twitterAuth = {
        accessToken,
        refreshToken,
      };
    }

    const savedUser = await this.saveUser(newUser);

    await this.customerService.create({
      name,
      userId: savedUser.id,
    });

    // TODO CREATE WALLET

    await this.mailService.sendMail({
      to: email,
      subject: 'Welcome to Me Protocol',
      text: 'Welcome to Me Protocol',
      html: `
        <p>Thanks for signing up to Me Protocol. We're excited to have you on board!</p>
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
      user = await this.getUserByEmail(identifier);

      if (!user.emailVerified) {
        throw new HttpException('Email not verified', 400);
      }
    } else if (isNumber(identifier)) {
      user = await this.getUserByPhone(identifier);

      if (!user.phoneVerified) {
        throw new HttpException('Phone not verified', 400);
      }
    } else {
      user = await this.getUserByUsername(identifier);

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
      await this.sendEmailVerificationCode(user.email);
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
    const user = await this.getUserById(userId);

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

    await this.saveUser(user);

    return 'Password changed';
  }
}
