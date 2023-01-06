import React, { FC, ReactNode } from "react";
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
import PreviewModal from "components/PreviewModal";
import { utils } from "ethers";

interface deployCohortPt1Props {
  children?: ReactNode;
}

const DeployCohortPt1: FC<deployCohortPt1Props> = ({ children }) => {
  const {
    tokenAddress,
    setTokenAddress,
    // setNameCohort,
    // setSbtImage,
    setNameSBT,
    setSymbolSBT,
    setUriSBT,
    setTreasury,
    setMembershipCriteria,
    displayPart1,
    setDisplayPart1,
    setDisplayPart2,
  } = useFormContext();

  const localForm = useForm({
    defaultValues: {
      tokenAddress: "",
      // nameCohort: "",
      // sbtImage: "",
      nameSBT: "",
      symbolSBT: "",
      uriSBT: "",
      treasury: "",
      membershipCriteria: "",
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
      setTokenAddress(values.tokenAddress);
      // setNameCohort(values.nameCohort);
      // // setSbtImage(values.sbtImage);
      setNameSBT(values.nameSBT);
      setSymbolSBT(values.symbolSBT);
      setUriSBT(values.uriSBT);
      setTreasury(values.treasury);
      setMembershipCriteria(values.membershipCriteria);
      setDisplayPart1(false);
      setDisplayPart2(true);
    }
  };

  return (
    <FormControl onSubmit={handleSubmit(handleNext)}>
      <Box display={displayPart1 ? "inline" : "none"}>
        <SimpleGrid columns={2} spacingX={4} spacingY={3}>
          <Tooltip
            label="Must be a valid Moloch DAO address. Rite of Moloch will read from this to ascertain cohort completion"
            placement="top-start"
            hasArrow
          >
            <Box>
              <Input
                label="DAO contract address"
                id="membershipCriteria"
                placeholder="enter address"
                borderColor="red"
                // @ts-ignore
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
                render={({ message }) => <Text color="red">{message}</Text>}
              />
            </Box>
          </Tooltip>
          <Tooltip
            label="Must be a valid Moloch DAO address. Rite of Moloch will read from this to ascertain cohort completion"
            placement="top-start"
            hasArrow
          >
            <Box>
              <Input
                label="Staking asset address"
                id="tokenAddress"
                placeholder="enter token address"
                borderColor="red"
                // @ts-ignore
                localForm={localForm}
                {...register("tokenAddress", {
                  required: {
                    value: true,
                    message: "Value required",
                  },
                  validate: () =>
                    utils.isAddress(values.tokenAddress) || "invalid address",
                })}
              />

              <ErrorMessage
                errors={errors}
                name="tokenAddress"
                render={({ message }) => <Text color="red">{message}</Text>}
              />
            </Box>
          </Tooltip>
          {/* <Box>
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
          </Box> */}
          {/* <Box>
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
          </Box> */}

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
                onChange(e) {
                  setValue("nameSBT", e.target.value.toUpperCase());
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
                onChange(e) {
                  setValue("symbolSBT", e.target.value.toUpperCase());
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
              placeholder="enter SBT url"
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
                id="treasury"
                placeholder="enter address"
                borderColor="red"
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
                render={({ message }) => <Text color="red">{message}</Text>}
              />
            </Box>
          </Tooltip>
          <Box my={10}>
            <PreviewModal
              sbtImageURL={values.uriSBT}
              sbtName={values.nameSBT}
            />
          </Box>
          {/* <Box /> */}
          <Box textAlign="right">
            <Button
              variant="solid"
              w="full"
              color="black"
              my={10}
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
