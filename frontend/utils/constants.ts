export const CONTRACT_ADDRESSES: { [key: string]: { [key: string]: string } } =
  {
    // chain 5 = Goerli
    5: {
      erc20TokenAddress: "0x1Cfb862056ecF2677615F9eB3420B04fb4911C01",
      riteOfMolochFactoryAddress: "0xe9c1090d498da72242a0834c984493a5a7c7ca57",
    },
    // chain 100 = Gnosis
    100: {
      erc20TokenAddress: "0x18E9262e68Cc6c6004dB93105cc7c001BB103e49",
      // TODO update Gnosis factory address
      riteOfMolochFactoryAddress: "0xe9c1090d498da72242a0834c984493a5a7c7ca57",
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
