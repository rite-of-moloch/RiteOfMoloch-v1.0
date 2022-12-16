import React, { createContext, useContext, useState } from "react";

interface UserProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext("Default Value");

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [minimumStake, setMinimumStake] = useState<number>();
  const [riteBalance, setRiteBalance] = useState<number>(0);
  const [raidBalance, setRaidBalance] = useState<number>(0);
  const [stakeDeadline, setStakeDeadline] = useState<number>(0);
  const [allowance, setAllowance] = useState<number>(0);
  const [isApproveTxPending, setIsApproveTxPending] = useState<boolean>(false);
  const [isStakeTxPending, setIsStakeTxPending] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [displaySponsorCohort, setDisplaySponsorCohort] =
    useState<boolean>(false);
  const [cohortAddress, setCohortAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleIsChecked = (): void => {
    setIsChecked(!isChecked);
  };

  const handleCohortAddress = (e: any): void => {
    setCohortAddress(e.target.value);
  };

  const value: any = {
    minimumStake,
    setMinimumStake,
    riteBalance,
    setRiteBalance,
    raidBalance,
    setRaidBalance,
    stakeDeadline,
    setStakeDeadline,
    allowance,
    setAllowance,
    isApproveTxPending,
    setIsApproveTxPending,
    isStakeTxPending,
    setIsStakeTxPending,
    handleIsChecked,
    handleCohortAddress,
    displaySponsorCohort,
    setDisplaySponsorCohort,
    cohortAddress,
    setCohortAddress,
    isLoading,
    setIsLoading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
