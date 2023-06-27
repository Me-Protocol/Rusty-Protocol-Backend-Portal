// const ethSigUtil = require('eth-sig-util');

import { ethers } from "ethers";
import { createInstance } from "./contracts";
import { GenerateSignatureRequest, SignatureKind } from "../dfns/Wallets";

const EIP712Domain = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "chainId", type: "uint256" },
  { name: "verifyingContract", type: "address" },
];

const ForwardRequest = [
  { name: "from", type: "address" },
  { name: "to", type: "address" },
  { name: "value", type: "uint256" },
  { name: "gas", type: "uint256" },
  { name: "nonce", type: "uint256" },
  { name: "data", type: "bytes" },
];

export const MinimalForwarder = "0xE8b992C779C7AbF5FaEeD81AB7B425FDA78A1856";
export const MeProtocol = "0x02B59f28f6bA119dc7Ef1D62C90259a20626e719";
export const chainId = 80001;

export async function getMetaTxTypeData(
  chainId: number,
  verifyingContract: string,
  data: any
): Promise<GenerateSignatureRequest> {
  return {
    kind: SignatureKind.Eip712,
    types: {
      ForwardRequest,
      EIP712Domain,
    },
    domain: {
      name: "MinimalForwarder",
      version: "0.0.1",
      chainId,
      verifyingContract,
    },
    // primaryType: 'ForwardRequest',
    message: await buildRequest(createInstance(), data),
  };
}

async function signTypedData(signer, from, data) {
  // make a post request to dfns to sign ([from, argData]) -> This would return the signature
}

// const sig = signer.send("eth_signTypedData_v4", [from, JSON.stringify(data)])
// const sig = signer.send("eth_signMessage", [from, JSON.stringify(data)])

// export async function buildRequest(input) {
//   const nonce = await createInstance()
//     .getNonce(input.from)
//     .then((nonce) => nonce.toString());
//   return { value: 0, gas: 1e6, nonce, ...input };
// }

export function unsplitSignature(signature) {
  const { recid, r, s } = signature;

  return ethers.utils.joinSignature({ v: recid, r, s });
}

export async function signMetaTxRequest(
  input: {
    from: string;
    to: string;
    data: string;
  },
  signature: string
) {
  const request = await buildRequest(createInstance(), input);
  return { signature, request };
}

async function buildRequest(forwarder: any, input: any) {
  const nonce = await forwarder
    .getNonce(input.from)
    .then((nonce: any) => Number(nonce).toString());
  return { value: 0, gas: 1e6, nonce, ...input };
}
