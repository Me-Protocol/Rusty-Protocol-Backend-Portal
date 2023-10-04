export enum AllTaskTypes {
  OUT_BRAND_TAGGING = 'TWITTER_BRAND_TAGGING',
  OUT_PRODUCT_TAGGING = 'TWITTER_PRODUCT_TAGGING',
  OUT_SM_FOLLOW = 'TWITTER_FOLLOW',
  OUT_LIKE_POST = 'TWITTER_LIKE_POST',
  OUT_REPOST = 'TWITTER_REPOST',
  OUT_REFERRAL_SIGNUP = 'REFERRAL_SIGNUP',
  OUT_OTHER_REFERRAL = 'OTHER_REFERRAL',
  OUT_WEBSITE_VISIT = 'WEBSITE_VISIT',
  OUT_SHARING = 'OUT_SHARING',

  IN_APP_PRODUCT_LIKE = 'IN_APP_PRODUCT_LIKE',
  IN_APP_REVIEW = 'IN_APP_REVIEW',
  IN_APP_SHARE = 'IN_APP_SHARE',
  IN_APP_FOLLOW = 'IN_APP_FOLLOW',
  IN_APP_COLLECTION = 'IN_APP_COLLECTION',
}

export enum TaskStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}
