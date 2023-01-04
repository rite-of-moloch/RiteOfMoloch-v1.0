import React from "react";

import {
  BuiltByRaidGuildComponent,
  Text,
  HStack,
} from "@raidguild/design-system";

interface FooterProps {
  children?: React.ReactNode;
}

export const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <footer style={{ marginBottom: "1rem", marginTop: "1rem" }}>
      <BuiltByRaidGuildComponent />
    </footer>
  );
};
