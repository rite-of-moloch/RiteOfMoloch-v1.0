import abiERC20 from "../contracts/erc20TokenAddress.json";
import abiROM from "../contracts/riteOfMolochAddress.json";
import abiROMFac from "../contracts/riteOfMolochFactoryAddress.json";

type ABI = {}[];

const useAbi = (contractName: string): ABI => {
  let abi;
  if (contractName === "riteOfMolochAddress") {
    abi = abiROM;
  } else if (contractName === "riteOfMolochFactoryAddress") {
    abi = abiROMFac;
  } else {
    abi = abiERC20;
  }
  return abi;
};

export default useAbi;
