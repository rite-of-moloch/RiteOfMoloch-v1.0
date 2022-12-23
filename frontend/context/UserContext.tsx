import React, { createContext, useState, Dispatch } from "react";

type UserValues = {
  [key: string]: any;
};

export const UserContext = createContext<{
  isApproveTxPending: boolean;
  cohortAddress: string;
  isStakeTxPending: boolean;
  willSponsor: boolean;
  handleWillSponsor: any;
  handleCohortAddress: any;
  displaySponsorCohort: boolean;
  setDisplaySponsorCohort: Dispatch<any>;
}>({
  isApproveTxPending: false,
  cohortAddress: "",
  isStakeTxPending: false,
  willSponsor: false,
  handleWillSponsor: null,
  handleCohortAddress: null,
  displaySponsorCohort: false,
  setDisplaySponsorCohort: null,
});

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isApproveTxPending, setIsApproveTxPending] = useState<boolean>(false);
  const [isStakeTxPending, setIsStakeTxPending] = useState<boolean>(false);
  const [willSponsor, setWillSponsor] = useState<boolean>(false);
  const [displaySponsorCohort, setDisplaySponsorCohort] =
    useState<boolean>(false);
  const [cohortAddress, setCohortAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleWillSponsor = (): void => {
    setWillSponsor(!willSponsor);
  };

  const handleCohortAddress = (e: any): void => {
    setCohortAddress(e.target.value);
  };

  const value: UserValues = {
    isApproveTxPending,
    cohortAddress,
    willSponsor,
    handleWillSponsor,
    handleCohortAddress,
    displaySponsorCohort,
    setDisplaySponsorCohort,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
