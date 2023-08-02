import React, { ReactNode } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {
  Box,
  Button,
  Flex,
  FormControl,
  HStack,
  Input,
  Link,
  SimpleGrid,
  Switch,
  Text,
  Tooltip,
} from "@raidguild/design-system";
import { useFormContext } from "context/FormContext";
import { utils } from "ethers";
import { BsQuestion } from "react-icons/bs";
import { useBaalProposalOffering } from "hooks/useBaal";

interface DeployCohortFormProps {
  children?: ReactNode;
}

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
    setShamanOn,
  } = useFormContext();

  const localForm = useForm<FieldValues>();

  const {
    register,
    getValues,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = localForm;

  const values = getValues();
  const hasTophat = values.hasTophat;
  const addAdmin = values.addAdmin;
  const shamanOn = values.shamanOn;
  const membershipCriteria = values.membershipCriteria;

  console.log(values);

  const handleBack = (): void => {
    setDisplayPart2(true);
    setDisplayPart3(false);
  };

  const handleNext = async (): Promise<void> => {
    const validationsTopHat = await trigger(["topHatWearer", "tophatID"]);
    const validationsAddAdmin = await trigger(["admin1", "admin2"]);
    if (hasTophat && !addAdmin) {
      if (validationsTopHat) {
        setTopHatWearer(values.topHatWearer);
        setTophatID(values.tophatID);
        setAdmin1(values.admin1);
        setAdmin2(values.admin2);
        setDisplayPart3(false);
        setDisplayPreviewNewCohort(true);
        setShamanOn(shamanOn);
      } else console.log("validations fail");
    } else if (!hasTophat && addAdmin) {
      if (validationsAddAdmin) {
        setTopHatWearer(values.topHatWearer);
        setTophatID(values.tophatID);
        setAdmin1(values.admin1);
        setAdmin2(values.admin2);
        setDisplayPart3(false);
        setDisplayPreviewNewCohort(true);
        setShamanOn(shamanOn);
      } else {
      }
    } else if (hasTophat && addAdmin) {
      if (validationsTopHat && validationsAddAdmin) {
        setTopHatWearer(values.topHatWearer);
        setTophatID(values.tophatID);
        setAdmin1(values.admin1);
        setAdmin2(values.admin2);
        setDisplayPart3(false);
        setDisplayPreviewNewCohort(true);
        setShamanOn(shamanOn);
      } else {
      }
    } else if (!hasTophat && !addAdmin) {
      setTopHatWearer(values.topHatWearer);
      setTophatID(values.tophatID);
      setAdmin1(values.admin1);
      setAdmin2(values.admin2);
      setDisplayPart3(false);
      setDisplayPreviewNewCohort(true);
      setShamanOn(shamanOn);
    }
  };

  let { proposalOffering } = useBaalProposalOffering(
    membershipCriteria as `0x${string}`
  );

  const addAdminTooltip = (
    <Text>
      The deployer of this cohort will receive super-admin priviledges
    </Text>
  );

  const shamanTooltip = (
    <Text>
      give this ROM contract shaman manager privileges to mint minimum shares
    </Text>
  );

  return (
    <FormControl onSubmit={handleSubmit(handleNext)}>
      <Box display={displayPart3 ? "inline" : "none"}>
        <HStack justifyContent="space-between" mb={4}>
          <Flex alignItems="center">
            <Text>Does the DAO have a TOP HAT?</Text>
            <Tooltip
              label={
                <Text>
                  <Link
                    href="https://hackmd.io/@spengrah/H15lKdsmc"
                    isExternal={true}
                  >
                    Read more about Hats Protocol. Click here
                  </Link>
                </Text>
              }
              placement="bottom"
              hasArrow
              closeDelay={2000}
            >
              <Box ml="0.5rem" border="1px" rounded="full">
                <BsQuestion />
              </Box>
            </Tooltip>
          </Flex>
          <Box>
            <Switch
              // isDisabled
              label=""
              id="hasTopHat"
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
              autoComplete="off"
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
              type="number"
              autoComplete="off"
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
              <Text>Add additional administrators?</Text>
              <Tooltip label={addAdminTooltip} placement="top" hasArrow>
                <Box ml="0.5rem" border="1px" rounded="full">
                  <BsQuestion />
                </Box>
              </Tooltip>
            </Flex>
          </Box>
          <Box>
            <Switch
              // isDisabled
              my={4}
              label=""
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
              autoComplete="off"
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
              autoComplete="off"
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
        </SimpleGrid>
        {/* start shaman switch */}
        <HStack justifyContent="space-between" mb={2}>
          <Box>
            <Flex alignItems="center">
              <Text>Deploy RoM as a Shaman to DAO?</Text>
              <Tooltip label={shamanTooltip} placement="top" hasArrow>
                <Box ml="0.5rem" border="1px" rounded="full">
                  <BsQuestion />
                </Box>
              </Tooltip>
              <Text>
                {`The Baal contract has a proposal offering of ${proposalOffering}. This
      will be added to the transaction costs.`}
              </Text>
            </Flex>
          </Box>
          <Box>
            <Switch
              my={4}
              label=""
              localForm={localForm}
              {...(register("shamanOn"),
              {
                onChange: () => {
                  setValue("shamanOn", !shamanOn ? true : false);
                },
              })}
            />
          </Box>
        </HStack>
        {/* start buttons */}
        <SimpleGrid columns={2} spacingX={4} spacingY={3}>
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
