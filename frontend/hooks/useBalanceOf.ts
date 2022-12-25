import { useBalance } from "wagmi";
import useReadContract from "./useReadContract";
/**
 *
 * @param args account: address
 * @outputs uint256
 *
 */
const useBalanceOf = (args: [string]): string => {
  const { output: balanceOf } = useReadContract(
    "erc20TokenAddress",
    "balanceOf",
    args
  );

  if (!balanceOf) return "0";
  else return balanceOf;
};

export default useBalanceOf;
