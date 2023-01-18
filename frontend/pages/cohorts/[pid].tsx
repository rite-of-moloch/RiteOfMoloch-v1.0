import { FC, ReactNode } from "react";
import { Box } from "@raidguild/design-system";
import { useRouter } from "next/router";

interface CohortProps {
  children: ReactNode;
}

const Cohort: FC<CohortProps> = ({ children }) => {
  const router = useRouter();
  const { pid } = router.query;
  console.log(pid);

  return <Box>{pid}</Box>;
};

export default Cohort;
