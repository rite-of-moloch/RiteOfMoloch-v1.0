import { SelectOptions } from "./types/select";

export const cohortOptions: SelectOptions = [
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
