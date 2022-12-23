import React, { createContext, useState, Dispatch } from "react";

export const UserContext = createContext<{
  minimumStake: number;
  setMinimumStake: Dispatch<any>;
  riteBalance: number;
  setRiteBalance: Dispatch<any>;
  raidBalance: number;
  stakeDeadline: number;
  allowance: number;
  isApproveTxPending: boolean;
  setIsApproveTxPending: Dispatch<any>;
  cohortAddress: string | null;
  isStakeTxPending: boolean;
  isChecked: boolean;
  setIsStakeTxPending: Dispatch<any>;
}>({
  minimumStake: 0,
  setMinimumStake: null,
  setRiteBalance: null,
  riteBalance: 0,
  raidBalance: 0,
  stakeDeadline: 0,
  allowance: 0,
  isApproveTxPending: false,
  setIsApproveTxPending: null,
  cohortAddress: null,
  isStakeTxPending: false,
  isChecked: false,
  setIsStakeTxPending: null,
});

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [minimumStake, setMinimumStake] = useState<number>(0);
  const [riteBalance, setRiteBalance] = useState<number>(0);
  const [raidBalance, setRaidBalance] = useState<number>(0);
  const [stakeDeadline, setStakeDeadline] = useState<number>(0);
  const [allowance, setAllowance] = useState<number>(0);
  const [isApproveTxPending, setIsApproveTxPending] = useState<boolean>(false);
  const [isStakeTxPending, setIsStakeTxPending] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [displaySponsorCohort, setDisplaySponsorCohort] =
    useState<boolean>(false);
  const [cohortAddress, setCohortAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleIsChecked = (): void => {
    setIsChecked(!isChecked);
  };

  const handleCohortAddress = (e: any): void => {
    setCohortAddress(e.target.value);
  };

  return (
    <UserContext.Provider
      value={{
        minimumStake,
        setMinimumStake,
        riteBalance,
        setRiteBalance,
        raidBalance,
        stakeDeadline,
        allowance,
        isApproveTxPending,
        setIsApproveTxPending,
        cohortAddress,
        isStakeTxPending,
        isChecked,
        setIsStakeTxPending,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
