import { Input } from "@raidguild/design-system";
import { UseFormReturn } from "react-hook-form";

interface SearchCohortsProps {
  name: string;
  localForm: UseFormReturn<any>;
}

/**
 * @remarks search bar for user to search for addresses in cohorts list.
 * @returns input where user can enter text
 */
const SearchCohorts: React.FC<SearchCohortsProps> = ({ name, localForm }) => {
  return (
    <>
      <Input
        label=""
        name={name}
        type="text"
        placeholder="🔎 Search addresses"
        localForm={localForm}
        autoComplete="off"
        variant="redPlaceholder"
      />
    </>
  );
};

export default SearchCohorts;
