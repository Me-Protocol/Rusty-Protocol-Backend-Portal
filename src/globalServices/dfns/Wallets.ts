import {
  BlockchainNetwork,
  Amount,
  BlockchainAddress,
  EntityId,
  IsoDatetime,
  Tag,
} from './Foundations';

export enum IdentityKind {
  Application = 'Application',
  CustomerEmployee = 'CustomerEmployee',
  DfnsStaff = 'DfnsStaff',
  EndUser = 'EndUser',
}

export type TransferNativeRequest = {
  kind: TransferKind.Native;
  to: BlockchainAddress;
  amount: Amount;
};

export type TransferErc20Request = {
  kind: TransferKind.Erc20;
  contract: BlockchainAddress;
  to: BlockchainAddress;
  amount: Amount;
};

export type TransferErc721Request = {
  kind: TransferKind.Erc721;
  contract: BlockchainAddress;
  to: BlockchainAddress;
  tokenId: string;
};

export type BroadcastEvmTransactionRequest = {
  kind: TransactionKind.Evm;
  to?: BlockchainAddress;
  value?: Amount;
  data?: string;
  nonce?: number;
  gasLimit?: Amount;
  gasPrice?: Amount;
  maxPriorityFeePerGas?: Amount;
  maxFeePerGas?: Amount;
};

export type SignHashRequest = {
  kind: SignatureKind.Hash;
  hash: string;
};

export type Eip712Domain = {
  name?: string;
  version?: string;
  chainId?: number;
  verifyingContract?: BlockchainAddress;
  salt?: string;
};

export type SignEip712TypedDataRequest = {
  kind: SignatureKind.Eip712;
  types: Record<string, unknown>;
  domain: Eip712Domain;
  message: Record<string, unknown>;
};

export type Wallet = {
  id: EntityId;
  network: BlockchainNetwork;
  status: WalletStatus;
  address?: string;
  name?: string;
  externalId?: string;
  tags: Tag[];
  dateCreated: IsoDatetime;
};

export type WalletAssets = {
  walletId: EntityId;
  network: BlockchainNetwork;
  assets: WalletAsset[];
};

export type WalletAsset = {
  contract?: string;
  name?: string;
  symbol?: string;
  decimals: number;
  balance: Amount;
};

export type WalletNfts = {
  walletId: EntityId;
  network: BlockchainNetwork;
  nfts: WalletNft[];
};

export type WalletNft = {
  contract: string;
  name?: string;
  symbol?: string;
  tokenIds: string[];
  count: number;
};

export type PaginatedWalletList = {
  items: Wallet[];
  nextPageToken?: string;
};

export type NativeTransferEvent = {
  kind: EventKind.NativeTransfer;
  walletId: EntityId;
  network: BlockchainNetwork;
  blockNumber: number;
  txHash: string;
  index?: string;
  timestamp: IsoDatetime;
  fee?: Amount;
  direction: TransferDirection;
  symbol: string;
  decimals: number;
  from: BlockchainAddress;
  to: BlockchainAddress;
  value: Amount;
};

export type Erc20TransferEvent = {
  kind: EventKind.Erc20Transfer;
  walletId: EntityId;
  network: BlockchainNetwork;
  blockNumber: number;
  txHash: string;
  index?: string;
  timestamp: IsoDatetime;
  fee?: Amount;
  direction: TransferDirection;
  contract: BlockchainAddress;
  name?: string;
  symbol?: string;
  decimals: number;
  from: BlockchainAddress;
  to: BlockchainAddress;
  value: Amount;
};

export type Erc721TransferEvent = {
  kind: EventKind.Erc721Transfer;
  walletId: EntityId;
  network: BlockchainNetwork;
  blockNumber: number;
  txHash: string;
  index?: string;
  timestamp: IsoDatetime;
  fee?: Amount;
  direction: TransferDirection;
  contract: BlockchainAddress;
  name?: string;
  symbol?: string;
  from: BlockchainAddress;
  to: BlockchainAddress;
  tokenId: string;
};

export type PaginatedEventHistory = {
  walletId: EntityId;
  network: BlockchainNetwork;
  items: BlockchainEvent[];
  nextPageToken?: string;
};

export type TransferRequest = {
  id: EntityId;
  walletId: EntityId;
  network: BlockchainNetwork;
  txHash?: string;
  requester: RequesterIdentity;
  requestBody: TransferAssetRequest;
  status: TransferStatus;
  fee?: Amount;
  error?: string;
  dateRequested: IsoDatetime;
  dateBroadcasted?: IsoDatetime;
  dateConfirmed?: IsoDatetime;
};

export type PaginatedTransferList = {
  walletId: EntityId;
  items: TransferRequest[];
  nextPageToken?: string;
};

export type TransactionRequest = {
  id: EntityId;
  walletId: EntityId;
  network: BlockchainNetwork;
  txHash?: string;
  requester: RequesterIdentity;
  requestBody: BroadcastTransactionRequest;
  status: TransactionStatus;
  error?: string;
  fee?: Amount;
  dateRequested: IsoDatetime;
  dateBroadcasted?: IsoDatetime;
  dateConfirmed?: IsoDatetime;
};

export type PaginatedTransactionList = {
  walletId: EntityId;
  items: TransactionRequest[];
  nextPageToken?: string;
};

export type Signature = {
  r: string;
  s: string;
  recid?: number;
};

export type SignatureRequest = {
  id: EntityId;
  walletId: EntityId;
  requester: RequesterIdentity;
  requestBody: GenerateSignatureRequest;
  signature?: Signature;
  status: SignatureStatus;
  error?: string;
  dateRequested: IsoDatetime;
  datePolicyResolved?: IsoDatetime;
  dateSigned?: IsoDatetime;
};

export type PaginatedSignatureList = {
  walletId: EntityId;
  items: SignatureRequest[];
  nextPageToken?: string;
};

export type RequesterIdentity = {
  kind: IdentityKind;
  userId: EntityId;
  tokenId?: EntityId;
  appId?: EntityId;
};

export type CreateWalletRequest = {
  network: BlockchainNetwork;
  externalId?: string;
  tags?: Tag[];
  name?: string;
};

export type TransferAssetRequest =
  | TransferNativeRequest
  | TransferErc20Request
  | TransferErc721Request;

export type BroadcastTransactionRequest = BroadcastEvmTransactionRequest;

export type GenerateSignatureRequest =
  | SignHashRequest
  | SignEip712TypedDataRequest;

export type BlockchainEvent =
  | NativeTransferEvent
  | Erc20TransferEvent
  | Erc721TransferEvent;

export enum TransferKind {
  Native = 'Native',
  Erc20 = 'Erc20',
  Erc721 = 'Erc721',
}

export enum TransactionKind {
  Evm = 'Evm',
}

export enum SignatureKind {
  Hash = 'Hash',
  Eip712 = 'Eip712',
}

export enum WalletStatus {
  Active = 'Active',
  //Initial state of `AssetAccount` entity, indicating that it’s being created at the moment.
  Creating = 'Creating',
  Failed = 'Failed',
}

export enum EventKind {
  NativeTransfer = 'NativeTransfer',
  Erc20Transfer = 'Erc20Transfer',
  Erc721Transfer = 'Erc721Transfer',
}

export enum TransferDirection {
  In = 'In',
  Out = 'Out',
}

export enum TransferStatus {
  Pending = 'Pending',
  Broadcasted = 'Broadcasted',
  Confirmed = 'Confirmed',
  Failed = 'Failed',
}

export enum TransactionStatus {
  Pending = 'Pending',
  Broadcasted = 'Broadcasted',
  Confirmed = 'Confirmed',
  Failed = 'Failed',
}

export enum SignatureStatus {
  Pending = 'Pending',
  Signed = 'Signed',
  Failed = 'Failed',
}
