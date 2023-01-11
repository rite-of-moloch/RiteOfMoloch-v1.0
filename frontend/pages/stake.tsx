/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode } from "react";
import { Box, Flex } from "@raidguild/design-system";
import { useAccount } from "wagmi";
import { useGetDeadline } from "hooks/useGetDeadline";
import { useRiteBalanceOf } from "hooks/useRiteBalanceOf";
import BoxHeader from "components/BoxHeader";

import RiteStaked from "components/RiteStaked";
import StakingFlow from "components/StakingFlow";
import NotConnected from "components/NotConnected";

interface HomeProps {
  children?: ReactNode;
}

const Home: React.FC<HomeProps> = ({ children }): any => {
  const { address, isConnected } = useAccount();

  function userAddress(): string {
    if (typeof address === "string") return address;
    else return "";
  }

  const deadline: string = useGetDeadline([userAddress()]);
  const riteBalance: string = useRiteBalanceOf([userAddress()]);

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
          {isConnected && Number(deadline) === 0 && (
            <BoxHeader text="Commit Your Stake To Join Our Cohort!" />
          )}
          {isConnected && !hasRite() && <StakingFlow />}
          {isConnected && hasRite() && (
            <RiteStaked riteBalance={riteBalance} deadline={deadline} />
          )}
          {children}
        </Flex>
      )}
    </>
  );
};

export default Home;
