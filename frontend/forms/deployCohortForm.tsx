import React, { useState, ReactNode } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  SimpleGrid,
  VStack,
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
  tophat: boolean;
  addAdmin: boolean;
};

const DeployCohortForm: React.FC<DeployCohortFormProps> = ({ children }) => {
  const [displayPart1, setDisplayPart1] = useState(true);
  const [displayPart2, setDisplayPart2] = useState(false);
  const [displayPart3, setDisplayPart3] = useState(false);

  const localForm = useForm<FormValues>({
    defaultValues: {
      nameCohort: "",
      sbtImage: "",
      nameSBT: "",
      symbolSBT: "",
      uriSBT: "",
      // stakePerMember: 0,
      // cohortSize: 0,
      // onboardingPeriod: 0,
      // stakingPeriod: 0,
      tophat: false,
      addAdmin: false,
    },
  });

  const {
    register,
    control,
    watch,
    getValues,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isValid },
  } = localForm;

  console.log(errors);
  console.log(isValid);

  const nameCohort = watch("nameCohort");
  const nameSBT = watch("nameSBT");
  const sbtImage = watch("sbtImage");
  const symbolSBT = watch("symbolSBT");
  const uriSBT = watch("uriSBT");
  const stakePerMember = watch("stakePerMember");
  const cohortSize = watch("cohortSize");
  const onboardingPeriod = watch("onboardingPeriod");
  const stakingPeriod = watch("stakingPeriod");
  const tophat = watch("tophat");
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

  const handleNextInputs1to5 = (): void => {
    setDisplayPart1(false);
    setDisplayPart2(true);
  };

  const handleBackInputs6to9 = (): void => {
    setDisplayPart1(true);
    setDisplayPart2(false);
  };

  const handleNextInputs6to9 = (): void => {
    setDisplayPart1(false);
    setDisplayPart2(false);
    setDisplayPart3(true);
  };

  const handleBackInputs10to11 = (): void => {
    setDisplayPart1(false);
    setDisplayPart2(true);
    setDisplayPart3(false);
  };

  const handleSaveCohort = (e: any): void => {
    // if everything is valid, submit form
    console.log();
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
                  required: { value: true, message: "Value is required" },
                  minLength: {
                    value: 3,
                    message: "Minimum length is 3",
                  },
                  maxLength: {
                    value: 25,
                    message: "Maximum length is 25",
                  },
                })}
              />
            </Box>
            <Box>
              <Input
                label="Upload SBT image"
                type="image"
                id="sbtImage"
                placeholder="Upload image for SBT"
                borderColor="red"
                // @ts-ignore
                localForm={localForm}
                {...register("sbtImage", {
                  required: { value: true, message: "Value is required" },
                })}
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
                  required: { value: true, message: "Value is required" },
                  minLength: {
                    value: 2,
                    message: "Minimum length is 3",
                  },
                  maxLength: {
                    value: 15,
                    message: "Maximum length is 15",
                  },
                })}
              />
            </Box>
            <Box>
              <Input
                label="Symbol SBT"
                id="symbolSBT"
                placeholder="SBT Symbol"
                borderColor="red"
                // @ts-ignore
                localForm={localForm}
                {...register("symbolSBT", {
                  required: { value: true, message: "Value is required" },
                  minLength: {
                    value: 2,
                    message: "Minimum length is 3",
                  },
                  maxLength: {
                    value: 4,
                    message: "Maximum length is 4",
                  },
                })}
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
                  required: { value: true, message: "Value is required" },
                  minLength: {
                    value: 5,
                    message: "Minimum length is 5",
                  },
                })}
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
                placeholder="Stake per member"
                borderColor="red"
                // @ts-ignore
                localForm={localForm}
                {...register("stakePerMember", {
                  required: { value: true, message: "Value is required" },
                  min: {
                    value: 1,
                    message: "Minimum of 1 share required",
                  },
                })}
              />
            </Box>
            <Box>
              <Input
                label="Cohort Size"
                id="cohortSize"
                placeholder="Cohort Size"
                borderColor="red"
                // @ts-ignore
                localForm={localForm}
                {...register("cohortSize", {
                  required: { value: true, message: "Value is required" },
                  min: {
                    value: 1,
                    message: "Minimum of 1 share required",
                  },
                })}
              />
            </Box>
            <Box>
              <Input
                label="Symbol SBT"
                id="symbolSBT"
                placeholder="SBT Symbol"
                borderColor="red"
                // @ts-ignore
                localForm={localForm}
                {...register("symbolSBT", {
                  required: { value: true, message: "Value is required" },
                  minLength: {
                    value: 2,
                    message: "Minimum length is 3",
                  },
                  maxLength: {
                    value: 4,
                    message: "Maximum length is 4",
                  },
                })}
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
                  required: { value: true, message: "Value is required" },
                  minLength: {
                    value: 5,
                    message: "Minimum length is 5",
                  },
                })}
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
              <Input
                label="DOes the DAO have a TOP HAT?"
                id="cohortSize"
                placeholder="DOes the DAO have a TOP HAT?"
                borderColor="red"
                // @ts-ignore
                localForm={localForm}
                {...register("cohortSize", {
                  required: { value: true, message: "Value is required" },
                  min: {
                    value: 1,
                    message: "Minimum of 1 share required",
                  },
                })}
              />
            </Box>
            <Box>
              {/* replace with yes/no switch */}
              <Input
                label="Do you want to add additional administrators?"
                id="symbolSBT"
                placeholder="SBT Symbol"
                borderColor="red"
                // @ts-ignore
                localForm={localForm}
                {...register("symbolSBT", {
                  required: { value: true, message: "Value is required" },
                  minLength: {
                    value: 2,
                    message: "Minimum length is 3",
                  },
                  maxLength: {
                    value: 4,
                    message: "Maximum length is 4",
                  },
                })}
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
