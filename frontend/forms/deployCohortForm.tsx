import React, { ReactNode } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  VStack,
  SimpleGrid,
} from "@raidguild/design-system";

interface DeployCohortFormProps {
  children?: ReactNode;
}

const DeployCohortForm: React.FC<DeployCohortFormProps> = ({ children }) => {
  const localForm = useForm({
    defaultValues: {
      nameCohort: "",
      sbtImage: "",
      nameSBT: "",
      symbolSBT: "",
      uriSBT: "",
    },
  });

  const {
    register,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = localForm;

  const nameValidations = {
    required: true,
    validate: (e: any) => e.target.value.length > 0,
    onChange: () => {
      if (isValid) {
        clearErrors();
      } else {
        setError("nameCohort", {
          type: "validate",
          message: "Address is invalid!",
        });
      }
    },
  };

  return (
    <FormControl>
      <SimpleGrid columns={2} spacingX={4} spacingY={3}>
        <Box>
          <Input
            label="Name cohort"
            name="nameCohort"
            placeholder="Name cohort"
            // @ts-ignore
            localForm={localForm}
            borderColor="red"
          />
        </Box>
        <Box>
          <Input
            label="Upload SBT image"
            type="image"
            name="sbtImage"
            placeholder="Upload image for SBT"
            // @ts-ignore
            localForm={localForm}
            borderColor="red"
          />
        </Box>

        <Box>
          <Input
            label="Name SBT"
            name="nameSBT"
            placeholder="Name SBT"
            // @ts-ignore
            localForm={localForm}
            borderColor="red"
          />
        </Box>
        <Box>
          <Input
            label="Symbol SBT"
            name="symbolSBT"
            placeholder="SBT Symbol"
            // @ts-ignore
            localForm={localForm}
            borderColor="red"
          />
        </Box>
        <Box>
          <Input
            label="URI SBT"
            name="uriSBT"
            placeholder="uriSBT"
            // @ts-ignore
            localForm={localForm}
            borderColor="red"
            w="full"
          />
        </Box>
        <Box alignSelf="end">
          <Button variant="outline" w="full">
            PREVIEW SBT
          </Button>
        </Box>
        <Box />
        <Box textAlign="right">
          <Button variant="solid" w="full" color="black" mt={10}>
            NEXT
          </Button>
        </Box>
      </SimpleGrid>
    </FormControl>
  );
};

export default DeployCohortForm;
