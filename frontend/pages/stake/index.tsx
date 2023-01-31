import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { CONTRACT_ADDRESSES } from "utils/constants";
import { useAccount, useNetwork } from "wagmi";
import NotConnected from "components/NotConnected";

/**
 * @remarks if no address is provided in the URL, redirect user to RaidGuild cohort staking page
 * @returns connect button if user not connected. Otherwise redirects to RaidGuild staking page
 */
const StakeRedirect = () => {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { chain } = useNetwork();

  const raidGuildCohort =
    CONTRACT_ADDRESSES[chain?.id || 5]["riteOfMolochAddress"];

  useEffect(() => {
    if (router.pathname === "/stake") {
      router.push(`/stake/${raidGuildCohort}`);
    }
  }, [router]);

  return <>{!isConnected && <NotConnected />}</>;
};

export default StakeRedirect;
