import { HttpException, Injectable } from '@nestjs/common';
import { BrandService } from '@src/globalServices/brand/brand.service';
import { UpdateBrandDto } from './dto/UpdateBrandDto.dto';
import { logger } from '@src/globalServices/logger/logger.service';
import { FilterBrandDto } from './dto/FilterBrandDto.dto';
import { UpdateMemberDto } from './dto/UpdateMemberDto.dto';
import { CreateMemberDto } from './dto/CreateMemberDto.dto';
import { UserService } from '@src/globalServices/user/user.service';
import { User } from '@src/globalServices/user/entities/user.entity';
import { TwoFAType } from '@src/utils/enums/TwoFAType';
import * as bcrypt from 'bcryptjs';
import { UserAppType } from '@src/utils/enums/UserAppType';
import { BrandMember } from '@src/globalServices/brand/entities/brand_member.entity';
import { MailService } from '@src/globalServices/mail/mail.service';
import { emailButton } from '@src/utils/helpers/email';
import { CustomerService } from '@src/globalServices/customer/customer.service';
import { FilterCustomerDto } from './dto/FilterCustomerDto.dto';
import { SettingsService } from '@src/globalServices/settings/settings.service';
import { BigNumber, ethers } from 'ethers';
import {
  OPEN_REWARD_DIAMOND,
  adminService,
  getBrandIdHex,
} from '@developeruche/protocol-core';
import { OnboardBrandDto } from './dto/OnboardBrandDto.dto';
import { CostModuleManagementService } from '@src/modules/costModule/service';
import { PaymentRequestTnxType } from '@src/utils/enums/PaymentRequestTnxType';
import { PaymentOrigin } from '@src/utils/enums/PaymentOrigin';
import { supportedNetworks } from '@src/globalServices/costManagement/symbol-finder.service';
import {
  CallWithERC2771Request,
  ERC2771Type,
  GelatoRelay,
} from '@gelatonetwork/relay-sdk';
import { onboard_brand } from '@developeruche/runtime-sdk';
import { ProcessBrandColorEvent } from '@src/globalServices/brand/events/process-brand-color.event';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BrandRole } from '@src/utils/enums/BrandRole';

@Injectable()
export class BrandAccountManagementService {
  constructor(
    private readonly brandService: BrandService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly customerService: CustomerService,
    private readonly settingsService: SettingsService,
    private readonly costModuleManagementService: CostModuleManagementService,
    private eventEmitter: EventEmitter2,
  ) {}

  async updateBrand(body: UpdateBrandDto, brandId: string) {
    try {
      if (body.logo || body.logo_white) {
        let img = body.logo || body.logo_white;
        const processBrandColorPayload = new ProcessBrandColorEvent();
        processBrandColorPayload.url = img;
        processBrandColorPayload.brandId = brandId;
        this.eventEmitter.emit('process.brand.color', processBrandColorPayload);
      }

      return this.brandService.update(body, brandId);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async getAllFilteredBrands(query: FilterBrandDto) {
    try {
      const { categoryId, page, limit } = query;
      const brands = await this.brandService.getAllFilteredBrands({
        categoryId,
        page,
        limit,
      });
      return brands;
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async getBrandById(id: string) {
    try {
      const brand = await this.brandService.getBrandById(id);

      if (!brand) {
        throw new HttpException('Brand not found', 404);
      }

      return brand;
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async getBrandOwner(brandId: string) {
    try {
      const brand = await this.brandService.getBrandById(brandId);

      if (!brand) {
        throw new HttpException('Brand not found', 404);
      }

      return brand.user;
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async getBrandMembers(brandId: string) {
    try {
      return await this.brandService.getBrandMembers(brandId);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async updateBrandMemberRole(body: UpdateMemberDto) {
    try {
      const brandMember = await this.brandService.getBrandMember(
        body.brandId,
        body.brandMemberId,
      );

      if (!brandMember) {
        throw new HttpException('Brand member not found', 404);
      }

      const brandOwner = await this.getBrandOwner(body.brandId);
      const ownerMemberRecord = await this.brandService.getBrandMember(
        body.brandId,
        brandOwner.brandMember.id,
      );

      if (body.role === BrandRole.OWNER && body.userId !== brandOwner.id) {
        throw new HttpException('You cannot assign owner role to a user', 400);
      }

      ownerMemberRecord.role = BrandRole.COLLABORATOR;
      await this.brandService.saveBrandMember(ownerMemberRecord);

      brandMember.role = body.role;
      return await this.brandService.saveBrandMember(brandMember);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async updateBrandMember(body: UpdateMemberDto) {
    try {
      const brandMember = await this.brandService.getBrandMember(
        body.brandId,
        body.brandMemberId,
      );

      if (!brandMember) {
        throw new HttpException('Brand member not found', 404);
      }

      if (body.name) brandMember.name = body.name;
      if (body.profilePicture) brandMember.profilePicture = body.profilePicture;

      return await this.brandService.saveBrandMember(brandMember);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async createBrandMember(body: CreateMemberDto) {
    let { name, email, role, brandId } = body;

    email = email.toLowerCase();
    try {
      const brand = await this.brandService.getBrandById(brandId);
      const user = await this.userService.getUserByEmail(email);

      if (role === BrandRole.OWNER) {
        throw new HttpException('You cannot assign owner role to a user', 400);
      }

      if (user) {
        const checkBrandMemberForOtherBrand =
          await this.brandService.getBrandMemberByUserId(user.id);

        if (
          checkBrandMemberForOtherBrand &&
          checkBrandMemberForOtherBrand.brandId !== brandId
        ) {
          throw new HttpException('This user belongs to another brand', 400);
        }

        const checkBrandMember =
          await this.brandService.getBrandMemberByUserEmail(email);

        if (checkBrandMember && checkBrandMember.isAccepted) {
          throw new HttpException('Brand member already exists', 400);
        }

        if (checkBrandMember && !checkBrandMember.isAccepted) {
          await this.mailService.sendMail({
            to: email,
            subject: `Join ${brand.name} on Me Protocol`,
            text: `Join ${brand.name} on Me Protocol`,
            html: `
            <p>Hello ${name},</p>
            <p>${
              brand.name
            } has invited you to join their brand on Me Protocol. Click the link below to verify your email address and join the brand.</p>
            
            ${emailButton({
              text: 'Accept Invitation',
              url: `${process.env.SERVER_URL}/brand/member/join/${user.email}/${brandId}`,
            })}
          `,
          });

          return {
            message: 'Brand member created successfully',
          };
        }

        const brandMember = new BrandMember();
        brandMember.brandId = brandId;
        brandMember.name = name;
        brandMember.role = role;
        brandMember.verifyingEmail = email;

        await this.brandService.saveBrandMember(brandMember);

        await this.mailService.sendMail({
          to: email,
          subject: `Join ${brand.name} on Me Protocol`,
          text: `Join ${brand.name} on Me Protocol`,
          html: `
            <p>Hello ${name},</p>
            <p>${
              brand.name
            } has invited you to join their brand on Me Protocol. Click the link below to verify your email address and join the brand.</p>
            
            ${emailButton({
              text: 'Accept Invitation',
              url: `${process.env.SERVER_URL}/brand/member/join/${user.email}/${brandId}`,
            })}
          `,
        });

        return {
          message: 'Brand member created successfully',
        };
      }

      const newUser = new User();
      newUser.email = email?.toLowerCase();
      newUser.username = email.split('@')[0].toLowerCase();
      newUser.twoFAType = TwoFAType.EMAIL;

      const password = Math.random().toString(36).slice(-8);

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      newUser.password = hashedPassword;
      newUser.salt = salt;
      newUser.userType = UserAppType.BRAND_MEMBER;
      newUser.accountVerificationCode = Math.floor(1000 + Math.random() * 9000);

      const saveUser = await this.userService.saveUser(newUser);

      await this.customerService.create({
        name,
        userId: saveUser.id,
      });

      const brandMember = new BrandMember();
      brandMember.brandId = brandId;
      brandMember.name = name;
      brandMember.role = role;
      brandMember.verifyingEmail = email;

      await this.brandService.saveBrandMember(brandMember);

      await this.mailService.sendMail({
        to: email,
        subject: 'Verify your email address',
        text: 'Verify your email address',
        html: `
        <p>Hello ${name},</p>
        <p>${
          brand.name
        } has invited you to join their brand on Me Protocol. Click the link below to verify your email address and join the brand.</p>
        <p>
          Login Details:<br/>
          Email: ${email}<br/>
          Password: ${password}
        </p>
        ${emailButton({
          text: 'Verify Email',
          url: `${process.env.SERVER_URL}/brand/member/verify-email/${user?.accountVerificationCode}/${brandId}`,
        })}
        `,
      });

      return {
        message: 'Brand member created successfully',
      };
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async verifyBrandMemberEmail(code: number, brandId: string) {
    try {
      const user = await this.userService.getUserByVerificationCode(code);

      if (!user) {
        throw new HttpException('User not found', 404);
      }

      user.accountVerificationCode = null;
      user.emailVerified = true;

      await this.userService.saveUser(user);

      const brandMember = await this.brandService.getBrandMember(
        brandId,
        user.brandMember.id,
      );
      brandMember.userId = user.id;

      await this.brandService.saveBrandMember(brandMember);

      return user;
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async verifyBrandMemberExistingUser(email: string, brandId: string) {
    try {
      const user = await this.userService.getUserByEmail(email);

      if (!user) {
        throw new HttpException('User not found', 404);
      }

      user.accountVerificationCode = null;
      user.emailVerified = true;

      await this.userService.saveUser(user);

      const brandMember = await this.brandService.getBrandMemberByUserEmail(
        email,
      );

      if (!brandMember) {
        throw new HttpException('Brand member not found', 404);
      }

      brandMember.userId = user.id;

      await this.brandService.saveBrandMember(brandMember);

      return user;
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async getCustomers(query: FilterCustomerDto) {
    try {
      return await this.brandService.getBrandCustomers(
        query.brandId,
        query.page,
        query.limit,
        query.filterBy,
      );
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async onboardBrand({ brandId, walletAddress, website }: OnboardBrandDto) {
    try {
      const brand = await this.brandService.getBrandById(brandId);
      brand.walletAddress = walletAddress;

      await this.brandService.save(brand);

      const { onboardWallet } = await this.settingsService.settingsInit();

      const provider = new ethers.providers.JsonRpcProvider(
        process.env.JSON_RPC_URL,
      );
      const wallet = new ethers.Wallet(onboardWallet, provider);
      const ts2 = await adminService.registerBrand(
        brand.name,
        website,
        brand.walletAddress,
        getBrandIdHex(BigNumber.from(brand.brandProtocolId)),
      );

      const relay = new GelatoRelay();

      const input = {
        data: ts2?.data,
        from: wallet.address,
        to: OPEN_REWARD_DIAMOND,
      };

      const request: CallWithERC2771Request = {
        chainId: 80001,
        target: OPEN_REWARD_DIAMOND,
        data: input.data,
        user: input.from,
      };
      console.log('request', request);

      // const register_tx = await wallet.sendTransaction({
      //   to: OPEN_REWARD_DIAMOND,
      //   data: input.data,
      // });

      // console.log('register_tx', register_tx);

      const { struct, signature } = await relay.getSignatureDataERC2771(
        request,
        wallet,
        ERC2771Type.SponsoredCall,
      );

      const data = {
        data: struct,
        tnxType: PaymentRequestTnxType.RELAYER,
        narration: '1',
        network: supportedNetworks.MUMBAI,
        signature,
        brandId: brandId,
      };

      const paymentRequest =
        this.costModuleManagementService.createPaymentRequest(
          data,
          PaymentOrigin.IN_APP,
          true,
        );

      const brandProtocolId = getBrandIdHex(
        BigNumber.from(brand.brandProtocolId),
      );

      await onboard_brand(
        BigNumber.from(brandProtocolId),
        walletAddress,
        ethers.constants.AddressZero,
        wallet,
      );

      return paymentRequest;
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400, {
        cause: new Error(error.message),
      });
    }
  }

  async removeBrandMember(brandId: string, brandMemberId: string) {
    try {
      const brandMember = await this.brandService.getBrandMember(
        brandId,
        brandMemberId,
      );

      if (!brandMember) {
        throw new HttpException('Brand member not found', 404);
      }

      await this.brandService.removeBrandMember(brandMember);

      return {
        message: 'Brand member removed successfully',
      };
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }
}
