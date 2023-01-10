import React, { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {
  Box,
  Button,
  Flex,
  FormControl,
  HStack,
  Heading,
  Input,
  SimpleGrid,
  Switch,
  Text,
  Tooltip,
} from "@raidguild/design-system";
import { useFormContext } from "context/FormContext";
import { utils } from "ethers";
import { BsQuestion } from "react-icons/bs";

interface DeployCohortFormProps {
  children?: ReactNode;
}

type FormValues = {
  hasTophat: boolean;
  topHatWearer: string;
  tophatID: number | null;
  addAdmin: boolean;
  admin1: string;
  admin2: string;
};

const DeployCohortPt3: React.FC<DeployCohortFormProps> = ({ children }) => {
  const {
    setTopHatWearer,
    setTophatID,
    setAdmin1,
    setAdmin2,
    displayPart3,
    setDisplayPart2,
    setDisplayPart3,
    setDisplayPreviewNewCohort,
  } = useFormContext();

  const localForm = useForm<FormValues>({
    defaultValues: {
      hasTophat: false,
      topHatWearer: "",
      addAdmin: false,
      admin1: "",
      admin2: "",
    },
  });

  const {
    register,
    getValues,
    setValue,
    trigger,
    handleSubmit,
    watch,
    formState: { errors },
  } = localForm;

  const values = getValues();
  const hasTophat = values.hasTophat;
  const addAdmin = values.addAdmin;

  watch();

  const handleBack = (): void => {
    setDisplayPart2(true);
    setDisplayPart3(false);
  };

  const handleNext = async (): Promise<void> => {
    const validationsTopHat = await trigger(["topHatWearer", "tophatID"]);
    const validationsAddAdmin = await trigger(["admin1", "admin2"]);
    if (hasTophat && !addAdmin) {
      // console.log("has top hat, doesn't want to add admin");
      if (validationsTopHat) {
        // console.log("validations pass");
        setTopHatWearer(values.topHatWearer);
        setTophatID(values.tophatID);
        setAdmin1(values.admin1);
        setAdmin2(values.admin2);
        setDisplayPart3(false);
        setDisplayPreviewNewCohort(true);
      } else console.log("validations fail");
    } else if (!hasTophat && addAdmin) {
      console.log("doesn't have tophat, wants to add admin");
      if (validationsAddAdmin) {
        // console.log("validations pass");
        setTopHatWearer(values.topHatWearer);
        setTophatID(values.tophatID);
        setAdmin1(values.admin1);
        setAdmin2(values.admin2);
        setDisplayPart3(false);
        setDisplayPreviewNewCohort(true);
      } else console.log("validations fail");
    } else if (hasTophat && addAdmin) {
      console.log("Has tophat and wants to add admin");
      if (validationsTopHat && validationsAddAdmin) {
        // console.log("validations pass");
        setTopHatWearer(values.topHatWearer);
        setTophatID(values.tophatID);
        setAdmin1(values.admin1);
        setAdmin2(values.admin2);
        setDisplayPart3(false);
        setDisplayPreviewNewCohort(true);
      } else console.log("validations fail");
    } else if (!hasTophat && !addAdmin) {
      setTopHatWearer(values.topHatWearer);
      setTophatID(values.tophatID);
      setAdmin1(values.admin1);
      setAdmin2(values.admin2);
      setDisplayPart3(false);
      setDisplayPreviewNewCohort(true);
    }
  };

  const tophatExplanation = (
    <>
      <Heading as="h3" fontSize="lg">
        What is a TOP HAT?
      </Heading>
      <Text>
        Lorem ipsum dolor sit amet consectetur. Proin scelerisque ultrices
        magnis netus tincidunt pellentesque diam senectus. Lorem ipsum dolor sit
        amet consectetur. Proin scelerisque ultrices magnis netus tincidunt
        pellentesque diam senectus.
      </Text>
    </>
  );

  const addAdminExplanation = (
    <Text>
      The deployer of this cohort will receive super-admin priviledges
    </Text>
  );

  return (
    <FormControl onSubmit={handleSubmit(handleNext)}>
      <Box display={displayPart3 ? "inline" : "none"}>
        <HStack justifyContent="space-between" mb={4}>
          <Flex alignItems="center">
            <Text>Does the DAO have a TOP HAT?</Text>
            <Tooltip label={tophatExplanation} placement="top" hasArrow>
              <Box ml="0.5rem" border="1px" rounded="full" borderColor="red">
                <BsQuestion />
              </Box>
            </Tooltip>
          </Flex>
          <Box>
            <Switch
              label=""
              id="hasTopHat"
              // @ts-ignore
              localForm={localForm}
              {...register("hasTophat", {
                onChange: () => {
                  setValue("hasTophat", !hasTophat ? true : false);
                  if (!!values.hasTophat) {
                    setValue("topHatWearer", "");
                    setValue("tophatID", null);
                  }
                },
              })}
            />
          </Box>
        </HStack>
        <SimpleGrid columns={2} spacingX={4} spacingY={3}>
          <Box display={hasTophat ? "flex" : "none"} flexDir="column">
            <Input
              label="TOP HAT owner address"
              id="topHatWearer"
              placeholder="Input address of TOP HAT owner"
              borderColor="red"
              // @ts-ignore
              localForm={localForm}
              {...register("topHatWearer", {
                validate: () =>
                  utils.isAddress(values.topHatWearer) || "invalid address",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="topHatWearer"
              render={({ message }) => <Text color="red">{message}</Text>}
            />
          </Box>
          <Box display={hasTophat ? "flex" : "none"} flexDir="column">
            <Input
              label="TOP HAT ID"
              id="tophatID"
              placeholder="TOP HAT ID"
              borderColor="red"
              type="number"
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
            <Flex alignItems="center">
              <Text>Want to add additional administrators?</Text>
              <Tooltip label={addAdminExplanation} placement="top" hasArrow>
                <Box ml="0.5rem" border="1px" rounded="full" borderColor="red">
                  <BsQuestion />
                </Box>
              </Tooltip>
            </Flex>
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
                  setValue("addAdmin", !addAdmin ? true : false);
                  if (!!values.addAdmin) {
                    setValue("admin1", "");
                    setValue("admin2", "");
                  }
                },
              })}
            />
          </Box>
        </HStack>
        <SimpleGrid columns={2} spacingX={4} spacingY={3}>
          <Box display={addAdmin ? "flex" : "none"} flexDir="column">
            <Input
              label="Input address 1"
              id="admin1"
              placeholder="Input address 1"
              borderColor="red"
              // @ts-ignore
              localForm={localForm}
              {...register("admin1", {
                required: {
                  value: true,
                  message: "value required",
                },
                validate: () =>
                  utils.isAddress(values.admin1) || "invalid address",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="admin1"
              render={({ message }) => <Text color="red">{message}</Text>}
            />
          </Box>

          <Box display={addAdmin ? "flex" : "none"} flexDir="column">
            <Input
              label="Input address 2"
              id="admin2"
              placeholder="Input address 2"
              borderColor="red"
              // @ts-ignore
              localForm={localForm}
              {...register("admin2", {
                required: false,
                validate: () => {
                  if (values.admin2.length > 0) {
                    if (!utils.isAddress(values.admin2)) {
                      return "Invalid address";
                    }
                  }
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="admin2"
              render={({ message }) => <Text color="red">{message}</Text>}
            />
          </Box>
          {/* start buttons */}
          <Box>
            <Button
              variant="ghost"
              w="full"
              color="red"
              border="1px"
              mt={10}
              rounded="sm"
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
              Preview Cohort
            </Button>
          </Box>
        </SimpleGrid>
      </Box>
    </FormControl>
  );
};

export default DeployCohortPt3;
