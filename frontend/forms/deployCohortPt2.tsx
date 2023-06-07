import React from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { BigNumberish, BigNumber, utils } from "ethers";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Switch,
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
  const [weiToggle, setWeiToggle] = React.useState(true);

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

  watch();
  const values = getValues();

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

  const handleNext = async (): Promise<void> => {
    await trigger();
    if (isValid) {
      setAssetAmount(values.assetAmount);
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

  let decimalOf = useDecimalOf((values?.stakingAsset as `0x${string}`) || "0x");
  if (!decimalOf) {
    decimalOf = "0";
  }

  let symbol = useSymbol((values?.stakingAsset as `0x${string}`) || "0x");
  if (!symbol) {
    symbol = "symbol";
  }

  const handleWeiToggle = () => {
    setStakingAsset(values.stakingAsset);
    setWeiToggle(!weiToggle);
  };

  const parseInputToWei = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value;
    if (amount === "") {
      return e;
    }
    if (weiToggle) {
      return e;
    }

    if (!weiToggle) {
      const amountInWei = utils.formatUnits(values?.assetAmount.toString(), BigNumber.from(decimalOf));
      console.log(amountInWei)
      return (e.target.value = amountInWei.toString());
    }
  };

  const parseValueToDisplay = (v: string) => {
    if (weiToggle) {
      return v;
    }
    return utils.formatUnits(v || "0", "ether");
  } 

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
              render={({ field: { onChange, ref, value, ...restField } }) => (
                <NumberInput
                  label="Onboarding Period (in days)"
                  variant="none"
                  placeholder="time in days..."
                  localForm={localForm}
                  step={1}
                  min={0}
                  max={Infinity}
                  onChange={(e) => onChange(parseInputToWei)}
                  value={parseValueToDisplay(value)}
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
        <Flex direction={"column"} gap={2}>
          <Box>
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
            <ErrorMessage
              errors={errors}
              name="stakingAsset"
              render={({ message }) => <FormErrorText message={message} />}
            />
          </Box>
          <SimpleGrid columns={2} spacing={2}>
          <Controller
            control={control}
            name="assetAmount"
            rules={numberInputRules}
            render={({ field: { ref, ...restField } }) => (
              <NumberInput
                maxWidth={"50%"}
                label={`Required Stake (in ${weiToggle ? "wei" : symbol})`}
                variant="none"
                placeholder="Required stake"
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
          <Center margin={"auto"}>
            <FormControl
              display="flex"
              alignItems="center"
              justifyContent={"center"}
            >
              <Switch
                id="toggle-wei"
                localForm={localForm}
                label={"Wei or human readable?"}
                onChange={handleWeiToggle}
                defaultChecked={weiToggle}
              />
            </FormControl>
          </Center>
        </SimpleGrid>
          <Box>
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
        </Flex>
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
