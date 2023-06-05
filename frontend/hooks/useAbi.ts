import abiERC20 from "../contracts/erc20.json";
import abiROM from "../contracts/riteOfMoloch.json";
import abiROMFac from "../contracts/riteOfMolochFactory.json";

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
  } else {
    abi = abiERC20;
  }
  return abi;
};

export default useAbi;
