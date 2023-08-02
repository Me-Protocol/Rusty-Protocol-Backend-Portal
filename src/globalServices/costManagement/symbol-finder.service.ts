export enum supportedNetworks {
  MUMBAI = 'MUMBAI',
}

const symbols = {
  MUMBAI: 'MATIC',
  ETHERUEM: 'ETH',
};

const retrieveTokenSymbolFromNetwork = (network: supportedNetworks) => {
  return symbols[network];
};

export default retrieveTokenSymbolFromNetwork;
