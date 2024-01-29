import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { logger } from '@src/globalServices/logger/logger.service';
import { ProcessBillerEvent } from './biller.event';
import { BillerService } from './biller.service';
import { Bill } from './entity/bill.entity';

@Injectable()
export class ProcessBrandColor {
  constructor(private readonly billService: BillerService) {}

  @OnEvent('process.bill.create', { async: true })
  async handleCreateBill(event: ProcessBillerEvent) {
    const invoice = await this.billService.getActiveInvoiceOrCreate(
      event.brandId,
    );

    const bill = new Bill();

    bill.invoiceId = invoice.id;
    bill.brandId = event.brandId;
    bill.amount = 0.2;

    try {
      // await this.billService.createBill(bill);
    } catch (error) {
      logger.error(error);
    }
  }
}
