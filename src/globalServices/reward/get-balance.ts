import { get_user_reward_balance_with_url } from '@developeruche/runtime-sdk';
import { RUNTIME_URL } from '@src/config/env.config';
import { ethers } from 'ethers';

export const getBalance = async ({
  walletAddress,
  contractAddress,
}: {
  contractAddress: string;
  walletAddress: string;
}) => {
  const balanceReq = await get_user_reward_balance_with_url(
    {
      address: walletAddress,
      reward_address: contractAddress,
    },
    RUNTIME_URL,
  );

  if (!balanceReq.data?.result) {
    throw new Error('Error fetching campaign wallet balance');
  }

  const formattedBalance = ethers.utils.formatEther(balanceReq.data.result);
  const balance = Number(formattedBalance);

  return balance;
};
