import React, { useState, useContext } from "react";
import { Flex, Image, Text, Checkbox } from "@chakra-ui/react";
import { CountdownTimer } from "./CountdownTimer";
import StakingFlow from "./StakingFlow";
import { UserContext } from "context/UserContext";

interface RiteStakedProps {
  riteBalance: string;
  deadline: string;
}

const RiteStaked: React.FC<RiteStakedProps> = ({ riteBalance, deadline }) => {
  const { displaySponsorCohort, setDisplaySponsorCohort } =
    useContext(UserContext);

  const handleSponsorCohort = () => {
    setDisplaySponsorCohort(!displaySponsorCohort);
  };

  // const fetchStakeDeadline = async () => {
  //   const _stakeDeadline = await getStakeDeadline;
  //   setStakeDeadline(Number(_stakeDeadline) + 60 * 60 * 24 * 30 * 6); // (6 months) for rinkeby testing
  //   setStakeDeadline(Number(_stakeDeadline));
  // };

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
        Deadline - {new Date(Number(deadline) * 1000).toLocaleString()}
      </Text>
      <CountdownTimer
        targetDate={new Date(Number(deadline) * 1000).getTime()}
      />

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
      {displaySponsorCohort && <StakingFlow />}
    </Flex>
  );
};

export default RiteStaked;
