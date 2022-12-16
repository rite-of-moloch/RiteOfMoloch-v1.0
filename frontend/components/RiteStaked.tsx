// import React, { useState, useContext } from "react";
// import { Flex, Image, Text, Checkbox } from "@chakra-ui/react";
// import { CountdownTimer } from "./CountdownTimer";
// import { StakingFlow } from "./StakingFlow";
// import { UserContext } from "context/UserContext";

// interface RiteStakedProps {
//   children: React.ReactNode;
// }

// const RiteStaked: React.FC<RiteStakedProps> = ({ children }) => {
//   const context = useContext(UserContext);

//   const handleSponsorCohort = () => {
//     context.setDisplaySponsorCohort(!context.displaySponsorCohort);
//   };

//   return (
//     <Flex
//       w="100%"
//       direction="column"
//       alignItems="center"
//       justifyContent="space-between"
//       p="15px"
//     >
//       <Image
//         src="/assets/season-v-token.svg"
//         w="250px"
//         borderRadius="20px"
//         mt="-3rem"
//         alt="Rite Token"
//       />

//       <Text color="red" fontSize={{ lg: "1.2rem", sm: "1rem" }} mb="5px">
//         You own a stake for {Number(balance)} RITE
//       </Text>
//       <Text color="white" fontFamily="jetbrains" fontSize=".8rem">
//         Deadline - {new Date(deadline * 1000).toLocaleString()}
//       </Text>
//       <CountdownTimer targetDate={new Date(deadline * 1000).getTime()} />

//       <Flex
//         flexDirection="row"
//         alignItems="center"
//         justifyContent="center"
//         mt="2em"
//       >
//         <Checkbox onChange={handleSponsorCohort} />
//         <Text color="red" fontFamily="jetbrains" fontSize=".8rem" ml="1em">
//           Sponsor an Initiate
//         </Text>
//       </Flex>
//       {context.displaySponsorCohort ? (
//         <StakingFlow
//           context.minimumStake,
//           context.raidBalance,
//           context.allowance,
//           context.isChecked,
//           context.displaySponsorCohort,
//           context.checkboxDisplay,
//           context.sponsorCohortTextDisplay,
//           context.handleIsChecked,
//           context.cohortAddress,
//           context.handleCohortAddress,
//           context.isApproveTxPending,
//           context.makeAnAllowance,
//           context.canStake,
//           context.canNotStakeTooltipLabel,
//           context.isStakeTxPending,
//           context.depositStake,
//         />
//       ) : null}
//     </Flex>
//   );
// };

// export default RiteStaked;
