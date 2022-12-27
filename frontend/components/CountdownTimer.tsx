import React from "react";
import useCountdown from "../hooks/useCountdown";
import { Box, Flex, Text, Image, Heading } from "@raidguild/design-system";
import { sixMonthsInSeconds } from "../utils/constants";

interface CountdownTimerProps {
  deadline: number;
}

const hourglassImage = (
  <Image src="/assets/hourglass.png" alt="citipati" w={12} opacity={0.13} />
);

const ExpiredNotice = () => {
  return (
    <Box
      textAlign="center"
      my={6}
      color="red.600"
      fontSize={["lg", "xl", "2xl", "2xl"]}
    >
      <Text>Your deeds have not been proven worthy, mortal. </Text>
      <Text>
        Your soul has been sacrificed to Moloch and your jewels slashed.
      </Text>
    </Box>
  );
};

const DateTimeDisplay = ({
  value,
  type,
  // isDanger,
  color,
}) => {
  return (
    <Box textAlign="center" display={"flex"} gap={2}>
      <Text color={color} fontWeight="bold">
        {value}
      </Text>
      <Text color={color}>{type}</Text>
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
      p="0.75rem"
      borderRadius="5px"
      gap={6}
      mt={6}
    >
      {/* <Image src="/assets/citipati.png" alt="citipati" w={16} opacity={0.13} /> */}
      {hourglassImage}
      <Flex gap={6}>
        <DateTimeDisplay
          value={days}
          type="D"
          // isDanger={days <= 3}
          color={color}
        />
        <DateTimeDisplay
          value={hours}
          type="H"
          // isDanger={false}
          color={color}
        />
        <DateTimeDisplay
          value={minutes}
          type="M"
          // isDanger={false}
          color={color}
        />
        <DateTimeDisplay
          value={seconds}
          type="S"
          // isDanger={false}
          color={color}
        />
      </Flex>
      {hourglassImage}
      {/* <Image src="/assets/triskele.png" alt="citipati" w={16} opacity={0.13} /> */}
    </Flex>
  );
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ deadline }) => {
  const [days, hours, minutes, seconds, secondsLeft] = useCountdown(deadline);

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

export default CountdownTimer;

// const fetchStakeDeadline = async () => {
//   const _stakeDeadline = await getStakeDeadline;
//   setStakeDeadline(Number(_stakeDeadline) + 60 * 60 * 24 * 30 * 6); // (6 months) for rinkeby testing
//   setStakeDeadline(Number(_stakeDeadline));
// };
