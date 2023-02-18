import { Input } from "@raidguild/design-system";
import { FieldValues, useForm } from "react-hook-form";

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
    <>
      <Input
        label=""
        type="text"
        placeholder="🔎 Search addresses"
        localForm={localForm}
        autoComplete="off"
        variant="redPlaceholder"
        {...register("searchResult")}
      />
    </>
  );
};

export default SearchCohorts;
