import React from "react";
import { Box, Flex, Text, Image, Heading } from "@raidguild/design-system";
import { formattedDeadline } from "utils/general";

const hourglassImage = (
  <Image src={"/assets/hourglass.png"} alt="hourglass" w={12} opacity={0.13} />
);

interface CountdownTimerProps {
  deadline: string;
}
/**
 * @remarks expiredNotice renders a message if deadline has passed and address is not a member of the DAO
 * @returns box of text
 */

const CountdownTimer: React.FC<CountdownTimerProps> = ({ deadline }) => {
  /**
   * @remarks multiplying deadline by 1000 converts it to a UNIX timestamp which can be compared to new Date()
   * @returns Boolean: if true, then the deadline is in the future and the slash cannot yet be staked
   */
  const countdownExpired = (): Boolean => {
    const now = new Date().getTime();
    let result: boolean;
    +deadline * 1000 > now ? (result = false) : (result = true);

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
      <Heading as="h2" fontSize="2xl" mb={2}>
        Deadline: {formattedDeadline(deadline)}
      </Heading>
      <Text>
        Failure to fulfill your duty to the cohort will result in your stake
        getting SLASHED!
      </Text>
      <Text>Godspeed, Moloch soldier...</Text>
    </Box>
  );

  return <Box>{renderExpiredNotice ? expiredNotice : renderDeadline}</Box>;
};
export default CountdownTimer;
