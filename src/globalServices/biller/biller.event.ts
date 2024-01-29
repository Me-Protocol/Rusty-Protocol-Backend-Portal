export class ProcessBillerEvent {
  brandId: string;
  type: 'view-offer' | 'redeem-offer' | 'subscription-renewal';
  offerId?: string;
  amount: number;
}
