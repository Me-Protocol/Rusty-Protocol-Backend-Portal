import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from '@src/globalServices/mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@src/globalServices/user/user.service';
import { Device } from '@src/globalServices/user/entities/device.entity';
import { AuthenticationService } from './service';
import { User } from '@src/globalServices/user/entities/user.entity';

// Mock dependencies
jest.mock('@src/globalServices/mail/mail.service');
jest.mock('@nestjs/jwt');
jest.mock('@src/globalServices/user/user.service');

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let mailService: MailService;
  let jwtService: JwtService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticationService, MailService, JwtService, UserService],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
    mailService = module.get<MailService>(MailService);
    jwtService = module.get<JwtService>(JwtService);
    userService = module.get<UserService>(UserService);
  });

   

  // Add more test cases for other methods in the AuthenticationService class

  describe('createDevice', () => {
    it('should create a device object', () => {
      const user = {} as User;
      const deviceData = {
        device: { name: 'Test Device', type: 'Mobile' },
        client: { name: 'Test Client' },
      };
      const clientIp = '127.0.0.1';
      const location = {
        city: 'Test City',
        country: 'Test Country',
        timezone: 'UTC',
        lat: 0,
        lon: 0,
      };

      const result = service.createDevice(user, deviceData, clientIp, location);

      expect(result).toBeInstanceOf(Device);
      expect(result.user).toBe(user);
      expect(result.name).toBe(deviceData.device.name);
      expect(result.type).toBe(deviceData.device.type);
      // Add more assertions based on the expected properties of the Device entity
    });
  });

  describe('sendVerificationEmail', () => {
    it('should send a verification email', async () => {
      const email = 'colourjim@gmail.com';
      const name = 'Jim';
      const code = 123456;

      const sendVerificationEmailMock = jest
        .spyOn(service, 'sendEmailVerificationCode')
        .mockResolvedValue(undefined);

      const result = await service.sendVerificationEmail(email, name, code);

      expect(sendVerificationEmailMock).toHaveBeenCalledWith(email, name, code);
    });
  });
});
