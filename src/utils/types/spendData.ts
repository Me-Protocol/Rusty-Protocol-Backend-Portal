export type Sig = {
  s: string;
  r: string;
  v: number;
};
export type SpendData = {
  sig: Sig;
  reward: string;
  owner: string;
  spender: string;
  value: string;
  count: string;
};
