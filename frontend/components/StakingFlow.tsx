import React, { useContext, useEffect } from "react";
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
import { useAccount } from "wagmi";
import { BigNumber, utils } from "ethers";
import { UserContext } from "context/UserContext";
import { approveTooltip, canStake, stakeTooltip } from "utils/general";
import useBalanceOf from "hooks/useBalanceOf";
import useApprove from "hooks/useApprove";
import useJoinInitiation from "hooks/useJoinInitiation";
import useGetAllowance from "hooks/useGetAllowance";
import { FiAlertTriangle } from "react-icons/fi";
import useTokenSymbol from "hooks/useTokenSymbol";
import useCohort from "hooks/useCohortByAddress";

interface StakingFlowProps {
  contractAddress: string;
}

/**
 * @remarks if invalid address passed into url query string, redirect user to /joinCohort page
 *
 * @param contractAddress is cohortAddress inherited from [address].tsx component. This address should be passed into smart contract functions.
 * @returns data about active cohort
 */
const StakingFlow: React.FC<StakingFlowProps> = ({ contractAddress }) => {
  const { address } = useAccount();
  const { willSponsor, handleWillSponsor } = useContext(UserContext);

  const { cohort } = useCohort(contractAddress);

  const localForm = useForm<FieldValues>();

  const {
    register,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = localForm;

  const values = getValues();
  const initiateAddress: string = values?.initiateAddress;

  const userAddress = (): string => {

    if (typeof address === "string") {
      return address;
    }
    else return "";
  };

  const minimumStake = cohort?.tokenAmount || "0";

  let balanceOf = useBalanceOf((cohort?.token as `0x${string}`) || "0x", [
    userAddress(),
  ]);

  //TODO better handling of balanceOf === null
  if (!balanceOf) {
    balanceOf = BigNumber.from("0") || "0";
  }

  const { approve, isLoadingApprove } = useApprove(cohort?.token || "0x", [
    cohort?.address || "",
    minimumStake,
  ]);

  let allowance = useGetAllowance((cohort?.token as `0x${string}`) || "0x", [
    userAddress(),
    cohort?.address || "0x",
  ]);

  let tokenSymbol = useTokenSymbol(cohort?.token);
  if (!tokenSymbol) {
    tokenSymbol = "N/A";
  }

  //TODO better handling of allowance === null

  if (!allowance) {
    allowance = BigNumber.from("0") || "0";
  }

  const { writeJoinInitiation, isLoadingStake } = useJoinInitiation(
    cohort?.address || "",
    !willSponsor ? [userAddress()] : [initiateAddress]
  );

  //TODO methods can accept BigNumbers instead of Strings
  const canUserStake = canStake(
    allowance,
    minimumStake || "",
    balanceOf,
    initiateAddress,
    willSponsor
  );

  console.log(
    allowance,
    minimumStake || "",
    balanceOf,
    initiateAddress,
    willSponsor
  );

  const approveTooltiplabel = approveTooltip(
    allowance,
    minimumStake,
    balanceOf,
    tokenSymbol
  );

  const stakeToolTipLabel = stakeTooltip(
    willSponsor,
    initiateAddress,
    balanceOf,
    allowance,
    minimumStake
  );

  // useEffect re-renders component when user creates an allowance, which lets writeJoinInitiation to become defined
  useEffect(() => {
    // console.log(allowance);
  }, [allowance]);

  return (
    <>
      <Flex w="100%" direction="column" alignItems="flex-start" py={5}>
        <HStack mb="1rem" justifyContent="space-between" w="full">
          <Text color="red">Required Stake</Text>
          <Text color="white">
            {minimumStake} {tokenSymbol}
          </Text>
        </HStack>
        <HStack justifyContent="space-between" w="full">
          <Text color="red" fontFamily="jetbrains" fontSize=".8rem">
            Your {tokenSymbol} balance
          </Text>
          <Text color="white" fontSize=".8rem">
            {+utils.formatUnits(balanceOf, "ether")} {tokenSymbol}
          </Text>
        </HStack>
        <HStack justifyContent="space-between" w="full">
          <Text color="red" fontFamily="jetbrains" fontSize=".8rem">
            Your {tokenSymbol} allowance
          </Text>
          <Text color="white" fontSize=".8rem">
            {/* TODO: double check that allowance unit formats are correct */}
            {/* TODO:  */}
            <span style={{ marginRight: "0.5em" }}>{allowance.toString()}</span>
            {/* {utils.formatEther(allowance)} */}
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
              onChange={() => handleWillSponsor}
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
                isDisabled={balanceOf.lt(BigNumber.from(minimumStake))}
                onClick={() => approve && approve()}
              >
                Approve
              </Button>
            </Tooltip>
          </GridItem>
          <GridItem>
            <Tooltip
              isDisabled={!canUserStake}
              label={stakeToolTipLabel}
              placement="top-start"
            >
              <Button
                w="full"
                variant="solid"
                isLoading={isLoadingStake}
                loadingText="Staking..."
                isDisabled={!canUserStake}
                onClick={() => writeJoinInitiation && writeJoinInitiation()}
              >
                Stake
              </Button>
            </Tooltip>
          </GridItem>
        </SimpleGrid>
      </Flex>
    </>
  );
};

export default StakingFlow;
