export class DfnsError extends Error {
  name = 'DfnsError';

  errorName = '';
  httpStatus = 500;
  shouldTriggerInvestigation = false;
  serviceName = 'SERVICE_NOT_DEFINED';
  causes?: string[] = [];
  isDfnsError = true;

  constructor(
    message: string,
    serviceName: string,
    causes: string[] = [],
    shouldTriggerInvestigation = true,
  ) {
    super(message);

    this.serviceName = serviceName || (process.env.SERVICE_NAME as string);
    this.shouldTriggerInvestigation = shouldTriggerInvestigation;
    this.causes = causes;

    if (typeof serviceName !== 'string') {
      this.serviceName = 'SERVICE_NOT_DEFINED';
      this.shouldTriggerInvestigation = true;
    }
  }

  toErrorObject() {
    const stackTrace = this.stack || '';
    return {
      name: this.name,
      errorName: this.errorName,
      serviceName: this.serviceName,
      message: this.message,
      causes: this.causes,
      shouldTriggerInvestigation: this.shouldTriggerInvestigation,
      httpStatus: this.httpStatus,
      stackTrace,
    };
  }

  toString() {
    return JSON.stringify(this.toErrorObject());
  }
}
export class EntityNotFoundError extends DfnsError {
  name = 'EntityNotFoundError';
  serviceName: string;
  message: string;
  causes?: string[];
  shouldTriggerInvestigaton: boolean;
  isDfnsError = true;
  httpStatus = 404;
  errorName = 'Not Found';
}
export class ForbiddenError extends DfnsError {
  name = 'ForbiddenError';
  serviceName: string;
  message: string;
  causes?: string[];
  shouldTriggerInvestigaton: boolean;
  isDfnsError = true;
  httpStatus = 403;
  errorName = 'Access To Resource Not Allowed';
}
export class PaymentRequiredError extends DfnsError {
  name = 'PaymentRequiredError';
  serviceName: string;
  message: string;
  causes?: string[];
  shouldTriggerInvestigaton: boolean;
  isDfnsError = true;
  httpStatus = 402;
  errorName = 'Payment Required';
}
export class UnauthorizedError extends DfnsError {
  name = 'UnauthorizedError';
  serviceName: string;
  message: string;
  causes?: string[];
  shouldTriggerInvestigaton: boolean;
  isDfnsError = true;
  httpStatus = 401;
  errorName = 'Unauthorized';
}
export class BadRequestError extends DfnsError {
  name = 'BadRequestError';
  serviceName: string;
  message: string;
  causes?: string[];
  shouldTriggerInvestigaton: boolean;
  isDfnsError = true;
  httpStatus = 400;
  errorName = 'Bad Request';
}

export type IsoDatetime = string;
export type Amount = string;
export type EntityId = string;
export type Tag = string;
export type PublicKey = string;
export type DfnsCertificate = string;
export type IntegerPositiveStrict = number;

export type BlockchainAddress = string;

export enum BlockchainNetwork {
  //Cardano native currency
  ADA = 'ADA',
  //Algorand native currency
  ALGO = 'ALGO',
  //Arbitrum
  ARB = 'ARB',
  //Cosmos.
  ATOM = 'ATOM',
  //Avalanche
  AVAX = 'AVAX',
  //Binance Coin
  BNB = 'BNB',
  //BSC testnet
  BNB_TESTNET = 'BNB_TESTNET',
  //Bitcoin. The first and the only.
  BTC = 'BTC',
  //BTC testnet
  BTC_TESTNET = 'BTC_TESTNET',
  //Centrifuge native currency
  CFG = 'CFG',
  //Constellation native currency
  DAG = 'Dag',
  //Elon’s favorite Dog.
  DOGE = 'DOGE',
  //Polkadot native currency
  DOT = 'DOT',
  //Ethereum
  ETH = 'ETH',
  //Ethereum Goerli testnet
  ETH_GOERLI = 'ETH_GOERLI',
  //Ethereum Sepolia testnet
  ETH_SEPOLIA = 'ETH_SEPOLIA',
  //Fantom
  FTM = 'FTM',
  //Kusama – Polkadot’s Canary network
  KSM = 'KSM',
  //Lite Coin native currency
  LTC = 'LTC',
  //Polygon
  MATIC = 'MATIC',
  //Polygon Mumbai testnet
  MATIC_MUMBAI = 'MATIC_MUMBAI',
  //Near native currency
  NEAR = 'NEAR',
  //Optimism
  OP = 'OP',
  //Polymesh
  POLYX = 'POLYX',
  //Solana
  SOL = 'SOL',
  //Solana devnet
  SOL_DEVNET = 'SOL_DEVNET',
  //Tron Coin
  TRX = 'TRX',
  //Tron testnet
  TRX_SHASTA = 'TRX_SHASTA',
  //Stellar native coin
  XLM = 'XLM',
  //Ripple
  XRP = 'XRP',
  //Ripple testnet
  XRP_TESTNET = 'XRP_TESTNET',
  //Tezos native currency
  XTZ = 'XTZ',
  //Skale
  sFUEL = 'sFUEL',
  //Elrond
  EGLD = 'EGLD',
  //AirDAO
  AMB = 'AMB',
  //Caduceus
  CMP = 'CMP',
}
