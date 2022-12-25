import { useContext } from "react";
import useWriteContract from "./useWriteContract";
import { UserContext } from "context/UserContext";

/**
 *
 * @param args user: user address
 */

const useJoinInitiation = (args: [string]) => {
  const {
    write: writeJoinInitiation,
    isLoading,
    isSuccess,
    isError,
  } = useWriteContract("riteOfMolochAddress", "joinInitiation", args);

  const { setIsStakeTxPending } = useContext(UserContext);

  if (isLoading) setIsStakeTxPending(true);
  if (isSuccess || isError) setIsStakeTxPending(false);

  return writeJoinInitiation;
};

export default useJoinInitiation;
