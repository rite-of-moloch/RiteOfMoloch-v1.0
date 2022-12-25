import { useContext } from "react";
import useWriteContract from "./useWriteContract";
import { UserContext } from "context/UserContext";

/**
 *
 * @param args user: user address
 */

export const useJoinInitiation = (args: [string]) => {
  const {
    write: writeJoinInitiation,
    txResponse,
    isSuccess,
    isError,
  } = useWriteContract("riteOfMolochAddress", "joinInitiation", args);

  const { setIsStakeTxPending } = useContext(UserContext);

  if (txResponse) setIsStakeTxPending(true);
  if (isSuccess || isError) setIsStakeTxPending(false);

  return writeJoinInitiation;
};
