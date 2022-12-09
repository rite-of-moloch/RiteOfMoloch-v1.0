import { React, useState } from "react";
import { Flex, Image, Text, Checkbox } from "@chakra-ui/react";
import { CountdownTimer } from "./CountdownTimer";
import { StakingFlow } from "./StakingFlow";

export const RiteStaked = ({
  displaySponsorCohort,
  setDisplaySponsorCohort,
  balance,
  deadline,
  minimumStake,
  context,
  raidBalance,
  allowance,
  isChecked,
  handleIsChecked,
  cohortAddress,
  handleCohortAddress,
  isApproveTxPending,
  makeAnAllowance,
  canStake,
  canNotStakeTooltipLabel,
  isStakeTxPending,
  depositStake,
}) => {
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
      <Image
        src="/assets/season-v-token.svg"
        w="250px"
        borderRadius="20px"
        mt="-3rem"
        alt="Rite Token"
      />

      <Text color="red" fontSize={{ lg: "1.2rem", sm: "1rem" }} mb="5px">
        You own a stake for {Number(balance)} RITE
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
      {displaySponsorCohort ? (
        <StakingFlow
          minimumStake={minimumStake}
          context={context}
          raidBalance={raidBalance}
          allowance={allowance}
          isChecked={isChecked}
          displaySponsorCohort={displaySponsorCohort}
          checkboxDisplay={displaySponsorCohort ? "none" : null}
          sponsorCohortTextDisplay={displaySponsorCohort ? "none" : null}
          handleIsChecked={handleIsChecked}
          cohortAddress={cohortAddress}
          handleCohortAddress={handleCohortAddress}
          isApproveTxPending={isApproveTxPending}
          makeAnAllowance={makeAnAllowance}
          canStake={canStake}
          canNotStakeTooltipLabel={canNotStakeTooltipLabel}
          isStakeTxPending={isStakeTxPending}
          depositStake={depositStake}
        />
      ) : null}
    </Flex>
  );
};
