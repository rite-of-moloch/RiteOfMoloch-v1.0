import {
  useNetwork,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import abiERC20 from "../contracts/erc20TokenAddress.json";
import abiROM from "../contracts/riteOfMolochAddress.json";
import abiROMFac from "../contracts/riteOfMolochFactoryAddress.json";
import { CONTRACT_ADDRESSES } from "utils/constants";

/**
 *
 * @param contractName - pass in contract name
 * @param functionName - pass name of function
 * @returns
 */

export const useWriteContract = (
  contractName: string,
  functionName: string,
  args?: any
) => {
  const { chain } = useNetwork();
  let address = "";
  if (chain?.id) {
    address = CONTRACT_ADDRESSES[chain.id][contractName];
  }
  let abi;
  const setAbi = (): void => {
    if (contractName === "erc20TokenAddress") {
      abi = abiERC20;
    } else if (contractName === "riteOfMolochAddress") {
      abi = abiROM;
    } else {
      abi = abiROMFac;
    }
  };
  setAbi();

  const { config } = usePrepareContractWrite({
    addressOrName: address || "",
    contractInterface: abi || abiERC20,
    functionName,
    chainId: chain?.id,
    args,
  });

  const { data, write } = useContractWrite({
    ...config,
    request: config.request,
    onSuccess(data) {
      console.log("useContractWrite success", data);
    },
    onError(error) {
      console.log("useContractWrite error", error);
    },
  });

  const { data: txData, status } = useWaitForTransaction({
    hash: data?.hash,
    onError(error) {
      console.log("Error", error);
    },
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  return { write, txData, status };
};
