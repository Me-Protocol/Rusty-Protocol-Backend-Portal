import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { jwtConfigurations, JwtPayload } from '@src/config/jwt.config';
import { isNumber } from '@src/utils/helpers/isNumber';
import { TwoFAType } from '@src/utils/enums/TwoFAType';
import { LoginType } from '@src/utils/enums/LoginType';
import { EmailSignupDto } from './dto/EmailSignupDto.dto';
import { PhoneSignupDto } from './dto/PhoneSignupDto.dto';
import { LoginDto } from './dto/LoginDto.dto';
import { Verify2FADto } from './dto/Verify2FADto.dto';
import { UpdateUserDto } from './dto/UpdateUserDto.dto';
import { PasswordDto } from './dto/PasswordDto.dto';
import { ChangeEmailDto, StartChangeEmailDto } from './dto/ChangeEmailDto.dto';
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
import { SyncRewardService } from '@src/globalServices/reward/sync/sync.service';
import { Enable2FADto } from './dto/Enable2FADto.dto';
import { UpdatePreferenceDto } from './dto/UpdatePreferenceDto.dto';
import fetch from 'node-fetch';
import { emailCode } from '@src/utils/helpers/email';
import { CollectionService } from '@src/globalServices/collections/collections.service';
import { ItemStatus } from '@src/utils/enums/ItemStatus';
import { EventEmitter2 } from '@node_modules/@nestjs/event-emitter';
import {
  CREATE_SENDGRID_CONTACT,
  CreateSendgridContactEvent,
} from '@src/globalServices/mail/create-sendgrid-contact.event';
import { GoogleSheetService } from '@src/globalServices/google-sheets/google-sheet.service';
import { BullService } from '@src/globalServices/task-queue/bull.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const geoip = require('geoip-lite');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const DeviceDetector = require('node-device-detector');
const deviceDetector = new DeviceDetector();

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

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
    private syncService: SyncRewardService,
    private collectionService: CollectionService,
    private readonly eventEmitter: EventEmitter2,
    private readonly googleService: GoogleSheetService,
    private readonly bullService: BullService,
  ) {}

  async writeDataToGoogleSheet(userId: string): Promise<any> {
    const user = await this.userService.getUserById(userId);

    if (!user) {
      return false;
    }

    const [firstName, lastName] = user.customer.name.split(' ');

    const capitalizedFirstName = capitalizeFirstLetter(firstName);
    const capitalizedLastName = capitalizeFirstLetter(lastName);
    await this.googleService.writeToSpreadsheet(
      user.id,
      user.email,
      capitalizedFirstName,
      capitalizedLastName,
    );
    return true;
  }

  async authorizeGoogle(): Promise<any> {
    return await this.googleService.authorize();
  }

  // Signs a token
  async signToken(payload: JwtPayload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: jwtConfigurations.secret,
      expiresIn: jwtConfigurations.signOptions.expiresIn,
    });
  }

  async getLocation(clientIp: string): Promise<any> {
    const response = await fetch(`http://ip-api.com/json/${clientIp}`);
    return response.json();
  }

  createDevice(
    user: User,
    deviceData: any,
    clientIp: string,
    location: any,
  ): Device {
    const device = new Device();
    device.user = user;
    device.name = deviceData.device.name;
    device.type = deviceData.device.type;
    device.agent = deviceData.client.name;
    device.userId = user.id;
    device.ip = clientIp;
    device.location = `${location?.city ?? ''}, ${location?.country ?? ''}`;
    device.timezone = location?.timezone;
    device.lat_lng = [location?.lat, location?.lon];
    device.range = [location?.lat, location?.lon];
    return device;
  }

  updateDeviceProperties(
    device: Device,
    deviceData: any,
    clientIp: string,
    location: any,
  ): void {
    device.name = deviceData.device.name;
    device.type = deviceData.device.type;
    device.agent = deviceData.client.name;
    device.ip = clientIp;
    device.location = `${location?.city ?? ''}, ${location?.country ?? ''}`;
    device.timezone = location?.timezone;
    device.lat_lng = [location?.lat, location?.lon];
    device.range = [location?.lat, location?.lon];
  }

  async updateLastLogin(user: User) {
    user.last_login = new Date();
    await this.userService.saveUser(user);
  }

  // Registers a user device and generates a token for the device
  async registerDevice(
    user: User,
    userAgent: string,
    clientIp: string,
  ): Promise<any> {
    const deviceData = deviceDetector.detect(userAgent);
    const location = await this.getLocation(clientIp);
    const device = this.createDevice(user, deviceData, clientIp, location);
    const checkDevice = await this.userService.checkDevice(
      clientIp,
      user.id,
      device.type,
    );

    if (checkDevice) {
      this.updateDeviceProperties(checkDevice, deviceData, clientIp, location);
      await this.userService.saveDevice(checkDevice);
      return checkDevice.token;
    }

    const savedDevice = await this.userService.saveDevice(device);
    const token = await this.signToken({
      email: user.email,
      id: user.id,
      phone: user.phone,
      username: user.username,
      device: savedDevice.id,
    });

    savedDevice.token = token;
    await this.userService.saveDevice(savedDevice);
    await this.updateLastLogin(user);
    return token;
  }

  async getUserDevices(userId: string): Promise<Device[]> {
    return await this.userService.getUserDevices(userId);
  }

  // For mobile notifications
  async updateDeviceToken(
    userId: string,
    deviceId: string,
    { device_token }: UpdateDeviceTokenDto,
  ): Promise<string> {
    const device = await this.userService.getDeviceById(userId, deviceId);
    if (!device) {
      throw new HttpException('Device not found', 404);
    }
    device.device_token = device_token;
    await this.userService.saveDevice(device);
    return 'ok';
  }

  async sendEmailVerificationCode(email: string, name: string): Promise<any> {
    email = email.toLowerCase();
    try {
      const user = await this.getUserAndThrowErrorIfNotFound(email);
      const verificationCode = await this.generateVerificationCode(user);
      //:TODO - push to queue in next iteration, possibly use bull
      await this.sendVerificationEmail(email, name, verificationCode);
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error?.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async getUserAndThrowErrorIfNotFound(email: string): Promise<User> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return user;
  }

  async generateVerificationCode(user: User): Promise<number> {
    const verificationCode = Math.floor(1000 + Math.random() * 9000);
    user.accountVerificationCode = verificationCode;
    await this.userService.saveUser(user);
    return verificationCode;
  }

  async sendVerificationEmail(
    email: string,
    name: string,
    verificationCode: number,
  ): Promise<void> {
    await this.mailService.sendMail({
      to: email,
      subject: 'Verify your email address',
      text: 'Verify your email address',
      html: `
    <p>Hello ${name},</p>
    <p>Use the code below to verify your email address.</p>
    ${emailCode({ code: verificationCode })}
    `,
    });
  }

  private cleanPhoneNumber(phoneNumber: string): string {
    return phoneNumber.replace(/\D/g, '');
  }

  async getUserByPhoneNumberAndThrowErrorIfNotFound(
    phone: string,
  ): Promise<User> {
    const user = await this.userService.getUserByPhone(phone);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return user;
  }

  async sendVerificationSms(
    phone: string,
    verificationCode: number,
  ): Promise<void> {
    await this.smsService.sendSms({
      to: `+${phone}`,
      body: `Hello 👋🏻, Use the code below to verify your phone number. Code: ${verificationCode}`,
    });
  }

  async sendPhoneVerificationCode(
    phoneNumber: string,
    user?: User,
  ): Promise<any> {
    try {
      const phone = this.cleanPhoneNumber(phoneNumber);

      user =
        user || (await this.getUserByPhoneNumberAndThrowErrorIfNotFound(phone));
      const verificationCode = await this.generateVerificationCode(user);
      await this.sendVerificationSms(phone, verificationCode);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async checkIfUserExists(email: string): Promise<void> {
    const user = await this.userService.getUserByEmail(email);
    if (user) {
      throw new Error('Email already exists. Please login.');
    }
  }

  async checkDuplicateBrandName(
    userType: UserAppType,
    name: string,
  ): Promise<void> {
    if (userType === UserAppType.BRAND) {
      const checkBrandName = await this.brandService.getBrandByName(name);
      if (checkBrandName) {
        throw new Error(`Brand with name ${name} already exists`);
      }
    }
  }

  async createAndSaveUser(
    email: string,
    password: string,
    confirmPassword: string,
    userType: UserAppType,
  ): Promise<User> {
    const newUser = new User();
    newUser.email = email;
    newUser.username = email.split('@')[0].toLowerCase();
    newUser.twoFAType = TwoFAType.EMAIL;
    this.validatePasswords(password, confirmPassword);
    const salt = await bcrypt.genSalt();
    newUser.password = await bcrypt.hash(password, salt);
    newUser.salt = salt;
    newUser.userType = userType;
    return await this.userService.saveUser(newUser);
  }

  private validatePasswords(password: string, confirmPassword: string): void {
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }
  }

  async handleUserTypeRoles(
    userType: UserAppType,
    newUser: User,
    name: string,
    brandId?: string,
  ): Promise<void> {
    await this.customerService.create({
      name,
      userId: newUser.id,
    });

    if (userType === UserAppType.USER) {
      if (brandId) {
        await this.brandService.createBrandCustomer({
          email: newUser.email,
          brandId,
          phone: newUser.phone,
          name,
        });
      }
      newUser.role = Role.CUSTOMER;
    } else if (userType === UserAppType.BRAND) {
      await this.brandService.create({
        userId: newUser.id,
        name,
      });
      newUser.role = Role.BRAND;
    }
    await this.userService.saveUser(newUser);
  }

  async generateAndSignToken(newUser: User): Promise<string> {
    return await this.signToken({
      email: newUser.email,
      id: newUser.id,
      phone: newUser.phone,
      username: newUser.username,
      device: null,
    });
  }

  async signupEmail({
    email,
    password,
    confirmPassword,
    name,
    userType,
    userAgent,
    ip,
    walletAddress,
    brandId,
  }: EmailSignupDto & {
    userAgent: string;
    ip: string;
    brandId?: string;
  }): Promise<string> {
    try {
      if (userType === UserAppType.USER && !walletAddress) {
        throw new Error('Wallet address is required');
      }

      const lowerCasedEmail = email.toLowerCase();
      await this.checkIfUserExists(lowerCasedEmail);
      await this.checkDuplicateBrandName(userType, name);
      const newUser = await this.createAndSaveUser(
        lowerCasedEmail,
        password,
        confirmPassword,
        userType,
      );
      await this.handleUserTypeRoles(userType, newUser, name, brandId);
      if (userType === UserAppType.BRAND) {
        await this.sendEmailVerificationCode(newUser.email, newUser.username);
      } else {
        await this.generateVerificationCode(newUser);
        await this.verifyEmail(
          newUser,
          newUser.accountVerificationCode,
          userAgent,
          ip,
        );
        // Queue to set wallet address
        await this.bullService.setCustomerWalletAddressQueue({
          userId: newUser.id,
          walletAddress,
        });

        // Queue campaign reward

        if (brandId) {
          await this.bullService.addCampainRewardToQueue({
            userId: newUser.id,
            brandId,
          });
        }

        await this.collectionService.create({
          name: 'Favorites',
          description: 'Favorites collection',
          image: '',
          status: ItemStatus.ACTIVE,
          userId: newUser.id,
          isDefault: true,
        });
      }

      const token = await this.generateAndSignToken(newUser);

      const nameParts = name.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ');
      this.eventEmitter.emit(
        CREATE_SENDGRID_CONTACT,
        new CreateSendgridContactEvent(
          newUser.email,
          firstName,
          lastName,
          userType,
        ),
      );

      if (userType === UserAppType.USER) {
        await this.writeDataToGoogleSheet(newUser.id);
      }

      return token;
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  private validateUser(user: User, is2Fa?: boolean): void {
    if (!user) {
      throw new Error('User not found');
    }

    if (user.emailVerified && !is2Fa) {
      throw new Error('Email already verified');
    }
  }

  private validateVerificationCode(user: User, code: number): void {
    if (user.accountVerificationCode !== Number(code)) {
      throw new Error('Invalid code');
    }
  }

  async updateUserVerificationStatus(
    user: User,
    is2Fa?: boolean,
  ): Promise<void> {
    user.emailVerified = true;
    user.accountVerificationCode = null;
    await this.userService.saveUser(user);
  }

  async handleRewardRegistry(user: User, is2Fa?: boolean): Promise<void> {
    if (!is2Fa) {
      const rewardRegistry =
        await this.syncService.getAllRegistryRecordsByIdentifer(user.email);

      for (const registry of rewardRegistry) {
        if (!registry.userId) {
          registry.userId = user.id;
          await this.syncService.saveRegistry(registry);
        }
      }
    }
  }

  async handleBrandWalletCreation(user: User): Promise<void> {
    if (user.userType === UserAppType.BRAND) {
      const brand = await this.brandService.getBrandByUserId(user.id);
      await this.walletService.createWallet({ brand, user });
    }
  }

  async handleUserWalletCreation(user: User): Promise<void> {
    await this.walletService.createWallet({ user });
  }

  async sendWelcomeEmail(user: User): Promise<void> {
    if (user.email) {
      await this.mailService.sendMail({
        to: user.email,
        subject: `Welcome to ${process.env.APP_NAME}`,
        text: `Welcome to ${process.env.APP_NAME}`,
        html: `<p>Thanks for signing up to ${process.env.APP_NAME}. We're excited to have you on board!</p>`,
      });
    }
  }

  async verifyEmail(
    userInfo: User,
    code: number,
    userAgent: string,
    clientIp: string,
    is2Fa?: boolean,
  ): Promise<string> {
    try {
      const user = await this.userService.getUserByEmail(userInfo.email);
      this.validateUser(user, is2Fa);
      this.validateVerificationCode(user, code);

      await this.updateUserVerificationStatus(user, is2Fa);
      await this.handleRewardRegistry(user, is2Fa);

      if (!is2Fa) {
        await this.handleBrandWalletCreation(user);
        await this.handleUserWalletCreation(user);
        await this.syncUserToBrandCustomerRecords(user);
      }

      const token = await this.registerDevice(user, userAgent, clientIp);
      await this.sendWelcomeEmail(user);

      return token;
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error?.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async syncUserToBrandCustomerRecords(user: User): Promise<void> {
    const brandCustomers =
      await this.brandService.getBrandCustomersByEmailAddress(user.email);

    for (const brandCustomer of brandCustomers) {
      brandCustomer.userId = user.id;
      brandCustomer.isOnboarded = true;
      await this.brandService.saveBrandCustomer(brandCustomer);
    }
  }

  async checkIfPhoneExists(phone: string): Promise<void> {
    const user = await this.userService.getUserByPhone(phone);
    if (user) {
      throw new Error('Phone already exists');
    }
  }

  async createAndSaveUserWithPhoneNumber(
    phone: string,
    countryCode: string,
    countryAbbr: string,
    password: string,
    confirmPassword: string,
    userType: UserAppType,
    name: string,
  ): Promise<User> {
    const newUser = new User();
    newUser.phone = phone;
    newUser.countryCode = countryCode;
    newUser.countryName = countryAbbr;
    newUser.username = Math.random().toString(36).substring(7);
    newUser.twoFAType = TwoFAType.SMS;

    this.validatePasswords(password, confirmPassword);

    const salt = bcrypt.genSaltSync();
    newUser.password = bcrypt.hashSync(password, salt);
    newUser.salt = salt;
    newUser.userType = userType;

    return await this.userService.saveUser(newUser);
  }

  async signupPhone({
    phone,
    countryCode,
    countryAbbr,
    password,
    confirmPassword,
    name,
    userType,
  }: PhoneSignupDto): Promise<string> {
    try {
      const cleanedPhone = this.cleanPhoneNumber(phone);
      await this.checkIfPhoneExists(cleanedPhone);
      const newUser = await this.createAndSaveUserWithPhoneNumber(
        cleanedPhone,
        countryCode,
        countryAbbr,
        password,
        confirmPassword,
        userType,
        name,
      );
      await this.handleUserTypeRoles(userType, newUser, name);
      return await this.generateAndSignToken(newUser);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error?.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async handleWalletCreation(user: User): Promise<void> {
    if (user.userType === UserAppType.BRAND) {
      const brand = await this.brandService.getBrandByUserId(user.id);
      await this.walletService.createWallet({ brand });
    }
    await this.walletService.createWallet({ user });
  }

  async verifyPhone(
    user: User,
    code: number,
    userAgent: string,
    clientIp: string,
    is2Fa?: boolean,
  ): Promise<string> {
    try {
      this.validateUser(user, is2Fa);
      this.validateVerificationCode(user, code);
      await this.updateUserVerificationStatus(user, is2Fa);
      if (!is2Fa) {
        await this.handleWalletCreation(user);
      }
      return await this.registerDevice(user, userAgent, clientIp);
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async isPasswordValid(password: string, user: User): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }

  async getUserForLogin(identifier: string, password: string): Promise<User> {
    let user: User;

    if (identifier.includes('@')) {
      user = await this.userService.getUserByEmail(identifier);
    } else if (isNumber(identifier)) {
      user = await this.userService.getUserByPhone(identifier);
    } else {
      user = await this.userService.getUserByUsername(identifier);
    }

    return user;
  }

  private validateUserForLogin(user: User, identifier: string): void {
    if (!user) {
      throw new Error('Invalid login details');
    }

    if (!user.password) {
      throw new Error(
        'Please use the forgot password button to create a password',
      );
    }
  }

  async validatePasswordForLogin(password: string, user: User): Promise<void> {
    if (!(await this.isPasswordValid(password, user))) {
      throw new Error('Invalid login details');
    }
  }

  async validateVerificationForLogin(user: User) {
    if (user.email && !user.emailVerified) {
      await this.sendEmailVerificationCode(user.email, user.username);

      const token = await this.generateAndSignToken(user);

      return {
        message: 'Verify email address',
        verifyToken: token,
      };
    }

    if (user.phone && !user.phoneVerified) {
      throw new Error('Phone not verified');
    }
  }

  async handleTwoFA(user: User): Promise<void> {
    if (user.twoFAType === TwoFAType.EMAIL) {
      await this.sendEmailVerificationCode(user.email, user.username);
    } else if (user.twoFAType === TwoFAType.SMS) {
      await this.sendPhoneVerificationCode(user.phone);
    } else {
      throw new HttpException('Invalid 2FA type', 400);
    }
  }

  async login(
    { identifier, password }: LoginDto,
    userAgent: string,
    clientIp: string,
  ): Promise<any> {
    try {
      identifier = identifier.trim().toLocaleLowerCase();
      const user = await this.getUserForLogin(identifier, password);
      this.validateUserForLogin(user, identifier);
      await this.validatePasswordForLogin(password, user);
      const isVerified = await this.validateVerificationForLogin(user);

      if (isVerified?.verifyToken) {
        return isVerified;
      }

      if (user.is2faEnabled) {
        await this.handleTwoFA(user);
        return {
          message: `Verify 2FA`,
          userId: user.id,
        };
      }
      return await this.registerDevice(user, userAgent, clientIp);
    } catch (error) {
      console.log(error);
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
    let token: string;

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
  ): Promise<string> {
    try {
      this.validatePasswordChange(user, currentPassword);
      await this.validateCurrentPassword(currentPassword, user.password);
      this.validatePasswords(password, confirmPassword);
      const { salt, hashedPassword } = await this.hashNewPassword(password);
      this.updateUserPassword(user, hashedPassword, salt);
      await this.saveUserAfterPasswordChange(user);
      return 'Password changed';
    } catch (error) {
      logger.error(error);
      throw new HttpException(error?.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  private validatePasswordChange(user: User, currentPassword: string): void {
    if (!user.password && user.loginType !== LoginType.DEFAULT) {
      throw new Error('Please create a password');
    }
  }

  async validateCurrentPassword(
    currentPassword: string,
    userPassword: string,
  ): Promise<void> {
    const isPasswordValid = await bcrypt.compare(currentPassword, userPassword);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
  }

  async hashNewPassword(
    password: string,
  ): Promise<{ salt: string; hashedPassword: string }> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return { salt, hashedPassword };
  }

  private updateUserPassword(
    user: User,
    hashedPassword: string,
    salt: string,
  ): void {
    user.password = hashedPassword;
    user.salt = salt;
  }

  async saveUserAfterPasswordChange(user: User): Promise<void> {
    await this.userService.saveUser(user);
  }

  async changeEmail(
    user: User,
    { email }: StartChangeEmailDto,
  ): Promise<string> {
    try {
      await this.validateNewEmail(user, email);

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

  async validateNewEmail(user: User, newEmail: string): Promise<void> {
    const existingUser = await this.userService.getUserByEmail(newEmail);
    if (existingUser && existingUser.id !== user.id) {
      throw new Error('Email already exists');
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
    username?: string;
    userAgent: string;
    ip: string;
    userType: UserAppType;
  }): Promise<any> {
    try {
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
      const userNameFromEmail = email.split('@')[0].toLowerCase();

      if (user) {
        return await this.handleExistingUser(
          user,
          provider,
          accessToken,
          refreshToken,
          username,
          userAgent,
          ip,
        );
      } else {
        return await this.handleNewUser(
          email,
          userType,
          accessToken,
          refreshToken,
          provider,
          name,
          userNameFromEmail,
          userAgent,
          ip,
        );
      }
    } catch (error) {
      logger.error(error);
      throw new HttpException(error?.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async sendWelcomeEmailSocial(email: string): Promise<void> {
    await this.mailService.sendMail({
      to: email,
      subject: `Welcome to ${process.env.APP_NAME}`,
      text: `Thanks for signing up to ${process.env.APP_NAME}. We're excited to have you on board!`,
      html: `<p>Thanks for signing up to ${process.env.APP_NAME}. We're excited to have you on board!</p>`,
    });
  }

  async handleExistingUser(
    user: User,
    provider: LoginType,
    accessToken: string,
    refreshToken: string,
    username: string,
    userAgent: string,
    ip: string,
  ): Promise<{ token: string | null; provider: LoginType }> {
    if (user.loginType !== provider) {
      if (provider === LoginType.FACEBOOK) {
        user.facebookAuth = {
          accessToken,
          refreshToken,
          username,
        };
      }
      return {
        token: null,
        provider: user.loginType,
      };
    } else {
      await this.updateUserSocialAuth(
        user,
        provider,
        accessToken,
        refreshToken,
        username,
      );

      const token = await this.registerDevice(user, userAgent, ip);
      return {
        token,
        provider,
      };
    }
  }

  async updateUserSocialAuth(
    user: User,
    provider: LoginType,
    accessToken: string,
    refreshToken: string,
    username: string,
  ): Promise<void> {
    if (provider === LoginType.FACEBOOK) {
      user.facebookAuth = {
        accessToken,
        refreshToken,
        username,
      };
    } else if (provider === LoginType.GOOGLE) {
      user.googleAuth = {
        accessToken,
        refreshToken,
        username,
      };
    } else if (provider === LoginType.TWITTER) {
      user.twitterAuth = {
        accessToken,
        refreshToken,
        username,
      };
    }

    await this.userService.saveUser(user);
  }

  async handleNewUser(
    email: string,
    userType: UserAppType,
    accessToken: string,
    refreshToken: string,
    provider: LoginType,
    name: string,
    username: string,
    userAgent: string,
    ip: string,
    brandId?: string,
  ): Promise<{ token: string; provider: LoginType }> {
    const newUser = new User();
    newUser.email = email;
    newUser.emailVerified = true;
    newUser.username = username;
    newUser.loginType = provider;

    if (provider === LoginType.FACEBOOK) {
      newUser.facebookAuth = {
        accessToken,
        refreshToken,
        username,
      };
    } else if (provider === LoginType.GOOGLE) {
      newUser.googleAuth = {
        accessToken,
        refreshToken,
        username,
      };
    } else if (provider === LoginType.TWITTER) {
      newUser.twitterAuth = {
        accessToken,
        refreshToken,
        username,
      };
    }
    const savedUser = await this.userService.saveUser(newUser);
    await this.handleUserTypeRoles(userType, savedUser, name);
    await this.handleWalletCreation(savedUser);
    await this.sendWelcomeEmailSocial(email);
    const token = await this.registerDevice(savedUser, userAgent, ip);
    return {
      token,
      provider,
    };
  }

  async forgotPassword({ identifier }: ForgotPasswordDto): Promise<any> {
    try {
      const user = await this.getUserForPasswordReset(identifier);
      this.validateUserForPasswordReset(user, identifier);
      await this.sendVerificationCodeForPasswordReset(user);
      return {
        message: `Please verify your ${this.getVerificationMethodMessage(
          identifier,
        )}`,
        userId: user.id,
      };
    } catch (error) {
      logger.error(error);
      throw new HttpException(error?.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async getUserForPasswordReset(identifier: string): Promise<User> {
    identifier = identifier.trim().toLowerCase();

    if (identifier.includes('@')) {
      return await this.userService.getUserByEmail(identifier);
    } else {
      return await this.userService.getUserByUsername(identifier);
    }
  }

  private validateUserForPasswordReset(user: User, identifier: string): void {
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    if (user.email && !user.emailVerified) {
      throw new HttpException('Email not verified', 400);
    }

    if (user.phone && !user.phoneVerified) {
      throw new HttpException('Phone not verified', 400);
    }
  }

  async sendVerificationCodeForPasswordReset(user: User): Promise<void> {
    if (user.phone) {
      await this.sendPhoneVerificationCode(user.phone, user);
    } else if (user.email) {
      await this.sendEmailVerificationCode(user.email, user.username);
    }
  }

  private getVerificationMethodMessage(identifier: string): string {
    return isNumber(identifier) ? 'phone' : 'email';
  }

  async resetPassword({
    userId,
    code,
    password,
    confirmPassword,
  }: ResetPasswordDto): Promise<string> {
    try {
      const user = await this.getUserForPasswordResetWithCode(userId, code);
      this.validateResetPasswordInputs(user, password, confirmPassword);
      await this.updateResetUserPassword(user, password);

      return 'Password changed';
    } catch (error) {
      logger.error(error);
      throw new HttpException(error?.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async getUserForPasswordResetWithCode(
    userId: string,
    code: number,
  ): Promise<User> {
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    if (Number(code) !== user.accountVerificationCode) {
      throw new HttpException('Code is invalid', 400);
    }

    return user;
  }

  private validateResetPasswordInputs(
    user: User,
    password: string,
    confirmPassword: string,
  ): void {
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    if (password !== confirmPassword) {
      throw new HttpException('Passwords do not match', 400);
    }
  }

  async updateResetUserPassword(user: User, password: string): Promise<void> {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, salt);
    user.salt = salt;
    user.accountVerificationCode = null;
    await this.userService.saveUser(user);
  }

  async enableDisable2FA(body: Enable2FADto): Promise<any> {
    const user = await this.userService.getUserById(body.userId);
    user.is2faEnabled = body.enable;
    user.twoFAType = body.twoFAType;
    await this.userService.saveUser(user);
    return {
      message: body.enable ? '2FA enabled' : '2FA disabled',
      enable: body.enable,
    };
  }

  async updatePreferences(body: UpdatePreferenceDto) {
    const user = await this.userService.getUserById(body.userId);
    if (body.language) user.language = body.language;
    if (body.currency) user.currency = body.currency;
    if (body.timezone) user.timezone = body.timezone;
    if (body.region) user.region = body.region;

    await this.userService.saveUser(user);

    return 'ok';
  }
}
