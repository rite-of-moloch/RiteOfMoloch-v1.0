export const CONTRACT_ADDRESSES: { [key: string]: { [key: string]: string } } =
  {
    5: {
      erc20TokenAddress: "0x1Cfb862056ecF2677615F9eB3420B04fb4911C01",
      riteOfMolochAddress: "0x898262D785eeB789601b0BF8580a05426D6bfa58",
      riteOfMolochFactoryAddress: "0x029bbd26bb61d47db2212a7c842ab0a7f7956f46",
    },
    100: {
      erc20TokenAddress: "0x18E9262e68Cc6c6004dB93105cc7c001BB103e49",
      riteOfMolochAddress: "0x67f22aa92dc5bc8840073f0b9251af679a99ab57",
      riteOfMolochFactoryAddress: "0xBb7353efB505D63408D1C762A5C3A1636E9Ca003",
    },
  };

export const TOKEN_TICKER: { [k: number]: string } = {
  5: "mRAID",
  100: "RAID",
};

const secondsInADay: number = 60 * 60 * 24;
export const msInADay = secondsInADay * 1000;
export const sixMonthsInSeconds = secondsInADay * 30 * 6;

export const getReturnValues = (countDown: number): number[] => {
  const days = Math.floor(countDown / msInADay);
  const hours = Math.floor((countDown % msInADay) / (1000 * 60 * 60));
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
  const secondsLeft = countDown / 1000;

  return [days, hours, minutes, seconds, secondsLeft];
};
