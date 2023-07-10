import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import NotConnected from "components/wallet/NotConnected";

/**
 * @remarks if no address is provided in the URL, redirect user to RaidGuild cohort staking page
 * @returns connect button if user not connected. Otherwise redirects to RaidGuild staking page
 */
const StakeRedirect = () => {
  const router = useRouter();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (router.pathname === "/stake") {
      router.push("/joinCohorts");
    }
  }, [router]);

  return <>{!isConnected && <NotConnected />}</>;
};

export default StakeRedirect;
