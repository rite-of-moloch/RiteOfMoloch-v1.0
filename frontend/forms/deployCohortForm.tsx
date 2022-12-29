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

  return (
    <FormControl>
      <SimpleGrid columns={2} spacingX={4} spacingY={3}>
        <Box>
          <Input
            label="Name cohort"
            id="nameCohort"
            placeholder="Name cohort"
            borderColor="red"
            // @ts-ignore
            localForm={localForm}
            {...register("nameCohort", {
              required: true,
              minLength: {
                value: 3,
                message: "Minimum length is 3",
              },
              maxLength: {
                value: 25,
                message: "Maximum length is 25",
              },
            })}
          />
        </Box>
        <Box>
          <Input
            label="Upload SBT image"
            type="image"
            id="sbtImage"
            placeholder="Upload image for SBT"
            borderColor="red"
            // @ts-ignore
            localForm={localForm}
            {...register("sbtImage", {
              required: true,
            })}
          />
        </Box>

        <Box>
          <Input
            label="Name SBT"
            id="nameSBT"
            placeholder="Name SBT"
            borderColor="red"
            // @ts-ignore
            localForm={localForm}
            {...register("nameSBT", {
              required: true,
              minLength: {
                value: 2,
                message: "Minimum length is 3",
              },
              maxLength: {
                value: 15,
                message: "Maximum length is 15",
              },
            })}
          />
        </Box>
        <Box>
          <Input
            label="Symbol SBT"
            id="symbolSBT"
            placeholder="SBT Symbol"
            borderColor="red"
            // @ts-ignore
            localForm={localForm}
            {...register("symbolSBT", {
              required: true,
              minLength: {
                value: 2,
                message: "Minimum length is 3",
              },
              maxLength: {
                value: 4,
                message: "Maximum length is 4",
              },
            })}
          />
        </Box>
        <Box>
          <Input
            label="URI SBT"
            id="uriSBT"
            placeholder="uriSBT"
            borderColor="red"
            // @ts-ignore
            localForm={localForm}
            {...register("uriSBT", {
              required: true,
              minLength: {
                value: 5,
                message: "Minimum length is 5",
              },
            })}
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
