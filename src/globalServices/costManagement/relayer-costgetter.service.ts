import axios from 'axios';
import symbolRetriever, { supportedNetworks } from './symbol-finder.service';
import { logger } from '../logger/logger.service';

const retrieveCost = (
  costKey: string,
  relayer: string,
  network: supportedNetworks,
) => {
  switch (relayer) {
    case 'gelato': {
      return gelatoCostRetriever(costKey, network);
    }
  }
};

const gelatoCostRetriever = async (
  taskId: string,
  network: supportedNetworks,
) => {
  const url = process.env.GELATO_RELAYER_STATUS_URL + taskId;
  const gelatoResponse = await axios.get(url);

  if (!gelatoResponse.data.task) return null;

  const transactionHash = gelatoResponse.data.task.transactionHash;
  const cost = await getGasCost(network, transactionHash);

  if (cost) {
    const totalCost = addPremium(cost);
    const tokenSymbol = symbolRetriever(network);
    const totalCostInDollar = await retrieveCostInDollar(
      totalCost,
      tokenSymbol,
    );
    return { totalCost, totalCostInDollar, tokenSymbol };
  } else {
    throw new Error('Cost not found');
  }
};

const calculateTransactionFee = (gasUsed: number, gasPriceInGwei: number) => {
  const gasPriceInEthers = gasPriceInGwei / 1000000000;
  const transactionFee = gasUsed * gasPriceInEthers;
  return transactionFee;
};

const addPremium = (cost: number) => {
  const premiumIncrement: number = 100 + parseInt(process.env.PREMIUM);
  return (cost * premiumIncrement) / 100;
};

const retrieveCostInDollar = async (cost: number, tokenSymbol: string) => {
  const response = await axios.get(process.env.PRICE_ORACLE_URL, {
    params: {
      symbol: tokenSymbol,
      convert: 'USD',
    },
    headers: {
      'X-CMC_PRO_API_KEY': process.env.PRICE_ORACLE_API_KEY,
    },
  });

  const tokenData = response.data.data[tokenSymbol];
  const priceInUSD = tokenData[0].quote.USD.price;

  return priceInUSD * cost;
};

export const getMeTokenValueInUSD = async () => {
  // const response = await axios.get(process.env.PRICE_ORACLE_URL, {
  //   params: {
  //     symbol: 'ME',
  //     convert: 'USD',
  //   },
  //   headers: {
  //     'X-CMC_PRO_API_KEY': process.env.PRICE_ORACLE_API_KEY,
  //   },
  // });
  // const tokenData = response.data.data['ME'];
  // const priceInUSD = tokenData[0].quote.USD.price;
  // return priceInUSD;
};

const getGasCost = async (network: string, transactionHash: string) => {
  switch (network) {
    case 'MUMBAI':
      return await getPolygonMumbaiCost(transactionHash);
    default:
      return await getPolygonMumbaiCost(transactionHash);
  }
};

const getPolygonMumbaiCost = async (
  transactionHash: string,
): Promise<number> => {
  return await axios
    .get(process.env.MUMBAI_INDEXER_URL, {
      params: {
        module: 'proxy',
        action: 'eth_getTransactionByHash',
        txhash: transactionHash,
        apikey: process.env.MUMBAI_INDEXER_API_KEY,
      },
    })
    .then((response) => {
      if (!response?.data?.result?.gas) {
        throw new Error('Failed to retrieve cost');
      }

      const gas = response.data.result.gas;
      const gasPriceInGWei = response.data.result.gasPrice / 1000000000;
      const cost = calculateTransactionFee(gas, gasPriceInGWei);

      return cost;
    })
    .catch((error) => {
      logger.error(error);
      throw new Error('Failed to retrieve cost');
    });
};

export default retrieveCost;
