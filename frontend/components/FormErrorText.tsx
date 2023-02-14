import { Text } from "@raidguild/design-system";
import React from "react";

interface FormErrorTextProps {
  message: string;
}

const FormErrorText: React.FC<FormErrorTextProps> = ({ message }) => {
  return (
    <Text color="#fc8181" fontSize="sm" mt={1}>
      {message}
    </Text>
  );
};

export default FormErrorText;
