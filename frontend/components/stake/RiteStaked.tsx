import React, { useState } from "react";
import { Flex, Text, Box, VStack, Checkbox } from "@raidguild/design-system";
import CountdownTimer from "../CountdownTimer";
import StakingFlow from "./StakingFlow";
import { useForm } from "react-hook-form";

interface RiteStakedProps {
  riteBalance: string;
  deadline: string;
  contractAddress: `0x${string}`;
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

  const [willSponsor, setWillSponsor] = useState<boolean>(false);

  const handleWillSponsor = () => {
    setWillSponsor(!willSponsor);
  };

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
          onChange={() => handleWillSponsor()}
          hidden={willSponsor ? true : false}
        />
      </Flex>
      {willSponsor && <StakingFlow contractAddress={contractAddress} />}
    </VStack>
  );
};

export default RiteStaked;
