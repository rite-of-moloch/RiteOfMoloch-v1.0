import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import {
  Flex,
  Box,
  Text,
  Button,
  HStack,
  Checkbox,
  Input,
  Tooltip,
  Stack,
  VStack,
  SimpleGrid,
  GridItem,
} from "@raidguild/design-system";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { BigNumber, BigNumberish, utils } from "ethers";
import { approveTooltip, canStake, stakeTooltip } from "utils/general";
import { useBalanceOf, useDecimalOf, useGetAllowance } from "hooks/useERC20";
import { FiAlertTriangle } from "react-icons/fi";
import { useTokenSymbol } from "hooks/useERC20";
import { useCohortByAddress } from "hooks/useCohort";
import { zeroAddress } from "utils/constants";
import useWriteContract from "hooks/useWriteContract";
import abiROM from "../../contracts/riteOfMoloch.json";

interface StakingFlowProps {
  contractAddress: `0x${string}`;
}

/**
 * @remarks if invalid address passed into url query string, redirect user to /joinCohort page
 *
 * @param contractAddress is cohortAddress inherited from [address].tsx component. This address should be passed into smart contract functions.
 * @returns data about active cohort
 */
const StakingFlow: React.FC<StakingFlowProps> = ({ contractAddress }) => {
  const { address } = useAccount();
  const [willSponsor, setWillSponsor] = useState<boolean>(false);

  const handleWillSponsor = () => {
    setWillSponsor(!willSponsor);
  };

  const { cohorts } = useCohortByAddress(contractAddress);

  const cohort = cohorts?.cohorts?.[0];
  const localForm = useForm<FieldValues>();

  const {
    register,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = localForm;

  const initiateAddress = getValues("initiateAddress");
  const stakingToken = cohort?.stakingToken;

  let { decimals } = useDecimalOf(stakingToken);
  if (!decimals) {
    decimals = BigNumber.from("0");
  }

  let { balanceOf } = useBalanceOf(stakingToken, [address as string]);
  if (!balanceOf) {
    balanceOf = BigNumber.from("0");
  }

  let { tokenSymbol } = useTokenSymbol(stakingToken);
  if (!tokenSymbol) {
    tokenSymbol = "N/A";
  }

  let { allowance } = useGetAllowance(stakingToken, [
    address as string,
    cohort?.address,
  ]);
  if (!allowance) {
    allowance = BigNumber.from("0");
  }

  const minimumStake = cohort?.minimumStake || "0";

  const { write: approve, isLoading: isLoadingApprove } = useWriteContract(
    stakingToken,
    "erc20TokenAddress",
    "approve",
    [cohort?.address, minimumStake]
  );

  console.log("contractAddress", contractAddress);
  console.log("willSponsor", willSponsor);
  console.log("initiateAddress", initiateAddress);
  console.log("address", address);

  const { config, error: prepareError } = usePrepareContractWrite({
    address: contractAddress,
    abi: abiROM,
    functionName: "joinInitiation",
    enabled: !!contractAddress,
    args: [willSponsor ? initiateAddress : address],
  });

  console.log("error: prepareError", prepareError);

  const { data, write, isLoading } = useContractWrite(config);

  const handleJoinInitiation = () => {
    console.log("writeJoinInitiation", write);
    write?.();
  };

  const canUserStake = canStake(
    allowance,
    balanceOf,
    minimumStake,
    initiateAddress,
    willSponsor
  );

  const approveTooltiplabel = approveTooltip(
    allowance,
    balanceOf,
    minimumStake,
    tokenSymbol
  );

  const stakeToolTipLabel = stakeTooltip(
    allowance,
    balanceOf,
    minimumStake,
    initiateAddress,
    willSponsor
  );

  const format = (num: BigNumberish) => {
    return Number(utils.formatUnits(num, decimals)).toFixed(4);
  };

  if (cohort?.joinEndTime && cohort?.joinEndTime < Date.now() / 1000) {
    return (
      <>
        <Flex w="100%" direction="column" alignItems="center" py={5}>
          <Text color="white">Cohort has ended</Text>
        </Flex>
      </>
    );
  }

  return (
    <>
      <Flex w="100%" direction="column" alignItems="flex-start" py={5}>
        <HStack mb="1rem" justifyContent="space-between" w="full">
          <Text color="red">Required Stake</Text>
          <Text color="white">
            {format(minimumStake)} {tokenSymbol}
          </Text>
        </HStack>
        <HStack justifyContent="space-between" w="full">
          <Text color="red" fontFamily="jetbrains" fontSize=".8rem">
            Your {tokenSymbol} balance
          </Text>
          <Text color="white" fontSize=".8rem">
            {format(balanceOf)} {tokenSymbol}
          </Text>
        </HStack>
        <HStack justifyContent="space-between" w="full">
          <Text color="red" fontFamily="jetbrains" fontSize=".8rem">
            Your {tokenSymbol} allowance
          </Text>
          <Text color="white" fontSize=".8rem">
            <span style={{ marginRight: "0.5em" }}>{format(allowance)}</span>
            <span>{tokenSymbol}</span>
          </Text>
        </HStack>
        <Stack mt={8} w="full">
          <VStack alignItems={"start"}>
            <Checkbox
              localForm={localForm}
              size="md"
              color="red"
              defaultValue={["false"]}
              value="Sponsor an Initiate"
              options={["Sponsor an Initiate"]}
              isChecked={willSponsor}
              onChange={handleWillSponsor}
            />
            <Box w="full" hidden={!willSponsor ? true : false}>
              <Input
                label="Enter address below:"
                id="initiateAddress"
                placeholder="enter wallet address"
                type="text"
                autoComplete="off"
                localForm={localForm}
                {...register("initiateAddress", {
                  validate: (initiate: string) =>
                    utils.isAddress(initiate) || "invalid address",
                  onChange: () => {
                    if (isValid) {
                      clearErrors();
                    } else {
                      setError("initiateAddress", {
                        type: "validate",
                        message: "Address is invalid!",
                      });
                    }
                  },
                })}
              />
              {!isValid && initiateAddress && (
                <Box w="full" color="red" mt={3}>
                  <HStack justifyContent="center">
                    <span>
                      <FiAlertTriangle />
                    </span>
                    <Text>{errors.initiateAddress?.message}</Text>
                  </HStack>
                </Box>
              )}
            </Box>
          </VStack>
        </Stack>

        <SimpleGrid columns={2} spacing="1.5rem" mt="2rem" w="100%">
          <GridItem>
            <Tooltip label={approveTooltiplabel} placement="bottom">
              <Button
                variant="solid"
                w="full"
                isLoading={isLoadingApprove}
                loadingText="Approving..."
                isDisabled={
                  balanceOf.lt(BigNumber.from(minimumStake)) || !approve
                }
                onClick={approve}
              >
                Approve
              </Button>
            </Tooltip>
          </GridItem>
          <GridItem>
            <Tooltip label={stakeToolTipLabel} placement="top-start">
              <Button
                w="full"
                variant="solid"
                isLoading={isLoading}
                loadingText="Staking..."
                isDisabled={!canUserStake && !write}
                onClick={handleJoinInitiation}
              >
                Stake
              </Button>
            </Tooltip>
          </GridItem>
        </SimpleGrid>
        <Text mt="1rem" fontSize="2xs">
          1% of stake will be collected for application maintanence and cannot
          be claimed back.
        </Text>
      </Flex>
    </>
  );
};

export default StakingFlow;
