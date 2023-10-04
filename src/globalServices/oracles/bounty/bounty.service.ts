/* eslint-disable @typescript-eslint/ban-ts-comment */
declare function require(name: string): any;
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Web3 from 'web3';
import Common from 'ethereumjs-common';
import { TasksService } from '@src/globalServices/task/task.service';
import { Bounty } from './entities/bounty.entity';
import { Block } from './entities/block.entity';
import ABI from '@src/common/json/contractAbis/bountyAbi.json';

const Tx = require('ethereumjs-tx').Transaction;
const web3Provider = new Web3.providers.HttpProvider(
  `https://polygon-mumbai.g.alchemy.com/v2/wjy--FJ5mkBl5ZuAfNhKy9C1Gvf0mnOk`,
);
const web3 = new Web3(web3Provider);
const CONTRACT_ADDRESS =
  process.env.CONTRACT_ADDRESS || '0xDee82cA83f6d14dAC418aF453E03C760B30e7bE9';
// @ts-ignore
const BountyContract = new web3.eth.Contract(ABI.abi, CONTRACT_ADDRESS);

@Injectable()
export class BountyService {
  constructor(
    private readonly taskService: TasksService,
    @InjectRepository(Bounty)
    private bountyEntity: Repository<Bounty>,
    @InjectRepository(Block)
    private blockEntity: Repository<Block>,
  ) {}

  // @Cron(CronExpression.EVERY_30_SECONDS)
  async startBountyTask() {
    try {
      const bounties = await this.bountyEntity.find();
      let startBlock: number;

      if (bounties.length === 0) {
        startBlock = Number(process.env.BOUNTY_START_BLOCK || 29379250);
      } else {
        startBlock = Number(bounties[bounties.length - 1].lastestBlockNumber);
      }

      //TODO: checks if this address is amoung our bounty pools

      const latest_block = (await web3.eth.getBlockNumber()).toString();
      console.log('latest: ', latest_block, 'start block: ', startBlock);

      const events = await BountyContract.getPastEvents('allEvents', {
        fromBlock: startBlock,
        toBlock: 'latest',
      });

      console.log('events: ', events);

      if (events.length > 0) {
        events.forEach(async ({ returnValues }: any) => {
          const { timestamp, reward_token } = returnValues;
          await this.taskService.findNextTask(reward_token);
        });

        if (!startBlock)
          if (bounties.length <= 0) {
            // throw new ForbiddenException(
            //   'No block started for this bounty',
            //   HttpStatus.FORBIDDEN as any,
            // );

            // console.log('No block started for this bounty');

            const newBounty = new Bounty();
            newBounty.lastestBlockNumber = latest_block;
            this.bountyEntity.save(newBounty);
          } else {
            const lastBounty = bounties[bounties.length - 1];

            this.bountyEntity
              .createQueryBuilder()
              .update({ lastestBlockNumber: latest_block })
              .where({ id: lastBounty.id })
              .execute();
          }
      } else {
        // throw new BadRequestException(
        //   'No new bounty events since the last task was created',
        //   HttpStatus.BAD_REQUEST as any,
        // );
        // console.log('No new bounty events since the last task was created');
      }
    } catch (e) {
      // console.log(e);
    }
  }

  async emitEvent() {
    const privateKey = process.env.BOUNTY_PRIVATE_KEY;
    const latest_block = (await web3.eth.getBlockNumber()).toString();

    const newBlock = new Block();
    newBlock.blockNumber = latest_block;
    await this.blockEntity.save(newBlock);

    const blocks = await this.blockEntity.find();
    const bounties = await this.bountyEntity.find();

    const lb = blocks[blocks.length - 1];

    if (bounties.length === 0) {
      const newBounty = new Bounty();
      newBounty.lastestBlockNumber = lb.blockNumber;
      await this.bountyEntity.save(newBounty);
    } else {
      const lastBounty = bounties[bounties.length - 1];
      this.bountyEntity
        .createQueryBuilder()
        .update({ lastestBlockNumber: lb.blockNumber })
        .where({ id: lastBounty.id })
        .execute();
    }

    const bountyTrx = await BountyContract.methods.emitEvent().encodeABI();
    const rawSerialized = await this._getSignedTransaction(
      bountyTrx,
      privateKey,
      CONTRACT_ADDRESS,
    );
    const trx = await web3.eth.sendSignedTransaction(rawSerialized);
  }

  _getSignedTransaction = async (
    encoded: any,
    privateKey: any,
    contractAddress: any,
  ) => {
    try {
      const zoneAccount = web3.eth.accounts.privateKeyToAccount(
        `0x${privateKey}`,
      );
      const result = await web3.eth
        .getTransactionCount(zoneAccount.address, 'pending')
        .then(async (txCount: any) => {
          const gasPrice = await web3.eth.getGasPrice();

          const txObj = {
            nonce: web3.utils.toHex(txCount),
            gasPrice: web3.utils.toHex(gasPrice),
            gasLimit: web3.utils.toHex((3000000).toString()),
            data: encoded,
            chainId: 80001,
            to: contractAddress,
          };

          // @ts-ignore
          const custom = Common.default.forCustomChain(
            'mainnet',
            { chainId: 80001, name: 'Mumbai-Testnet' },
            'istanbul',
          );

          const tx = new Tx(txObj, { common: custom });

          // if (privateKey.substring(0, 2) == '0x') {
          //     privateKey = privateKey.slice(2);
          // }
          const privaten = Buffer.from(privateKey, 'hex');
          tx.sign(privaten);
          const serialized = tx.serialize();
          const rawSerialized = '0x' + serialized.toString('hex');
          return rawSerialized;
        });
      return result;
    } catch (e) {
      return e;
    }
  };

  saveBounty(bounty: Bounty) {
    return this.bountyEntity.save(bounty);
  }
}
