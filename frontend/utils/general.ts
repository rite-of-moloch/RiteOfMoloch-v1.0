export const truncateAddress = (address: string): string =>
  `${address.slice(0, 4)}...${address.slice(-4)}`;
