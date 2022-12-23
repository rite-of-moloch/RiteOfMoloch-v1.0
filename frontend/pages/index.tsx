/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import React, { useState, useEffect, useContext, ReactElement } from "react";
// import { Flex, Button, Box, Spinner, Heading, Link as ChakraLink,useToast } from "@chakra-ui/react";
import {
  Flex,
  Button,
  Box,
  Spinner,
  Heading,
  Link as ChakraLink,
  useCustomToast,
  Text,
} from "@raidguild/design-system";
import { useAccount } from "wagmi";
import { UserContext } from "context/UserContext";

import { CONTRACT_ADDRESSES, EXPLORER_URLS } from "../utils/constants";

// import { RiteStaked } from "../shared/RiteStaked";
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
import { utils } from "ethers";
import { BoxHeader } from "components/BoxHeader";
import RiteStaked from "components/RiteStaked";

interface HomeProps {
  children: React.ReactNode;
}

const Home: React.FC<HomeProps> = ({ children }): any => {
  const { cohortAddress, isChecked, displaySponsorCohort } =
    useContext(UserContext);

  const { address, isConnected } = useAccount();
  const toast = useCustomToast();

  function userAddress(): string {
    if (typeof address === "string") return address;
    else return "";
  }

  /**
   * Smart contract function calls:
   */

  const { balanceOf } = useBalanceOf([userAddress()]);

  const { allowance } = useGetAllowance([
    useContractAddress("erc20TokenAddress"),
    userAddress(),
  ]);

  const getDeadline = useGetDeadline([userAddress()]);

  const writeJoinInitiation = useJoinInitiation([userAddress()]);

  const minimumStake = useMinimumStake();
  const { approveRaid } = useApproveRaid([
    useContractAddress("erc20TokenAddress"),
    Number(minimumStake),
  ]);

  console.log(approveRaid);

  const { riteBalanceOf } = useRiteBalanceOf([userAddress()]);

  // const fetchStakeDeadline = async () => {
  //   const _stakeDeadline = await getStakeDeadline;
  //   setStakeDeadline(Number(_stakeDeadline) + 60 * 60 * 24 * 30 * 6); // (6 months) for rinkeby testing
  //   setStakeDeadline(Number(_stakeDeadline));
  // };

  const canStake: boolean = true;
  // utils.formatEther(allowance) >= utils.formatEther(minimumStake) &&
  // utils.formatEther(raidBalance) >= utils.formatEther(minimumStake) &&
  // !utils.isAddress(cohortAddress);

  // pass into StakingFlow
  const cantStakeTooltipLabel: string | null = !utils.isAddress(cohortAddress)
    ? "Please input a valid wallet address"
    : utils.formatEther(allowance) < utils.formatEther(minimumStake)
    ? "Allowance is smaller than the minimum stake amount."
    : "Your RAID balance is too low";

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
          canStake={canStake}
          cantStakeTooltipLabel={cantStakeTooltipLabel}
          joinInitiation={writeJoinInitiation}
          allowance={allowance}
        />
      ) : null}
      {isConnected && (
        <StakingFlow
          minimumStake={minimumStake}
          raidBalance={balanceOf}
          approveRaid={approveRaid}
          canStake={canStake}
          cantStakeTooltipLabel={cantStakeTooltipLabel}
          joinInitiation={writeJoinInitiation}
          allowance={allowance}
        />
      )}
    </Flex>
  );
};

export default Home;
