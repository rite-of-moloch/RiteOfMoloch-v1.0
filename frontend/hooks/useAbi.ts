import abiERC20 from "../contracts/erc20TokenAddress.json";
import abiROM from "../contracts/riteOfMolochAddress.json";
import abiROMFac from "../contracts/riteOfMolochFactoryAddress.json";

type ABI = {}[];

const useAbi = (contractName: string): ABI => {
  let abi;
  if (contractName === "erc20TokenAddress") {
    abi = abiERC20;
  } else if (contractName === "riteOfMolochAddress") {
    abi = abiROM;
  } else {
    abi = abiROMFac;
  }
  return abi;
};

export default useAbi;
