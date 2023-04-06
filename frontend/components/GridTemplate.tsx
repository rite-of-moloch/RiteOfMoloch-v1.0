import { SimpleGrid, GridItem } from "@raidguild/design-system";
import React, { ReactNode } from "react";

interface GridTemplateProps {
  column1: string | ReactNode;
  column2: string | ReactNode;
  column3: string | ReactNode;
  column4?: string | ReactNode | null;
  column5?: ReactNode | null;
  isHeading?: boolean;
  style?: string | null;
}

/**
 * @remarks component is used to render a grid with an adjustable number of columns
 * @param isHeading - true if grid is a heading. isHeading: false if grid is a row
 * @param style - if style is "noSideBorders" the grid will have top and bottom border only
 * @param column1 - value of the first column
 * @param column2 - value of the second column
 * @param column3 - value of the third column
 * @param column4 - value of the fourth column
 * @param column5 - optional modal button
 * @returns Chakra UI SimpleGrid component
 */
const GridTemplate: React.FC<GridTemplateProps> = ({
  column1,
  column2,
  column3,
  column4,
  column5,
  isHeading = false,
  style = null,
}) => {
  const columnLogic = () => {
    if (!column4) {
      return 3;
    } else if (!column5) {
      return 4;
    } else if (column5) {
      return 5;
    }
  };

  return (
    <SimpleGrid
      columns={columnLogic()}
      bg={!isHeading ? "black" : "none"}
      fontFamily="texturina"
      justifyContent="center"
      alignItems="center"
      spacingX={2}
      mb={!isHeading ? -3 : 0}
      w="full"
      border={!isHeading ? "1px red solid" : "none"}
      borderLeft={style === "noSideBorders" ? "0px" : ""}
      borderRight={style === "noSideBorders" ? "0px" : ""}
      px={4}
      pt={2}
      pb={3}
      rounded={style !== "noSideBorders" ? "md" : "none"}
    >
      <GridItem margin="auto">{column1}</GridItem>
      <GridItem margin="auto">{column2}</GridItem>
      <GridItem margin="auto">{column3}</GridItem>
      <GridItem margin="auto">{column4}</GridItem>
      <GridItem justifySelf="end">{column5}</GridItem>
    </SimpleGrid>
  );
};

export default GridTemplate;
