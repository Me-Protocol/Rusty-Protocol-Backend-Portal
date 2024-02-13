import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../globalServices/user/user.service';
import { BrandService } from '../../globalServices/brand/brand.service';
import { FiatWalletService } from '../../globalServices/fiatWallet/fiatWallet.service';
import { SyncRewardService } from '../../globalServices/reward/sync/sync.service';
import { MailService } from '../../globalServices/mail/mail.service';
import { HttpException } from '@nestjs/common';
import { AuthenticationService } from './service';
import { UserAppType } from '../../utils/enums/UserAppType';

jest.mock('../../globalServices/user/user.service');
jest.mock('../../globalServices/brand/brand.service');
jest.mock('../../globalServices/fiatWallet/fiatWallet.service');
jest.mock('../../globalServices/reward/sync/sync.service');
jest.mock('../../globalServices/mail/mail.service');

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let userService: UserService;
  let brandService: BrandService;
  let fiatWalletService: FiatWalletService;
  let syncRewardService: SyncRewardService;
  let mailService: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        UserService,
        BrandService,
        FiatWalletService,
        SyncRewardService,
        MailService,
      ],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
    userService = module.get<UserService>(UserService);
    brandService = module.get<BrandService>(BrandService);
    fiatWalletService = module.get<FiatWalletService>(FiatWalletService);
    syncRewardService = module.get<SyncRewardService>(SyncRewardService);
    mailService = module.get<MailService>(MailService);
  });

  describe('signupEmail', () => {
    it('should create and return a new user token on successful email signup', async () => {
      const mockUser = {
        id: '123',
        email: 'test@example.com',
        username: 'test',
        twoFAType: 'EMAIL',
      };

      jest
        .spyOn(userService, 'checkIfUserExists' as keyof UserService)
        .mockResolvedValue('checkIfUserExists');
      jest
        .spyOn(
          service,
          'checkDuplicateBrandName' as keyof AuthenticationService,
        )
        .mockResolvedValue('checkDuplicateBrandName');
      jest
        .spyOn(service, 'createAndSaveUser' as keyof AuthenticationService)
        .mockResolvedValue(mockUser);
      jest
        .spyOn(service, 'handleUserTypeRoles' as keyof AuthenticationService)
        .mockResolvedValue('handleUserTypeRoles');
      jest
        .spyOn(service, 'generateAndSignToken' as keyof AuthenticationService)
        .mockResolvedValue('mockToken');
      jest
        .spyOn(
          service,
          'sendEmailVerificationCode' as keyof AuthenticationService,
        )
        .mockResolvedValue('sendEmailVerificationCode');

      const result = await service.signupEmail({
        email: 'test@example.com',
        password: 'password',
        confirmPassword: 'password',
        name: 'Test Brand',
        userType: UserAppType.BRAND,
        walletAddress: 'wefwefwe',
        ip: '0.0',
        userAgent: 'test',
      });

      expect(result).toEqual('mockToken');
    });

    it('should throw HttpException if user already exists', async () => {
      jest
        .spyOn(userService, 'checkIfUserExists' as keyof UserService)
        .mockRejectedValue(new Error('Email already exists'));

      await expect(
        service.signupEmail({
          email: 'test@example.com',
          password: 'password',
          confirmPassword: 'password',
          name: 'Test Brand',
          userType: UserAppType.BRAND,
          walletAddress: 'wefwefwe',
          ip: '0.0',
          userAgent: 'test',
        }),
      ).rejects.toThrowError(HttpException);

      expect(service.checkDuplicateBrandName).not.toBeCalled();
      expect(service.createAndSaveUser).not.toBeCalled();
      expect(service.handleUserTypeRoles).not.toBeCalled();
      expect(service.generateAndSignToken).not.toBeCalled();
      expect(service.sendEmailVerificationCode).not.toBeCalled();
    });

    it('should throw HttpException if brand name already exists', async () => {
      jest
        .spyOn(userService, 'checkIfUserExists' as keyof UserService)
        .mockResolvedValue('checkIfUserExists');
      jest
        .spyOn(
          service,
          'checkDuplicateBrandName' as keyof AuthenticationService,
        )
        .mockRejectedValue(
          new Error('Brand with name Test Brand already exists'),
        );

      await expect(
        service.signupEmail({
          email: 'test@example.com',
          password: 'password',
          confirmPassword: 'password',
          name: 'Test Brand',
          userType: UserAppType.BRAND,
          walletAddress: 'wefwefwe',
          ip: '0.0',
          userAgent: 'test',
        }),
      ).rejects.toThrowError(HttpException);

      expect(service.createAndSaveUser).not.toBeCalled();
      expect(service.handleUserTypeRoles).not.toBeCalled();
      expect(service.generateAndSignToken).not.toBeCalled();
      expect(service.sendEmailVerificationCode).not.toBeCalled();
    });

    // Add more test cases for different scenarios and edge cases
  });

  describe('login', () => {
    it('should return authentication token on successful login', async () => {
      const mockUser = {
        id: '123',
        email: 'test@example.com',
        password:
          '$2a$10$Buo9VH4VlfDeOyud6Em4R.LFZBvAKIwGXYKUAsPp8RZqMhj4rcu9a', // bcrypt hash of 'password'
        is2faEnabled: false,
      };

      const mockDevice = {
        id: '456',
        user: mockUser,
        name: 'Test Device',
        type: 'Mobile',
        agent: 'Test Client',
        ip: '127.0.0.1',
        location: 'Test City, Test Country',
        timezone: 'UTC',
        lat_lng: [0, 0],
        range: [0, 0],
        token: 'mockToken',
      };

      jest
        .spyOn(
          userService,
          'getUserForLogin' as keyof 'checkDuplicateBrandName' as keyof UserService,
        )
        .mockResolvedValue(mockUser);
      jest
        .spyOn(service, 'validateUserForLogin' as keyof AuthenticationService)
        .mockImplementation();
      jest.spyOn(service, 'validatePasswordForLogin').mockImplementation();
      jest.spyOn(service, 'validateVerificationForLogin').mockResolvedValue({
        message: 'Login successful',
        verifyToken: null,
      });
      jest.spyOn(service, 'handleTwoFA').mockResolvedValue();
      jest.spyOn(service, 'registerDevice').mockResolvedValue('mockToken');

      const result = await service.login(
        { identifier: 'test@example.com', password: 'password' },
        'userAgent',
        '127.0.0.1',
      );

      expect(result).toEqual('mockToken');
    });

    it('should return verification token if email is not verified', async () => {
      const mockUser = {
        id: '123',
        email: 'test@example.com',
        emailVerified: false,
        password:
          '$2a$10$Buo9VH4VlfDeOyud6Em4R.LFZBvAKIwGXYKUAsPp8RZqMhj4rcu9a', // bcrypt hash of 'password'
        is2faEnabled: false,
      };

      jest
        .spyOn(userService, 'getUserForLogin' as keyof UserService)
        .mockResolvedValue(mockUser);
      jest
        .spyOn(service, 'validateUserForLogin' as keyof AuthenticationService)
        .mockImplementation();
      jest.spyOn(service, 'validatePasswordForLogin').mockImplementation();
      jest.spyOn(service, 'validateVerificationForLogin').mockResolvedValue({
        verifyToken: 'verificationToken',
        message: 'Verify email address',
      });

      const result = await service.login(
        { identifier: 'test@example.com', password: 'password' },
        'userAgent',
        '127.0.0.1',
      );

      expect(result).toEqual({
        message: 'Verify email address',
        verifyToken: 'verificationToken',
      });
    });

    it('should return verification token if 2FA is enabled', async () => {
      const mockUser = {
        id: '123',
        email: 'test@example.com',
        emailVerified: true,
        password:
          '$2a$10$Buo9VH4VlfDeOyud6Em4R.LFZBvAKIwGXYKUAsPp8RZqMhj4rcu9a', // bcrypt hash of 'password'
        is2faEnabled: true,
      };

      jest
        .spyOn(userService, 'getUserForLogin' as keyof UserService)
        .mockResolvedValue(mockUser);
      jest
        .spyOn(service, 'validateUserForLogin' as keyof AuthenticationService)
        .mockImplementation();
      jest.spyOn(service, 'validatePasswordForLogin').mockImplementation();
      jest.spyOn(service, 'validateVerificationForLogin').mockResolvedValue({
        verifyToken: 'verificationToken',
        message: 'Verify 2FA',
      });
      jest.spyOn(service, 'handleTwoFA').mockResolvedValue();

      const result = await service.login(
        { identifier: 'test@example.com', password: 'password' },
        'userAgent',
        '127.0.0.1',
      );

      expect(result).toEqual({ message: 'Verify 2FA', userId: '123' });
    });

    // Add more test cases for different scenarios and edge cases
  });
});
