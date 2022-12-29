import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const helpers = createMultiStyleConfigHelpers(["filledTrack", "track"]);

const Progress = helpers.defineMultiStyleConfig({
  baseStyle: {
    filledTrack: {
      bg: "gradient1",
    },
    track: {
      bg: "transparent",
      border: "1px",
      borderColor: "red",
      rounded: "md",
    },
  },
});

export default Progress;
