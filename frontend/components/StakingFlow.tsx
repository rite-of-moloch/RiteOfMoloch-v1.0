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
  Stack,
} from "@raidguild/design-system";
import { useNetwork } from "wagmi";
import { utils } from "ethers";
import { TOKEN_TICKER } from "../utils/constants";
import { UserContext } from "context/UserContext";

interface StakingFlowProps {
  minimumStake: string;
  raidBalance: string;
  approveRaid: Function;
  canStake: boolean;
  cantStakeTooltipLabel: string;
  // `joinInitiation` replaced `depositStake`
  joinInitiation: any;
  allowance: string;
}

const StakingFlow: React.FC<StakingFlowProps> = ({
  minimumStake,
  raidBalance,
  approveRaid,
  canStake,
  cantStakeTooltipLabel,
  joinInitiation,
  allowance,
}) => {
  const {
    isApproveTxPending,
    isStakeTxPending,
    handleCohortAddress,
    isChecked,
    handleIsChecked,
    cohortAddress,
    displaySponsorCohort,
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
            {utils.formatEther(minimumStake)} {TOKEN_TICKER[chainId()]}
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
            {utils.formatEther(allowance)} {TOKEN_TICKER[chainId()]}
          </Text>
        </HStack>

        <Stack mt={8}>
          <Checkbox
            size="md"
            defaultValue={["false"]}
            value="Sponsor an Initiate"
            options={[{ label: "Sponsor an Initiate", value: "false" }]}
            isChecked={isChecked}
            onChange={handleIsChecked}
          />
        </Stack>

        {/* <Input
          label={`sponsored initiate's wallet address`}
          name={"wallet address"}
          localForm={}
          // onChange={handleCohortAddress}
          // placeholder="Sponsored initiate's wallet address"
          // value={cohortAddress}
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
              onClick={() => approveRaid()}
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
                onClick={joinInitiation}
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
