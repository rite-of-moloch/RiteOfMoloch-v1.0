import React, { FC } from "react";
import { Box, Button, Link } from "@raidguild/design-system";

interface BackButtonProps {
  path: string;
}

const BackButton: FC<BackButtonProps> = ({ path }) => {
  return (
    <Box w={["full", "full", "80%"]}>
      <Box w={["25%"]} alignSelf="start" my={"2rem"}>
        <Link href={path}>
          <Button w="full" variant="outline">
            back
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default BackButton;
