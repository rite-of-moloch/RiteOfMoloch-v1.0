export const IPFS_ENDPOINT = "https://ipfs.infura.io";

export const BOX_ENDPOINT = "https://ipfs.3box.io";

export const SIGNATURE_MESSAGE =
  "This signature is only required for authentication.";

export const CONTRACT_ADDRESSES: { [key: string]: { [key: string]: string } } =
  {
    5: {
      erc20TokenAddress: "0x1A4B691738C9c8Db8f2EDf0b9207f6acb24ADF07",
      riteOfMolochAddress: "0x898262D785eeB789601b0BF8580a05426D6bfa58",
      riteOfMolochFactoryAddress: "0xEaB493C3282F49Bff75dE00fbe060ca7abD2d133",
    },
    100: {
      erc20TokenAddress: "0x18e9262e68cc6c6004db93105cc7c001bb103e49",
      riteOfMolochAddress: "0x67f22aa92dc5bc8840073f0b9251af679a99ab57",
      riteOfMolochFactoryAddress: "0xBb7353efB505D63408D1C762A5C3A1636E9Ca003",
    },
  };

export const TOKEN_TICKER = {
  5: "mRAID",
  100: "RAID",
};

export const EXPLORER_URLS = {
  4: "https://rinkeby.etherscan.io",
  100: "https://blockscout.com/xdai/mainnet",
};

const secondsInADay = 60 * 60 * 24;

export const msInADay = secondsInADay * 1000;

export const sixMonthsInSeconds = secondsInADay * 30 * 6;

export const getReturnValues = (countDown: any) => {
  const days = Math.floor(countDown / msInADay);
  const hours = Math.floor((countDown % msInADay) / (1000 * 60 * 60));
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
  const secondsLeft = countDown / 1000;

  return [days, hours, minutes, seconds, secondsLeft];
};
