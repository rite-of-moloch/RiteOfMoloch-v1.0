import React from "react";

import { BuiltByRaidGuildComponent, Box } from "@raidguild/design-system";

interface FooterProps {
  children?: React.ReactNode;
}

export const Footer: React.FC<FooterProps> = ({ children }) => {
  return <BuiltByRaidGuildComponent />;
};
