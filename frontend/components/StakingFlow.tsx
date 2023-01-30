import React, { useContext, ReactNode } from "react";
import { useForm } from "react-hook-form";
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
} from "@raidguild/design-system";

import { useAccount, useNetwork } from "wagmi";
import { utils } from "ethers";
import { TOKEN_TICKER } from "../utils/constants";
import { UserContext } from "context/UserContext";
import {
  approveTooltip,
  canStake,
  isValidAddress,
  stakeTooltip,
} from "utils/general";
import useMinimumStake from "hooks/useMinimumStake";
import useBalanceOf from "hooks/useBalanceOf";
import useApproveRaid from "hooks/useApproveRaid";
import useContractAddress from "hooks/useContractAddress";
import useJoinInitiation from "hooks/useJoinInitiation";
import useGetAllowance from "hooks/useGetAllowance";

import { FiAlertTriangle } from "react-icons/fi";
import { useSubgraphQuery } from "hooks/useSubgraphQuery";
import { COHORT_METADATA } from "utils/subgraph/queries";
import { CohortMetadata } from "utils/types/subgraphQueries";

interface StakingFlowProps {
  contractAddress: string | string[];
}

type FormValues = {
  initiateAddress: string;
};

/**
 * @remarks if invalid address passed into url query string, values for RaidGuild cohort will be used by default. If cohort exists, address is equal to `cohort.id`, token address equals `cohort.token`, minimum stake equals `cohort.tokenAmount`
 *
 * @param contractAddress is cohortAddress inherited from [address].tsx component. This address should be passed into smart contract functions. If address is not valid Ethereum address, use return value from useContractAddress function
 * @returns data about cohort that where a user can stake
 */
const StakingFlow: React.FC<StakingFlowProps> = ({ contractAddress }) => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { willSponsor, handleWillSponsor } = useContext(UserContext);

  // check if contractAddress from [address].tsx is valid. Returns Boolean
  // const validAddress = isValidAddress(contractAddress);

  // if contractAddress isn't a valid cohort, `cohort` object will return as undefined
  const metadata = useSubgraphQuery(
    COHORT_METADATA(contractAddress),
    Boolean(contractAddress)
  );
  const cohort: CohortMetadata | null = metadata?.data?.cohort;
  // console.log("cohort", cohort);

  const localForm = useForm<FormValues>({
    defaultValues: {
      initiateAddress: "",
    },
  });

  const {
    register,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = localForm;

  const values = getValues();
  const initiateAddress: string = values?.initiateAddress || "";

  const chainId = (): number => {
    if (chain?.id) return chain?.id;
    else return 100;
  };

  function userAddress(): string {
    if (typeof address === "string") return address;
    else return "";
  }

  // pass correctAddressLogic variable into `balanceOf` and `useApproveRaid`
  const correctAddressLogicROM =
    cohort?.id || useContractAddress("riteOfMolochAddress");

  const correctAddressLogicERC20 =
    cohort?.token || useContractAddress("erc20TokenAddress");

  const minimumStake: string =
    cohort?.tokenAmount || useMinimumStake(correctAddressLogicROM) || "0";

  const balanceOf: string = useBalanceOf(correctAddressLogicERC20, [
    userAddress(),
  ]);

  // TO-DO: double check useApproveRaid
  const { approveRaid, isLoadingApprove, isSuccessApprove, isErrorApprove } =
    useApproveRaid(correctAddressLogicERC20, [
      correctAddressLogicERC20,
      minimumStake,
    ]);

  const allowance = useGetAllowance(correctAddressLogicERC20, [
    userAddress(),
    cohort?.token || useContractAddress("erc20TokenAddress"),
  ]);

  const { writeJoinInitiation, isLoadingStake, isSuccessStake, isErrorStake } =
    useJoinInitiation(
      correctAddressLogicROM,
      !willSponsor ? [userAddress()] : [initiateAddress]
    );

  const canUserStake: boolean = canStake(
    allowance || "",
    minimumStake || "",
    balanceOf || "",
    initiateAddress,
    willSponsor
  );

  const approveTooltiplabel = approveTooltip(
    allowance,
    minimumStake,
    balanceOf
  );

  const stakeToolTipLabel: string | null = stakeTooltip(
    willSponsor,
    initiateAddress,
    balanceOf,
    allowance,
    minimumStake
  );

  return (
    <>
      <Flex w="100%" direction="column" alignItems="flex-start" p="15px">
        <HStack mb="1rem">
          <Text color="red">Required Stake</Text>
          <Text color="white">
            {utils.formatEther(minimumStake)} {TOKEN_TICKER[chainId()]}
          </Text>
        </HStack>
        <HStack>
          <Text color="red" fontFamily="jetbrains" fontSize=".8rem">
            Your {TOKEN_TICKER[chainId()]} balance
          </Text>
          <Text color="white" fontSize=".8rem">
            {utils.formatUnits(balanceOf, "ether")} {TOKEN_TICKER[chainId()]}
          </Text>
        </HStack>
        <HStack>
          <Text color="red" fontFamily="jetbrains" fontSize=".8rem">
            Your {TOKEN_TICKER[chainId()]} allowance
          </Text>
          <Text color="white" fontSize=".8rem">
            {utils.formatEther(allowance)} {TOKEN_TICKER[chainId()]}
          </Text>
        </HStack>
        <Stack mt={8} w="full">
          <VStack alignItems={"start"}>
            <Checkbox
              size="md"
              color="red"
              defaultValue={["false"]}
              value="Sponsor an Initiate"
              options={[{ label: "Sponsor an Initiate", value: "false" }]}
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
                // @ts-ignore
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

        <HStack spacing="1.5rem" mt="2rem" w="100%">
          <Box w="50%">
            <Tooltip
              isDisabled={canUserStake}
              label={approveTooltiplabel}
              placement="top-start"
            >
              <Button
                variant="solid"
                w="full"
                isLoading={
                  isLoadingApprove
                    ? isLoadingApprove
                    : isSuccessApprove || isErrorApprove
                }
                loadingText="Approving..."
                disabled={
                  utils.formatUnits(allowance, "ether") <
                  utils.formatUnits(minimumStake, "ether")
                }
                onClick={() => approveRaid && approveRaid()}
              >
                Approve
              </Button>
            </Tooltip>
          </Box>
          <Box w="50%">
            <Tooltip
              isDisabled={canUserStake}
              label={stakeToolTipLabel}
              placement="top-start"
            >
              <Button
                w="full"
                variant="solid"
                isLoading={
                  isLoadingStake
                    ? isLoadingStake
                    : isSuccessStake || isErrorStake
                }
                loadingText="Staking..."
                disabled={!canUserStake}
                onClick={() => writeJoinInitiation && writeJoinInitiation()}
              >
                Stake
              </Button>
            </Tooltip>
          </Box>
        </HStack>
      </Flex>
    </>
  );
};

export default StakingFlow;
