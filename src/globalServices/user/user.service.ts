import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Device } from './entities/device.entity';
import { selectUser } from '@src/utils/helpers/selectUser';

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

    if (!device) throw new HttpException('Device not found', 404);

    await this.deviceRepository.delete({
      id,
      userId,
    });

    return 'ok';
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

  async saveDevice(device: Device): Promise<Device> {
    return await this.deviceRepository.save(device);
  }

  async checkDevice(ip: string, userId: string, type: string): Promise<Device> {
    return await this.deviceRepository.findOne({
      where: {
        userId,
        ip,
        type,
      },
    });
  }

  // For mobile notifications
  async updateDeviceToken(
    userId: string,
    id: string,
    { device_token }: { device_token: string },
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
    return await this.userRepository.findOne({
      where: {
        email,
      },
      relations: ['customer', 'brand'],
    });
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

  async updateUserCategoryInterests(userId: string, categoryId: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) throw new HttpException('User not found', 404);

    const categoryIds = user.user_category_interests || [];

    if (!categoryIds.includes(categoryId)) {
      // make sure it comes first
      categoryIds.unshift(categoryId);
    } else {
      // bring it to the top
      const index = categoryIds.indexOf(categoryId);
      categoryIds.splice(index, 1);
      categoryIds.unshift(categoryId);
    }

    user.user_category_interests = categoryIds;

    await this.userRepository.save(user);

    return user;
  }

  async getUserCategoryInterests(userId: string): Promise<string[]> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) throw new HttpException('User not found', 404);

    return user.user_category_interests || [];
  }
}
