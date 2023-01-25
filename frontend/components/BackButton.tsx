import { Box, Button, Link } from "@raidguild/design-system";

const BackButton = () => {
  return (
    <Box w={["full", "full", "80%"]}>
      <Box w={["25%"]} alignSelf="start" my={"2rem"}>
        <Link href="/admin">
          <Button w="full" variant="outline">
            back
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default BackButton;
