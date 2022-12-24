import React, { useContext, ReactNode } from "react";
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
} from "@raidguild/design-system";
import { useAccount, useNetwork } from "wagmi";
import { utils } from "ethers";
import { TOKEN_TICKER } from "../utils/constants";
import { UserContext } from "context/UserContext";
import { canStake, stakeTooltipLabel } from "utils/general";
import { useMinimumStake } from "hooks/useMinimumStake";
import { useBalanceOf } from "hooks/useBalanceOf";
import { useApproveRaid } from "hooks/useApproveRaid";
import { useContractAddress } from "hooks/useContractAddress";
import { useJoinInitiation } from "hooks/useJoinInitiation";
import { useGetAllowance } from "hooks/useGetAllowance";

interface StakingFlowProps {
  children?: ReactNode;
}

const StakingFlow: React.FC<StakingFlowProps> = ({ children }) => {
  const {
    isApproveTxPending,
    isStakeTxPending,
    handleCohortAddress,
    willSponsor,
    handleWillSponsor,
    cohortAddress,
    displaySponsorCohort,
  } = useContext(UserContext);
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

  /**
   * web3 functions:
   */
  const minimumStake: string = useMinimumStake();

  const balanceOf: string = useBalanceOf([userAddress()]);

  const approveRaid = useApproveRaid([
    useContractAddress("erc20TokenAddress"),
    minimumStake,
  ]);

  const writeJoinInitiation = useJoinInitiation([userAddress()]);

  const allowance: string = useGetAllowance([
    useContractAddress("erc20TokenAddress"),
    userAddress(),
  ]);

  /**
   * general functions:
   */
  const canUserStake = canStake(
    allowance,
    minimumStake,
    balanceOf,
    cohortAddress
  );

  const stakingToolTip: string | null = stakeTooltipLabel(
    willSponsor,
    cohortAddress,
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
        <Stack mt={8}>
          <Checkbox
            size="md"
            defaultValue={["false"]}
            value="Sponsor an Initiate"
            options={[{ label: "Sponsor an Initiate", value: "false" }]}
            isChecked={willSponsor}
            onChange={handleWillSponsor}
          />
        </Stack>
        {/* <Input
          label={`sponsored initiate's wallet address`}
          name={"wallet address"}
          type="text"
          localForm={}
        ></Input> */}
        {/* // onChange={handleCohortAddress} */}
        {/* // placeholder="Sponsored initiate's wallet address" // value= */}
        {cohortAddress}
        <HStack spacing="1.5rem" mt="2rem" w="100%">
          <Box w="50%">
            <Button
              w="full"
              isLoading={isApproveTxPending}
              loadingText="Approving..."
              disabled={
                utils.formatUnits(allowance, "ether") >=
                utils.formatUnits(minimumStake, "ether")
              }
              onClick={() => approveRaid && approveRaid()}
            >
              Approve
            </Button>
          </Box>
          <Box w="50%">
            <Tooltip isDisabled={canUserStake} label={stakingToolTip}>
              <Button
                w="full"
                isLoading={isStakeTxPending}
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
