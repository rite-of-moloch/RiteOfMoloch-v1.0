// chain 5 = Goerli
export const CONTRACT_ADDRESSES: { [key: string]: { [key: string]: string } } =
  {
    5: {
      erc20TokenAddress: "0x1Cfb862056ecF2677615F9eB3420B04fb4911C01",
      riteOfMolochFactoryAddress: "0xe9c1090d498da72242a0834c984493a5a7c7ca57",
    },

    100: {
      erc20TokenAddress: "0x18E9262e68Cc6c6004dB93105cc7c001BB103e49",
      // TODO update Gnosis factory address
      riteOfMolochFactoryAddress: "0xe9c1090d498da72242a0834c984493a5a7c7ca57",
    },
  };
