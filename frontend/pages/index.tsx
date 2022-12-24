/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext } from "react";
// import { Flex, Button, Box, Spinner, Heading, Link as ChakraLink,useToast } from "@chakra-ui/react";
import { Flex } from "@raidguild/design-system";
import { useAccount } from "wagmi";
import { UserContext } from "context/UserContext";

import StakingFlow from "components/StakingFlow";

import HeaderOne from "../components/Header0ne";

import { useApproveRaid } from "hooks/useApproveRaid";
import { useBalanceOf } from "hooks/useBalanceOf";
import { useGetAllowance } from "hooks/useGetAllowance";
import { useContractAddress } from "hooks/useContractAddress";
import { useGetDeadline } from "hooks/useGetDeadline";
import { useJoinInitiation } from "hooks/useJoinInitiation";
import { useMinimumStake } from "hooks/useMinimumStake";
import { useRiteBalanceOf } from "hooks/useRiteBalanceOf";
import { BoxHeader } from "components/BoxHeader";
import RiteStaked from "components/RiteStaked";

interface HomeProps {
  children: React.ReactNode;
}

const Home: React.FC<HomeProps> = ({ children }): any => {
  const { displaySponsorCohort } = useContext(UserContext);
  const { address, isConnected } = useAccount();

  function userAddress(): string {
    if (typeof address === "string") return address;
    else return "";
  }

  /**
   * Smart contract function calls:
   */
  const balanceOf: string = useBalanceOf([userAddress()]);

  const allowance: string = useGetAllowance([
    useContractAddress("erc20TokenAddress"),
    userAddress(),
  ]);

  const deadline: string = useGetDeadline([userAddress()]);

  const writeJoinInitiation = useJoinInitiation([userAddress()]);

  const minimumStake: string = useMinimumStake();

  const approveRaid = useApproveRaid([
    useContractAddress("erc20TokenAddress"),
    minimumStake,
  ]);

  const riteBalance: string = useRiteBalanceOf([userAddress()]);

  // const fetchStakeDeadline = async () => {
  //   const _stakeDeadline = await getStakeDeadline;
  //   setStakeDeadline(Number(_stakeDeadline) + 60 * 60 * 24 * 30 * 6); // (6 months) for rinkeby testing
  //   setStakeDeadline(Number(_stakeDeadline));
  // };

  return (
    <Flex
      minH="350px"
      minW="80%"
      direction="column"
      alignItems="center"
      fontFamily="spaceMono"
      px="2rem"
    >
      <HeaderOne />
      {!isConnected && (
        <BoxHeader text="Connect your wallet and stake to our cohort!" />
      )}
      {isConnected && <BoxHeader text="Join our cohort!" />}
      {isConnected && displaySponsorCohort ? (
        <RiteStaked
          minimumStake={minimumStake}
          raidBalance={balanceOf}
          approveRaid={approveRaid}
          joinInitiation={writeJoinInitiation}
          allowance={allowance}
          riteBalance={riteBalance}
          deadline={deadline}
        />
      ) : null}
      {isConnected && (
        <StakingFlow
          minimumStake={minimumStake}
          raidBalance={balanceOf}
          approveRaid={approveRaid}
          joinInitiation={writeJoinInitiation}
          allowance={allowance}
        />
      )}
    </Flex>
  );
};

export default Home;
