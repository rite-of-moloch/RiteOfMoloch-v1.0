/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode } from "react";
import { Button, Grid, GridItem } from "@raidguild/design-system";
import { useAccount } from "wagmi";
import Link from "next/link";
import NotConnected from "components/NotConnected";

interface AdminProps {
  children: ReactNode;
}

const Admin: React.FC<AdminProps> = ({ children }): any => {
  const { isConnected } = useAccount();

  return (
    <>
      {!isConnected && <NotConnected />}
      {isConnected && (
        <Grid templateColumns={"repeat(1)"} w={["50%", "40%", "20%"]}>
          <GridItem w="100%" textAlign="center" my="1rem">
            <Link href="/deployCohort">
              <Button variant="red" w="full" p="1.5rem">
                Deploy Cohort
              </Button>
            </Link>
          </GridItem>

          <GridItem w="100%" textAlign="center" my="1rem">
            <Link href="#">
              <Button variant="red" w="full" p="1.5rem">
                Cohort Administration
              </Button>
            </Link>
          </GridItem>
          <GridItem w="100%" textAlign="center" my="1rem">
            <Link href="#">
              <Button variant="red" w="full" p="1.5rem">
                Manage Staked Members
              </Button>
            </Link>
          </GridItem>
          <GridItem w="100%" textAlign="center" my="1rem">
            <Link href="/cohorts">
              <Button variant="red" w="full" p="1.5rem">
                Review Ongoing Cohorts
              </Button>
            </Link>
          </GridItem>
        </Grid>
      )}
    </>
  );
};

export default Admin;
