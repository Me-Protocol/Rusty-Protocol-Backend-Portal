import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { User } from "./entities/user.entity";
import { MailService } from "../mail/mail.service";
import { JwtService } from "@nestjs/jwt";
import { SmsService } from "../sms/sms.service";
import { JwtPayload, jwtConfigurations } from "@src/config/jwt.config";
import { Device } from "./entities/device.entity";
import { isNumber } from "@src/utils/helpers/isNumber";
import { selectUser } from "@src/utils/helpers/selectUser";
import { TwoFAType } from "@src/utils/enums/TwoFAType";
import { LoginType } from "@src/utils/enums/LoginType";
import { CustomerService } from "../customer/customer.service";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const geoip = require("geoip-lite");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const DeviceDetector = require("node-device-detector");

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
    private customerService: CustomerService
  ) {}

  async getDeviceById(userId: string, id: string): Promise<Device> {
    const device = await this.deviceRepository.findOne({
      where: {
        id,
        userId,
      },
    });

    return device;
  }

  async saveUserPrivate(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async deleteDeviceById(userId: string, id: string): Promise<any> {
    const device = await this.deviceRepository.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!device) throw new HttpException("Device not found", 404);

    await this.deviceRepository.delete({
      id,
      userId,
    });

    return "ok";
  }

  async getUserDevices(userId: string): Promise<Device[]> {
    const devices = await this.deviceRepository.find({
      where: {
        userId,
      },
      select: [
        "id",
        "name",
        "type",
        "agent",
        "ip",
        "location",
        "createdAt",
        "device_token",
      ],
    });
    return devices;
  }

  async saveDevice(device: Device): Promise<Device> {
    return await this.deviceRepository.save(device);
  }

  // For mobile notifications
  async updateDeviceToken(
    userId: string,
    id: string,
    { device_token }: { device_token: string }
  ): Promise<any> {
    const device = await this.deviceRepository.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!device) throw new HttpException("Device not found", 404);

    device.device_token = device_token;
    await this.deviceRepository.save(device);

    return "ok";
  }

  async getUserById(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id,
      },
      relations: ["customer", "brand"],
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
}
