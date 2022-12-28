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
  FormControl,
} from "@raidguild/design-system";

import { useAccount, useNetwork } from "wagmi";
import { utils } from "ethers";
import { TOKEN_TICKER } from "../utils/constants";
import { UserContext } from "context/UserContext";
import { approveTooltip, canStake, stakeTooltip } from "utils/general";
import useMinimumStake from "hooks/useMinimumStake";
import useBalanceOf from "hooks/useBalanceOf";
import useApproveRaid from "hooks/useApproveRaid";
import useContractAddress from "hooks/useContractAddress";
import useJoinInitiation from "hooks/useJoinInitiation";
import useGetAllowance from "hooks/useGetAllowance";

import { FiAlertTriangle } from "react-icons/fi";

interface StakingFlowProps {
  children?: ReactNode;
}

const StakingFlow: React.FC<StakingFlowProps> = ({ children }) => {
  const { willSponsor, handleWillSponsor } = useContext(UserContext);

  // start react-hook-form
  // const localForm = useForm<FieldValues>({
  //   defaultValues: {
  //     initiateAddress: "",
  //   },
  // });

  const localForm = useForm({
    mode: "all",
  });

  const {
    register,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = localForm;

  const customValidations = {
    validate: (initiate: string) => utils.isAddress(initiate),
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
  };

  console.log("isValid", isValid);

  const values = getValues();
  const initiateAddress: string = values?.initiateAddress || "";
  // end react-hook-form

  const { address } = useAccount();
  const { chain } = useNetwork();

  const chainId = (): number => {
    if (chain?.id) return chain?.id;
    else return 100;
  };

  function userAddress(): string {
    if (typeof address === "string") return address;
    else return "";
  }

  const minimumStake: string = useMinimumStake();

  const balanceOf: string = useBalanceOf([userAddress()]);

  const { approveRaid, isLoadingApprove, isSuccessApprove, isErrorApprove } =
    useApproveRaid([useContractAddress("riteOfMolochAddress"), minimumStake]);

  const allowance = useGetAllowance([
    userAddress(),
    useContractAddress("erc20TokenAddress"),
  ]);

  const { writeJoinInitiation, isLoadingStake, isSuccessStake, isErrorStake } =
    useJoinInitiation(!willSponsor ? [userAddress()] : [initiateAddress]);

  const canUserStake: boolean = canStake(
    allowance,
    minimumStake,
    balanceOf,
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
                // @ts-ignore
                localForm={localForm}
                {...register("initiateAddress", customValidations)}
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
      {children}
    </>
  );
};

export default StakingFlow;
