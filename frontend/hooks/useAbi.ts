import abiERC20 from "../contracts/erc20.json";
import abiROM from "../contracts/riteOfMoloch.json";
import abiROMFac from "../contracts/riteOfMolochFactory.json";
import abiBaal from "../contracts/baal.json";

type ABI = {}[];

const useAbi = (contract: string): ABI => {
  switch (contract) {
    case "riteOfMolochAddress":
      return abiROM;
    case "riteOfMolochFactoryAddress":
      return abiROMFac;
    case "erc20TokenAddress":
      return abiERC20;
    default:
      return abiBaal;
  }
};

export default useAbi;
