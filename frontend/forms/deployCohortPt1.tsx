import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {
  Box,
  Button,
  FormControl,
  Input,
  SimpleGrid,
  Text,
} from "@raidguild/design-system";

import PreviewModal from "components/PreviewModal";

interface deployCohortPt1Props {
  setDisplay: Dispatch<boolean>;
}

// type FormValues = {
//   nameCohort: string;
//   sbtImage: HTMLInputElement;
//   sbtPreview: string;
//   nameSBT: string;
//   symbolSBT: string;
//   uriSBT: string;
// };

const DeployCohortPt1: React.FC<deployCohortPt1Props> = ({ setDisplay }) => {
  const localForm = useForm({
    defaultValues: {
      nameCohort: "",
      sbtImage: "",
      nameSBT: "",
      symbolSBT: "",
      uriSBT: "",
    },
  });

  const {
    register,
    getValues,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors, isValid },
  } = localForm;

  console.log(isValid);

  const values = getValues();
  const nameSBT = values.nameSBT;

  const handleNext = async (): Promise<void> => {
    await trigger();
    isValid && setDisplay(true);
  };

  return (
    <FormControl onSubmit={handleSubmit(handleNext)}>
      <Box display={!setDisplay ? "none" : "inline"}>
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
                  message: "Cannot be blank",
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
                required: false,
                // onChange: (e) => {
                //   const file = e.target.files[0];
                //   setValue("sbtImage", file);
                //   // console.log(sbtImage);
                // },
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
              })}
            />
            <ErrorMessage
              errors={errors}
              name="uriSBT"
              render={({ message }) => <Text color="red">{message}</Text>}
            />
          </Box>
          <Box alignSelf="end">
            <PreviewModal sbtImageURL={null} sbtName={nameSBT} />
          </Box>
          <Box />
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
