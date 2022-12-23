import { useContractRead, useNetwork, useTransaction } from "wagmi";
import useAbi from "./useAbi";
import { useContractAddress } from "./useContractAddress";
import { convertBigNumber } from "utils/web3";

/**
 *
 * @param contractName - pass in contract name
 * @param functionName - pass name of function
 * @param args - option array of args
 * @returns
 */

const useReadContract = (
  contractName: string,
  functionName: string,
  args?: any
) => {
  const { chain } = useNetwork();

  let contractAddress = useContractAddress(contractName);
  const abi = useAbi(contractName);
  let output: string = "";

  const { data } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: abi,
    functionName,
    args,
    chainId: chain?.id,
    onSuccess(data) {
      output = convertBigNumber(data);
      console.log(output);
    },
    onError(err) {
      console.log(err);
    },
  });

  if (data) output = convertBigNumber(data);

  return { data, output };
};

export default useReadContract;
