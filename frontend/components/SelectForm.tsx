// import { Select } from "@raidguild/design-system";
import { Select } from "chakra-react-select";
import { Controller, UseFormReturn } from "react-hook-form";
import { SelectOptions } from "utils/types/select";

interface SelectFormProps {
  name: string;
  placeholder: string;
  options: SelectOptions;
  localForm: UseFormReturn<any>;
  isClearable?: boolean;
  isSearchable?: boolean;
  isMulti?: boolean;
  styles?: any;
}

/**
 * @remarks search bar for user to search for addresses in cohorts list.
 * @returns input where user can enter text
 */
const SelectForm: React.FC<SelectFormProps> = ({
  name,
  placeholder,
  options,
  localForm,
  isClearable = false,
  isSearchable = false,
  isMulti = false,
  styles,
}) => {
  const { control } = localForm;
  const defaultStyle = {
    control: (baseStyles: any) => ({
      ...baseStyles,
      borderColor: "black",
      bg: "gradient1",
      color: "black",
      borderBottomRadius: "none",
    }),
    menu: (baseStyles: any) => ({
      ...baseStyles,
      background: "black",
      color: "gray",
    }),
    placeholder: (baseStyles: any) => ({
      ...baseStyles,
      color: "black",
      fontWeight: "bold",
      fontFamily: "spaceMono",
    }),
    option: (baseStyles: any) => ({
      ...baseStyles,
      backgroundColor: "black",
      color: "lightgray",
      fontSize: "xs",
    }),
    field: (baseStyles: any) => ({
      ...baseStyles,
      backgroundColor: "black",
      color: "#FFFFFF",
    }),
    menuList: (baseStyles: any) => ({
      ...baseStyles,
      backgroundColor: "black",
      color: "#FFFFFF",
      w: "full",
      mt: "-0.55rem",
      borderTopRadius: "none",
    }),
    multiValueLabel: (baseStyles: any) => ({
      ...baseStyles,
      backgroundColor: "transparent",
      fontSize: "xs",
      fontWeight: "bold",
      p: 1,
    }),
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          options={options}
          placeholder={placeholder.toUpperCase()}
          isSearchable={isSearchable}
          isClearable={isClearable}
          isMulti={isMulti}
          selectedOptionStyle="check"
          selectedOptionColor="black"
          colorScheme="black"
          chakraStyles={styles ? styles : defaultStyle}
          {...field}
        />
      )}
    />
  );
};

export default SelectForm;
