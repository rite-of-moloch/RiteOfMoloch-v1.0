import React, { useContext } from "react";
import { Flex, Text, Box, VStack, Checkbox } from "@raidguild/design-system";
import CountdownTimer from "./CountdownTimer";
import StakingFlow from "./StakingFlow";
import { UserContext } from "context/UserContext";
import { useForm } from "react-hook-form";

interface RiteStakedProps {
  riteBalance: string;
  deadline: string;
  contractAddress: string | string[];
}

/**
 * @remarks component renders on stake/[address] page if connected address is staked. Gives user option to stake for another initiate. Renders countdown timer if deadline is in the future
 * @param riteBalance displays rite balance
 * @deadline displays deadline before stake gets slashed
 * @contractAddress gets passed into StakingFlow if use wants to sponsor another initiate
 * @returns
 */
const RiteStaked: React.FC<RiteStakedProps> = ({
  riteBalance,
  deadline,
  contractAddress,
}) => {
  const _localForm = useForm();
  const { handleWillSponsor, willSponsor } = useContext(UserContext);

  //TODO options were incorrect and localForm was missing
  //TODO might want to use a simple <input type=checkbox>

  return (
    <VStack py="2rem" px={["1.5rem", "2rem"]}>
      <Box textAlign="center">
        <Text color="red" fontSize={["1rem", "1.25rem"]} mb="5px">
          You own a stake for {Number(riteBalance)} RITE
        </Text>
      </Box>
      <CountdownTimer deadline={deadline} />

      <Flex pb={6}>
        <Checkbox
          localForm={_localForm}
          size="md"
          color="red"
          defaultValue={["false"]}
          options={["Sponsor an Initiate"]}
          isChecked={willSponsor}
          onChange={() => handleWillSponsor}
          hidden={willSponsor ? true : false}
        />
      </Flex>
      {willSponsor && <StakingFlow contractAddress={contractAddress || ""} />}
    </VStack>
  );
};

export default RiteStaked;
