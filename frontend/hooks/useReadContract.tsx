import React from "react";
import { useContract, useNetwork } from "wagmi";
import abi from "../contracts/erc20TokenAddress.json";

interface UseReactContractProps {
  contractName: string;
  functionName: string;
  args?: any;
}

const UseReadContract: React.FC<UseReactContractProps> = ({
  contractName,
  functionName,
  args,
}) => {
  const { chain } = useNetwork();

  let address = "";
  if (chain?.id) {
    address = CONTRACT_ADDRESSES[chain.id][contractName];
  }

  const { data, isError, isLoading } = useContract({
    addressOrName: address || "",
    abi:
  });
};

export default UseReadContract;
