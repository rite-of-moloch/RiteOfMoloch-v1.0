import React from "react";
import useCountdown from "../hooks/useCountdown";
import { Box, Flex, Text, Image } from "@raidguild/design-system";
import { sixMonthsInSeconds } from "../utils/constants";

interface CountdownTimerProps {
  deadline: string;
}

const hourglassImage = (
  <Image src="/assets/hourglass.png" alt="citipati" w={12} opacity={0.13} />
);
// const citiPatiImage = (
//   <Image src="/assets/citipati.png" alt="citipati" w={16} opacity={0.13} />
// );
// const triskeleImage = (
//   <Image src="/assets/triskele.png" alt="citipati" w={16} opacity={0.13} />
// );

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

interface DateTimeDisplayProps {
  value: Number;
  type: string;
  isDanger: Boolean;
  color: string;
}

const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({
  value,
  type,
  isDanger,
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

interface ShowCounterProps {
  days: Number;
  hours: Number;
  minutes: Number;
  seconds: Number;
  color: string;
}

const ShowCounter: React.FC<ShowCounterProps> = ({
  days,
  hours,
  minutes,
  seconds,
  color,
}) => {
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
      {/* {citiPatiImage} */}
      {hourglassImage}
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
      {hourglassImage}
      {/* {triskeleImage} */}
    </Flex>
  );
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ deadline }) => {
  const [days, hours, minutes, seconds, secondsLeft] = useCountdown(
    Number(deadline)
  );

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
