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
        font: "Space_Mono",
      },
    },
  },
  variants: {
    whitePlaceholder: {
      field: {
        _placeholder: {
          color: "#323232",
        },
      },
    },
    redPlaceholder: {
      field: {
        _placeholder: {
          color: "red",
        },
      },
    },
  },
  defaultProps: {
    variant: "whitePlaceholder",
  },
});

export default Input;
