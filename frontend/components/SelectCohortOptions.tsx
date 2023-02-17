import { Input, Select } from "@raidguild/design-system";
import { useEffect } from "react";
import {
  Controller,
  FieldValues,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { BsSearch } from "react-icons/bs";

interface SelectCohortOptionsProps {
  handleCohortSelection: Function;
}

/**
 * @remarks search bar for user to search for addresses in cohorts list.
 * @returns input where user can enter text
 */
const SelectCohortOptions: React.FC<SelectCohortOptionsProps> = ({
  handleCohortSelection,
}) => {
  const localForm = useForm<FieldValues>();
  const { control, watch } = localForm;

  const selection = watch("selectCohorts")?.value;
  handleCohortSelection(selection);

  const options = [
    {
      value: "allCohorts",
      label: "All cohorts",
    },
    {
      value: "onlyStakedCohorts",
      label: "Only staked cohorts",
    },
    {
      value: "nonStakedOngoing",
      label: "Non-staked & ongoing cohorts",
    },
  ];

  return (
    <Controller
      control={control}
      name="selectCohorts"
      render={({ field }) => (
        <Select
          options={options}
          localForm={localForm}
          placeholder="SELECT COHORTS"
          isSearchable={false}
          isClearable={false}
          {...field}
        />
      )}
    />
  );
};

export default SelectCohortOptions;
