import abiERC20 from "../contracts/erc20TokenAddress.json";
import abiROM from "../contracts/riteOfMolochAddress.json";
import abiROMFac from "../contracts/riteOfMolochFactoryAddress.json";

export const setAbi = (contractName: string) => {
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
