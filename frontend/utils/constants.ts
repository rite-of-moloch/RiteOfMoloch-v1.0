export const IPFS_ENDPOINT = "https://ipfs.infura.io";

export const BOX_ENDPOINT = "https://ipfs.3box.io";

export const SIGNATURE_MESSAGE =
  "This signature is only required for authentication.";

export const CONTRACT_ADDRESSES = {
  5: {
    erc20TokenAddress: "0x50589c90DA71600B06fCcDe89c79469aFe12ea65",
    riteOfMolochAddress: "0x35e02D20B12E7002B1B8c13D35Eb59d8FC383d7b",
    riteOfMolochFactoryAddress: "0x885253B92fEE0F4a0B0eCA81846782ED68D5C3C1",
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
