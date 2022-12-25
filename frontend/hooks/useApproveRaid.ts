import { useContext } from "react";
import useWriteContract from "./useWriteContract";
import { UserContext } from "context/UserContext";

/**
 *
 * @param args _to: address,
 * @param args _Value: uint256
 * @Returns bool
 */

const useApproveRaid = (args: [string, string]) => {
  const {
    write: approveRaid,
    isLoading,
    isSuccess,
    isError,
  } = useWriteContract("erc20TokenAddress", "approve", args);
  const { setIsApproveTxPending } = useContext(UserContext);

  if (isLoading) setIsApproveTxPending(true);
  if (isSuccess || isError) setIsApproveTxPending(false);

  return approveRaid;
};

export default useApproveRaid;
