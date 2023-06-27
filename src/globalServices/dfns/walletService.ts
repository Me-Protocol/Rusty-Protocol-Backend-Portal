import crypto from 'crypto';

import { ClientSideHttpClient } from './dfnsHttpClient';
import { WalletsClient } from './WalletsClient';
import { SignMessage } from './utils';
import { BlockchainNetwork } from './Foundations';
import {
  GenerateSignatureRequest,
  PaginatedEventHistory,
  SignatureKind,
  SignatureRequest,
  TransferErc20Request,
  TransferRequest,
  Wallet,
  WalletAssets,
} from './Wallets';

const token = process.env.DFNS_ACCESS_TOKEN as string;
const privateKey = process.env.DFNS_PRIVATE_ACCESS_TOKEN;
const appId = 'ap-nfs20-m8pi8-m5q10lttplu57vs';
const baseUrl = 'api.dfns.ninja';
const origin = 'http://localhost:1350';
const rpId = 'dfns.ninja';

const signMessage: SignMessage = async (
  message: Buffer,
  humanReadableMessage: string,
): Promise<Buffer> => {
  console.log(`Signing: ${humanReadableMessage}`);
  return crypto.sign(undefined, message, privateKey);
};

export const createWallet = async (walletName: string): Promise<Wallet> => {
  const clientSideClient = new ClientSideHttpClient(
    appId,
    baseUrl,
    origin,
    rpId,
  );

  if (
    !(await clientSideClient.authAsApiKey(
      token,
      signMessage,
      //   createUserCredentials,
    ))
  ) {
    throw new Error('Authentication failed.');
  }

  const walletsClient = new WalletsClient(clientSideClient);

  const wallet = await walletsClient.createWallet({
    network: BlockchainNetwork.MATIC_MUMBAI,
    name: walletName,
  });

  return wallet;
};

export const getWallet = async (walletId: string): Promise<Wallet> => {
  const clientSideClient = new ClientSideHttpClient(
    appId,
    baseUrl,
    origin,
    rpId,
  );

  if (
    !(await clientSideClient.authAsApiKey(
      token,
      signMessage,
      //   createUserCredentials,
    ))
  ) {
    throw new Error('Authentication failed.');
  }

  const walletsClient = new WalletsClient(clientSideClient);

  const wallet = await walletsClient.getWallet(walletId);

  return wallet;
};

export const getWalletAssets = async (
  walletId: string,
): Promise<WalletAssets> => {
  const clientSideClient = new ClientSideHttpClient(
    appId,
    baseUrl,
    origin,
    rpId,
  );

  if (
    !(await clientSideClient.authAsApiKey(
      token,
      signMessage,
      //   createUserCredentials,
    ))
  ) {
    throw new Error('Authentication failed.');
  }

  const walletsClient = new WalletsClient(clientSideClient);

  const assets = await walletsClient.getWalletAssets(walletId);

  return assets;
};

export const getHistory = async (
  walletId: string,
  paginationToken?: string,
): Promise<PaginatedEventHistory> => {
  const clientSideClient = new ClientSideHttpClient(
    appId,
    baseUrl,
    origin,
    rpId,
  );

  if (
    !(await clientSideClient.authAsApiKey(
      token,
      signMessage,
      //   createUserCredentials,
    ))
  ) {
    throw new Error('Authentication failed.');
  }

  const walletsClient = new WalletsClient(clientSideClient);

  const history = await walletsClient.getWalletHistory({
    walletId,
    paginationToken,
    // limit: 10,
  });

  return history;
};

export const transfer = async (
  body: TransferErc20Request,
  walletId: string,
): Promise<TransferRequest> => {
  const clientSideClient = new ClientSideHttpClient(
    appId,
    baseUrl,
    origin,
    rpId,
  );

  if (
    !(await clientSideClient.authAsApiKey(
      token,
      signMessage,
      //   createUserCredentials,
    ))
  ) {
    throw new Error('Authentication failed.');
  }

  const walletsClient = new WalletsClient(clientSideClient);

  const transfer = await walletsClient.transferAsset(body, walletId);

  return transfer;
};

export const getTransfer = async (
  walletId: string,
  transferId: string,
): Promise<TransferRequest> => {
  const clientSideClient = new ClientSideHttpClient(
    appId,
    baseUrl,
    origin,
    rpId,
  );

  if (
    !(await clientSideClient.authAsApiKey(
      token,
      signMessage,
      //   createUserCredentials,
    ))
  ) {
    throw new Error('Authentication failed.');
  }

  const walletsClient = new WalletsClient(clientSideClient);

  const transfer = await walletsClient.getTransfer(walletId, transferId);

  return transfer;
};

export const generateSignature = async (
  body: GenerateSignatureRequest,
  walletId: string,
): Promise<SignatureRequest> => {
  const clientSideClient = new ClientSideHttpClient(
    appId,
    baseUrl,
    origin,
    rpId,
  );

  if (
    !(await clientSideClient.authAsApiKey(
      token,
      signMessage,
      //   createUserCredentials,
    ))
  ) {
    throw new Error('Authentication failed.');
  }

  const walletsClient = new WalletsClient(clientSideClient);

  const signature = await walletsClient.generateSignature(body, walletId);

  return signature;
};

export const getSignature = async (
  signatureId: string,
  walletId: string,
): Promise<SignatureRequest> => {
  const clientSideClient = new ClientSideHttpClient(
    appId,
    baseUrl,
    origin,
    rpId,
  );

  if (
    !(await clientSideClient.authAsApiKey(
      token,
      signMessage,
      //   createUserCredentials,
    ))
  ) {
    throw new Error('Authentication failed.');
  }

  const walletsClient = new WalletsClient(clientSideClient);

  const signature = await walletsClient.getSignature(walletId, signatureId);

  return signature;
};
