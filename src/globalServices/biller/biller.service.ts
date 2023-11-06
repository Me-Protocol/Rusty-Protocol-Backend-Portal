import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bill } from './entity/bill.entity';
import { Invoice } from './entity/invoice.entity';
import { generateRandomCode } from '@src/utils/helpers/generateRandomCode';

@Injectable()
export class BillerService {
  constructor(
    @InjectRepository(Bill)
    private readonly billRepo: Repository<Bill>,

    @InjectRepository(Invoice)
    private readonly invoiceRepo: Repository<Invoice>,
  ) {}

  async getActiveInvoiceOrCreate(brandId: string): Promise<Invoice> {
    const activeInvoice = await this.invoiceRepo.findOne({
      where: {
        brandId,
        isPaid: false,
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

  async createBill(bill: Bill): Promise<Bill> {
    return await this.billRepo.save(bill);
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
}
