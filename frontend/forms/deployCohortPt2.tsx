import React from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { utils } from "ethers";
import {
  Box,
  Button,
  FormControl,
  GridItem,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Tooltip,
  Text,
} from "@raidguild/design-system";
import { useFormContext } from "context/FormContext";
import FormErrorText from "components/FormErrorText";
import { useDecimalOf, useTokenSymbol } from "hooks/useERC20";
import { useBaalShares, useBaalAvatar } from "hooks/useBaal";
import { zeroAddress } from "utils/constants";

const DeployCohortPt2 = () => {
  const {
    setAssetAmount,
    setStakingAsset,
    setCohortSize,
    setOnboardingPeriod,
    setShareThreshold,
    setStakeDuration,
    setDaoTreasury,
    setMembershipCriteria,
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

  // staking token info
  let { decimals } = useDecimalOf(values.stakingAsset as `0x${string}`);

  let { tokenSymbol } = useTokenSymbol(values.stakingAsset || zeroAddress);

  // get DAO treasury (avatar)
  const { avatar } = useBaalAvatar(values.membershipCriteria as `0x${string}`);

  if (avatar) {
    setDaoTreasury(avatar);
  }

  const { sharesToken } = useBaalShares(
    values.membershipCriteria as `0x${string}`
  );

  // share token info
  let { decimals: decimalsOfShare } = useDecimalOf(
    sharesToken as `0x${string}`
  );

  let { tokenSymbol: symbolOfShare } = useTokenSymbol(sharesToken);

  const handleNext = async (): Promise<void> => {
    await trigger();

    if (isValid) {
      if (!decimals) {
        console.log("Error: decimals is undefined");
        return;
      }
      setCohortSize(values.cohortSize);
      setShareThreshold(values.shareThreshold);
      setOnboardingPeriod(values.onboardingPeriod);
      setStakeDuration(values.stakeDuration);
      setStakingAsset(values.stakingAsset);
      setAssetAmount(values.assetAmount);
      setMembershipCriteria(values.membershipCriteria);
      setDisplayPart2(false);
      setDisplayPart3(true);
    }
  };

  return (
    <FormControl onSubmit={handleSubmit(handleBack)}>
      <Box display={displayPart2 ? "inline" : "none"}>
        <SimpleGrid columns={3} spacingX={4} spacingY={3}>
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
          <Box>
            <Controller
              control={control}
              name="onboardingPeriod"
              rules={numberInputRules}
              render={({ field: { ref, ...restField } }) => (
                <NumberInput
                  label="Onboarding Period (days)"
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
                  label="Stake Duration (days)"
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
        <Tooltip
          label="Must be a valid Moloch DAO address. The Rite of Moloch contract will read from this to ascertain cohort completion"
          placement="top-start"
          hasArrow
        >
          <Box pt={"1rem"}>
            <Input
              label="Moloch DAO Address"
              placeholder="enter Moloch DAO address"
              autoComplete="off"
              localForm={localForm}
              {...register("membershipCriteria", {
                required: {
                  value: true,
                  message: "Value required",
                },
                validate: () =>
                  utils.isAddress(values.membershipCriteria) ||
                  "invalid address",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="membershipCriteria"
              render={({ message }) => <FormErrorText message={message} />}
            />
          </Box>
        </Tooltip>
        <SimpleGrid columns={2} spacingX={4} spacingY={3}>
          <Tooltip
            label="Set the minimum amount of shares required for membership"
            placement="top-start"
            hasArrow
          >
            <Box>
              <GridItem gridArea={"amount"} pt={"1rem"}>
                <Input
                  label="Minimum Shares for DAO Membership"
                  placeholder="enter membership shares requirement"
                  autoComplete="off"
                  localForm={localForm}
                  {...register("shareThreshold", {
                    required: {
                      value: true,
                      message: "Value required",
                    },
                  })}
                />
              </GridItem>
            </Box>
          </Tooltip>
          <Box>
            <GridItem gridArea="symbol" pt={"1rem"}>
              {(symbolOfShare && decimalsOfShare && (
                <>
                  <Text>{`${symbolOfShare} has ${decimalsOfShare} decimal places`}</Text>
                  <Text>---</Text>
                  <Text fontWeight={900}>{`${+utils.formatUnits(
                    values?.shareThreshold || "0",
                    decimalsOfShare
                  )} ${symbolOfShare}`}</Text>
                </>
              )) || (
                <>
                  <Text>{`${symbolOfShare} token address`}</Text>
                  <Text>---</Text>
                  <Text>Please enter valid DAO address</Text>
                </>
              )}
            </GridItem>
          </Box>
        </SimpleGrid>

        <Box pt={"1rem"}>
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
        </Box>
        <ErrorMessage
          errors={errors}
          name="stakingAsset"
          render={({ message }) => <FormErrorText message={message} />}
        />
        <SimpleGrid columns={2} spacingX={4} spacingY={3}>
          <Box>
            <GridItem gridArea={"amount"} pt={"1rem"}>
              <Input
                label="Staking Amount"
                placeholder="enter staking amount in wei"
                autoComplete="off"
                localForm={localForm}
                {...register("assetAmount", {
                  required: {
                    value: true,
                    message: "Value required",
                  },
                })}
              />
            </GridItem>
          </Box>
          <Box>
            <GridItem gridArea="symbol" pt={"1rem"}>
              {(tokenSymbol && decimals && (
                <>
                  <Text>{`${tokenSymbol} has ${decimals} decimal places`}</Text>
                  <Text>---</Text>
                  <Text fontWeight={900}>{`${+utils.formatUnits(
                    values?.assetAmount || "0",
                    decimals
                  )} ${tokenSymbol}`}</Text>
                </>
              )) || (
                <>
                  <Text>{`${tokenSymbol} token address`}</Text>
                  <Text>---</Text>
                  <Text>Please enter valid ERC20 address</Text>
                </>
              )}
            </GridItem>
          </Box>
        </SimpleGrid>
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
