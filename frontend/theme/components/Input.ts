import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const helpers = createMultiStyleConfigHelpers(["field"]);

const Input = helpers.defineMultiStyleConfig({
  baseStyle: {
    field: {
      bg: "black",
      border: "solid red 1px",
      fontFamily: "Texturina",
      color: "#FFFFFF",
      _placeholder: {
        fontFamily: "Space_Mono",
        color: "#323232",
      },
    },
  },
  defaultProps: {
    variant: "none",
  },
});

export default Input;
