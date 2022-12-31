import React, { useState, ReactNode } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  SimpleGrid,
  Switch,
  Text,
} from "@raidguild/design-system";
import ProgressBar from "../components/ProgressBar";
import PreviewModal from "components/PreviewModal";

interface DeployCohortFormProps {
  children?: ReactNode;
}

type FormValues = {
  nameCohort: string;
  sbtImage: string;
  nameSBT: string;
  symbolSBT: string;
  uriSBT: string;
  stakePerMember: number;
  cohortSize: number;
  onboardingPeriod: number;
  stakingPeriod: number;
  hasTophat: boolean;
  addAdmin: boolean;
};

const DeployCohortForm: React.FC<DeployCohortFormProps> = ({ children }) => {
  const [displayPart1, setDisplayPart1] = useState(true);
  const [displayPart2, setDisplayPart2] = useState(false);
  const [displayPart3, setDisplayPart3] = useState(false);
  const [nextError, setNextError] = useState<string>("");

  const localForm = useForm<FormValues>({
    defaultValues: {
      nameCohort: "",
      sbtImage: "",
      nameSBT: "",
      symbolSBT: "",
      uriSBT: "",
      hasTophat: false,
      addAdmin: false,
    },
  });

  const {
    register,
    watch,
    getValues,
    trigger,
    handleSubmit,
    formState: { errors, isValid },
  } = localForm;

  console.log(errors);
  const values = getValues().hasTophat;
  console.log(values);

  const nameCohort = watch("nameCohort");
  const nameSBT = watch("nameSBT");
  const sbtImage = watch("sbtImage");
  const symbolSBT = watch("symbolSBT");
  const uriSBT = watch("uriSBT");
  const stakePerMember = watch("stakePerMember");
  const cohortSize = watch("cohortSize");
  const onboardingPeriod = watch("onboardingPeriod");
  const stakingPeriod = watch("stakingPeriod");
  const hasTophat = watch("hasTophat");
  const addAdmin = watch("addAdmin");

  const progressLogic = (): number => {
    if (displayPart1) {
      return 33;
    } else if (displayPart2) {
      return 66;
    } else {
      return 100;
    }
  };

  const handleNextInputs1to5 = async (): Promise<void> => {
    // trigger checks validations
    const validations = await trigger([
      "nameCohort",
      "sbtImage",
      "nameSBT",
      "symbolSBT",
      "uriSBT",
    ]);

    if (validations) {
      setNextError("");
      setDisplayPart1(false);
      setDisplayPart2(true);
    } else {
      setNextError("Double check inputs");
    }
  };

  const handleBackInputs6to9 = (): void => {
    setNextError("");
    setDisplayPart1(true);
    setDisplayPart2(false);
  };

  const handleNextInputs6to9 = async (): Promise<void> => {
    const validations = await trigger([
      "stakePerMember",
      "cohortSize",
      "onboardingPeriod",
      "stakingPeriod",
    ]);
    // console.log(validations);
    if (validations) {
      setDisplayPart1(false);
      setDisplayPart2(false);
      setDisplayPart3(true);
    } else {
      setNextError("Double check inputs");
    }
  };

  const handleBackInputs10to11 = (): void => {
    setNextError("");
    setDisplayPart1(false);
    setDisplayPart2(true);
    setDisplayPart3(false);
  };

  const handleSaveCohort = (e: any): void => {
    try {
      isValid;
    } catch {
      console.log("not valid");
    }
    console.log("Cohort saved");
  };

  return (
    <>
      <Box my={10}>
        <ProgressBar progress={progressLogic()} />
      </Box>

      <FormControl>
        {/* form part 1 */}
        <Box display={!displayPart1 ? "none" : "inline"}>
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
                  required: {
                    value: true,
                    message: "Value is required",
                  },
                  minLength: {
                    value: 3,
                    message: "Minimum length is 3",
                  },
                  maxLength: {
                    value: 25,
                    message: "Maximum length is 25",
                  },
                  onChange: () => trigger("nameCohort"),
                })}
              />
              <ErrorMessage
                errors={errors}
                name="nameCohort"
                render={({ message }) => <Text color="red">{message}</Text>}
              />
            </Box>
            <Box>
              <Input
                label="Upload SBT image"
                type="file"
                id="sbtImage"
                accept=".png, .jpg, .jpeg, .gif"
                placeholder="Upload image for SBT"
                borderColor="red"
                // @ts-ignore
                localForm={localForm}
                {...register("sbtImage", {
                  required: false,
                })}
              />
              <ErrorMessage
                errors={errors}
                name="sbtImage"
                render={({ message }) => <Text color="red">{message}</Text>}
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
                  required: {
                    value: true,
                    message: "Value is required",
                  },
                  minLength: {
                    value: 2,
                    message: "Minimum length is 2",
                  },
                  maxLength: {
                    value: 6,
                    message: "Maximum length is 6",
                  },
                  onChange: () => trigger("nameSBT"),
                })}
              />
              <ErrorMessage
                errors={errors}
                name="nameSBT"
                render={({ message }) => <Text color="red">{message}</Text>}
              />
            </Box>
            <Box>
              <Input
                label="SBT Symbol"
                id="symbolSBT"
                placeholder="SBT Symbol"
                borderColor="red"
                // @ts-ignore
                localForm={localForm}
                {...register("symbolSBT", {
                  required: {
                    value: true,
                    message: "Value is required",
                  },
                  minLength: {
                    value: 2,
                    message: "Minimum length is 3",
                  },
                  maxLength: {
                    value: 6,
                    message: "Maximum length is 6",
                  },
                  onChange: () => trigger("symbolSBT"),
                })}
              />
              <ErrorMessage
                errors={errors}
                name="symbolSBT"
                render={({ message }) => <Text color="red">{message}</Text>}
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
                  required: {
                    value: true,
                    message: "Value is required",
                  },
                  minLength: {
                    value: 5,
                    message: "Minimum length is 5",
                  },
                  onChange: () => trigger("uriSBT"),
                })}
              />
              <ErrorMessage
                errors={errors}
                name="uriSBT"
                render={({ message }) => <Text color="red">{message}</Text>}
              />
            </Box>
            <Box alignSelf="end">
              <PreviewModal sbtImageURL={sbtImage} sbtName={nameSBT} />
            </Box>
            <Box />
            <Box textAlign="right">
              <Button
                variant="solid"
                w="full"
                color="black"
                mt={10}
                onClick={handleNextInputs1to5}
              >
                NEXT
              </Button>
            </Box>
          </SimpleGrid>
        </Box>
        {/* form part 2 */}
        <Box display={!displayPart2 ? "none" : "inline"}>
          <SimpleGrid columns={2} spacingX={4} spacingY={3}>
            <Box>
              <Input
                label="Stake per member"
                id="stakePerMember"
                placeholder="enter minimum stake..."
                borderColor="red"
                type="number"
                // @ts-ignore
                localForm={localForm}
                {...register("stakePerMember", {
                  required: {
                    value: true,
                    message: "Input cannot be blank",
                  },
                  min: {
                    value: 1,
                    message: "Minimum of 1 required",
                  },
                  validate: (val) => val > 0,
                })}
              />
              <ErrorMessage
                errors={errors}
                name="stakePerMember"
                render={({ message }) => <Text color="red">{message}</Text>}
              />
            </Box>
            <Box>
              <Input
                label="Cohort size"
                id="cohortSize"
                placeholder="enter cohort size..."
                borderColor="red"
                type="number"
                // @ts-ignore
                localForm={localForm}
                {...register("cohortSize", {
                  required: {
                    value: true,
                    message: "Input cannot be blank",
                  },
                  min: {
                    value: 1,
                    message: "Minimum of 1 required",
                  },
                  validate: (val) => val > 0,
                })}
              />
              <ErrorMessage
                errors={errors}
                name="cohortSize"
                render={({ message }) => <Text color="red">{message}</Text>}
              />
            </Box>
            <Box>
              <Input
                label="Onboarding period in days"
                id="onboardindPeriod"
                placeholder="enter time in days..."
                borderColor="red"
                type="number"
                // @ts-ignore
                localForm={localForm}
                {...register("onboardingPeriod", {
                  required: {
                    value: true,
                    message: "Input cannot be blank",
                  },
                  min: {
                    value: 1,
                    message: "Minimum of 1 required",
                  },
                  validate: (val) => val > 0,
                })}
              />
              <ErrorMessage
                errors={errors}
                name="onboardingPeriod"
                render={({ message }) => <Text color="red">{message}</Text>}
              />
            </Box>
            <Box>
              <Input
                label="Staking period in days"
                id="stakingPeriod"
                placeholder="enter duration in days..."
                borderColor="red"
                type="number"
                // @ts-ignore
                localForm={localForm}
                {...register("stakingPeriod", {
                  required: {
                    value: true,
                    message: "Input cannot be blank",
                  },
                  min: {
                    value: 1,
                    message: "Minimum of 1 required",
                  },
                  validate: (val) => val > 0,
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
            <Box>
              <Button
                variant="ghost"
                w="full"
                color="red"
                border="1px"
                mt={10}
                onClick={handleBackInputs6to9}
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
                onClick={handleNextInputs6to9}
              >
                NEXT
              </Button>
            </Box>
          </SimpleGrid>
        </Box>
        {/* form part 3 */}
        <Box display={displayPart3 ? "inline" : "none"}>
          <SimpleGrid columns={1} spacingX={4} spacingY={3}>
            <Box>
              {/* replace with yes/no switch */}
              <Switch
                label="Does the DAO have a TOP HAT?"
                // @ts-ignore
                localForm={localForm}
                {...register("hasTophat", {
                  onChange: () => watch("hasTophat"),
                })}
              />
            </Box>
            <Box>
              {/* replace with yes/no switch */}
              <Switch
                label="Want to add additional administrators?"
                // @ts-ignore
                localForm={localForm}
              />
            </Box>

            <Box />
            <Box />
            <HStack>
              <Box w="50%">
                <Button
                  variant="ghost"
                  w="full"
                  color="red"
                  border="1px"
                  mt={10}
                  onClick={handleBackInputs10to11}
                >
                  BACK
                </Button>
              </Box>
              <Box w="50%">
                <Button
                  variant="solid"
                  w="full"
                  color="black"
                  mt={10}
                  onClick={handleSaveCohort}
                >
                  Save Cohort
                </Button>
              </Box>
            </HStack>
          </SimpleGrid>
        </Box>
      </FormControl>
    </>
  );
};

export default DeployCohortForm;
