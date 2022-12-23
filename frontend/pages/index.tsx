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

interface HomeProps {
  children: React.ReactNode;
}

const Home: React.FC<HomeProps> = ({ children }): any => {
  const {
    setRiteBalance,
    riteBalance,
    allowance,
    minimumStake,
    raidBalance,
    setMinimumStake,
    cohortAddress,
    isChecked,
    setIsStakeTxPending,
    setIsLoading,
  } = useContext(UserContext);

  const { address, isConnected } = useAccount();
  const toast = useCustomToast();

  function userAddress(): string {
    if (typeof address === "string") return address;
    else return "";
  }

  /**
   * Smart contract function calls:
   */
  const { writeApproveRaid } = useApproveRaid([userAddress(), 0]);

  const { writeBalanceOf, outputBalanceOf } = useBalanceOf([userAddress()]);

  // refactored from makeAnAllowance
  const { writeAllowance, outputAllowance } = useGetAllowance([
    useContractAddress("erc20TokenAddress"),
    userAddress(),
  ]);

  const { outputGetDeadline } = useGetDeadline([userAddress()]);

  const { writeJoinInitiation } = useJoinInitiation([userAddress()]);

  const { outputMinimumStake } = useMinimumStake();

  console.log(outputMinimumStake);

  const { outputRiteBalanceOf } = useRiteBalanceOf([userAddress()]);

  //*************** */
  //
  // start fetchRiteBalance:
  //
  //****************

  // const fetchAllowance = async () => {
  //   const _allowance = await writeGetAllowance;
  //   if (_allowance) {
  //     setAllowance(_allowance);
  //   }
  // };

  // const fetchRaidBalance = async () => {
  //   const _raidBalance = writeGetRiteBalance;
  //   if (_raidBalance) {
  //     setRaidBalance(_raidBalance);
  //   }
  // };

  // const fetchRiteBalance = async () => {
  //   writeBalanceOf && (await writeBalanceOf());
  //   const _riteBalance = outputBalanceOf;
  //   if (_riteBalance > 0) {
  //     setRiteBalance(_riteBalance);
  //   } else {
  //     await fetchMinimumStake();
  //     await fetchAllowance();
  //     await fetchRaidBalance();
  //   }
  // };

  const initialFetch = async () => {
    // setIsLoading(true);
    // await fetchRiteBalance();
    // setIsLoading(false);
  };

  // const fetchStakeDeadline = async () => {
  //   const _stakeDeadline = await getStakeDeadline;
  //   setStakeDeadline(Number(_stakeDeadline) + 60 * 60 * 24 * 30 * 6); // (6 months) for rinkeby testing
  //   setStakeDeadline(Number(_stakeDeadline));
  // };

  //**************** */
  //
  // end fetchRiteBalance
  //
  //**************** */

  // pass into StakingFlow
  const depositStake = async () => {
    //Check if cohortAddress is an actual address
    if (cohortAddress !== "" && isChecked) {
      if (!utils.isAddress(cohortAddress)) {
        toast.success({
          status: "error",
          title: "invalid address",
        });
        return;
      }
    }
    //Start stake process
    setIsStakeTxPending(true);
    try {
      writeJoinInitiation && writeJoinInitiation();
    } catch (err) {
      console.log(err);
    }
    setIsStakeTxPending(false);
  };

  // pass into StakingFlow
  const canStake: boolean =
    utils.formatUnits(allowance, "ether") >=
      utils.formatUnits(minimumStake, "ether") &&
    utils.formatUnits(raidBalance, "ether") >=
      utils.formatUnits(minimumStake, "ether") &&
    !utils.isAddress(cohortAddress);

  // pass into StakingFlow
  const cantStakeTooltipLabel: string | null = !utils.isAddress(cohortAddress)
    ? "Please input a valid wallet address"
    : utils.formatUnits(allowance, "ether") <
      utils.formatUnits(minimumStake, "ether")
    ? "Allowance is smaller than the minimum stake amount."
    : "Your RAID balance is too low";

  // useEffect(() => {
  //   isConnected ? initialFetch() : null;
  // }, []);

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
      {isConnected && (
        <StakingFlow
          canStake={canStake}
          cantStakeTooltipLabel={cantStakeTooltipLabel}
          depositStake={depositStake}
          writeAllowance={writeAllowance}
        />
      )}
    </Flex>
  );
};

export default Home;
