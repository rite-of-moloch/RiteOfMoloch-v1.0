import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const helpers = createMultiStyleConfigHelpers([
  "root",
  "field",
  "stepperGroup",
  "stepper",
]);

const NumberInput = helpers.defineMultiStyleConfig({
  baseStyle: {
    root: {
      bg: "black",
      border: "solid #FF3864 1px",
      fontFamily: "texturina",
      rounded: "md",
    },
    field: {
      bg: "black",
      fontFamily: "texturina",
      color: "#FFFFFF",
      my: "auto",
    },
  },
  defaultProps: {
    variant: "none",
  },
});

export default NumberInput;
