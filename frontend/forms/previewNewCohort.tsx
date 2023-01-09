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
import { BigNumber } from "ethers";

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
    topHatWearer,
    admin1,
    admin2,
    cohortSize,
    stakeDuration,
    tophatID,
    nameCohort,
    nameSBT,
    symbolSBT,
    uriSBT,
    // sbtImage,
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

  console.log(blockExplorerLink("9809x0989"));

  const handleBack = (): void => {
    setDisplayPart3(true);
    setDisplayPreviewNewCohort(false);
  };

  const initData: initDataDeployCohort = [
    membershipCriteria,
    stakingAsset,
    treasury,
    topHatWearer,
    admin1,
    admin2,
    cohortSize?.toString(),
    onboardingPeriod?.toString(),
    shareThreshold?.toString(),
    assetAmount?.toString(),
    stakeDuration?.toString(),
    chain?.id?.toString(),
    tophatID?.toString(),
    nameCohort,
    nameSBT,
    symbolSBT,
    uriSBT,
  ];

  console.log(initData);
  console.log(BigNumber.from(1));

  const { createCohort } = useCreateCohort([initData, "1"]);
  console.log(createCohort);

  const handleDeployCohort = (): void => {
    console.log("deploying cohort");
  };

  return (
    <Box display={displayPreviewNewCohort ? "inline" : "none"} m="auto">
      <SimpleGrid
        columns={2}
        spacingX={6}
        rounded="xl"
        border="1px"
        borderColor="red"
        bg="black"
        px={"5%"}
        py={6}
        m="auto"
        w={"full"}
      >
        <Box>
          <Stack>
            <Text fontSize="lg" color="red" fontWeight="semibold">
              {nameCohort.toUpperCase()}
            </Text>
            <Text>
              <span style={{ color: "gray" }}>Name SBT:</span>
              {nameSBT}
            </Text>
            <Text>
              <span style={{ color: "gray" }}>Symbol SBT:</span> {symbolSBT}
            </Text>
            <Text>
              <span style={{ color: "gray" }}>Stake per member:</span>
              {assetAmount} {assetAmount && assetAmount > 1 && "days"}
            </Text>
            <Text>
              <span style={{ color: "gray" }}>Staking duration:</span>
              {stakeDuration} {stakeDuration && stakeDuration > 1 && "days"}
            </Text>
            <Text>
              <span style={{ color: "gray" }}>Cohort size:</span> {cohortSize}
            </Text>
            <Text>
              <span style={{ color: "gray" }}>Shares per member:</span>{" "}
              {shareThreshold}
            </Text>
            <Text>
              <span style={{ color: "gray" }}>Onboarding period:</span>{" "}
              {onboardingPeriod}{" "}
              {onboardingPeriod && onboardingPeriod > 1 && "days"}
            </Text>
            <Text>
              <span style={{ color: "gray" }}>Staking asset address:</span>
              <Text fontSize="xx-small">{blockExplorerLink(stakingAsset)}</Text>
            </Text>
            <Text>
              <span style={{ color: "gray" }}>Moloch DAO address:</span>
              {/* TO-DO: put etherscan link to contract */}
              <Text fontSize="xx-small">
                {blockExplorerLink(membershipCriteria)}
              </Text>
            </Text>

            <Text>
              <span style={{ color: "gray" }}>Treasury address:</span>
              {/* TO-DO: put etherscan link to contract */}
              <Text fontSize="xx-small">{blockExplorerLink(treasury)}</Text>
            </Text>
            {topHatWearer !== "" && (
              <Text>
                <span style={{ color: "gray" }}>TOP HAT address:</span>
                {/* TO-DO: put etherscan link to contract */}
                <span>
                  {
                    <Text fontSize="xx-small">
                      {blockExplorerLink(topHatWearer)}
                    </Text>
                  }
                </span>
              </Text>
            )}
            {tophatID && (
              <Text>
                <span style={{ color: "gray" }}>TOP HAT ID:</span> {tophatID}
              </Text>
            )}
            {admin1 !== "" && (
              <Text>
                <span style={{ color: "gray" }}>Admin address 1:</span>
                {/* TO-DO: put etherscan link to contract */}
                {<Text fontSize="xx-small">{blockExplorerLink(admin1)}</Text>}
              </Text>
            )}
            {admin2 !== "" && (
              <Text>
                <span style={{ color: "gray" }}>Admin address 2:</span>
                {/* TO-DO: put etherscan link to contract */}
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
      <HStack my={10} mx="auto" spacing={6} w={["full", "full", "80%", "60%"]}>
        <Box w="50%">
          <Button
            variant="ghost"
            w="full"
            color="red"
            border="1px"
            rounded="sm"
            onClick={handleBack}
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
          >
            Deploy cohort
          </Button>
        </Box>
      </HStack>
    </Box>
  );
};

export default PreviewNewCohort;
