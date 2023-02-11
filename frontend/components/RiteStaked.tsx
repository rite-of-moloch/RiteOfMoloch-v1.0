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
    <VStack>
      <Box textAlign="center">
        <Text color="red" fontSize={{ lg: "1.2rem", sm: "1rem" }} mb="5px">
          You own a stake for {Number(riteBalance)} RITE
        </Text>
        <Text color="white" fontFamily="jetbrains" fontSize=".8rem">
          Deadline - {new Date(Number(deadline) * 1000).toLocaleString()}
        </Text>
      </Box>
      <CountdownTimer deadline={deadline} />

      <Flex mt="1em">
        <Checkbox
          localForm={_localForm}
          size="md"
          color="red"
          defaultValue={["false"]}
          label="Sponsor an Initiate"
          value="Sponsor an Initiate"
          options={["Sponsor an Initiate"]}
          isChecked={willSponsor}
          onChange={handleWillSponsor}
          hidden={willSponsor ? true : false}
        />
      </Flex>
      {willSponsor && <StakingFlow contractAddress={contractAddress || ""} />}
    </VStack>
  );
};

export default RiteStaked;
