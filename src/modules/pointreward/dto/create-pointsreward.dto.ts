export class CreatePointsRewardDto {
  id?: string;
  pointsrewardId: string;
  rewardId: string;
  rewardName: string;
  rewardNameSlug: string;
  connectedUsers?: string[];
  brandName: string;
  description: string;
  syncApiAddress: string;
  syncApiAccessToken: string;
  syncApiRefreshToken: string;
  oidcDiscoveryAddress?: string;
  autoSyncEnabled?: boolean;
}
