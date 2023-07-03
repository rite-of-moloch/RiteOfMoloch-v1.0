import React, { FC, ReactNode } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {
  Box,
  Button,
  FormControl,
  Input,
  SimpleGrid,
} from "@raidguild/design-system";
import { useFormContext } from "context/FormContext";
import PreviewModal from "components/PreviewModal";
import FormErrorText from "components/FormErrorText";

interface deployCohortPt1Props {
  children?: ReactNode;
}

const DeployCohortPt1: FC<deployCohortPt1Props> = () => {
  const {
    setNameCohort,
    setNameSBT,
    setSymbolSBT,
    setUriSBT,
    displayPart1,
    setDisplayPart1,
    setDisplayPart2,
  } = useFormContext();

  const localForm = useForm<FieldValues>();

  const {
    register,
    getValues,
    setValue,
    trigger,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = localForm;

  const values = getValues();
  watch();

  const handleNext = async (): Promise<void> => {
    await trigger();
    if (isValid) {
      setNameCohort(values.nameCohort);
      setNameSBT(values.nameSBT);
      setSymbolSBT(values.symbolSBT);
      setUriSBT(values.uriSBT);
      setDisplayPart1(false);
      setDisplayPart2(true);
    }
  };

  return (
    <FormControl onSubmit={handleSubmit(handleNext)}>
      <Box display={displayPart1 ? "inline" : "none"}>
        <SimpleGrid columns={2} spacingX={4} spacingY={3}>
          <Box>
            <Input
              label="Name Cohort"
              id="nameCohort"
              placeholder="Name cohort"
              autoComplete="off"
              localForm={localForm}
              {...register("nameCohort", {
                required: {
                  value: true,
                  message: "Value required",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="nameCohort"
              render={({ message }) => <FormErrorText message={message} />}
            />
          </Box>
          <Box>
            <Input
              label="Name SBT"
              id="nameSBT"
              placeholder="Name SBT"
              autoComplete="off"
              localForm={localForm}
              {...register("nameSBT", {
                required: {
                  value: true,
                  message: "Value required",
                },
                onChange(e) {
                  setValue("nameSBT", e.target.value.toUpperCase());
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="nameSBT"
              render={({ message }) => <FormErrorText message={message} />}
            />
          </Box>
          <Box>
            <Input
              label="SBT Symbol"
              id="symbolSBT"
              placeholder="SBT Symbol"
              autoComplete="off"
              localForm={localForm}
              {...register("symbolSBT", {
                required: {
                  value: true,
                  message: "Value required",
                },
                onChange(e) {
                  setValue("symbolSBT", e.target.value.toUpperCase());
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="symbolSBT"
              render={({ message }) => <FormErrorText message={message} />}
            />
          </Box>
          <Box>
            <Input
              label="URL SBT"
              id="uriSBT"
              placeholder="enter SBT URI"
              autoComplete="off"
              localForm={localForm}
              {...register("uriSBT", {
                required: {
                  value: true,
                  message: "Value required",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="uriSBT"
              render={({ message }) => <FormErrorText message={message} />}
            />
          </Box>

          {/* <Box mt={10}> */}
          <Box mt={4}>
            <PreviewModal
              sbtImageURL={values.uriSBT}
              sbtName={values.nameSBT}
            />
          </Box>
          {/* <Box textAlign="right"> */}
          <Box mt={4}>
            <Button
              variant="solid"
              w="full"
              color="black"
              // mt={6}
              // mb={10}
              onClick={handleNext}
            >
              NEXT
            </Button>
          </Box>
        </SimpleGrid>
      </Box>
    </FormControl>
  );
};

export default DeployCohortPt1;
