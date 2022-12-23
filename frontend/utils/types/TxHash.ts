// only concerned with output (value)
export interface TxHash {
  [k: string]: { _hex: string; _isBigNumber: boolean };
}
