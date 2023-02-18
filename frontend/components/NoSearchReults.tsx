import { Box, Text } from "@raidguild/design-system";

const NoSearchResults = (
  <Box
    textAlign="center"
    border="1px solid red"
    rounded="md"
    pb={3}
    pt={2}
    bg="black"
  >
    <Text fontFamily="Texturina">
      No matching results. Refine your search, mortal...
    </Text>
  </Box>
);

export default NoSearchResults;
