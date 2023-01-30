/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Flex } from "@raidguild/design-system";
import { useAccount } from "wagmi";
import { useGetDeadline } from "hooks/useGetDeadline";
import useRiteBalanceOf from "hooks/useRiteBalanceOf";
import RiteStaked from "components/RiteStaked";
import StakingFlow from "components/StakingFlow";
import NotConnected from "components/NotConnected";

import { useRouter } from "next/router";
import useContractAddress from "hooks/useContractAddress";
// import { isValidAddress } from "utils/general";

const Stake: React.FC = (): any => {
  const { address, isConnected } = useAccount();
  const router = useRouter();

  const { address: cohortAddress } = router.query;
  const correctAddressLogicROM =
    cohortAddress || useContractAddress("riteOfMolochAddress");

  function userAddress(): string {
    if (typeof address === "string") return address;
    else return "";
  }

  const deadline: string = useGetDeadline(correctAddressLogicROM.toString(), [
    userAddress(),
  ]);

  console.log("deadline", deadline);
  const riteBalance: string = useRiteBalanceOf(
    correctAddressLogicROM.toString(),
    [userAddress()]
  );

  const hasRite = (): boolean => {
    let rites = Number(riteBalance);
    if (rites > 0) {
      return true;
    } else if (rites === 0 || !rites) {
      return false;
    } else {
      return false;
    }
  };

  /**
   *
   * RiteStaked shown if user has staked, but wants to sponsor another address.
   * RiteStaked also renders StakingFlow
   */

  return (
    <>
      {!isConnected && <NotConnected />}
      {isConnected && (
        <Flex direction="column">
          {isConnected && !hasRite() && (
            <StakingFlow contractAddress={cohortAddress || ""} />
          )}
          {isConnected && hasRite() && (
            <RiteStaked
              riteBalance={riteBalance}
              deadline={deadline}
              contractAddress={cohortAddress || ""}
            />
          )}
        </Flex>
      )}
    </>
  );
};

export default Stake;
