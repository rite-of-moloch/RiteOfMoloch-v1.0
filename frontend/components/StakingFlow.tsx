import React, { ReactNode, useContext } from "react";
import {
  Flex,
  Box,
  SimpleGrid,
  Text,
  Button,
  HStack,
  Checkbox,
  Input,
  Tooltip,
  Link,
} from "@raidguild/design-system";
import { useNetwork } from "wagmi";
import { utils } from "ethers";
import { TOKEN_TICKER } from "../utils/constants";
import { UserContext } from "context/UserContext";

interface StakingFlowProps {
  canStake: boolean;
  cantStakeTooltipLabel: string;
  depositStake: any;
  writeAllowance: any;
}

const StakingFlow: React.FC<StakingFlowProps> = ({
  canStake,
  cantStakeTooltipLabel,
  depositStake,
  writeAllowance,
}) => {
  const {
    allowance,
    minimumStake,
    raidBalance,
    isApproveTxPending,
    isStakeTxPending,
    handleCohortAddress,
    isChecked,
    handleIsChecked,
    cohortAddress,
  } = useContext(UserContext);
  const { chain } = useNetwork();
  const chainId = (): number => {
    if (chain?.id) return chain?.id;
    else return 100;
  };

  return (
    <>
      <Flex w="100%" direction="column" alignItems="flex-start" p="15px">
        <HStack mb="1rem">
          <Text color="red">Required Stake</Text>
          <Text color="white">
            {utils.formatUnits(minimumStake, "ether")} {TOKEN_TICKER[chainId()]}
          </Text>
        </HStack>
        <HStack>
          <Text color="red" fontFamily="jetbrains" fontSize=".8rem">
            Your {TOKEN_TICKER[chainId()]} balance
          </Text>
          <Text color="white" fontSize=".8rem">
            {utils.formatUnits(raidBalance, "ether")} {TOKEN_TICKER[chainId()]}
          </Text>
        </HStack>
        <HStack>
          <Text color="red" fontFamily="jetbrains" fontSize=".8rem">
            Your {TOKEN_TICKER[chainId()]} allowance
          </Text>
          <Text color="white" fontSize=".8rem">
            {utils.formatUnits(allowance, "ether")} {TOKEN_TICKER[chainId()]}
          </Text>
        </HStack>
        <HStack alignItems="center" justifyContent="center" mt="2em">
          {/* <Checkbox
            // defaultValue={[0]}
            defaultChecked
            isChecked={isChecked}
            onChange={handleIsChecked}
            display={checkboxDisplay}
          /> */}
          <Text
            color="red"
            fontFamily="jetbrains"
            fontSize=".8rem"
            ml="1em"
            // display={sponsorCohortTextDisplay}
          >
            Sponsor an Initiate
          </Text>
        </HStack>
        {/* <Input
          onChange={handleCohortAddress}
          placeholder="Sponsored initiate's wallet address"
          value={cohortAddress}
        /> */}
        <SimpleGrid columns={2} spacing="1.5rem" mt="2rem" w="100%">
          <Box>
            <Button
              isLoading={isApproveTxPending}
              loadingText="Approving..."
              disabled={
                utils.formatUnits(allowance, "ether") >=
                utils.formatUnits(minimumStake, "ether")
              }
              // onClick={writeAllowance && writeAllowance()}
            >
              Approve
            </Button>
          </Box>
          <Tooltip
            isDisabled={canStake}
            label={cantStakeTooltipLabel}
            shouldWrapChildren
          >
            <Box>
              <Button
                isLoading={isStakeTxPending}
                loadingText="Staking..."
                disabled={!canStake}
                // onClick={depositStake}
              >
                Stake
              </Button>
            </Box>
          </Tooltip>
        </SimpleGrid>
      </Flex>
    </>
  );
};

export default StakingFlow;
