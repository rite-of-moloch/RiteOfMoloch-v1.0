import { initDataDeployCohort } from "utils/types/initDataDeployCohort";
import useWriteContract from "./useWriteContract";
import { CONTRACT_ADDRESSES } from "utils/contractAddresses";
import { useNetwork } from "wagmi";

/**
 * @remarks used in deployCohort page to create new cohort
 *
 * @param args calldata ([tuple] of arguments)
 * @param implementationSelector string (use 1)
 * @Returns address
 */

const useCreateCohort = (args: [initDataDeployCohort, number]) => {
  const { chain } = useNetwork();
  const factoryAddress =
    CONTRACT_ADDRESSES[chain?.id || 5]["riteOfMolochFactoryAddress"];

  const {
    write: createCohort,
    prepareError: prepareErrorCreateCohort,
    isLoading: isLoadingApprove,
    isSuccess: isSuccessApprove,
    isError: isErrorApprove,
  } = useWriteContract(
    factoryAddress,
    "riteOfMolochFactoryAddress",
    "createCohort",
    args
  );

  return {
    createCohort,
    prepareErrorCreateCohort,
    isLoadingApprove,
    isSuccessApprove,
    isErrorApprove,
  };
};

export default useCreateCohort;
