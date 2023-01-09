/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode } from "react";
import {
  Flex,
  Button,
  Box,
  SimpleGrid,
  HStack,
  Grid,
  GridItem,
} from "@raidguild/design-system";
import { useAccount } from "wagmi";
import Link from "next/link";
import NotConnected from "components/NotConnected";

interface HomeProps {
  children: ReactNode;
}

const Home: React.FC<HomeProps> = ({ children }): any => {
  const { isConnected } = useAccount();

  return (
    <>
      {!isConnected && <NotConnected />}
      {isConnected && (
        <Grid templateColumns={"repeat(2, 1fr)"} w="80%">
          <GridItem w="100%" textAlign="center">
            <Link href="/stake">
              <Button variant="red" p="1.5rem">
                Cohort Member
              </Button>
            </Link>
          </GridItem>

          <GridItem w="100%" textAlign="center">
            <Link href="admin">
              <Button variant="red" p="1.5rem">
                Cohort Administration
              </Button>
            </Link>
          </GridItem>
        </Grid>
      )}
    </>
  );
};

export default Home;
