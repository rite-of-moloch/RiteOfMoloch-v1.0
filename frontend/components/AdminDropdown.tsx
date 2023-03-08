import React from "react";
import {
  Controller,
  FieldValues,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { Select } from "chakra-react-select";

interface AdminDropdownProps {
  cohortAddress: string;
}
const AdminDropdown: React.FC<AdminDropdownProps> = ({ cohortAddress }) => {
  const adminOptions = [];

  // TODO: pull admins from a subgraph and place them into select menu
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
      color: "red",
      fontWeight: "bold",
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
    <Select
      options={adminOptions}
      placeholder="ADMINISTRATORS"
      isClearable={false}
      isSearchable={false}
      size="sm"
      chakraStyles={styles}
    />
  );
};

export default AdminDropdown;
