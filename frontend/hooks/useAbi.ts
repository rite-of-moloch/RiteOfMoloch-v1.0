import abiERC20 from "../contracts/erc20TokenAddress.json";
import abiROM from "../contracts/riteOfMolochAddress.json";
import abiFactory from "../contracts/riteOfMolochFactoryAddress.json";

type ABI = {}[];

interface UseAbiInterface {
  contractName: string;
  address: string;
}

const useAbi = ({ contractName, address }: UseAbiInterface): ABI => {
  let abi;
  if (contractName === "riteOfMolochAddress") {
    abi = abiROM;
  } else if (contractName === "riteOfMolochFactoryAddress") {
    abi = abiFactory;
  } else {
    abi = abiERC20;
  }
  return abi;
};

export default useAbi;
