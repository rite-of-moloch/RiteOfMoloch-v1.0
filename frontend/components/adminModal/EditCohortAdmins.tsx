import { Box, Button, HStack, Input, VStack } from "@raidguild/design-system";
import { utils } from "ethers";
import React, { Dispatch, useState } from "react";
import { FieldValues, UseFormRegister, UseFormReturn } from "react-hook-form";
import { zeroAddress } from "utils/constants";

interface EditCohortAdminsProps {
  admin1: string;
  admin2: string;
  localForm: UseFormReturn;
  register: UseFormRegister<FieldValues>;
  setEditAdmins: Dispatch<boolean>;
}
/**
 * @remarks This component renders on CohortAdminModal when editAdmins is true. Users can remove current admins and add new admins. Contract allows maximum of 2 HATS admins.
 * if isEditing is set to true, button toggles to "done editing" and inputs become inactive
 * @param admin1 - HATS admin1 of RoM contract
 * @param admin2 - HATS admin2 of RoM contract
 * @param localForm useForm hook passed in from parent component to manage state.
 * @param register useForm hook passed in from parent component to manage state.
 * @param setEditAdmins passed in from CohortAdminModal. If true, this component will not render.
 * @returns VStack containing HStack with button to add new admin.
 */
const EditCohortAdmins: React.FC<EditCohortAdminsProps> = ({
  admin1,
  admin2,
  localForm,
  register,
  setEditAdmins,
}) => {
  const [isEditing, setIsEditing] = useState(true);
  const { setValue } = localForm;

  const handleDoneEditing = () => {
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setEditAdmins(false);
  };

  const handleSaveAdminChange = () => {
    null;
  };

  return (
    <VStack>
      <HStack alignItems="end" w="full">
        <Button w="min">+</Button>
        <Input
          label="Admin 1"
          placeholder="Enter address..."
          isDisabled={!isEditing}
          defaultValue={admin1 !== zeroAddress ? admin1 : ""}
          localForm={localForm}
          {...register("admin1", {
            onChange: (e) => setValue("admin1", e.target.value),
            validate: (val) => utils.isAddress(val),
          })}
        />
      </HStack>
      <HStack alignItems="end" w="full">
        <Button w="min">+</Button>
        <Input
          label="Admin 2"
          placeholder="Enter address..."
          isDisabled={!isEditing}
          defaultValue={admin2 !== zeroAddress ? admin2 : ""}
          localForm={localForm}
          {...register("admin2", {
            onChange: (e) => setValue("admin2", e.target.value),
            validate: (val) => utils.isAddress(val),
          })}
        />
      </HStack>
      <HStack alignItems="end" w="full" mt="2rem">
        <Box mt="2rem">
          <Button
            fontFamily="spaceMono"
            onClick={() => (isEditing ? handleDoneEditing() : handleEdit())}
          >
            {isEditing ? "Done Edting" : "Edit"}
          </Button>
        </Box>
        <Box>
          <Button
            fontFamily="spaceMono"
            onClick={() => {
              !isEditing ? handleSaveAdminChange() : handleCloseModal();
            }}
          >
            {!isEditing ? "Save Changes" : "Cancel"}
          </Button>
        </Box>
      </HStack>
    </VStack>
  );
};

export default EditCohortAdmins;
