// TODO: some fields are not optional
export interface Reward {
  id?: string;
  rewardId: string;
  brandId: string;
  brandName: string;
  description: string;
  slug: string;
  rewardType: RewardType;
  rewardImage: string;
  otherRewardType?: string;
  rewardSymbol: string;
  rewardName: string;
  autoSyncEnabled?: boolean;
}

export enum RewardType {
  REGULARPOINTS = 'REGULARPOINTS',
  TOKEN = 'TOKENS',
  // CASHBACK = "CASHBACK",
  // MILES = "MILES",
  // COUPONS = "COUPONS",
  // OTHERS = "OTHERS"
}
