import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  HStack,
  Input,
  Text,
  VStack,
} from "@raidguild/design-system";
import { utils } from "ethers";
import useTransferAdminHatProposal from "hooks/useTransferAdminHatProposal";
import { FieldValues, useForm, Controller } from "react-hook-form";

import { zeroAddress } from "utils/constants";
import AdminModalAddresses from "./AdminModalAddresses";

interface EditCohortAdminsProps {
  address: string | undefined;
  admin1: string;
  admin2: string;
}

type FormValues = {
  admin1: string;
  admin2: string;
};

/**
 * @remarks This component renders on CohortAdminModal when editAdmins is true. Users can remove current admins and add new admins. Contract allows maximum of 2 HATS admins.
 * if isEditing is set to true, button toggles to "done editing" and inputs become inactive
 * @param address - cohort address
 * @param admin1 - HATS admin1 of RoM contract
 * @param admin2 - HATS admin2 of RoM contract
 * @returns VStack containing HStack with button to add new admin.
 */
const EditCohortAdmins: React.FC<EditCohortAdminsProps> = ({
  address,
  admin1,
  admin2,
}) => {
  const [editAdmins, setEditAdmins] = useState(false);

  const localForm = useForm<FieldValues>();
  const {
    register,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = localForm;

  const { handleSubmit, control } = useForm<FormValues>();

  watch();
  const values = getValues();
  console.log(values);

  const {
    writeTransferAdminHatProposal: changeAdmin1,
    isLoading: loadingAdmin1,
    error: errorChangeAdmin1,
  } = useTransferAdminHatProposal(address || "", [admin1, values?.admin1]);

  const {
    writeTransferAdminHatProposal: changeAdmin2,
    isLoading: loadingAdmin2,
    error: errorChangeAdmin2,
  } = useTransferAdminHatProposal(address || "", [admin2, values?.admin2]);

  const handleSaveAdmin1 = () => {
    if (values.admin1 === "") {
      setValue("admin1", zeroAddress);
    }
    changeAdmin1 && changeAdmin1();
  };

  const handleSaveAdmin2 = () => {
    console.log(errors);
    if (values.admin2 === "") {
      setValue("admin2", zeroAddress);
    }
    changeAdmin2 && changeAdmin2();
  };

  const handleCloseModal = () => {
    setEditAdmins(false);
  };

  useEffect(() => {
    console.log(admin1, admin2);
  }, [admin1, admin2]);

  return (
    <>
      <AdminModalAddresses
        admin1={admin1}
        admin2={admin2}
        editAdmins={editAdmins}
        setEditAdmins={setEditAdmins}
      />
      <VStack display={editAdmins ? "block" : "none"}>
        <HStack alignItems="end" w="full">
          <Input
            label="Admin 1"
            placeholder="Enter address..."
            defaultValue={admin1 !== zeroAddress ? admin1 : ""}
            localForm={localForm}
            {...register("admin1", {
              onChange: (e) => setValue("admin1", e.target.value),
              validate: (val) => utils.isAddress(val),
            })}
          />
          {/* <Controller
            control={control}
            name="admin1"
            render={({ field: { onChange, ref, ...restField } }) => (
              <Input
                label="Admin 1"
                placeholder="Enter address..."
                defaultValue={admin1 !== zeroAddress ? admin1 : ""}
                localForm={localForm}
                // {...restField}
                {...register("admin1", {
                  onChange: (e) => setValue("admin1", e.target.value),
                  validate: (val) => utils.isAddress(val),
                })}
              />
            )}
          /> */}
          <Button onClick={() => handleSaveAdmin1()} isLoading={loadingAdmin1}>
            save
          </Button>
        </HStack>
        <HStack alignItems="end" w="full">
          {/* <Controller
            control={control}
            name="admin2"
            render={({ field: { onChange, ref, ...restField } }) => (
              <Input
                label="Admin 2"
                placeholder="Enter address..."
                defaultValue={admin2 !== zeroAddress ? admin2 : ""}
                localForm={localForm}
                // {...restField}
                {...register("admin2", {
                  onChange: (e) => setValue("admin2", e.target.value),
                  validate: (val) => utils.isAddress(val),
                })}
              />
            )}
          /> */}
          <Input
            label="Admin 2"
            placeholder="Enter address..."
            defaultValue={admin2 !== zeroAddress ? admin2 : ""}
            localForm={localForm}
            {...register("admin2", {
              onChange: (e) => setValue("admin2", e.target.value),
              validate: (val) => utils.isAddress(val),
            })}
          />
          <Button onClick={() => handleSaveAdmin2()} isLoading={loadingAdmin2}>
            Save
          </Button>
        </HStack>
        <Box>
          <Text my="1rem" textAlign="center">
            * You may only save 1 admin at a time. Each Rite of Moloch contract
            allows for a maximum of (2) HATS admin .
          </Text>
        </Box>
        <HStack alignItems="end" w="full" mt="2rem" justifyContent="center">
          <Button
            w="50%"
            fontFamily="spaceMono"
            onClick={() => handleCloseModal()}
          >
            Done Editing
          </Button>
        </HStack>
      </VStack>
    </>
  );
};

export default EditCohortAdmins;
