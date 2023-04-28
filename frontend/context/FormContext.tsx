import React, { createContext, useState, useContext, Dispatch } from "react";

export const FormContext = createContext<{
  displayPart1: boolean;
  setDisplayPart1: Dispatch<boolean>;
  displayPart2: boolean;
  setDisplayPart2: Dispatch<boolean>;
  displayPart3: boolean;
  setDisplayPart3: Dispatch<boolean>;
  displayPreviewNewCohort: boolean;
  setDisplayPreviewNewCohort: Dispatch<boolean>;
  stakingAsset: string;
  setStakingAsset: Dispatch<string>;
  nameCohort: string;
  setNameCohort: Dispatch<string>;
  nameSBT: string;
  setNameSBT: Dispatch<string>;
  sbtImage: string;
  setSbtImage: Dispatch<string>;
  symbolSBT: string;
  setSymbolSBT: Dispatch<string>;
  uriSBT: string;
  setUriSBT: Dispatch<string>;
  treasury: string;
  setTreasury: Dispatch<string>;
  membershipCriteria: string;
  setMembershipCriteria: Dispatch<string>;
  assetAmount: number | undefined;
  setAssetAmount: Dispatch<number | undefined>;
  cohortSize: number | undefined;
  setCohortSize: Dispatch<number | undefined>;
  shareThreshold: number | undefined;
  setShareThreshold: Dispatch<number | undefined>;
  onboardingPeriod: number | undefined;
  setOnboardingPeriod: Dispatch<number | undefined>;
  stakeDuration: number | undefined;
  setStakeDuration: Dispatch<number | undefined>;
  topHatWearer: string;
  setTopHatWearer: Dispatch<string>;
  tophatID: number | undefined;
  setTophatID: Dispatch<number | undefined>;
  admin1: string;
  setAdmin1: Dispatch<string>;
  admin2: string;
  setAdmin2: Dispatch<string>;
  superadmin1: boolean;
  setSuperadmin1: Dispatch<boolean>;
  superadmin2: boolean;
  setSuperadmin2: Dispatch<boolean>;
  shamanOn: boolean;
  setShamanOn: Dispatch<boolean>;
}>({
  displayPart1: true,
  setDisplayPart1: useState,
  displayPart2: false,
  setDisplayPart2: useState,
  displayPart3: false,
  setDisplayPart3: useState,
  displayPreviewNewCohort: false,
  setDisplayPreviewNewCohort: useState,
  stakingAsset: "",
  setStakingAsset: useState,
  nameCohort: "",
  setNameCohort: useState,
  nameSBT: "",
  setNameSBT: useState,
  sbtImage: "",
  setSbtImage: useState,
  symbolSBT: "",
  setSymbolSBT: useState,
  uriSBT: "",
  setUriSBT: useState,
  treasury: "",
  setTreasury: useState,
  membershipCriteria: "",
  setMembershipCriteria: useState,
  assetAmount: undefined,
  setAssetAmount: useState,
  cohortSize: undefined,
  setCohortSize: useState,
  shareThreshold: undefined,
  setShareThreshold: useState,
  onboardingPeriod: undefined,
  setOnboardingPeriod: useState,
  stakeDuration: undefined,
  setStakeDuration: useState,
  topHatWearer: "",
  setTopHatWearer: useState,
  tophatID: undefined,
  setTophatID: useState,
  admin1: "",
  setAdmin1: useState,
  admin2: "",
  setAdmin2: useState,
  superadmin1: false,
  setSuperadmin1: useState,
  superadmin2: false,
  setSuperadmin2: useState,
  shamanOn: false,
  setShamanOn: useState,
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
  const [stakingAsset, setStakingAsset] = useState("");
  const [nameSBT, setNameSBT] = useState("");
  const [sbtImage, setSbtImage] = useState("");
  const [symbolSBT, setSymbolSBT] = useState("");
  const [uriSBT, setUriSBT] = useState("");
  const [assetAmount, setAssetAmount] = useState<number | undefined>(undefined);
  const [cohortSize, setCohortSize] = useState<number | undefined>(undefined);
  const [shareThreshold, setShareThreshold] = useState<number | undefined>(
    undefined
  );
  const [onboardingPeriod, setOnboardingPeriod] = useState<number | undefined>(
    undefined
  );
  const [treasury, setTreasury] = useState("");
  const [membershipCriteria, setMembershipCriteria] = useState("");
  const [stakeDuration, setStakeDuration] = useState<number | undefined>(
    undefined
  );
  const [topHatWearer, setTopHatWearer] = useState("");
  const [tophatID, setTophatID] = useState<number | undefined>(undefined);
  const [admin1, setAdmin1] = useState("");
  const [admin2, setAdmin2] = useState("");
  const [superadmin1, setSuperadmin1] = useState(false);
  const [superadmin2, setSuperadmin2] = useState(false);
  const [shamanOn, setShamanOn] = useState(false);

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
