import React from "react";
import { Box, Text, Image, HStack } from "@raidguild/design-system";
import { unixToUTC } from "utils/general";

interface CountdownTimerProps {
  deadline: string;
}
/**
 * @remarks expiredNotice renders a message if deadline has passed and address is not a member of the DAO
 * @returns box of text
 */

const CountdownTimer: React.FC<CountdownTimerProps> = ({ deadline }) => {
  /**
   * @returns Boolean: if true, then the deadline is in the future and the slash cannot yet be staked
   */

  const hourglassImage = (
    <Image
      src={"/assets/hourglass.png"}
      alt="hourglass"
      w={12}
      opacity={0.13}
    />
  );

  // console.log(deadline);

  const countdownExpired = (): Boolean => {
    const now = new Date().getTime();
    let result: boolean;
    Number(deadline) > now ? (result = false) : (result = true);

    return result;
  };

  const renderExpiredNotice = countdownExpired();

  const expiredNotice = (
    <Box textAlign="center" my={6} color="red" fontSize={["lg", "xl"]}>
      <Text>Your deeds have not been proven worthy, mortal. </Text>
      <Text>
        Your soul has been sacrificed to Moloch and your jewels slashed.
      </Text>
    </Box>
  );

  const renderDeadline = (
    <Box textAlign="center" color="red" fontSize={["lg", "xl"]}>
      <HStack justifyContent="center" py={4}>
        {hourglassImage}
        <Text color="white" fontWeight="bold" fontSize={["xl", "2xl"]} mb={2}>
          Deadline: {unixToUTC(deadline)}
        </Text>
        {hourglassImage}
      </HStack>
      <Box mx={["0px", "1rem", "2rem"]}>
        <Text>
          Failure to perform your duties will result in your stake getting
          SLASHED!
        </Text>
        <Text>Godspeed, Moloch soldier...</Text>
      </Box>
    </Box>
  );

  return <Box>{renderExpiredNotice ? expiredNotice : renderDeadline}</Box>;
};

export default CountdownTimer;
