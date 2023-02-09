export const CONTRACT_ADDRESSES: { [key: string]: { [key: string]: string } } =
  {
    5: {
      erc20TokenAddress: "0x1Cfb862056ecF2677615F9eB3420B04fb4911C01",
      riteOfMolochFactoryAddress: "0x8C8a2a71a7aDE2E69c60a7814a359372DEdCD523",
    },
    100: {
      erc20TokenAddress: "0x18E9262e68Cc6c6004dB93105cc7c001BB103e49",
      // * TODO: update Gnosis factory address
      riteOfMolochFactoryAddress: "0xBb7353efB505D63408D1C762A5C3A1636E9Ca003",
    },
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
