import React, { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  SimpleGrid,
  Spacer,
  Switch,
  Text,
  VStack,
} from "@raidguild/design-system";
import { useFormContext } from "context/FormContext";
import { utils } from "ethers";

interface DeployCohortFormProps {
  children?: ReactNode;
}

type FormValues = {
  hasTophat: boolean;
  tophatOwnerAddress: string;
  tophatID: string;
  addAdmin: boolean;
  admin2: string;
  admin3: string;
};

const DeployCohortPt3: React.FC<DeployCohortFormProps> = ({ children }) => {
  const { setDisplayPart3 } = useFormContext();

  const localForm = useForm<FormValues>({
    defaultValues: {
      hasTophat: false,
      tophatOwnerAddress: "",
      tophatID: "",
      addAdmin: false,
      admin2: "",
      admin3: "",
    },
  });

  const {
    register,
    watch,
    getValues,
    setValue,
    setError,
    clearErrors,
    trigger,
    handleSubmit,
    formState: { errors, isValid },
  } = localForm;

  const values = getValues();

  const hasTophat = values.hasTophat;
  const addAdmin = values.addAdmin;
  const tophatOwnerAddress = values.tophatOwnerAddress;
  const tophatID = values.tophatID;
  const admin2 = values.admin2;
  const admin3 = values.admin3;

  const handleNext = async (): Promise<void> => {
    const validations = await trigger();
    console.log(validations);
  };

  const handleBack = (): void => {
    null;
  };

  return (
    <FormControl onSubmit={handleSubmit(handleNext)}>
      <Box display={setDisplayPart3 ? "inline" : "none"}>
        <HStack justifyContent="space-between" mb={4}>
          <Box>
            <Text>Does the DAO have a TOP HAT?</Text>
          </Box>
          <Box>
            <Switch
              label=""
              // @ts-ignore
              localForm={localForm}
              {...register("hasTophat", {
                onChange: () => {
                  setValue("hasTophat", !hasTophat);
                },
              })}
            />
          </Box>
        </HStack>
        <SimpleGrid columns={2} spacingX={4} spacingY={3}>
          <Box display={hasTophat ? "flex" : "none"} flexDir="column">
            <Input
              label="TOP HAT owner address"
              id="tophatOwnerAddress"
              placeholder="TOP HAT owner address"
              borderColor="red"
              // @ts-ignore
              localForm={localForm}
              {...register("tophatOwnerAddress", {
                required: {
                  value: true,
                  message: "value required",
                },
                validate: () =>
                  utils.isAddress(tophatOwnerAddress) || "invalid address",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="tophatOwnerAddress"
              render={({ message }) => <Text color="red">{message}</Text>}
            />
          </Box>
          <Box display={hasTophat ? "flex" : "none"} flexDir="column">
            <Input
              label="TOP HAT ID"
              id="tophatID"
              placeholder="TOP HAT ID"
              borderColor="red"
              // @ts-ignore
              localForm={localForm}
              {...register("tophatID", {
                required: {
                  value: true,
                  message: "Value is required",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="tophatID"
              render={({ message }) => <Text color="red">{message}</Text>}
            />
          </Box>
        </SimpleGrid>
        <HStack justifyContent="space-between" mb={4}>
          <Box>
            <Text>Want to add additional administrators?</Text>
          </Box>
          <Box>
            <Switch
              my={4}
              label=""
              // @ts-ignore
              localForm={localForm}
              {...(register("addAdmin"),
              {
                onChange: () => {
                  setValue("addAdmin", !addAdmin);
                },
              })}
            />
          </Box>
        </HStack>
        <SimpleGrid columns={2} spacingX={4} spacingY={3}>
          <Box display={addAdmin ? "flex" : "none"} flexDir="column">
            <Input
              label="Input address 1"
              id="admin2"
              placeholder="Input address 1"
              borderColor="red"
              // @ts-ignore
              localForm={localForm}
              {...register("admin2", {
                required: {
                  value: true,
                  message: "value required",
                },
                validate: () => utils.isAddress(admin2) || "invalid address",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="admin2"
              render={({ message }) => <Text color="red">{message}</Text>}
            />
          </Box>
          <Box display={addAdmin ? "flex" : "none"} flexDir="column">
            <Input
              label="Input address 2"
              id="admin3"
              placeholder="Input address 2"
              borderColor="red"
              // @ts-ignore
              localForm={localForm}
              {...register("admin3", {
                // validate: () => utils.isAddress(admin3) || "invalid address",
                required: false,
                onChange: () => {
                  if (!!utils.isAddress(admin3)) {
                    setError("admin3", {
                      type: "custom",
                      message: "invalid address",
                    });
                  } else {
                    clearErrors("admin3");
                  }
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="admin3"
              render={({ message }) => <Text color="red">{message}</Text>}
            />
          </Box>

          <Box>
            <Button
              variant="ghost"
              w="full"
              color="red"
              border="1px"
              mt={10}
              onClick={handleBack}
            >
              BACK
            </Button>
          </Box>
          <Box>
            <Button
              variant="solid"
              w="full"
              color="black"
              mt={10}
              onClick={handleNext}
            >
              Save Cohort
            </Button>
          </Box>
        </SimpleGrid>
      </Box>
    </FormControl>
  );
};

export default DeployCohortPt3;
