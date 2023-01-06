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
  tophatOwnerAddress: string;
  tophatID: string;
  addAdmin: boolean;
  admin2: string;
  admin3: string;
  superadmin2: boolean;
  superadmin3: boolean;
};

const DeployCohortPt3: React.FC<DeployCohortFormProps> = ({ children }) => {
  const {
    setTophatOwnerAddress,
    setTophatID,
    setAdmin2,
    setAdmin3,
    superadmin2,
    superadmin3,
    setSuperadmin2,
    setSuperadmin3,
    displayPart3,
    setDisplayPart2,
    setDisplayPart3,
    setDisplayPreviewNewCohort,
  } = useFormContext();

  const localForm = useForm<FormValues>({
    defaultValues: {
      hasTophat: false,
      tophatOwnerAddress: "",
      tophatID: "",
      addAdmin: false,
      admin2: "",
      admin3: "",
      superadmin2: false,
      superadmin3: false,
    },
  });

  const {
    register,
    getValues,
    setValue,
    setError,
    clearErrors,
    trigger,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = localForm;

  const values = getValues();
  const hasTophat = values.hasTophat;
  const addAdmin = values.addAdmin;

  watch();

  // console.log(watch());

  const handleBack = (): void => {
    setDisplayPart2(true);
    setDisplayPart3(false);
  };

  const handleNext = async (): Promise<void> => {
    console.log(hasTophat);
    const validationsTopHat = await trigger(["tophatOwnerAddress", "tophatID"]);
    const validationsAddAdmin = await trigger(["admin2", "admin3"]);

    if (hasTophat && !addAdmin) {
      console.log("has top hat, doesn't want to add admin");
      if (validationsTopHat) {
        console.log("validations pass");
        // handle all values in case user toggles switches off
        setTophatOwnerAddress(values.tophatOwnerAddress);
        setTophatID(values.tophatID);
        setAdmin2(values.admin2);
        setAdmin3(values.admin3);
        setSuperadmin2(false);
        setSuperadmin3(false);
        setDisplayPart3(false);
        setDisplayPreviewNewCohort(true);
      } else console.log("validations fail");
    } else if (!hasTophat && addAdmin) {
      console.log("doesn't have tophat, wants to add admin");
      if (validationsAddAdmin) {
        console.log("validations pass");
        setTophatOwnerAddress(values.tophatOwnerAddress);
        setTophatID(values.tophatID);
        setAdmin2(values.admin2);
        setAdmin3(values.admin3);
        // setSuperadmin2(values.superadmin2);
        // setSuperadmin3(values.superadmin3);
        // TO-DO: if user changes mind about adding additional admins, superadmin switch btn's might still be active. Handle this better
        {
          values.admin2 !== "" && values.superadmin2
            ? setSuperadmin2(true)
            : setSuperadmin2(false);
        }
        {
          values.admin3 !== "" && values.superadmin3
            ? setSuperadmin3(true)
            : setSuperadmin3(false);
        }
        setDisplayPart3(false);
        setDisplayPreviewNewCohort(true);
      } else console.log("validations fail");
    } else if (hasTophat && addAdmin) {
      console.log("Has tophat and wants to add admin");
      if (validationsTopHat && validationsAddAdmin) {
        console.log("validations pass");
        setTophatOwnerAddress(values.tophatOwnerAddress);
        setTophatID(values.tophatID);
        setAdmin2(values.admin2);
        setAdmin3(values.admin3);
        // TO-DO: if user changes mind about adding additional admins, superadmin switch btn's might still be active. Handle this better
        {
          values.admin2 !== "" && superadmin2
            ? setSuperadmin2(true)
            : setSuperadmin2(false);
        }
        {
          values.admin3 !== "" && superadmin3
            ? setSuperadmin3(true)
            : setSuperadmin3(false);
        }
        setDisplayPart3(false);
        setDisplayPreviewNewCohort(true);
      } else console.log("validations fail");
    } else if (!hasTophat && !addAdmin) {
      console.log("doesn't have top hat and doens't want more admins");
      // handle all values in case user toggles switches off
      setTophatOwnerAddress(values.tophatOwnerAddress);
      setTophatID(values.tophatID);
      setAdmin2(values.admin2);
      setAdmin3(values.admin3);
      setSuperadmin2(false);
      setSuperadmin3(false);
      setDisplayPart3(false);
      setDisplayPreviewNewCohort(true);
    }
  };

  const tooltipText = (
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

  return (
    <FormControl onSubmit={handleSubmit(handleNext)}>
      <Box display={displayPart3 ? "inline" : "none"}>
        <HStack justifyContent="space-between" mb={4}>
          <Flex alignItems="center">
            <Text>Does the DAO have a TOP HAT?</Text>
            <Tooltip label={tooltipText} placement="top" hasArrow>
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
                    setValue("tophatOwnerAddress", "");
                    setValue("tophatID", "");
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
              id="tophatOwnerAddress"
              placeholder="Controller address..."
              borderColor="red"
              // @ts-ignore
              localForm={localForm}
              {...register("tophatOwnerAddress", {
                validate: () =>
                  utils.isAddress(values.tophatOwnerAddress) ||
                  "invalid address",
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
                  setValue("addAdmin", !addAdmin ? true : false);
                  if (!!values.addAdmin) {
                    setValue("admin2", "");
                    setValue("admin3", "");
                    // setValue("superadmin2", false);
                    // setValue("superadmin3", false);
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
                validate: () =>
                  utils.isAddress(values.admin2) || "invalid address",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="admin2"
              render={({ message }) => <Text color="red">{message}</Text>}
            />
            {/* superadmin2 switch */}
            <HStack justifyContent="space-between" mb={4}>
              <Box>
                <Text fontSize="xs">Make address super-admin?</Text>
              </Box>
              <Box>
                <Switch
                  size="sm"
                  my={4}
                  id="superadmin2"
                  label=""
                  // @ts-ignore
                  localForm={localForm}
                  {...(register("superadmin2"),
                  {
                    onChange: () => {
                      setValue(
                        "superadmin2",
                        !values.superadmin2 ? true : false
                      );
                    },
                  })}
                />
              </Box>
            </HStack>
          </Box>
          {/* start address 2 */}
          <Box display={addAdmin ? "flex" : "none"} flexDir="column">
            <Input
              label="Input address 2"
              id="admin3"
              placeholder="Input address 2"
              borderColor="red"
              // @ts-ignore
              localForm={localForm}
              {...register("admin3", {
                required: false,
                onChange: () => {
                  if (!!utils.isAddress(values.admin3)) {
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
            {/* superadmin3 switch */}
            <HStack justifyContent="space-between" mb={4}>
              <Box>
                <Text fontSize="xs">Make address super-admin?</Text>
              </Box>
              <Box>
                <Switch
                  size="sm"
                  my={4}
                  id="superadmin3"
                  label=""
                  // @ts-ignore
                  localForm={localForm}
                  {...(register("superadmin3"),
                  {
                    onChange: () =>
                      setValue(
                        "superadmin3",
                        !values.superadmin3 ? true : false
                      ),
                  })}
                />
              </Box>
            </HStack>
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
