import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const helpers = createMultiStyleConfigHelpers(["field"]);

const NumberInput = helpers.defineMultiStyleConfig({
  baseStyle: {
    field: {
      bg: "black",
      border: "solid red 1px",
      fontFamily: "texturina",
      color: "#FFFFFF",
      _placeholder: {
        fontFamily: "spaceMono",
        color: "#323232",
      },
    },
  },
  defaultProps: {
    variant: "none",
  },
});

export default NumberInput;
