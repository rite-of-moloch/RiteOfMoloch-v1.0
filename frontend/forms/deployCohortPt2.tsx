import React, { Dispatch, FC, ReactNode } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {
  Box,
  Button,
  FormControl,
  Input,
  SimpleGrid,
  Text,
  Tooltip,
} from "@raidguild/design-system";
import { useFormContext } from "context/FormContext";

interface DeployCohortPt2Props {
  children?: ReactNode;
}

const DeployCohortPt2: FC<DeployCohortPt2Props> = ({ children }) => {
  const {
    setStakePerMember,
    // setCohortSize,
    setShareThreshold,
    // setOnboardingPeriod,
    setStakingPeriod,
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
    console.log("onboardindPeriod", values.onboardingPeriod);
    if (isValid) {
      setStakePerMember(values.stakePerMember);
      // setCohortSize(values.cohortSize);
      setShareThreshold(values.shareThreshold);
      // setOnboardingPeriod(values.onboardingPeriod);
      setStakingPeriod(values.stakingPeriod);
      setDisplayPart2(false);
      setDisplayPart3(true);
    }
  };

  return (
    <FormControl onSubmit={handleSubmit(handleBack)}>
      <Box display={displayPart2 ? "inline" : "none"}>
        <SimpleGrid columns={2} spacingX={4} spacingY={3}>
          <Tooltip
            label="Set the minimum stake required of your selected asset for new members to join your cohort"
            placement="top-start"
            hasArrow
          >
            <Box>
              <Input
                label="Minimum stake required"
                id="stakePerMember"
                placeholder="enter minimum stake..."
                borderColor="red"
                type="number"
                // @ts-ignore
                localForm={localForm}
                {...register("stakePerMember", {
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
                name="stakePerMember"
                render={({ message }) => <Text color="red">{message}</Text>}
              />
            </Box>
          </Tooltip>
          <Tooltip
            label="Set the minimum amount of shares required for membership"
            placement="top-start"
            hasArrow
          >
            <Box>
              <Input
                label="Share threshold"
                id="shareThreshold"
                placeholder="minimum shares for membership"
                borderColor="red"
                type="number"
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
                render={({ message }) => <Text color="red">{message}</Text>}
              />
            </Box>
          </Tooltip>
          {/* <Box>
            <Input
              label="Onboarding period in days"
              id="onboardindPeriod"
              placeholder="enter time in days..."
              borderColor="red"
              type="number"
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
              render={({ message }) => <Text color="red">{message}</Text>}
            />
          </Box> */}
          <Box>
            <Input
              label="Staking period in days"
              id="stakingPeriod"
              placeholder="amount in days..."
              borderColor="red"
              type="number"
              // @ts-ignore
              localForm={localForm}
              {...register("stakingPeriod", {
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
              name="stakingPeriod"
              render={({ message }) => <Text color="red">{message}</Text>}
            />
          </Box>
          <Box />
          <Box />
          <Box />
          <Box mt={10}>
            <Button
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
