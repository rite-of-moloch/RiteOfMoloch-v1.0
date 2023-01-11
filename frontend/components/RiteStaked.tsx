import React, { useContext } from "react";
import { Flex, Text, Checkbox, Box, VStack } from "@raidguild/design-system";
import CountdownTimer from "./CountdownTimer";
import StakingFlow from "./StakingFlow";
import { UserContext } from "context/UserContext";

interface RiteStakedProps {
  riteBalance: string;
  deadline: string;
}

const RiteStaked: React.FC<RiteStakedProps> = ({ riteBalance, deadline }) => {
  const { handleWillSponsor, willSponsor } = useContext(UserContext);

  return (
    <VStack>
      <Box w="full" textAlign="center">
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
          size="md"
          color="red"
          defaultValue={["false"]}
          value="Sponsor an Initiate"
          options={[{ label: "Sponsor an Initiate", value: "false" }]}
          isChecked={willSponsor}
          onChange={handleWillSponsor}
          hidden={willSponsor ? true : false}
        />
      </Flex>
      {willSponsor && <StakingFlow />}
    </VStack>
  );
};

export default RiteStaked;
