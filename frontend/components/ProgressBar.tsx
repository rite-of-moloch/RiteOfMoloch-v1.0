import React, { ReactNode } from "react";
import { Progress } from "@chakra-ui/progress";
import { useFormContext } from "context/FormContext";

interface ProgressBarProps {
  children?: ReactNode;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ children }) => {
  const { displayPart1, displayPart2, displayPart3 } = useFormContext();

  const getProgress = (): number => {
    let progress = 0;
    if (displayPart1) progress = 33;
    else if (displayPart2) progress = 66;
    else progress = 99;
    return progress;
  };

  return <Progress value={getProgress()} />;
};

export default ProgressBar;
