import abiERC20 from "../contracts/erc20.json";
import abiROM from "../contracts/RiteOfMoloch.json";
import abiROMFac from "../contracts/RiteOfMolochFactory.json";
import abiBaal from "../contracts/baal.json";

type ABI = {}[];

/**
 * @remarks returns abi based on contract type
 * @param contract
 * @returns
 */
const useAbi = (contract: string): ABI => {
  let abi;
  if (contract === "riteOfMolochAddress") {
    abi = abiROM;
  } else if (contract === "riteOfMolochFactoryAddress") {
    abi = abiROMFac;
  } else if (contract === "erc20TokenAddress") {
    abi = abiERC20;
  } else {
    abi = abiBaal;
  }
  return abi;
};

export default useAbi;
