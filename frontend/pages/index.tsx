/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import {
  Flex,
  Button,
  Box,
  Spinner,
  Heading,
  Link as ChakraLink,
  useToast,
} from "@chakra-ui/react";
import { useAccount, useNetwork } from "wagmi";
import { useWriteContract } from "hooks/useWriteContract";
import { ethers, utils } from "ethers";
import { CONTRACT_ADDRESSES } from "utils/constants";
import { getAllowance } from "utils/web3";

// import {
//   getMinimumStake,
//   getTokenBalance,
//   getStakeDeadline,
//   getAllowance,
//   approveRaid,
//   joinInitiation,
// } from "../utils/web3";

// import { AppContext } from "../context/AppContext";
// import { CONTRACT_ADDRESSES, EXPLORER_URLS } from "../utils/constants";
// import { SUPPORTED_NETWORK_IDS } from "../config";
// import { NetworkError } from "../shared/NetworkError";
// import { RiteStaked } from "../shared/RiteStaked";
// import { StakingFlow } from "../shared/StakingFlow";
// import { PreStake } from "../shared/PreStake";
// import { DeployCohortButton } from "../shared/DeployCohortButton";
import { BoxHeader } from "../components/BoxHeader";
import { HeaderOne } from "../components/Header0ne";

export default function Home() {
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();

  const getAddress = (contractName: string): string => {
    if (typeof chain?.id === "string") {
      return CONTRACT_ADDRESSES?.[chain?.id]?.[contractName];
    } else return "";
  };

  // const context = useContext(AppContext);
  // const toast = useToast();

  // const [minimumStake, setMinimumStake] = useState(0);
  // const [riteBalance, setRiteBalance] = useState(0);
  // const [raidBalance, setRaidBalance] = useState(0);
  // const [stakeDeadline, setStakeDeadline] = useState(0);
  // const [allowance, setAllowance] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  // const [isApproveTxPending, setIsApproveTxPending] = useState(false);
  // const [isStakeTxPending, setIsStakeTxPending] = useState(false);

  // const [isChecked, setIsChecked] = useState(false);
  // const [displaySponsorCohort, setDisplaySponsorCohort] = useState(false);
  // const [cohortAddress, setCohortAddress] = useState("");

  // DELETE - only here to test hook
  // useWriteContract("erc20TokenAddress", "allowance");

  if (isConnected && address) {
    getAllowance("erc20TokenAddress", "allowance", [
      "0x50589c90DA71600B06fCcDe89c79469aFe12ea65",
      "0xe9da154834d8c9a8030b175eb3bfd974130ac0a0",
    ]);
  }

  // const initialFetch = async () => {
  //   setIsLoading(true);
  //   await fetchRiteBalance();
  //   setIsLoading(false);
  // };

  // const fetchRiteBalance = async () => {
  //   const _riteBalance = await getTokenBalance(
  //     context.ethersProvider,
  //     context.signerAddress,
  //     CONTRACT_ADDRESSES[context.chainId].riteOfMolochAddress
  //   );

  //   if (_riteBalance > 0) {
  //     setRiteBalance(_riteBalance);
  //     await fetchStakeDeadline();
  //   } else {
  //     await fetchMinimumStake();
  //     await fetchAllowance();
  //     await fetchRaidBalance();
  //   }
  // };

  // const fetchStakeDeadline = async () => {
  //   const _stakeDeadline = await getStakeDeadline(
  //     context.ethersProvider,
  //     CONTRACT_ADDRESSES[context.chainId].riteOfMolochAddress,
  //     context.signerAddress
  //   );
  //   setStakeDeadline(Number(_stakeDeadline) + 60 * 60 * 24 * 30 * 6); // for rinkeby testing
  //   setStakeDeadline(Number(_stakeDeadline));
  // };

  // const fetchMinimumStake = async () => {
  //   const _stake = await getMinimumStake(
  //     context.ethersProvider,
  //     CONTRACT_ADDRESSES[context.chainId].riteOfMolochAddress
  //   );
  //   setMinimumStake(_stake);
  // };

  // const fetchAllowance = async () => {
  //   const _allowance = await getAllowance(
  //     context.ethersProvider,
  //     CONTRACT_ADDRESSES[context.chainId].erc20TokenAddress,
  //     context.signerAddress,
  //     CONTRACT_ADDRESSES[context.chainId].riteOfMolochAddress
  //   );
  //   setAllowance(_allowance);
  // };

  // const fetchRaidBalance = async () => {
  //   const _raidBalance = await getTokenBalance(
  //     context.ethersProvider,
  //     context.signerAddress,
  //     CONTRACT_ADDRESSES[context.chainId].erc20TokenAddress
  //   );
  //   setRaidBalance(_raidBalance);
  // };

  // const triggerToast = (txHash) => {
  //   toast({
  //     position: "bottom-left",
  //     duration: 9000,
  //     render: () => (
  //       <Box
  //         color="white"
  //         fontFamily="spaceMono"
  //         fontSize=".8rem"
  //         bg="blackLight"
  //         p="15px"
  //         borderRadius="10px"
  //         width="auto"
  //       >
  //         <i className="fa-solid fa-circle-info"></i> View your{" "}
  //         <ChakraLink
  //           href={`${EXPLORER_URLS[context.chainId]}/tx/${txHash}`}
  //           isExternal
  //           textDecoration="underline"
  //           cursor="pointer"
  //         >
  //           transaction
  //         </ChakraLink>
  //       </Box>
  //     ),
  //   });
  // };

  // const handleIsChecked = () => {
  //   setIsChecked(!isChecked);
  // };

  // const handleCohortAddress = (e) => {
  //   setCohortAddress(e.target.value);
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
  //   if (cohortAddress != "" && isChecked) {
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
  //       cohortAddress != "" && isChecked ? cohortAddress : context.signerAddress
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

  // useEffect(() => {
  //   if (context.chainId in SUPPORTED_NETWORK_IDS) {
  //     initialFetch();
  //   }
  // }, [context.chainId]);

  // const canStake =
  //   utils.formatUnits(allowance, "ether") >=
  //     utils.formatUnits(minimumStake, "ether") &&
  //   utils.formatUnits(raidBalance, "ether") >=
  //     utils.formatUnits(minimumStake, "ether") &&
  //   !ethers.utils.isAddress(cohortAddress);

  // const canNotStakeTooltipLabel = !ethers.utils.isAddress(cohortAddress)
  //   ? "Please input a valid wallet address"
  //   : utils.formatUnits(allowance, "ether") <
  //     utils.formatUnits(minimumStake, "ether")
  //   ? "Allowance is smaller than the minimum stake amount."
  //   : "Your RAID balance is too low";

  // const show =
  //   context.signerAddress && context.chainId in SUPPORTED_NETWORK_IDS;

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

      <BoxHeader text="Commit your stake to the cohort!" />

      {/* {!context.signerAddress && <PreStake />}

      {!context.signerAddress ? <DeployCohortButton /> : null}

      {context.signerAddress && !(context.chainId in SUPPORTED_NETWORK_IDS) && (
        <NetworkError />
      )} */}

      {isLoading && <Spinner color="red" size="xl" />}

      {/* <Flex
        opacity={!show || isLoading ? 0 : 1}
        transition="opacity 0.25s"
        w="100%"
      > */}
      {/* {!isLoading &&
          (riteBalance > 0 ? (
            <RiteStaked
              setDisplaySponsorCohort={setDisplaySponsorCohort}
              displaySponsorCohort={displaySponsorCohort}
              balance={riteBalance}
              deadline={stakeDeadline}
              minimumStake={minimumStake}
              context={context}
              raidBalance={raidBalance}
              allowance={allowance}
              isChecked={isChecked}
              handleIsChecked={handleIsChecked}
              cohortAddress={cohortAddress}
              handleCohortAddress={handleCohortAddress}
              isApproveTxPending={isApproveTxPending}
              makeAnAllowance={makeAnAllowance}
              canStake={canStake}
              canNotStakeTooltipLabel={canNotStakeTooltipLabel}
              isStakeTxPending={isStakeTxPending}
              depositStake={depositStake}
            />
          ) : (
            <StakingFlow
              displaySponsorCohort={displaySponsorCohort}
              minimumStake={minimumStake}
              context={context}
              raidBalance={raidBalance}
              allowance={allowance}
              isChecked={isChecked}
              handleIsChecked={handleIsChecked}
              cohortAddress={cohortAddress}
              handleCohortAddress={handleCohortAddress}
              isApproveTxPending={isApproveTxPending}
              makeAnAllowance={makeAnAllowance}
              canStake={canStake}
              canNotStakeTooltipLabel={canNotStakeTooltipLabel}
              isStakeTxPending={isStakeTxPending}
              depositStake={depositStake}
            />
          ))}
       </Flex> */}
    </Flex>
  );
}
