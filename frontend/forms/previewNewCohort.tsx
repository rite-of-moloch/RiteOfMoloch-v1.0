import React, { ReactNode } from "react";
import {
  Box,
  Button,
  HStack,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@raidguild/design-system";
import { useFormContext } from "context/FormContext";
import useCreateCohort from "../hooks/useCreateCohort";
import { useNetwork } from "wagmi";
import { initDataDeployCohort } from "utils/types/initDataDeployCohort";
import CohortConfirmation from "components/CohortConfirmationModal";

interface PreviewNewCohortProps {
  children?: ReactNode;
}

const PreviewNewCohort: React.FC<PreviewNewCohortProps> = ({ children }) => {
  const { chain } = useNetwork();
  const {
    setDisplayPart3,
    setDisplayPreviewNewCohort,
    displayPreviewNewCohort,
    membershipCriteria,
    stakingAsset,
    treasury,
    admin1,
    admin2,
    cohortSize,
    stakeDuration,
    topHatWearer,
    tophatID,
    nameCohort,
    nameSBT,
    symbolSBT,
    uriSBT,
    assetAmount,
    shareThreshold,
    onboardingPeriod,
    shamanOn,
  } = useFormContext();

  const blockExplorerLink = (address: string) => (
    <Link
      href={`${chain?.blockExplorers?.default.url}/address/${address}`}
      isExternal
    >
      {address}
    </Link>
  );

  const responseText = (question: string, response: any, days?: any) => (
    <Text>
      <span style={{ color: "gray", marginRight: "0.25em" }}>{question}:</span>
      <span style={{ fontSize: "small" }}>{response}</span>
      {days && (
        <span style={{ fontSize: "small", marginLeft: "0.25em" }}>
          {days && days > 1 ? "days" : "day"}
        </span>
      )}
    </Text>
  );

  const handleBack = (): void => {
    setDisplayPart3(true);
    setDisplayPreviewNewCohort(false);
  };

  const zeroAddress = "0x0000000000000000000000000000000000000000";

  const initData: initDataDeployCohort = [
    membershipCriteria,
    stakingAsset,
    treasury,
    admin1 !== "" ? admin1 : zeroAddress,
    admin2 !== "" ? admin2 : zeroAddress,
    Number(cohortSize),
    Number(onboardingPeriod) * 60 * 24,
    Number(shareThreshold),
    Number(assetAmount),
    Number(stakeDuration) * 60 * 24,
    tophatID ? tophatID : Number(0),
    nameCohort,
    nameSBT,
    symbolSBT,
    uriSBT,
    false,
  ];

  console.log("initData", initData);
  const { createCohort, isLoadingApprove, isSuccessApprove } = useCreateCohort([
    initData,
    1,
  ]);

  const handleDeployCohort = (): void => {
    console.log("deploying");
    console.log(createCohort);
    createCohort && createCohort();
  };

  return (
    <>
      <Box display={displayPreviewNewCohort ? "inline" : "none"}>
        <SimpleGrid
          columns={2}
          spacingX={6}
          rounded="xl"
          fontFamily="texturina"
          border="1px solid #FF3864"
          bg="black"
          px={"5%"}
          py={6}
          m="auto"
          w="full"
        >
          <Box>
            <Stack>
              <Text fontSize="lg" color="red" fontWeight="semibold">
                {nameCohort.toUpperCase()}
              </Text>
              {responseText("Name SBT", nameSBT)}
              {responseText("Symbol SBT", symbolSBT)}
              {responseText("Stake per member", assetAmount, assetAmount)}
              {responseText("Staking duration", stakeDuration, stakeDuration)}
              {responseText("Cohort size", cohortSize)}
              {responseText("Shares per member", shareThreshold)}
              {responseText(
                "Onboarding period",
                onboardingPeriod,
                onboardingPeriod
              )}
              {responseText("Asset address", stakingAsset)}
              {responseText(
                "Moloch DAO address",
                blockExplorerLink(membershipCriteria)
              )}
              {responseText("Treasury address", blockExplorerLink(treasury))}
              {topHatWearer !== "" &&
                responseText(
                  "TOP HAT address",
                  blockExplorerLink(topHatWearer)
                )}
              {tophatID && responseText("TOP HAT ID", tophatID)}
              {admin1 !== "" &&
                responseText("Admin address 1", blockExplorerLink(admin1))}
              {admin2 !== "" &&
                responseText("Admin address 2", blockExplorerLink(admin2))}
              <Text>
                <span style={{ color: "gray" }}>
                  Make contract address a shaman:
                </span>
                <Text fontSize="small">{shamanOn ? "True" : "False"}</Text>
              </Text>
            </Stack>
          </Box>
          <Box pt={8}>
            <Image
              src={uriSBT}
              alt={`${nameSBT} SBT image preview`}
              rounded="xl"
              m="auto"
            />
          </Box>
        </SimpleGrid>
        <HStack my={10} mx="auto" spacing={6} w={"full"}>
          <Box w="50%">
            <Button
              variant="ghost"
              w="full"
              color="red"
              border="1px"
              rounded="sm"
              onClick={handleBack}
              disabled={isSuccessApprove || isLoadingApprove}
            >
              Back
            </Button>
          </Box>
          <Box w="50%">
            <Button
              variant="solid"
              w="full"
              color="black"
              onClick={() => handleDeployCohort && handleDeployCohort()}
              isLoading={isLoadingApprove}
              loadingText="creating cohort..."
              disabled={isSuccessApprove}
            >
              {!isSuccessApprove ? "Deploy cohort" : "Cohort deployed!"}
            </Button>
          </Box>
        </HStack>
      </Box>
      <CohortConfirmation openLogic={isSuccessApprove} />
    </>
  );
};

export default PreviewNewCohort;
