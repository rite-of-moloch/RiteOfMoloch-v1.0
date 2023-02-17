import { Input } from "@raidguild/design-system";
import { FieldValues, useForm } from "react-hook-form";
import { BsSearch } from "react-icons/bs";

interface SearchCohortsProps {
  handleSearchResults: Function;
}

/**
 * @remarks search bar for user to search for addresses in cohorts list.
 * @returns input where user can enter text
 */
const SearchCohorts: React.FC<SearchCohortsProps> = ({
  handleSearchResults,
}) => {
  const localForm = useForm<FieldValues>();
  const { register, watch } = localForm;
  const result = watch().searchResult;
  handleSearchResults(result);

  return (
    <Input
      label=""
      placeholder={`${(<BsSearch color="red" />)}🔎 Search addresses`}
      localForm={localForm}
      autoComplete="off"
      {...register("searchResult")}
    />
  );
};

export default SearchCohorts;
