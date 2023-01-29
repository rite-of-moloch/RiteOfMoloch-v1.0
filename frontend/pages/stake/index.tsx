import React, { useEffect } from "react";
import { useRouter } from "next/router";

/**
 * @remarks if no address is provided in the URL, redirect user to RaidGuild cohort staking page
 * @returns empty div
 */
const StakeRedirect = () => {
  const router = useRouter();
  const raidGuildCohort = "";

  useEffect(() => {
    if (router.pathname === "/stake/") {
      router.push(`/stake/${raidGuildCohort}`);
    }
  }, [router]);
  return <div />;
};

export default StakeRedirect;
