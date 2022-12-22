import React, { createContext, useState, Dispatch } from "react";

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext<{
  minimumStake: number;
  setMinimumStake: Dispatch<any>;
  riteBalance: number;
  raidBalance: number;
  stakeDeadline: number;
  allowance: number;
}>({
  minimumStake: 0,
  setMinimumStake: null,
  riteBalance: 0,
  raidBalance: 0,
  stakeDeadline: 0,
  allowance: 0,
});
// const UserContext = createContext<{
//   minimumStake: number;
//   setStakeDeadline: Dispatch<any>;
//   setMinimumStake: Dispatch<any>;
//   riteBalance: number;
//   setRiteBalance: Dispatch<any>;
//   raidBalance: number;
//   setRaidBalance: Dispatch<any>;
//   stakeDeadline: number;
//   allowance: number;
//   setAllowance: Dispatch<any>;
//   isApproveTxPending: boolean;
//   setIsApproveTxPending: Dispatch<any>;
//   isStakeTxPending: boolean;
//   setIsStakeTxPending: Dispatch<any>;
//   handleIsChecked: any;
//   handleCohortAddress: any;
//   displaySponsorCohort: boolean;
//   setDisplaySponsorCohort: Dispatch<any>;
//   cohortAddress: string;
//   setCohortAddress: Dispatch<any>;
//   isLoading: boolean;
//   setIsLoading: Dispatch<any>;
// }>({
//   minimumStake: 0,
//   setStakeDeadline: null,
//   setMinimumStake: null,
//   riteBalance: 0,
//   setRiteBalance: null,
//   raidBalance: 0,
//   setRaidBalance: null,
//   stakeDeadline: null,
//   allowance: 0,
//   setAllowance: null,
//   isApproveTxPending: false,
//   setIsApproveTxPending: null,
//   isStakeTxPending: false,
//   setIsStakeTxPending: false,
//   handleIsChecked: null,
//   handleCohortAddress: null,
//   displaySponsorCohort: false,
//   setDisplaySponsorCohort: null,
//   cohortAddress: "",
//   setCohortAddress: null,
//   isLoading: false,
//   setIsLoading: null,
// });

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
  const [cohortAddress, setCohortAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleIsChecked = (): void => {
    setIsChecked(!isChecked);
  };

  const handleCohortAddress = (e: any): void => {
    setCohortAddress(e.target.value);
  };

  return (
    <UserContext.Provider
      value={
        {
          // minimumStake,
          // setMinimumStake,
          // riteBalance,
          // raidBalance,
          // stakeDeadline,
          // allowance,
        }
      }
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
