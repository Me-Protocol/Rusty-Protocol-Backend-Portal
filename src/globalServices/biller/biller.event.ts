export class ProcessBillerEvent {
  brandId: string;
  type: 'view-offer' | 'redeem-offer' | 'subscription-renewal' | 'auto-topup';
  offerId?: string;
  amount: number;
}
