/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Box, Button, HStack } from "@raidguild/design-system";
import { useAccount } from "wagmi";
import Link from "next/link";
import NotConnected from "components/NotConnected";

const Home = () => {
  return (
    <>
      (
      <HStack justifyContent="space-around">
        <Box mr={["1rem", "2rem", "4rem"]}>
          <Link href="/joinCohorts">
            <Button variant="red" p="1.5rem">
              Cohort Member
            </Button>
          </Link>
        </Box>

        <Box ml={["1rem", "2rem", "4rem", "8rem"]}>
          <Link href="admin">
            <Button variant="red" p="1.5rem">
              Cohort Administration
            </Button>
          </Link>
        </Box>
      </HStack>
    </>
  );
};

export default Home;
