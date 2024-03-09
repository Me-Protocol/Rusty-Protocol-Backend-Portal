import { BillType } from '@src/utils/enums/BillType';

export class ProcessBillerEvent {
  brandId: string;
  type: BillType;
  offerId?: string;
  amount: number;
}
