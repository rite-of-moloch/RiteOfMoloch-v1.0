import React, { createContext, useState, Dispatch, useContext } from "react";

export const FormContext = createContext<{
  displayPart1: boolean;
  setDisplayPart1: any;
  displayPart2: boolean;
  setDisplayPart2: any;
  displayPart3: boolean;
  setDisplayPart3: any;
  displayPreviewNewCohort: boolean;
  setDisplayPreviewNewCohort: any;
  nameCohort: string;
  setNameCohort: any;
  nameSBT: string;
  setNameSBT: any;
  sbtImage: string;
  setSbtImage: any;
  symbolSBT: string;
  setSymbolSBT: any;
  uriSBT: string;
  setUriSBT: any;
  stakePerMember: number | null;
  setStakePerMember: any;
  cohortSize: number | null;
  setCohortSize: any;
  onboardingPeriod: number | null;
  setOnboardingPeriod: any;
  stakingPeriod: number | null;
  setStakingPeriod: any;
  // hasTophat: boolean;
  // setHasTophat: any;
  // addAdmin: boolean;
  // setAddAdmin: any;
  tophatOwnerAddress: string;
  setTophatOwnerAddress: any;
  tophatID: string;
  setTophatID: any;
  admin2: string;
  setAdmin2: any;
  admin3: string;
  setAdmin3: any;
  superadmin2: boolean;
  setSuperadmin2: any;
  superadmin3: boolean;
  setSuperadmin3: any;
}>({
  displayPart1: true,
  setDisplayPart1: null,
  displayPart2: false,
  setDisplayPart2: null,
  displayPart3: false,
  setDisplayPart3: null,
  displayPreviewNewCohort: false,
  setDisplayPreviewNewCohort: null,
  nameCohort: "",
  setNameCohort: null,
  nameSBT: "",
  setNameSBT: null,
  sbtImage: "",
  setSbtImage: null,
  symbolSBT: "",
  setSymbolSBT: null,
  uriSBT: "",
  setUriSBT: null,
  stakePerMember: null,
  setStakePerMember: null,
  cohortSize: null,
  setCohortSize: null,
  onboardingPeriod: null,
  setOnboardingPeriod: null,
  stakingPeriod: null,
  setStakingPeriod: null,
  // hasTophat: false,
  // setHasTophat: null,
  // addAdmin: false,
  // setAddAdmin: null,
  tophatOwnerAddress: "",
  setTophatOwnerAddress: null,
  tophatID: "",
  setTophatID: null,
  admin2: "",
  setAdmin2: null,
  admin3: "",
  setAdmin3: null,
  superadmin2: false,
  setSuperadmin2: null,
  superadmin3: false,
  setSuperadmin3: null,
});

interface FormProviderProps {
  children: React.ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [displayPart1, setDisplayPart1] = useState(true);
  const [displayPart2, setDisplayPart2] = useState(false);
  const [displayPart3, setDisplayPart3] = useState(false);
  const [displayPreviewNewCohort, setDisplayPreviewNewCohort] = useState(false);
  const [nameCohort, setNameCohort] = useState("");
  const [nameSBT, setNameSBT] = useState("");
  const [sbtImage, setSbtImage] = useState("");
  const [symbolSBT, setSymbolSBT] = useState("");
  const [uriSBT, setUriSBT] = useState("");
  const [stakePerMember, setStakePerMember] = useState<number | null>(null);
  const [cohortSize, setCohortSize] = useState<number | null>(null);
  const [onboardingPeriod, setOnboardingPeriod] = useState<number | null>(null);
  const [stakingPeriod, setStakingPeriod] = useState<number | null>(null);
  // const [hasTophat, setHasTophat] = useState(false);
  // const [addAdmin, setAddAdmin] = useState(false);
  const [tophatOwnerAddress, setTophatOwnerAddress] = useState("");
  const [tophatID, setTophatID] = useState("");
  const [admin2, setAdmin2] = useState("");
  const [admin3, setAdmin3] = useState("");
  const [superadmin2, setSuperadmin2] = useState(false);
  const [superadmin3, setSuperadmin3] = useState(false);

  const value = {
    displayPart1,
    setDisplayPart1,
    displayPart2,
    setDisplayPart2,
    displayPart3,
    setDisplayPart3,
    displayPreviewNewCohort,
    setDisplayPreviewNewCohort,
    nameCohort,
    setNameCohort,
    nameSBT,
    setNameSBT,
    sbtImage,
    setSbtImage,
    symbolSBT,
    setSymbolSBT,
    uriSBT,
    setUriSBT,
    stakePerMember,
    setStakePerMember,
    cohortSize,
    setCohortSize,
    onboardingPeriod,
    setOnboardingPeriod,
    stakingPeriod,
    setStakingPeriod,
    // hasTophat,
    // setHasTophat,
    // addAdmin,
    // setAddAdmin,
    tophatOwnerAddress,
    setTophatOwnerAddress,
    tophatID,
    setTophatID,
    admin2,
    setAdmin2,
    admin3,
    setAdmin3,
    superadmin2,
    setSuperadmin2,
    superadmin3,
    setSuperadmin3,
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
    displayPreviewNewCohort,
    setDisplayPreviewNewCohort,
    nameCohort,
    setNameCohort,
    nameSBT,
    setNameSBT,
    sbtImage,
    setSbtImage,
    symbolSBT,
    setSymbolSBT,
    uriSBT,
    setUriSBT,
    stakePerMember,
    setStakePerMember,
    cohortSize,
    setCohortSize,
    onboardingPeriod,
    setOnboardingPeriod,
    stakingPeriod,
    setStakingPeriod,
    // hasTophat,
    // setHasTophat,
    // addAdmin,
    // setAddAdmin,
    tophatOwnerAddress,
    setTophatOwnerAddress,
    tophatID,
    setTophatID,
    admin2,
    setAdmin2,
    admin3,
    setAdmin3,
    superadmin2,
    setSuperadmin2,
    superadmin3,
    setSuperadmin3,
  } = useContext(FormContext);
  return {
    displayPart1,
    setDisplayPart1,
    displayPart2,
    setDisplayPart2,
    displayPart3,
    setDisplayPart3,
    displayPreviewNewCohort,
    setDisplayPreviewNewCohort,
    nameCohort,
    setNameCohort,
    nameSBT,
    setNameSBT,
    sbtImage,
    setSbtImage,
    symbolSBT,
    setSymbolSBT,
    uriSBT,
    setUriSBT,
    stakePerMember,
    setStakePerMember,
    cohortSize,
    setCohortSize,
    onboardingPeriod,
    setOnboardingPeriod,
    stakingPeriod,
    setStakingPeriod,
    // hasTophat,
    // setHasTophat,
    // addAdmin,
    // setAddAdmin,
    tophatOwnerAddress,
    setTophatOwnerAddress,
    tophatID,
    setTophatID,
    admin2,
    setAdmin2,
    admin3,
    setAdmin3,
    superadmin2,
    setSuperadmin2,
    superadmin3,
    setSuperadmin3,
  };
};
