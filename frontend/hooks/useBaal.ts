import { BigNumber } from "ethers";
import useReadContract from "./useReadContract";

const useBaalShares = (contractAddress: `0x${string}`) => {
  const { data, isLoading, error, isError } = useReadContract(
    contractAddress,
    "baalAddress",
    "sharesToken"
  );

  return { sharesToken: data as string, isLoading, error, isError };
};

const useBaalAvatar = (contractAddress: `0x${string}`) => {
  const { data, isLoading, error, isError } = useReadContract(
    contractAddress,
    "baalAddress",
    "avatar"
  );

  return { avatar: data as string, isLoading, error, isError };
};

const useBaalProposalOffering = (contractAddress: `0x${string}`) => {
  const { data, isLoading, error, isError } = useReadContract(
    contractAddress,
    "baalAddress",
    "proposalOffering"
  );

  console.log("data", data);

  return { proposalOffering: BigNumber.from(data), isLoading, error, isError };
};

export { useBaalShares, useBaalAvatar, useBaalProposalOffering };
