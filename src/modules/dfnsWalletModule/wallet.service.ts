import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { Wallet } from '@src/globalServices/wallet/entities/wallet.entity';
import { User } from '@src/globalServices/user/entities/user.entity';
import {
  createWallet,
  generateSignature,
  getHistory,
  getSignature,
  getTransfer,
  getWallet,
  getWalletAssets,
  transfer,
} from '@src/globalServices/dfns/walletService';
import { TransferKind } from '@src/globalServices/dfns/Wallets';
import {
  MeProtocol,
  MinimalForwarder,
  chainId,
  getMetaTxTypeData,
  signMetaTxRequest,
  unsplitSignature,
} from '@src/globalServices/wallet/walletUtils';

@Injectable()
export class DFNSWalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletEntity: Repository<Wallet>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // create axios instance

  private axiosInstance = axios.create({
    baseURL:
      'https://api.defender.openzeppelin.com/autotasks/c892d48f-5432-4f06-8721-37151deb7c20/runs/webhook/72e3ea12-98b4-47d3-b317-212e3ce70193/SRBGhSaLmzadNbeqiwbWpo',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  async create(userId: string) {
    try {
      const user = await this.userRepo.findOne({
        where: {
          id: userId,
        },
        relations: ['customer'],
      });

      const checkWallet = await this.walletEntity.findOneBy({ userId });

      if (checkWallet) {
        return checkWallet;
      }

      const wallet = await createWallet(`${user.customer.name} Wallet`);

      const newWallet = new Wallet();
      newWallet.userId = userId;
      newWallet.walletId = wallet.id;

      return await this.walletEntity.save(newWallet);
    } catch (error) {
      console.log(error.response.data);
      throw new HttpException(
        error.response.data.error.message ?? 'Error creating wallet',
        400,
      );
    }
  }

  async getSingleWallet(userId: string) {
    const userWallet = await this.walletEntity.findOneBy({ userId });

    if (!userWallet) {
      throw new HttpException('Wallet not found', 404);
    }

    const wallet = await getWallet(userWallet.walletId);

    return wallet;
  }

  async getWalletBalances(userId: string) {
    const userWallet = await this.walletEntity.findOneBy({ userId });

    if (!userWallet) {
      throw new HttpException('Wallet not found', 404);
    }

    const assets = await getWalletAssets(userWallet.walletId);

    return assets;
  }

  async getSingleWalletBalance(userId: string, contractAddress: string) {
    const userWallet = await this.walletEntity.findOneBy({ userId });

    if (!userWallet) {
      throw new HttpException('Wallet not found', 404);
    }

    const wallet = await getWalletAssets(userWallet.walletId);
    let balance;

    balance = wallet.assets.find((asset) => asset.contract === contractAddress);

    if (!balance) {
      balance = wallet.assets.find((token) => token.symbol === contractAddress);
    }

    return balance ? balance : { balance: 0 };
  }

  async getWalletHistory(userId: string, paginationToken: string) {
    try {
      const userWallet = await this.walletEntity.findOneBy({ userId });

      if (!userWallet) {
        throw new HttpException('Wallet not found', 404);
      }

      const history = await getHistory(userWallet.walletId, paginationToken);

      return history;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error getting wallet history', 400);
    }
  }

  async sendTokens(
    userId: string,
    toAddress: string,
    amount: string,
    contract: string,
  ) {
    const userWallet = await this.walletEntity.findOneBy({ userId });

    if (!userWallet) {
      throw new HttpException('Wallet not found', 404);
    }

    const send = await transfer(
      {
        to: toAddress,
        amount,
        kind: TransferKind.Erc20,
        contract,
      },
      userWallet.walletId,
    );

    return send;
  }

  async getTransferStatus(userId: string, transferId: string) {
    const userWallet = await this.walletEntity.findOneBy({ userId });

    if (!userWallet) {
      throw new HttpException('Wallet not found', 404);
    }

    const transfer = await getTransfer(userWallet.walletId, transferId);

    return transfer;
  }

  async generateNewSignature(userId: string) {
    const userWallet = await this.walletEntity.findOneBy({ userId });

    if (!userWallet) {
      throw new HttpException('Wallet not found', 404);
    }

    const wallet = await getWallet(userWallet.walletId);

    const signatureBody = await getMetaTxTypeData(chainId, MinimalForwarder, {
      to: MeProtocol,
      from: wallet.address,
      data: '0x',
    });

    const signature = await generateSignature(
      signatureBody,
      userWallet.walletId,
    );

    return signature;
  }

  async getSignatureStatus(userId: string, signatureId: string) {
    try {
      const userWallet = await this.walletEntity.findOneBy({ userId });

      if (!userWallet) {
        throw new HttpException('Wallet not found', 404);
      }

      const wallet = await getWallet(userWallet.walletId);

      const signature = await getSignature(signatureId, userWallet.walletId);

      const concateSignature = unsplitSignature(signature.signature);

      const request = await signMetaTxRequest(
        {
          to: MeProtocol,
          from: wallet.address,
          data: '0x',
        },
        concateSignature,
      );

      // console.log(request);

      const req = await this.axiosInstance.post('/', {
        signature: request.signature,
        request: request.request,
      });

      if (req.data.status === 'success') {
        return 'Signature signed and sent to webhook';
      }

      throw new HttpException(
        req.data.message ?? 'Error getting signature',
        400,
      );
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, 400);
    }
  }
}
