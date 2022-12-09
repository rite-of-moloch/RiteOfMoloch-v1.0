import React from "react";
import { useCountdown } from "../hooks/useCountdown";
import { Box, Flex, Text, Image, Heading } from "@chakra-ui/react";
import { sixMonthsInSeconds } from "../utils/constants";

export const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds, secondsLeft] = useCountdown(targetDate);

  const color = `hsl(347, ${Math.floor(
    (secondsLeft / sixMonthsInSeconds) * 100
  )}%, 50%)`;

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        color={color}
      />
    );
  }
};

const ExpiredNotice = () => {
  return (
    <Box textAlign="center" my={6} color="red.600" fontSize={30}>
      <Text>Your deeds have not been proven worthy, mortal. </Text>
      <Text>
        Your soul has been sacrificed to Moloch and your jewels slashed.
      </Text>
    </Box>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds, color }) => {
  return (
    <Flex
      fontSize="large"
      fontFamily="spaceMono"
      alignItems="center"
      justifyContent="space-between"
      py={3}
      bgColor="rgb(71 52 89 / 16%)"
      w="md"
      padding="0.75rem"
      borderRadius="5px"
      gap={6}
      mt={6}
    >
      {/* <Image src='/assets/citipati.png' alt='citipati' w={16} opacity={0.13} /> */}
      <Image src="/assets/hourglass.png" alt="citipati" w={12} opacity={0.13} />
      <Flex gap={6}>
        <DateTimeDisplay
          value={days}
          type="D"
          isDanger={days <= 3}
          color={color}
        />
        <DateTimeDisplay
          value={hours}
          type="H"
          isDanger={false}
          color={color}
        />
        <DateTimeDisplay
          value={minutes}
          type="M"
          isDanger={false}
          color={color}
        />
        <DateTimeDisplay
          value={seconds}
          type="S"
          isDanger={false}
          color={color}
        />
      </Flex>
      <Image src="/assets/hourglass.png" alt="citipati" w={12} opacity={0.13} />
      {/* <Image src='/assets/triskele.png' alt='citipati' w={16} opacity={0.13} /> */}
    </Flex>
  );
};

const DateTimeDisplay = ({ value, type, color }) => {
  return (
    <Box textAlign="center" display={"flex"} gap={2}>
      <Text color={color} fontWeight="bold">
        {value}
      </Text>
      <Text color={color}>{type}</Text>
    </Box>
  );
};
