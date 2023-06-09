import React, { FC, ReactNode } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {
  Box,
  Button,
  FormControl,
  Input,
  SimpleGrid,
  Tooltip,
} from "@raidguild/design-system";
import { useFormContext } from "context/FormContext";
import PreviewModal from "components/PreviewModal";
import { utils } from "ethers";
import FormErrorText from "components/FormErrorText";

interface deployCohortPt1Props {
  children?: ReactNode;
}

const DeployCohortPt1: FC<deployCohortPt1Props> = ({ children }) => {
  const {
    setNameCohort,
    setNameSBT,
    setSymbolSBT,
    setUriSBT,
    setDaoTreasury,
    setMembershipCriteria,
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
      setDaoTreasury(values.daoTreasury);
      setMembershipCriteria(values.membershipCriteria);
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
          <Tooltip
            label="Must be a valid Moloch DAO address. The Rite of Moloch contract will read from this to ascertain cohort completion"
            placement="top-start"
            hasArrow
          >
            <Box>
              <Input
                label="Moloch DAO Address"
                id="membershipCriteria"
                placeholder="enter address"
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

          <Box mt={10}>
            <PreviewModal
              sbtImageURL={values.uriSBT}
              sbtName={values.nameSBT}
            />
          </Box>
          <Box />
          <Box textAlign="right">
            <Button
              variant="solid"
              w="full"
              color="black"
              mt={6}
              mb={10}
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
