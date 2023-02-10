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
    tophatID,
    nameCohort,
    nameSBT,
    symbolSBT,
    uriSBT,
    assetAmount,
    shareThreshold,
    onboardingPeriod,
  } = useFormContext();

  const blockExplorerLink = (address: string) => (
    <Link
      href={`${chain?.blockExplorers?.default.url}/address/${address}`}
      isExternal
    >
      {address}
    </Link>
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
              <Text>
                <span style={{ color: "gray", marginRight: "0.25em" }}>
                  Name SBT:
                </span>
                {nameSBT}
              </Text>
              <Text>
                <span style={{ color: "gray", marginRight: "0.25em" }}>
                  Symbol SBT:
                </span>
                {symbolSBT}
              </Text>
              <Text>
                <span style={{ color: "gray", marginRight: "0.25em" }}>
                  Stake per member:
                </span>
                <span style={{ marginRight: "0.25em" }}>{assetAmount}</span>
                {assetAmount && assetAmount > 1 && "days"}
              </Text>
              <Text>
                <span style={{ color: "gray", marginRight: "0.25em" }}>
                  Staking duration:
                </span>
                {stakeDuration} {stakeDuration && stakeDuration > 1 && "days"}
              </Text>
              <Text>
                <span style={{ color: "gray", marginRight: "0.25em" }}>
                  Cohort size:
                </span>
                {cohortSize}
              </Text>
              <Text>
                <span style={{ color: "gray", marginRight: "0.25em" }}>
                  Shares per member:
                </span>
                {shareThreshold}
              </Text>
              <Text>
                <span style={{ color: "gray", marginRight: "0.25em" }}>
                  Onboarding period:
                </span>
                <span style={{ marginRight: "0.25em" }}>
                  {onboardingPeriod}
                </span>
                {onboardingPeriod && onboardingPeriod > 1 && "days"}
              </Text>
              <Text>
                <span style={{ color: "gray" }}>Staking asset address:</span>
                <Text fontSize="xx-small">
                  {blockExplorerLink(stakingAsset)}
                </Text>
              </Text>
              <Text>
                <span style={{ color: "gray" }}>Moloch DAO address:</span>

                <Text fontSize="xx-small">
                  {blockExplorerLink(membershipCriteria)}
                </Text>
              </Text>

              <Text>
                <span style={{ color: "gray" }}>Treasury address:</span>
                <Text fontSize="xx-small">{blockExplorerLink(treasury)}</Text>
              </Text>
              {/* {topHatWearer !== "" && (
                <Text>
                  <span style={{ color: "gray" }}>TOP HAT address:</span>

                  <span>
                    {
                      <Text fontSize="xx-small">
                        {blockExplorerLink(topHatWearer)}
                      </Text>
                    }
                  </span>
                </Text>
              )} */}
              {tophatID && (
                <Text>
                  <span style={{ color: "gray" }}>TOP HAT ID:</span> {tophatID}
                </Text>
              )}
              {admin1 !== "" && (
                <Text>
                  <span style={{ color: "gray" }}>Admin address 1:</span>

                  {<Text fontSize="xx-small">{blockExplorerLink(admin1)}</Text>}
                </Text>
              )}
              {admin2 !== "" && (
                <Text>
                  <span style={{ color: "gray" }}>Admin address 2:</span>

                  {<Text fontSize="xx-small">{blockExplorerLink(admin2)}</Text>}
                </Text>
              )}
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
