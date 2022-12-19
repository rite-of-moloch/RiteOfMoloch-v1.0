import { useContractRead, useNetwork, useTransaction } from "wagmi";
import useAbi from "./useAbi";
import useContractAddress from "./useContractAddress";
import { useCustomToast } from "@raidguild/design-system";

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
  const toast = useCustomToast();
  let contractAddress = useContractAddress(contractName);

  const abi = useAbi(contractName);

  const { data, isLoading } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: abi,
    functionName,
    args,
    chainId: chain?.id,
    // onSuccess(data) {
    //   toast.loading({
    //     status: "loading",
    //     title: `Pending transaction ${data?.hash}`,
    //   });
    // },
    onError(err) {
      console.log(err);
      toast.loading({
        status: "error",
        title: `Transaction Error... ${err.message}`,
      });
    },
  });

  const {
    data: txResponse,
    isError,
    isLoading: respLoading,
  } = useTransaction({
    hash: data?.hash,
    onSuccess(data) {
      console.log("Success", data);
      toast.success({
        status: "success",
        title: `Transaction hash: ${data?.hash}`,
      });
    },
    onError(err) {
      console.log("Error", err);
      toast.error({
        status: "error",
        title: `Transaction Error... ${err.message}`,
      });
    },
  });

  return { data, isLoading, txResponse };
};

export default useReadContract;
