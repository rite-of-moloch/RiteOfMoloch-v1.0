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
import {useMintHatProp, useTransferHatProp} from "hooks/useHats";
import { FieldValues, useForm } from "react-hook-form";
import { zeroAddress } from "utils/constants";
import AdminModalAddresses from "./AdminModalAddresses";

interface EditCohortAdminsProps {
  address: string | undefined;
  admin1: string;
  admin2: string;
  onClose: Function;
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
  onClose
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

  watch();
  const values = getValues();

  const { writeMintHatProp: mintAdmin1, isLoadingMint: loadMint1 } = useMintHatProp(address || "0x", 
    values?.admin1
  );

  const { writeMintHatProp: mintAdmin2, isLoadingMint: loadMint2 } = useMintHatProp(address || "0x", 
    values?.admin2
  );

  const { writeTransferHatProp: transAdmin1, isLoadingTransfer: loadTrans1 } = useTransferHatProp(address || "0x", 
    [admin1, values?.admin1]
  );

  const { writeTransferHatProp: transAdmin2, isLoadingTransfer: loadTrans2 } = useTransferHatProp(address || "0x", 
      [admin2, values?.admin2]
  );

  const handleHatsProp = () => {
    if (values?.admin1) {
      if (admin1 == zeroAddress) {
        mintAdmin1 && mintAdmin1();
      } else {
        transAdmin1 && transAdmin1();
      }
    }

    if (admin2 == zeroAddress) {
      if (admin2 == zeroAddress) {
        mintAdmin2 && mintAdmin2();
      } else {
        transAdmin2 && transAdmin2();
      }
    }
    setEditAdmins(false);
    onClose();
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
        </HStack>
        <HStack alignItems="end" w="full">
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
        </HStack>
        <Box>
          <Text my="1rem" textAlign="center">
            Each Rite of Moloch allows for a maximum of two HATS admin. Fill in one or both inputs to grant admin privileges to accounts.
          </Text>
        </Box>
        <HStack alignItems="end" w="full" mt="2rem" justifyContent="center">
          <Button
            w="50%"
            fontFamily="spaceMono"
            isLoading={loadMint1 || loadMint2}
            onClick={() => handleHatsProp()}
          >
            Save
          </Button>
        </HStack>
      </VStack>
    </>
  );
};

export default EditCohortAdmins;
