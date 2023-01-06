import useWriteContract from "./useWriteContract";

/**
 *
 * @param args calldata ([tuple] of arguments)
 * @Returns address
 */

const useCreateCohort = (
  args: [
    string,
    string,
    string,
    string,
    string,
    string,
    number,
    number,
    number,
    number,
    number,
    string,
    string,
    string
  ]
) => {
  const {
    write: createCohort,
    isLoading: isLoadingApprove,
    isSuccess: isSuccessApprove,
    isError: isErrorApprove,
  } = useWriteContract("riteOfMolochFactoryAddress", "createCohort", args);

  return { createCohort, isLoadingApprove, isSuccessApprove, isErrorApprove };
};

export default useCreateCohort;
