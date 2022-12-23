import React, { useState, useContext } from "react";
import { Flex, Image, Text, Checkbox } from "@chakra-ui/react";
import { CountdownTimer } from "./CountdownTimer";
import { StakingFlow } from "./StakingFlow";
import { UserContext } from "context/UserContext";

interface RiteStakedProps {
  minimumStake: string;
  raidBalance: string;
  approveRaid: Function;
  canStake: boolean;
  cantStakeTooltipLabel: string;
  joinInitiation: Function;
  allowance: string;
  riteBalanceOf: string;
  deadline: number;
}

const RiteStaked: React.FC<RiteStakedProps> = ({
  minimumStake,
  raidBalance,
  approveRaid,
  canStake,
  cantStakeTooltipLabel,
  joinInitiation,
  allowance,
  riteBalanceOf,
  deadline,
}) => {
  const { displaySponsorCohort, setDisplaySponsorCohort } =
    useContext(UserContext);

  const handleSponsorCohort = () => {
    setDisplaySponsorCohort(!displaySponsorCohort);
  };

  return (
    <Flex
      w="100%"
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      p="15px"
    >
      <Text color="red" fontSize={{ lg: "1.2rem", sm: "1rem" }} mb="5px">
        You own a stake for {Number(riteBalanceOf)} RITE
      </Text>
      <Text color="white" fontFamily="jetbrains" fontSize=".8rem">
        Deadline - {new Date(deadline * 1000).toLocaleString()}
      </Text>
      <CountdownTimer targetDate={new Date(deadline * 1000).getTime()} />

      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        mt="2em"
      >
        <Checkbox onChange={handleSponsorCohort} />
        <Text color="red" fontFamily="jetbrains" fontSize=".8rem" ml="1em">
          Sponsor an Initiate
        </Text>
      </Flex>
      {displaySponsorCohort && (
        <StakingFlow
          minimumStake={minimumStake}
          raidBalance={balanceOf}
          approveRaid={approveRaid}
          canStake={canStake}
          cantStakeTooltipLabel={cantStakeTooltipLabel}
          joinInitiation={writeJoinInitiation}
          allowance={allowance}
        />
      )}
    </Flex>
  );
};

export default RiteStaked;
