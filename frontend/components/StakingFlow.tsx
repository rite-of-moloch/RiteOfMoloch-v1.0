// import React from "react";

// import {
//   Flex,
//   Box,
//   SimpleGrid,
//   Text,
//   Button,
//   HStack,
//   Checkbox,
//   Input,
//   Tooltip,
//   Link,
// } from "@chakra-ui/react";
// import { utils } from "ethers";
// import styled from "@emotion/styled";

// import { TOKEN_TICKER } from "../utils/constants";

// const StyledButton = styled(Button)`
//   height: 50px;
//   width: 100%;
//   border-radius: "2px";
//   padding-left: "24px";
//   padding-right: "24px";
// `;

// const StyledHStack = styled(HStack)`
//   width: 100%;
//   justify-content: space-between;
//   align-items: center;
// `;

// export const StakingFlow = ({
//   minimumStake,
//   context,
//   raidBalance,
//   allowance,
//   displaySponsorCohort,
//   checkboxDisplay,
//   sponsorCohortTextDisplay,
//   isChecked,
//   handleIsChecked,
//   cohortAddress,
//   handleCohortAddress,
//   isApproveTxPending,
//   makeAnAllowance,
//   canStake,
//   canNotStakeTooltipLabel,
//   isStakeTxPending,
//   depositStake,
// }) => {
//   return (
//     <Flex w="100%" direction="column" alignItems="flex-start" p="15px">
//       <StyledHStack mb="1rem">
//         <Text color="red" fontSize={{ lg: "1.2rem", sm: ".8rem" }}>
//           Required Stake
//         </Text>
//         <Text color="white" fontSize={{ lg: "1.2rem", sm: ".8rem" }}>
//           {utils.formatUnits(minimumStake, "ether")}{" "}
//           {TOKEN_TICKER[context.chainId]}
//         </Text>
//       </StyledHStack>
//       <StyledHStack>
//         <Text color="red" fontFamily="jetbrains" fontSize=".8rem">
//           Your {TOKEN_TICKER[context.chainId]} balance
//         </Text>
//         <Text color="white" fontSize=".8rem">
//           {utils.formatUnits(raidBalance, "ether")}{" "}
//           {TOKEN_TICKER[context.chainId]}
//         </Text>
//       </StyledHStack>
//       <StyledHStack>
//         <Text color="red" fontFamily="jetbrains" fontSize=".8rem">
//           Your {TOKEN_TICKER[context.chainId]} allowance
//         </Text>
//         <Text color="white" fontSize=".8rem">
//           {utils.formatUnits(allowance, "ether")}{" "}
//           {TOKEN_TICKER[context.chainId]}
//         </Text>
//       </StyledHStack>
//       <Flex
//         flexDirection="row"
//         alignItems="center"
//         justifyContent="center"
//         mt="2em"
//       >
//         <Checkbox
//           defaultChecked
//           isChecked={isChecked}
//           onChange={handleIsChecked}
//           display={checkboxDisplay}
//         />
//         <Text
//           color="red"
//           fontFamily="jetbrains"
//           fontSize=".8rem"
//           ml="1em"
//           display={sponsorCohortTextDisplay}
//         >
//           Sponsor an Initiate
//         </Text>
//       </Flex>
//       <Input
//         onChange={handleCohortAddress}
//         placeholder="Sponsored initiate's wallet address"
//         value={cohortAddress}
//         _placeholder={{ color: "white", fontSize: "sm" }}
//         display={isChecked || displaySponsorCohort ? "inline" : "none"}
//         bg="#741739"
//         color="white"
//         rounded="none"
//         border="0px"
//         opacity="none"
//         width="full"
//         mt={!displaySponsorCohort ? "1rem" : "-1rem"}
//         fontSize="sm"
//       />
//       <SimpleGrid columns={2} spacing="1.5rem" mt="2rem" w="100%">
//         <Box>
//           <StyledButton
//             bg="transparent"
//             border="2px solid"
//             borderColor="red"
//             color="red"
//             isLoading={isApproveTxPending}
//             loadingText="Approving..."
//             disabled={
//               utils.formatUnits(allowance, "ether") >=
//               utils.formatUnits(minimumStake, "ether")
//             }
//             onClick={makeAnAllowance}
//             _hover={{
//               opacity: 0.8,
//             }}
//           >
//             Approve
//           </StyledButton>
//         </Box>
//         <Tooltip
//           isDisabled={canStake}
//           label={canNotStakeTooltipLabel}
//           shouldWrapChildren
//         >
//           <Box>
//             <StyledButton
//               bg="red"
//               color="black"
//               mx="auto"
//               isLoading={isStakeTxPending}
//               loadingText="Staking..."
//               disabled={!canStake}
//               onClick={depositStake}
//               _hover={{
//                 opacity: 0.8,
//               }}
//             >
//               Stake
//             </StyledButton>
//           </Box>
//         </Tooltip>
//       </SimpleGrid>
//       <Flex
//         color="white"
//         mt="2rem"
//         mx="auto"
//         p="0.5rem"
//         textDecoration="underline"
//         textUnderlineOffset="4px"
//         _hover={{ cursor: "pointer" }}
//       >
//         <Link href="/deploy-cohort">
//           <Text>Click Here To Deploy Your Own Cohort</Text>
//         </Link>
//       </Flex>
//     </Flex>
//   );
// };
