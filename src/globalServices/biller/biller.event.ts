export class ProcessBillerEvent {
  brandId: string;
  type: 'view-offer' | 'redeem-offer';
  offerId: string;
}
