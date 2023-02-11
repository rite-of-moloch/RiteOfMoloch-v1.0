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
  stakingAsset: string;
  setStakingAsset: any;
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
  treasury: string;
  setTreasury: any;
  membershipCriteria: string;
  setMembershipCriteria: any;
  assetAmount: number | null;
  setAssetAmount: any;
  cohortSize: number | null;
  setCohortSize: any;
  shareThreshold: number | null;
  setShareThreshold: any;
  onboardingPeriod: number | null;
  setOnboardingPeriod: any;
  stakeDuration: number | null;
  setStakeDuration: any;
  topHatWearer: string;
  setTopHatWearer: any;
  tophatID: number | null;
  setTophatID: any;
  admin1: string;
  setAdmin1: any;
  admin2: string;
  setAdmin2: any;
  superadmin1: boolean;
  setSuperadmin1: any;
  superadmin2: boolean;
  setSuperadmin2: any;
  shamanOn: boolean;
  setShamanOn: any;
}>({
  displayPart1: true,
  setDisplayPart1: null,
  displayPart2: false,
  setDisplayPart2: null,
  displayPart3: false,
  setDisplayPart3: null,
  displayPreviewNewCohort: false,
  setDisplayPreviewNewCohort: null,
  stakingAsset: "",
  setStakingAsset: null,
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
  treasury: "",
  setTreasury: null,
  membershipCriteria: "",
  setMembershipCriteria: null,
  assetAmount: null,
  setAssetAmount: null,
  cohortSize: null,
  setCohortSize: null,
  shareThreshold: null,
  setShareThreshold: null,
  onboardingPeriod: null,
  setOnboardingPeriod: null,
  stakeDuration: null,
  setStakeDuration: null,
  topHatWearer: "",
  setTopHatWearer: null,
  tophatID: null,
  setTophatID: null,
  admin1: "",
  setAdmin1: null,
  admin2: "",
  setAdmin2: null,
  superadmin1: false,
  setSuperadmin1: null,
  superadmin2: false,
  setSuperadmin2: null,
  shamanOn: false,
  setShamanOn: null,
});

console.log("FORMCONTEXT: ", FormContext);

interface FormProviderProps {
  children: React.ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [displayPart1, setDisplayPart1] = useState(true);
  const [displayPart2, setDisplayPart2] = useState(false);
  const [displayPart3, setDisplayPart3] = useState(false);
  const [displayPreviewNewCohort, setDisplayPreviewNewCohort] = useState(false);
  const [nameCohort, setNameCohort] = useState("");
  const [stakingAsset, setStakingAsset] = useState("");
  const [nameSBT, setNameSBT] = useState("");
  const [sbtImage, setSbtImage] = useState("");
  const [symbolSBT, setSymbolSBT] = useState("");
  const [uriSBT, setUriSBT] = useState("");
  const [assetAmount, setAssetAmount] = useState<number | null>(null);
  const [cohortSize, setCohortSize] = useState<number | null>(null);
  const [shareThreshold, setShareThreshold] = useState<number | null>(null);
  const [onboardingPeriod, setOnboardingPeriod] = useState<number | null>(null);
  const [treasury, setTreasury] = useState("");
  const [membershipCriteria, setMembershipCriteria] = useState("");
  const [stakeDuration, setStakeDuration] = useState<number | null>(null);
  const [topHatWearer, setTopHatWearer] = useState("");
  const [tophatID, setTophatID] = useState<number | null>(null);
  const [admin1, setAdmin1] = useState("");
  const [admin2, setAdmin2] = useState("");
  const [superadmin1, setSuperadmin1] = useState(false);
  const [superadmin2, setSuperadmin2] = useState(false);
  const [shamanOn, setShamanOn] = useState(false);

  console.log("LOADING FORM PROVIDER");
  const value = {
    displayPart1,
    setDisplayPart1,
    displayPart2,
    setDisplayPart2,
    displayPart3,
    setDisplayPart3,
    displayPreviewNewCohort,
    setDisplayPreviewNewCohort,
    stakingAsset,
    setStakingAsset,
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
    treasury,
    setTreasury,
    membershipCriteria,
    setMembershipCriteria,
    assetAmount,
    setAssetAmount,
    cohortSize,
    setCohortSize,
    shareThreshold,
    setShareThreshold,
    onboardingPeriod,
    setOnboardingPeriod,
    stakeDuration,
    setStakeDuration,
    topHatWearer,
    setTopHatWearer,
    tophatID,
    setTophatID,
    admin1,
    setAdmin1,
    admin2,
    setAdmin2,
    superadmin1,
    setSuperadmin1,
    superadmin2,
    setSuperadmin2,
    shamanOn,
    setShamanOn,
  };

  console.log("FORMPROVIDER value: ", value);

  console.log("RETURNING FROM PROVIDER");

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
    stakingAsset,
    setStakingAsset,
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
    treasury,
    setTreasury,
    membershipCriteria,
    setMembershipCriteria,
    assetAmount,
    setAssetAmount,
    cohortSize,
    setCohortSize,
    shareThreshold,
    setShareThreshold,
    onboardingPeriod,
    setOnboardingPeriod,
    stakeDuration,
    setStakeDuration,
    topHatWearer,
    setTopHatWearer,
    tophatID,
    setTophatID,
    admin1,
    setAdmin1,
    admin2,
    setAdmin2,
    superadmin1,
    setSuperadmin1,
    superadmin2,
    setSuperadmin2,
    shamanOn,
    setShamanOn,
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
    stakingAsset,
    setStakingAsset,
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
    treasury,
    setTreasury,
    membershipCriteria,
    setMembershipCriteria,
    assetAmount,
    setAssetAmount,
    cohortSize,
    setCohortSize,
    shareThreshold,
    setShareThreshold,
    onboardingPeriod,
    setOnboardingPeriod,
    stakeDuration,
    setStakeDuration,
    topHatWearer,
    setTopHatWearer,
    tophatID,
    setTophatID,
    admin1,
    setAdmin1,
    admin2,
    setAdmin2,
    superadmin1,
    setSuperadmin1,
    superadmin2,
    setSuperadmin2,
    shamanOn,
    setShamanOn,
  };
};
