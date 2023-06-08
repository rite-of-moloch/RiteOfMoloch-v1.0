/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode } from "react";
import { Button, Grid, GridItem } from "@raidguild/design-system";
import Link from "next/link";
import BackButton from "components/BackButton";

interface AdminProps {
  children: ReactNode;
}

const Admin: React.FC<AdminProps> = ({ children }): any => {
  return (
    <>
      <>
        <Grid
          templateColumns={"repeat(1)"}
          w={["50%", "40%", "20%"]}
          justifyContent="center"
        >
          <GridItem w="100%" textAlign="center" my="1rem">
            <Link href="/deployCohort">
              <Button variant="red" w="full" p="1.5rem">
                Deploy Cohort
              </Button>
            </Link>
          </GridItem>
          <GridItem w="100%" textAlign="center" my="1rem">
            <Link href="/cohorts">
              <Button variant="red" w="full" p="1.5rem">
                Manage Cohorts
              </Button>
            </Link>
          </GridItem>
          <GridItem w="100%" textAlign="center" my="1rem">
            <Link href="initiates">
              <Button variant="red" w="full" p="1.5rem">
                Manage Staked Members
              </Button>
            </Link>
          </GridItem>
          <GridItem w="100%" textAlign="center" my="1rem">
            <Link href="metrics">
              <Button variant="red" w="full" p="1.5rem">
                Metrics
              </Button>
            </Link>
          </GridItem>
        </Grid>
        <BackButton path="/" />
      </>
    </>
  );
};

export default Admin;
