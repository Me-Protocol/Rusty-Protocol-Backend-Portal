import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Bill } from './entity/bill.entity';
import { Invoice } from './entity/invoice.entity';
import { generateRandomCode } from '@src/utils/helpers/generateRandomCode';
import { logger } from '../logger/logger.service';
import { ProcessBillerEvent } from './biller.event';
import { BrandService } from '../brand/brand.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Voucher } from './entity/voucher.entity';
import moment from 'moment';
import { MailService } from '../mail/mail.service';
import { emailButton } from '@src/utils/helpers/email';
import { CLIENT_APP_URI } from '@src/config/env.config';
import { VoucherType } from '@src/utils/enums/VoucherType';
import { AutoTopupRequest } from './entity/auto-topup-request.entity';
import { BigNumber } from 'ethers';
import { AutoTopupStatus } from '@src/utils/enums/AutoTopStatus';

@Injectable()
export class BillerService {
  constructor(
    @InjectRepository(Bill)
    private readonly billRepo: Repository<Bill>,

    @InjectRepository(Invoice)
    private readonly invoiceRepo: Repository<Invoice>,

    @InjectRepository(Voucher)
    private readonly voucherRepo: Repository<Voucher>,

    @InjectRepository(AutoTopupRequest)
    private readonly autoTopupRequestRepo: Repository<AutoTopupRequest>,

    @Inject(forwardRef(() => BrandService))
    private readonly brandService: BrandService,

    private readonly mailService: MailService,
  ) {}

  async getActiveInvoiceOrCreate(brandId: string): Promise<Invoice> {
    const activeInvoice = await this.invoiceRepo.findOne({
      where: {
        brandId,
        isPaid: false,
        isDue: false,
      },
    });

    if (activeInvoice) {
      return activeInvoice;
    }

    const invoice = new Invoice();

    invoice.brandId = brandId;
    invoice.invoiceCode = generateRandomCode();

    return await this.invoiceRepo.save(invoice);
  }

  async getBrandDueInvoices(brandId: string): Promise<Invoice[]> {
    return await this.invoiceRepo.find({
      where: {
        brandId,
        isDue: true,
      },
    });
  }

  async getBillsByInvoiceId(invoiceId: string): Promise<Bill[]> {
    const bills = await this.billRepo.find({
      where: {
        invoiceId,
      },
    });

    return bills;
  }

  async getBillsByBrandId(brandId: string): Promise<Bill[]> {
    const bills = await this.billRepo.find({
      where: {
        brandId,
      },
    });

    return bills;
  }

  async getInvoiceById(invoiceId: string): Promise<Invoice> {
    const invoice = await this.invoiceRepo.findOne({
      where: {
        id: invoiceId,
      },
    });

    return invoice;
  }

  async getInvoiceByCode(invoiceCode: string): Promise<Invoice> {
    const invoice = await this.invoiceRepo.findOne({
      where: {
        invoiceCode,
        isDue: false,
      },
    });

    return invoice;
  }

  async getBillById(id: string): Promise<Bill> {
    const bill = await this.billRepo.findOne({
      where: {
        id,
      },
    });

    return bill;
  }

  async createBill({
    amount,
    brandId,
    type,
  }: ProcessBillerEvent): Promise<Bill> {
    try {
      const invoice = await this.getActiveInvoiceOrCreate(brandId);

      invoice.total = Number(invoice.total ?? 0) + Number(amount);

      await this.invoiceRepo.save(invoice);

      const bill = this.billRepo.create({
        amount,
        brandId,
        invoiceId: invoice.id,
        type,
      });

      const saveBill = await this.billRepo.save(bill);

      return saveBill;
    } catch (error) {
      logger.error(error);
    }
  }

  async getBrandInvoices({
    brandId,
    page,
    limit,
  }: {
    brandId?: string;
    page: number;
    limit: number;
  }) {
    const invoiceQuery = this.invoiceRepo
      .createQueryBuilder('invoice')
      .leftJoinAndSelect('invoice.bills', 'bills')
      .andWhere('invoice.isDue = :isDue', {
        isDue: true
      })

      if(brandId) {
        invoiceQuery.andWhere('invoice.brandId = :brandId', { brandId });
      }

    const invoices = await invoiceQuery
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    const total = await invoiceQuery.getCount();

    return {
      invoices,
      total,
      nextPage: total > page * limit ? Number(page) + 1 : null,
      prevPage: page > 1 ? Number(page) - 1 : null,
    };
  }

  async getAllBrandInvoices({
    brandId,
    page = 1,
    limit = 10,
    isPaid,
    isDue,
    startDate,
    endDate,
  }: {
    brandId?: string;
    page?: number;
    limit?: number;
    isPaid?: boolean;
    isDue?: boolean;
    startDate?: Date;
    endDate?: Date;
    }) {
      const invoiceQuery = this.invoiceRepo
      .createQueryBuilder('invoice')
      .leftJoinAndSelect('invoice.bills', 'bills');

      if (brandId) {
        invoiceQuery.andWhere('invoice.brandId = :brandId', { brandId });
      }

      if (isPaid !== undefined){
        invoiceQuery.andWhere('invoice.isPaid = :isPaid', { isPaid });
      }

      if (isDue !== undefined) {
        invoiceQuery.andWhere('invoice.isDue = :isDue', { isDue });
      }

      if (startDate) {
        invoiceQuery.andWhere('invoice.createdAt >= :startDate', { startDate });
      }

      if (endDate) {
        invoiceQuery.andWhere('invoice.createdAt <= :endDate', { endDate });
      }

      //To calculate the number of pages to skip for pagination
      const offset = (page - 1) * limit;

      //to execute the query with pagination added
      const invoices  = await invoiceQuery
          .skip(offset)
          .take(limit)
          .getMany();

      const total = await invoiceQuery.getCount();

      return {
        invoices,
        total,
        nextPage: total > page * limit ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null,
      };
    }
  
  async saveInvoice(invoice: Invoice) {
    return await this.invoiceRepo.save(invoice);
  }

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  async monthlyBillAccumationAndSettlement() {
    const brands = await this.brandService.getAllBrands();

    for (const brand of brands) {
      if (brand.planId) {
        const getCurrentInvoice = await this.getActiveInvoiceOrCreate(brand.id);
        const plan = await this.brandService.getBrandSubscriptionPlanById(
          brand.planId,
        );

        // if brand has autoDebit enabled and has enough balance to pay the bill then pay the bill and create new invoice and set the old invoice to past

        if (brand.enableAutoTopup) {
          // debit brand
        }

        // Check if the last plan renewal date is due

        getCurrentInvoice.isDue = true;
        await this.invoiceRepo.save(getCurrentInvoice);

        const newInvoice = new Invoice();
        newInvoice.brandId = brand.id;
        newInvoice.invoiceCode = generateRandomCode();
        await this.invoiceRepo.save(newInvoice);
      }
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async checkBrandSubscriptionPlanRenewal() {
    const brands = await this.brandService.getSubscribedBrands();

    for (const brand of brands) {
      const plan = await this.brandService.getBrandSubscriptionPlanById(
        brand.planId,
      );

      const brandOwner = await this.brandService.getBrandOwner(brand.id);

      if (!plan) {
        return;
      }

      // if the nextRenewalDate is 3 days away then send a reminder to the brand and create a new invoice
      if (
        moment(brand.nextPlanRenewalDate).isSame(
          moment(new Date()).add(3, 'days'),
          'day',
        ) &&
        !brand.isPlanExpiringEmailSent
      ) {
        await this.mailService.sendMail({
          to: brandOwner.user.email,
          subject: `Join ${brand.name} on Me Protocol`,
          text: `Join ${brand.name} on Me Protocol`,
          html: `
            <p>Hello ${brandOwner.name},</p>
            <p>Your subscription plan is about to expire in 3 days. Please renew your plan to continue using our services.</p>
            <p>Click the button below to renew your plan</p>
            ${emailButton({
              text: 'Renew Plan',
              url: `${CLIENT_APP_URI}/brand/subscription`,
            })}
          `,
        });

        const newInvoice = new Invoice();
        newInvoice.brandId = brand.id;
        newInvoice.invoiceCode = generateRandomCode();
        newInvoice.isDue = true;

        const invoice = await this.invoiceRepo.save(newInvoice);

        // create new bill for the plan
        const bill = new Bill();
        bill.invoiceId = invoice.id;
        bill.amount = plan.monthlyAmount;
        bill.type = 'subscription-renewal';
        bill.brandId = brand.id;
        await this.billRepo.save(bill);

        brand.isPlanExpiringEmailSent = true;
        await this.brandService.save(brand);
      } // else if the nextRenewalDate is today then create a new invoice and set the old invoice to past
      else if (moment(brand.nextPlanRenewalDate).isSame(new Date(), 'day')) {
        brand.isPlanActive = false;
        brand.isPlanExpired = true;
        brand.isPlanExpiringEmailSent = false;
        await this.brandService.save(brand);
      }
    }
  }

  async createVoucher(
    discount: number,
    brandId: string,
    planId: string,
    usageLimit: number,
    type: VoucherType,
  ) {
    const newVoucher = new Voucher();
    newVoucher.code = generateRandomCode();
    newVoucher.discount = discount;
    newVoucher.isUsed = false;
    newVoucher.brandId = brandId;
    newVoucher.planId = planId;
    newVoucher.usageLimit = usageLimit;
    newVoucher.type = type;

    return await this.voucherRepo.save(newVoucher);
  }

  async getVoucherByCode(code: string) {
    return await this.voucherRepo.findOne({
      where: {
        code,
      },
    });
  }

  async getVoucherForUse({
    voucherCode,
    brandId,
    planId,
    type,
  }: {
    voucherCode: string;
    brandId: string;
    planId?: string;
    type: VoucherType;
  }) {
    const voucher = await this.voucherRepo.findOne({
      where: {
        code: voucherCode,
        isUsed: false,
        isExpired: false,
        brandId,
        type,
      },
    });

    if (!voucher) {
      throw new Error('Voucher not found or has been used');
    }

    if (voucher.usageLimit && voucher.usageCount >= voucher.usageLimit) {
      throw new Error('Voucher has been used');
    }

    if (planId && voucher.planId !== planId) {
      throw new Error('Voucher not found');
    }

    voucher.isUsed = true;
    voucher.usedAt = new Date();
    voucher.usageCount = Number(voucher.usageCount) + 1;

    return await this.saveVoucher(voucher);
  }

  async getVoucherById(id: string) {
    return await this.voucherRepo.findOne({
      where: {
        id,
      },
    });
  }

  async saveVoucher(voucher: Voucher) {
    return await this.voucherRepo.save(voucher);
  }

  async createAutoTopupRequest({
    amount,
    brandId,
    taskId,
    nounce,
  }: {
    amount: number;
    brandId: string;
    taskId: string;
    nounce: string;
  }) {
    const autoTopupRequest = new AutoTopupRequest();
    autoTopupRequest.amount = amount;
    autoTopupRequest.brandId = brandId;
    autoTopupRequest.taskId = taskId;
    autoTopupRequest.nounce = nounce;

    return await this.autoTopupRequestRepo.save(autoTopupRequest);
  }

  async saveAutoTopupRequest(autoTopupRequest: AutoTopupRequest) {
    return await this.autoTopupRequestRepo.save(autoTopupRequest);
  }

  async getAutoTopupRequestByTaskId(taskId: string) {
    return await this.autoTopupRequestRepo.findOne({
      where: {
        taskId,
      },
    });
  }

  async getAutoTopupRequestByNounce(nounce: string) {
    return await this.autoTopupRequestRepo.findOne({
      where: {
        nounce,
      },
    });
  }

  async getPendingAutoTopupRequests() {
    return await this.autoTopupRequestRepo.find({
      where: {
        status: AutoTopupStatus.PENDING,
      },
    });
  }
}
