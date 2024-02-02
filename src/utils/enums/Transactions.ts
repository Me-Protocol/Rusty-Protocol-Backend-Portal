export enum TransactionsType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

export enum StatusType {
  SUCCEDDED = 'SUCCEDDED',
  PROCESSING = 'PROCESSING',
  FAILED = 'FAILED',
  ABANDONED = 'ABANDONED',
}

export enum TransactionSource {
  REWARD_DISTRIBUTION = 'reward_distribution',
  OFFER_REDEMPTION = 'offer_redemption',
  EARN_REWARD = 'earn_reward',
  AUTO_TOPUP = 'auto_topup',
}
