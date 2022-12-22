/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
// import { Flex, Button, Box, Spinner, Heading, Link as ChakraLink,useToast } from "@chakra-ui/react";
import {
  Flex,
  Button,
  Box,
  Spinner,
  Heading,
  Link as ChakraLink,
  useCustomToast,
  useToast,
  Text,
} from "@raidguild/design-system";
import { useAccount, useNetwork } from "wagmi";
import { UserContext } from "context/UserContext";
import { canStake, convertBigNumber } from "../utils/web3";

import { CONTRACT_ADDRESSES, EXPLORER_URLS } from "../utils/constants";
// import { SUPPORTED_NETWORK_IDS } from "../config";
// import { NetworkError } from "../shared/NetworkError";
// import { RiteStaked } from "../shared/RiteStaked";
// import { StakingFlow } from "../shared/StakingFlow";

import { HeaderOne } from "../components/Header0ne";

import useWriteContract from "hooks/useWriteContract";
import useApproveRaid from "hooks/useApproveRaid";
import useBalanceOf from "hooks/useBalanceOf";
import useGetAllowance from "hooks/useGetAllowance";
import useContractAddress from "hooks/useContractAddress";
import { useGetDeadline } from "hooks/useGetDeadline";
import useJoinInitiation from "hooks/useJoinInitiation";
import { useMinimumStake } from "hooks/useMinimumStake";
import { useRiteBalanceOf } from "hooks/useRiteBalanceOf";
import { BigNumber } from "ethers";

interface HomeProps {
  children: React.ReactNode;
}

const Home: React.FC<HomeProps> = ({ children }) => {
  // const context = useContext(UserContext);
  // console.log(context.riteBalance);

  const { address, isConnected } = useAccount();
  // const toast = useToast();

  // type check address
  function userAddress(): string {
    if (typeof address === "string") return address;
    else return "";
  }

  /**
   * Smart contract function calls:
   */
  const { writeApproveRaid } = useApproveRaid([userAddress(), 0]);

  const { writeBalanceOf, txRespBalanceOf } = useBalanceOf([userAddress()]);

  const { writeAllowance, txRespAllowance } = useGetAllowance([
    userAddress(),
    useContractAddress("erc20TokenAddress"),
  ]);

  const { dataGetDeadline, txRespGetDeadline } = useGetDeadline([
    userAddress(),
  ]);

  // Not working
  const { writeJoinInitiation } = useJoinInitiation([userAddress()]);

  const { dataMinimumStake, respMinimumStake } = useMinimumStake();

  const { writeRiteBalanceOf, txRespRiteBalanceOf } = useRiteBalanceOf([
    userAddress(),
  ]);

  // const fetchRiteBalance = async () => {
  //   const _riteBalance = await getBalanceOf(
  //     context.ethersProvider,
  //     context.signerAddress,
  //     CONTRACT_ADDRESSES[context.chainId].riteOfMolochAddress
  //   );
  //   if (_riteBalance > 0) {
  //     context.setRiteBalance(_riteBalance);
  //     if (writeGetRiteBalance) {
  //       await writeGetRiteBalance();
  //     }
  //   } else {
  //     await fetchMinimumStake();
  //     await fetchAllowance();
  //     await fetchRaidBalance();
  //   }
  // };

  const fetchRiteBalance = async () => {
    writeRiteBalanceOf && writeRiteBalanceOf();
    const _raidBalance = await convertBigNumber(
      txRespRiteBalanceOf?.value._hex
    );
  };

  // const initialFetch = async () => {
  //   setIsLoading(true);
  //   // await fetchRiteBalance();
  //   setIsLoading(false);
  // };

  // const fetchStakeDeadline = async () => {
  //   const _stakeDeadline = await getStakeDeadline;
  //   setStakeDeadline(Number(_stakeDeadline) + 60 * 60 * 24 * 30 * 6); // (6 months) for rinkeby testing
  //   setStakeDeadline(Number(_stakeDeadline));
  // };

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

  // ADD DESIGN-SYSTEM CUSTOM TOAST:
  // const triggerToast = (txHash) => {
  //   toast({
  //     position: "bottom-left",
  //     duration: 9000,
  //     render: () => (
  //       <Box>
  //         <i className="fa-solid fa-circle-info"></i> View your{" "}
  //         <ChakraLink
  //           href={`${EXPLORER_URLS[context.chainId]}/tx/${txHash}`}
  //           isExternal
  //           textDecoration="underline"
  //           cursor="pointer"
  //         >
  //           transaction hash
  //         </ChakraLink>
  //       </Box>
  //     ),
  //   });
  // };

  // const makeAnAllowance = async () => {
  //   setIsApproveTxPending(true);
  //   try {
  //     const tx = await approveRaid(
  //       context.ethersProvider,
  //       CONTRACT_ADDRESSES[context.chainId].erc20TokenAddress,
  //       CONTRACT_ADDRESSES[context.chainId].riteOfMolochAddress,
  //       minimumStake
  //     );
  //     if (tx) {
  //       triggerToast(tx.hash);
  //       const { status } = await tx.wait();
  //       if (status === 1) {
  //         await fetchAllowance();
  //       } else {
  //         toast({
  //           position: "bottom-left",
  //           render: () => (
  //             <Box color="white" p={3} bg="red.500">
  //               Transaction failed.
  //             </Box>
  //           ),
  //         });
  //       }
  //     }
  //   } catch (err) {
  //     toast({
  //       position: "bottom-left",
  //       render: () => (
  //         <Box color="white" p={3} bg="red.500">
  //           {err.message}
  //         </Box>
  //       ),
  //     });
  //   }
  //   setIsApproveTxPending(false);
  // };

  // const depositStake = async () => {
  //   //Check if cohortAddress is an actual address
  //   if (cohortAddress != "" && context.isChecked) {
  //     if (!utils.isAddress(cohortAddress)) {
  //       toast({
  //         position: "bottom-left",
  //         duration: 5000,
  //         render: () => (
  //           <Box color="white" p={3} bg="red.500">
  //             Wrong sponsor's address
  //           </Box>
  //         ),
  //       });
  //       return;
  //     }
  //   }

  //   //Start stake process
  //   setIsStakeTxPending(true);
  //   try {
  //     const tx = await joinInitiation(
  //       context.ethersProvider,
  //       CONTRACT_ADDRESSES[context.chainId].riteOfMolochAddress,
  //       cohortAddress != "" && context.isChecked ? cohortAddress : context.signerAddress
  //     );
  //     if (tx) {
  //       triggerToast(tx.hash);
  //       const { status } = await tx.wait();
  //       if (status === 1) {
  //         await fetchRiteBalance();
  //       } else {
  //         toast({
  //           position: "bottom-left",
  //           render: () => (
  //             <Box color="white" p={3} bg="red.500">
  //               Transaction failed.
  //             </Box>
  //           ),
  //         });
  //       }
  //     }
  //   } catch (err) {
  //     toast({
  //       position: "bottom-left",
  //       render: () => (
  //         <Box color="white" p={3} bg="red.500">
  //           {err.message}
  //         </Box>
  //       ),
  //     });
  //   }
  //   setIsStakeTxPending(false);
  // };

  // canStake(1, 1, 1, 1);

  // const canNotStakeTooltipLabel = !ethers.utils.isAddress(cohortAddress)
  //   ? "Please input a valid wallet address"
  //   : utils.formatUnits(allowance, "ether") <
  //     utils.formatUnits(minimumStake, "ether")
  //   ? "Allowance is smaller than the minimum stake amount."
  //   : "Your RAID balance is too low";

  // const show = isConnected && chain;

  // useEffect(() => {
  //   isConnected ? initialFetch() : null;
  // }, [chain?.id]);

  return (
    <>
      <Flex
        minH="350px"
        minW="80%"
        direction="column"
        alignItems="center"
        fontFamily="spaceMono"
        px="2rem"
      >
        <HeaderOne />

        <Button
          onClick={() => {
            writeBalanceOf && writeBalanceOf();
            txRespBalanceOf;
          }}
        >
          Test Write function
        </Button>

        {/* {isConnected ? (
          <Box w="full" m="auto" mt={5} textAlign="center">
            <Button variant="outline">Commit your stake to the cohort!</Button>
          </Box>
        ) : null} */}

        {/* {!isConnected && (
          <Text color="white" textAlign="center">
            Connect your wallet to stake & commit to our cohort!
          </Text>
        )} */}

        {/* {isConnected && (
          <Box w="full" m="auto" mt={5} textAlign="center">
            <Button variant={"outline"}>Deploy your own cohort</Button>
            <Text mt={4}>Your journey starts here...</Text>
          </Box>
        )} */}

        {/* {isLoading && <Spinner color="red" size="xl" />} */}

        {/* <Flex
        opacity={!show || isLoading ? 0 : 1}
        transition="opacity 0.25s"
        w="100%"
      > */}
        {/* {!isLoading &&
          (riteBalance > 0 ? (
            <RiteStaked
              // deadline={stakeDeadline}
              // minimumStake={minimumStake}
              // context={context}
              // raidBalance={raidBalance}
              // allowance={allowance}
              // cohortAddress={cohortAddress}
              // isApproveTxPending={isApproveTxPending}
              // makeAnAllowance={makeAnAllowance}
              // canStake={canStake}
              // canNotStakeTooltipLabel={canNotStakeTooltipLabel}
              // isStakeTxPending={isStakeTxPending}
              // depositStake={depositStake}
            />
          ) : (
            <StakingFlow
              // allowance={allowance}
              // cohortAddress={cohortAddress}
              // isApproveTxPending={isApproveTxPending}
              // makeAnAllowance={makeAnAllowance}
              // canStake={canStake}
              // canNotStakeTooltipLabel={canNotStakeTooltipLabel}
              // isStakeTxPending={isStakeTxPending}
              // depositStake={depositStake}
            />
          ))}
       </Flex> */}
      </Flex>
      {children}
    </>
  );
};

export default Home;
