import React, { FC, ReactNode } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {
  Box,
  Button,
  FormControl,
  Input,
  NumberInput,
  SimpleGrid,
  Text,
  Tooltip,
} from "@raidguild/design-system";
import { useFormContext } from "context/FormContext";
import { utils } from "ethers";

interface DeployCohortPt2Props {
  children?: ReactNode;
}

const DeployCohortPt2: FC<DeployCohortPt2Props> = ({ children }) => {
  const {
    setAssetAmount,
    setCohortSize,
    setShareThreshold,
    setOnboardingPeriod,
    setStakingAsset,
    setStakeDuration,
    setTreasury,
    displayPart2,
    setDisplayPart1,
    setDisplayPart2,
    setDisplayPart3,
  } = useFormContext();

  const localForm = useForm();

  const {
    register,
    watch,
    getValues,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = localForm;

  watch();
  const values = getValues();
  // console.log(values);

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
      setTreasury(values.treasury);
      setDisplayPart2(false);
      setDisplayPart3(true);
    }
  };

  return (
    <FormControl onSubmit={handleSubmit(handleBack)}>
      <Box display={displayPart2 ? "inline" : "none"}>
        <SimpleGrid columns={2} spacingX={4} spacingY={3}>
          <Box>
            <NumberInput
              label="Stake per member"
              id="assetAmount"
              placeholder="Stake per member"
              // @ts-ignore
              localForm={localForm}
              {...register("assetAmount", {
                validate: (val) => val > 0,
                required: {
                  value: true,
                  message: "Input cannot be blank",
                },
                min: {
                  value: 1,
                  message: "Minimum of 1 required",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="assetAmount"
              render={({ message }) => <Text color="#FF3864">{message}</Text>}
            />
          </Box>

          <Box>
            <NumberInput
              label="Cohort size"
              id="cohortSize"
              placeholder="Cohort size"
              // @ts-ignore
              localForm={localForm}
              {...register("cohortSize", {
                validate: (val) => val > 0,
                required: {
                  value: true,
                  message: "Input cannot be blank",
                },
                min: {
                  value: 1,
                  message: "Minimum of 1 required",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="cohortSize"
              render={({ message }) => <Text color="#FF3864">{message}</Text>}
            />
          </Box>
          <Tooltip
            label="Set the minimum amount of shares required for membership"
            placement="top-start"
            hasArrow
          >
            <Box>
              <NumberInput
                label="Shares per member"
                id="shareThreshold"
                placeholder="shares per member"
                // @ts-ignore
                localForm={localForm}
                {...register("shareThreshold", {
                  validate: (val) => val > 0,
                  required: {
                    value: true,
                    message: "Input cannot be blank",
                  },
                  min: {
                    value: 1,
                    message: "Minimum of 1 required",
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="shareThreshold"
                render={({ message }) => <Text color="#FF3864">{message}</Text>}
              />
            </Box>
          </Tooltip>
          <Box>
            <NumberInput
              label="Onboarding period in days"
              id="onboardindPeriod"
              placeholder="enter time in days..."
              // @ts-ignore
              localForm={localForm}
              {...register("onboardingPeriod", {
                validate: (val) => val > 0,
                required: {
                  value: true,
                  message: "Input cannot be blank",
                },
                min: {
                  value: 1,
                  message: "Minimum of 1 required",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="onboardingPeriod"
              render={({ message }) => <Text color="#FF3864">{message}</Text>}
            />
          </Box>

          <Box>
            <Input
              label="Staking asset address"
              id="stakingAsset"
              placeholder="enter token address"
              // @ts-ignore
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
              render={({ message }) => <Text color="#FF3864">{message}</Text>}
            />
          </Box>

          <Box>
            <NumberInput
              label="Staking duration"
              id="stakeDuration"
              placeholder="amount in days..."
              // @ts-ignore
              localForm={localForm}
              {...register("stakeDuration", {
                validate: (val) => val > 0,
                required: {
                  value: true,
                  message: "Input cannot be blank",
                },
                min: {
                  value: 1,
                  message: "Minimum of 1 required",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="stakeDuration"
              render={({ message }) => <Text color="#FF3864">{message}</Text>}
            />
          </Box>
        </SimpleGrid>
        <SimpleGrid my={3}>
          <Box>
            <Input
              label="Treasury address"
              id="treasury"
              placeholder="Slashed stake will be sent here..."
              // @ts-ignore
              localForm={localForm}
              {...register("treasury", {
                required: {
                  value: true,
                  message: "Value required",
                },
                validate: () =>
                  utils.isAddress(values.treasury) || "invalid address",
              })}
            />

            <ErrorMessage
              errors={errors}
              name="treasury"
              render={({ message }) => <Text color="#FF3864">{message}</Text>}
            />
          </Box>
        </SimpleGrid>
        <SimpleGrid columns={2} spacingX={4} spacingY={3} my={10}>
          <Box>
            <Button
              mt={10}
              variant="ghost"
              w="full"
              color="#FF3864"
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
