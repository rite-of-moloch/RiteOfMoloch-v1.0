import React, { useState, useContext } from "react";
import { Flex, Image, Text, Checkbox } from "@chakra-ui/react";
import { CountdownTimer } from "./CountdownTimer";
import StakingFlow from "./StakingFlow";
import { UserContext } from "context/UserContext";

interface RiteStakedProps {
  minimumStake: string;
  raidBalance: string;
  approveRaid: Function | undefined;
  balanceOf: string;
  joinInitiation: Function | undefined;
  allowance: string;
  riteBalance: string;
  deadline: string;
}

const RiteStaked: React.FC<RiteStakedProps> = ({
  minimumStake,
  raidBalance,
  approveRaid,
  balanceOf,
  joinInitiation,
  allowance,
  riteBalance,
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
        You own a stake for {Number(riteBalance)} RITE
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
          raidBalance={raidBalance}
          approveRaid={approveRaid}
          balanceOf={balanceOf}
          stakeTooltipLabel={stakeTooltipLabel}
          joinInitiation={joinInitiation}
          allowance={allowance}
        />
      )}
    </Flex>
  );
};

export default RiteStaked;
