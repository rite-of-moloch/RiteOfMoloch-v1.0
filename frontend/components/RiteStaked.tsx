import React, { useContext } from "react";
import { Flex, Image, Text, Checkbox } from "@raidguild/design-system";
import { CountdownTimer } from "./CountdownTimer";
import StakingFlow from "./StakingFlow";
import { UserContext } from "context/UserContext";

interface RiteStakedProps {
  riteBalance: string;
  deadline: string;
}

const RiteStaked: React.FC<RiteStakedProps> = ({ riteBalance, deadline }) => {
  const { handleWillSponsor, willSponsor } = useContext(UserContext);

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
      <CountdownTimer deadline={new Date(Number(deadline) * 1000).getTime()} />

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
    </Flex>
  );
};

export default RiteStaked;
