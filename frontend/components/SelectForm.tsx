// import { Select } from "@raidguild/design-system";
import { Select, Size } from "chakra-react-select";
import { Controller, UseFormReturn } from "react-hook-form";
import { SelectOptions } from "utils/types/select";

interface SelectFormProps {
  name: string;
  placeholder: string;
  options: SelectOptions;
  localForm: UseFormReturn<any>;
  isClearable?: boolean;
  isSearchable?: boolean;
}

/**
 * @remarks search bar for user to search for addresses in cohorts list.
 * @returns input where user can enter text
 */
const SelectForm: React.FC<SelectFormProps> = ({
  name,
  placeholder,
  options,
  isClearable = false,
  isSearchable = false,
  localForm,
}) => {
  const { control, watch } = localForm;

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
          isMulti
          {...field}
        />
      )}
    />
  );
};

export default SelectForm;
