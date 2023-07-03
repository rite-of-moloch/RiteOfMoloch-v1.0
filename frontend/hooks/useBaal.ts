import useReadContract from "./useReadContract";

const useBaalShares = (contractAddress: `0x${string}`) => {
  const { data, error, isError } = useReadContract(
    contractAddress,
    "baalAddress",
    "sharesToken"
  );

  if (isError) {
    console.log("Error: ", error);
    return null;
  }

  return data as string;
};

const useBaalAvatar = (contractAddress: `0x${string}`) => {
  const { data, error, isError } = useReadContract(
    contractAddress,
    "baalAddress",
    "avatar"
  );

  if (isError) {
    console.log("Error: ", error);
    return null;
  }

  return data as string;
};

export { useBaalShares, useBaalAvatar };
