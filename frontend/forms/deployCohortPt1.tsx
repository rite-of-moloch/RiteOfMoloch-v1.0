import React, { FC, ReactNode, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
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
import PreviewModal from "components/PreviewModal";
import { utils } from "ethers";

interface deployCohortPt1Props {
  children?: ReactNode;
}

const DeployCohortPt1: FC<deployCohortPt1Props> = ({ children }) => {
  const {
    setNameCohort,
    setSbtImage,
    setNameSBT,
    setSymbolSBT,
    setUriSBT,
    setTreasuryAddress,
    displayPart1,
    setDisplayPart1,
    setDisplayPart2,
  } = useFormContext();

  const localForm = useForm({
    defaultValues: {
      nameCohort: "",
      sbtImage: "",
      nameSBT: "",
      symbolSBT: "",
      uriSBT: "",
      treasuryAddress: "",
    },
  });

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
  // console.log(watch());

  const handleNext = async (): Promise<void> => {
    await trigger();
    console.log(isValid);
    if (isValid) {
      setNameCohort(values.nameCohort);
      setSbtImage(values.sbtImage);
      setNameSBT(values.nameSBT);
      setSymbolSBT(values.symbolSBT);
      setUriSBT(values.uriSBT);
      setTreasuryAddress(values.treasuryAddress);
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
              label="Name cohort"
              id="nameCohort"
              placeholder="Name cohort"
              borderColor="red"
              // @ts-ignore
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
                required: {
                  value: true,
                  message: "Image required",
                },
                onChange(e) {
                  const file = e.target.files[0];
                  const url = URL.createObjectURL(file);
                  setValue("sbtImage", url);
                },
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
                  message: "Value required",
                },
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
                  message: "Value required",
                },
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
              placeholder="enter URI"
              borderColor="red"
              // @ts-ignore
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
              render={({ message }) => <Text color="red">{message}</Text>}
            />
          </Box>
          <Tooltip
            label="If cohort members get slashed, their stake will get sent to this address"
            placement="top-start"
            hasArrow
          >
            <Box>
              <Input
                label="Treasury address"
                id="treasuryAddress"
                placeholder="enter address"
                borderColor="red"
                // @ts-ignore
                localForm={localForm}
                {...register("treasuryAddress", {
                  required: {
                    value: true,
                    message: "Value required",
                  },
                  validate: () =>
                    utils.isAddress(values.treasuryAddress) ||
                    "invalid address",
                })}
              />

              <ErrorMessage
                errors={errors}
                name="treasuryAddress"
                render={({ message }) => <Text color="red">{message}</Text>}
              />
            </Box>
          </Tooltip>
          {/* <Box alignSelf="end"> */}
          <Box mt={10}>
            <PreviewModal
              sbtImageURL={values.sbtImage}
              sbtName={values.nameSBT}
            />
          </Box>
          {/* <Box /> */}
          <Box textAlign="right">
            <Button
              variant="solid"
              w="full"
              color="black"
              mt={10}
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
