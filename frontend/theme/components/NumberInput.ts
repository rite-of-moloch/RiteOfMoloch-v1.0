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
      rounded: "md",
    },
    field: {
      bg: "black",
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
