import React from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { utils, ethers } from "ethers";
import {
  Box,
  Button,
  FormControl,
  Grid,
  GridItem,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Tooltip,
} from "@raidguild/design-system";
import { useFormContext } from "context/FormContext";
import FormErrorText from "components/FormErrorText";
import { useDecimalOf, useSymbol } from "hooks/useERC20";

const DeployCohortPt2 = () => {
  const {
    setAssetAmount,
    setCohortSize,
    setShareThreshold,
    setOnboardingPeriod,
    setStakingAsset,
    setStakeDuration,
    setDaoTreasury,
    displayPart2,
    setDisplayPart1,
    setDisplayPart2,
    setDisplayPart3,
  } = useFormContext();

  const localForm = useForm<FieldValues>();

  const {
    control,
    register,
    watch,
    getValues,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = localForm;

  console.log(watch());
  const values = getValues();

  console.log(values);

  const numberInputRules = {
    validate: (val: number) => val > 0,
    required: {
      value: true,
      message: "Input cannot be blank",
    },
    min: {
      value: 0.01,
      message: "Value must be greater than 0",
    },
  };

  const handleBack = (): void => {
    setDisplayPart1(true);
    setDisplayPart2(false);
  };

  let decimalOf = useDecimalOf(values.stakingAsset as `0x${string}`);
  let symbol = useSymbol((values.stakingAsset as `0x${string}`) || "0x0");

  const handleNext = async (): Promise<void> => {
    await trigger();

    if (isValid) {
      if (!decimalOf) {
        console.log("Error: decimalOf is undefined");
        return;
      }
      setAssetAmount(
        ethers.utils.parseUnits(values.assetAmount, decimalOf).toString()
      );
      setCohortSize(values.cohortSize);
      setShareThreshold(values.shareThreshold);
      setOnboardingPeriod(values.onboardingPeriod);
      setStakeDuration(values.stakeDuration);
      setStakingAsset(values.stakingAsset);
      setDaoTreasury(values.daoTreasury);
      setDisplayPart2(false);
      setDisplayPart3(true);
    }
  };

  return (
    <FormControl onSubmit={handleSubmit(handleBack)}>
      <Box display={displayPart2 ? "inline" : "none"}>
        <SimpleGrid columns={2} spacingX={4} spacingY={3}>
          <Box>
            <Controller
              control={control}
              name="cohortSize"
              rules={numberInputRules}
              render={({ field: { ref, ...restField } }) => (
                <NumberInput
                  label="Maximum Cohort Size"
                  placeholder="cohort size..."
                  localForm={localForm}
                  step={1}
                  variant="none"
                  min={0}
                  max={Infinity}
                  {...restField}
                >
                  <NumberInputField ref={ref} name={restField.name} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              )}
            />
          </Box>
          <Tooltip
            label="Set the minimum amount of shares required for membership"
            placement="top-start"
            hasArrow
          >
            <Box>
              <Controller
                control={control}
                name="shareThreshold"
                rules={numberInputRules}
                render={({ field: { ref, ...restField } }) => (
                  <NumberInput
                    label="Minimum Shares for DAO Membership"
                    variant="none"
                    placeholder="shares required for membership..."
                    localForm={localForm}
                    step={1}
                    min={0}
                    max={Infinity}
                    {...restField}
                  >
                    <NumberInputField ref={ref} name={restField.name} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                )}
              />
            </Box>
          </Tooltip>
          <Box>
            <Controller
              control={control}
              name="onboardingPeriod"
              rules={numberInputRules}
              render={({ field: { ref, ...restField } }) => (
                <NumberInput
                  label="Onboarding Period (in days)"
                  variant="none"
                  placeholder="time in days..."
                  localForm={localForm}
                  step={1}
                  min={0}
                  max={Infinity}
                  {...restField}
                >
                  <NumberInputField ref={ref} name={restField.name} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              )}
            />
          </Box>

          <Box>
            <Controller
              control={control}
              name="stakeDuration"
              rules={numberInputRules}
              render={({ field: { ref, ...restField } }) => (
                <NumberInput
                  label="Stake Duration (in days)"
                  variant="none"
                  placeholder="amount in days..."
                  localForm={localForm}
                  step={1}
                  min={0}
                  max={1000}
                  {...restField}
                >
                  <NumberInputField ref={ref} name={restField.name} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              )}
            />
          </Box>
        </SimpleGrid>
        <Grid
          width={"100%"}
          gap={4}
          templateAreas={`"address address error"
                          "amount symbol empty"
                  `}
        >
          <GridItem gridArea={"address"} pt={"1rem"}>
            <Input
              label="Staking Asset Address"
              placeholder="enter token address"
              autoComplete="off"
              localForm={localForm}
              {...register("stakingAsset", {
                required: {
                  value: true,
                  message: "Value required",
                },
                validate: () =>
                  utils.isAddress(values.stakingAsset) || "invalid address",
              })}
            />
          </GridItem>

          <GridItem gridArea="error">
            <ErrorMessage
              errors={errors}
              name="stakingAsset"
              render={({ message }) => <FormErrorText message={message} />}
            />
          </GridItem>

          <GridItem gridArea="amount">
            <Controller
              name={`assetAmount`}
              control={control}
              render={({ field: { ref, value, onChange, ...restField } }) => (
                <NumberInput
                  maxWidth={"50%"}
                  localForm={localForm}
                  step={0.05}
                  min={0}
                  max={Infinity}
                  variant={"none"}
                  placeholder="Required stake"
                  onChange={(e) => {
                    console.log("LOGGING E: ", e);
                    onChange(e);
                  }}
                  value={value}
                  {...restField}
                >
                  <NumberInputField
                    ref={ref}
                    name={restField.name}
                    borderRightRadius={0}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              )}
            />
          </GridItem>
          <GridItem gridArea="symbol">
            <Heading>{symbol}</Heading>
          </GridItem>
        </Grid>

        <Box pt={"1rem"}>
          <Input
            label="DAO treasury address"
            placeholder="Slashed stake will be sent here..."
            autoComplete="off"
            localForm={localForm}
            {...register("daoTreasury", {
              required: {
                value: true,
                message: "Value required",
              },
              validate: () =>
                utils.isAddress(values.daoTreasury) || "invalid address",
            })}
          />

          <ErrorMessage
            errors={errors}
            name="daoTreasury"
            render={({ message }) => <FormErrorText message={message} />}
          />
        </Box>
        <SimpleGrid columns={2} spacingX={4} spacingY={3} my={10}>
          <Box>
            <Button
              mt={10}
              variant="ghost"
              w="full"
              color="red"
              border="1px"
              rounded="sm"
              onClick={handleBack}
            >
              BACK
            </Button>
          </Box>
          <Box mt={10}>
            <Button variant="solid" w="full" color="black" onClick={handleNext}>
              NEXT
            </Button>
          </Box>
        </SimpleGrid>
      </Box>
    </FormControl>
  );
};

export default DeployCohortPt2;
