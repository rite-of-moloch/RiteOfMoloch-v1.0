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
      border: "solid red 1px",
      fontFamily: "Texturina",
      rounded: "md",
    },
    field: {
      bg: "black",
      fontFamily: "Texturina",
      color: "#FFFFFF",
      my: "auto",
    },
  },
  defaultProps: {
    variant: "none",
  },
});

export default NumberInput;
