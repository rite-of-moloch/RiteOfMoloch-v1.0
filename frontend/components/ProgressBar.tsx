import React from "react";
import { Progress } from "@chakra-ui/progress";

interface ProgressBarProps {
  progress?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return <Progress value={progress} />;
};

export default ProgressBar;
