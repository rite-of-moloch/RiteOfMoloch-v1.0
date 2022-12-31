import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const helpers = createMultiStyleConfigHelpers(["container", "track", "thumb"]);

const Switch = helpers.defineMultiStyleConfig({
  baseStyle: {
    container: {
      color: "gradient1",
    },
    track: {
      bg: "black",
      border: "1px",
      borderColor: "#323232",
      _checked: {
        bg: "#323232",
      },
    },
    thumb: {
      bg: "gray",
      _checked: {
        bg: "gradient1",
      },
    },
  },
});

export default Switch;
