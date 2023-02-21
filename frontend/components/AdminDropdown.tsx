import React from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Select } from "chakra-react-select";

interface AdminDropdownProps {
  cohortAddress: string;
}
const AdminDropdown: React.FC<AdminDropdownProps> = ({ cohortAddress }) => {
  const localForm = useForm<FieldValues>();
  const { control, getValues, watch } = localForm;
  const values = getValues();
  const addAdmin = values?.admin?.value;
  watch();
  console.log(addAdmin);

  if (addAdmin === "addAdmin") {
    // open add new admin module
  }
  const adminOptions = [
    {
      value: "addAdmin",
      label: "ADD ADMIN",
    },
  ];

  adminOptions.unshift({
    value: "admin1",
    label: "admin1",
  });

  const styles = {
    control: (baseStyles: any) => ({
      ...baseStyles,
      borderColor: "red",
      fontFamily: "spaceMono",
      color: "white",
      borderRadius: "md",
    }),
    placeholder: (baseStyles: any) => ({
      ...baseStyles,
      color: "whitesmoke",
      fontWeight: "bold",
    }),
    option: (baseStyles: any) => ({
      ...baseStyles,
      backgroundColor: "black",
      textAlign: "center",
      fontSize: "sm",
    }),
    field: (baseStyles: any) => ({
      ...baseStyles,
      backgroundColor: "black",
      borderColor: "red",
    }),
    menuList: (baseStyles: any) => ({
      ...baseStyles,
      backgroundColor: "black",
      mt: "-1rem",
      borderColor: "red",
      borderTop: "none",
      borderTopRadius: "none",
    }),
    valueContainer: (baseStyles: any) => ({
      ...baseStyles,
      background: "black",
    }),
  };

  return (
    <Controller
      control={control}
      name="admin"
      render={({ field }) => (
        <Select
          options={adminOptions}
          placeholder="ADMINS"
          isClearable={false}
          isSearchable={false}
          size="sm"
          chakraStyles={styles}
          {...field}
        />
      )}
    />
  );
};

export default AdminDropdown;
