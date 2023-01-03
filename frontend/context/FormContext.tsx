import React, { createContext, useState, Dispatch, useContext } from "react";

export const FormContext = createContext<{
  displayPart1: boolean;
  setDisplayPart1: any;
  displayPart2: boolean;
  setDisplayPart2: any;
  displayPart3: boolean;
  setDisplayPart3: any;
  nameCohort: string;
  nameSBT: string;
  sbtImage: string;
  symbolSBT: string;
  uriSBT: string;
  stakePerMember: number | null;
  cohortSize: number | null;
  onboardingPeriod: number | null;
  stakingPeriod: number | null;
  hasTophat: boolean;
  addAdmin: boolean;
  tophatOwnerAddress: string;
  tophatID: string;
  admin2: string;
  admin3: string;
}>({
  displayPart1: true,
  setDisplayPart1: null,
  displayPart2: true,
  setDisplayPart2: null,
  displayPart3: true,
  setDisplayPart3: null,
  nameCohort: "",
  nameSBT: "",
  sbtImage: "",
  symbolSBT: "",
  uriSBT: "",
  stakePerMember: null,
  cohortSize: null,
  onboardingPeriod: null,
  stakingPeriod: null,
  hasTophat: false,
  addAdmin: false,
  tophatOwnerAddress: "",
  tophatID: "",
  admin2: "",
  admin3: "",
});

interface FormProviderProps {
  children: React.ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [displayPart1, setDisplayPart1] = useState(true);
  const [displayPart2, setDisplayPart2] = useState(false);
  const [displayPart3, setDisplayPart3] = useState(false);
  const [nameCohort, setNameCohort] = useState("");
  const [nameSBT, setNameSBT] = useState("");
  const [sbtImage, setSbtImage] = useState("");
  const [symbolSBT, setSymbolSBT] = useState("");
  const [uriSBT, setUriSBT] = useState("");
  const [stakePerMember, setStakePerMember] = useState<number | null>(null);
  const [cohortSize, setCohortSize] = useState<number | null>(null);
  const [onboardingPeriod, setOnboardingPeriod] = useState<number | null>(null);
  const [stakingPeriod, setStakingPeriod] = useState<number | null>(null);
  const [hasTophat, setHasTophat] = useState(false);
  const [addAdmin, setAddAdmin] = useState(false);
  const [tophatOwnerAddress, setTophatOwnerAddress] = useState("");
  const [tophatID, setTophatID] = useState("");
  const [admin2, setAdmin2] = useState("");
  const [admin3, setAdmin3] = useState("");

  const value = {
    displayPart1,
    setDisplayPart1,
    displayPart2,
    setDisplayPart2,
    displayPart3,
    setDisplayPart3,
    nameCohort,
    nameSBT,
    sbtImage,
    symbolSBT,
    uriSBT,
    stakePerMember,
    cohortSize,
    onboardingPeriod,
    stakingPeriod,
    hasTophat,
    addAdmin,
    tophatOwnerAddress,
    tophatID,
    admin2,
    admin3,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useFormContext = () => {
  const {
    displayPart1,
    setDisplayPart1,
    displayPart2,
    setDisplayPart2,
    displayPart3,
    setDisplayPart3,
    nameCohort,
    nameSBT,
    sbtImage,
    symbolSBT,
    uriSBT,
    stakePerMember,
    cohortSize,
    onboardingPeriod,
    stakingPeriod,
    hasTophat,
    addAdmin,
    tophatOwnerAddress,
    tophatID,
    admin2,
    admin3,
  } = useContext(FormContext);
  return {
    displayPart1,
    setDisplayPart1,
    displayPart2,
    setDisplayPart2,
    displayPart3,
    setDisplayPart3,
    nameCohort,
    nameSBT,
    sbtImage,
    symbolSBT,
    uriSBT,
    stakePerMember,
    cohortSize,
    onboardingPeriod,
    stakingPeriod,
    hasTophat,
    addAdmin,
    tophatOwnerAddress,
    tophatID,
    admin2,
    admin3,
  };
};
