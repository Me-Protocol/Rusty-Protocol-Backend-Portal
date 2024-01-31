import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bill } from './entity/bill.entity';
import { Invoice } from './entity/invoice.entity';
import { generateRandomCode } from '@src/utils/helpers/generateRandomCode';
import { logger } from '../logger/logger.service';
import { ProcessBillerEvent } from './biller.event';
import { BrandService } from '../brand/brand.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class BillerService {
  constructor(
    @InjectRepository(Bill)
    private readonly billRepo: Repository<Bill>,

    @InjectRepository(Invoice)
    private readonly invoiceRepo: Repository<Invoice>,

    @Inject(forwardRef(() => BrandService))
    private readonly brandService: BrandService,
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
    return this.invoiceRepo.find({
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
        isDue: false,
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

      const bill = new Bill();
      bill.invoiceId = invoice.id;
      bill.amount = amount;
      bill.brandId = brandId;
      bill.type = type;

      return this.billRepo.save(bill);
    } catch (error) {
      logger.error(error);
    }
  }

  async getBrandInvoices({
    brandId,
    page,
    limit,
  }: {
    brandId: string;
    page: number;
    limit: number;
  }) {
    const invoiceQuery = this.invoiceRepo
      .createQueryBuilder('invoice')
      .leftJoinAndSelect('invoice.bills', 'bills')
      .where('invoice.brandId = :brandId', {
        brandId: brandId,
      })
      .andWhere('invoice.isDue = :isDue', {
        isDue: true,
      });

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

  async saveInvoice(invoice: Invoice) {
    return this.invoiceRepo.save(invoice);
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

        getCurrentInvoice.isDue = true;
        await this.invoiceRepo.save(getCurrentInvoice);

        const newInvoice = new Invoice();
        newInvoice.brandId = brand.id;
        newInvoice.invoiceCode = generateRandomCode();
        await this.invoiceRepo.save(newInvoice);

        // create new bill for the plan
        const bill = new Bill();
        bill.invoiceId = newInvoice.id;
        bill.amount = plan.monthlyAmount;
        bill.type = 'subscription-renewal';
        bill.brandId = brand.id;
        await this.billRepo.save(bill);
      }
    }
  }
}
