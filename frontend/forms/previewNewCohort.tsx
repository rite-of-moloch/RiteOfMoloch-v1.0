import React from "react";
import {
  Box,
  Button,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@raidguild/design-system";
import { useFormContext } from "context/FormContext";
import useCreateCohort from "../hooks/useCreateCohort";
import { useNetwork } from "wagmi";
import { InitDataDeployCohort } from "utils/types/initDataDeployCohort";
import CohortConfirmation from "components/cohort/CohortConfirmationModal";
import BlockExplorerLink from "components/blockExplorer/BlockExplorerLink";
import { zeroAddress } from "utils/constants";
import { useDecimalOf, useTokenSymbol } from "hooks/useERC20";
import { utils } from "ethers";

/**
 * @remarks this component renders a preview of all 3 parts of form data. It also builds function handleDeployCohort, which submits data to riteOfMolochFactory contract and creates a new cohort
 * @returns form data for user to review before creating a new instance of ROM contract
 */
const PreviewNewCohort = () => {
  const { chain } = useNetwork();
  const {
    setDisplayPart3,
    setDisplayPreviewNewCohort,
    displayPreviewNewCohort,
    membershipCriteria,
    stakingAsset,
    daoTreasury,
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

  const responseText = (question: string, response: any, days?: any) => (
    <Box>
      <Text>
        <span style={{ color: "gray", marginRight: "0.25em" }}>
          {question}:
        </span>
        <span style={{ fontSize: "small" }}>{response}</span>
        {days && (
          <span style={{ fontSize: "small", marginLeft: "0.25em" }}>
            {days && days > 1 ? "days" : "day"}
          </span>
        )}
      </Text>
    </Box>
  );

  const handleBack = (): void => {
    setDisplayPart3(true);
    setDisplayPreviewNewCohort(false);
  };

  const initData: InitDataDeployCohort = [
    membershipCriteria,
    stakingAsset,
    daoTreasury,
    admin1 !== "" ? admin1 : zeroAddress,
    admin2 !== "" ? admin2 : zeroAddress,
    Number(cohortSize),
    Number(onboardingPeriod) * 60 * 60 * 24,
    Number(shareThreshold),
    assetAmount,
    Number(stakeDuration) * 60 * 60 * 24,
    tophatID ? tophatID : Number(0),
    nameCohort,
    nameSBT,
    symbolSBT,
    uriSBT,
    Boolean(shamanOn),
  ];

  console.log("initData", initData);
  const {
    createCohort,
    prepareErrorCreateCohort,
    isLoadingApprove,
    isSuccessApprove,
  } = useCreateCohort([initData, 1]);

  console.log(prepareErrorCreateCohort);

  const handleDeployCohort = (): void => {
    console.log(createCohort);
    createCohort && createCohort();
  };

  let decimalOf = useDecimalOf(stakingAsset as `0x${string}`);
    if (!decimalOf) {
    decimalOf = "0";
  }
  let symbol = useTokenSymbol(stakingAsset);

  const amountString = assetAmount ? `${+utils.formatUnits(assetAmount || "0", decimalOf)} ${symbol}` : "0";

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
              {responseText("Stake per member", amountString)}
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
                BlockExplorerLink(chain, membershipCriteria)
              )}
              {responseText(
                "DAO treasury address",
                BlockExplorerLink(chain, daoTreasury)
              )}
              {topHatWearer !== "" &&
                responseText(
                  "TOP HAT address",
                  BlockExplorerLink(chain, topHatWearer)
                )}
              {tophatID && responseText("TOP HAT ID", tophatID)}
              {admin1 !== "" &&
                responseText(
                  "Admin address 1",
                  BlockExplorerLink(chain, admin1)
                )}
              {admin2 !== "" &&
                responseText(
                  "Admin address 2",
                  BlockExplorerLink(chain, admin2)
                )}
              <Text>
                <span style={{ color: "gray" }}>
                  Make contract address a shaman:
                </span>
                <span style={{ fontSize: "small", marginLeft: "0.25em" }}>
                  {shamanOn ? "yes" : "no"}
                </span>
              </Text>
            </Stack>
          </Box>
          <Box pt={8}>
            <Image
              src={uriSBT}
              alt={`${nameSBT} SBT image preview`}
              m="auto"
              boxShadow="dark-lg"
              p="2"
              rounded="md"
              bg="gray"
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
              isDisabled={isSuccessApprove || isLoadingApprove}
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
              isDisabled={isSuccessApprove}
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
