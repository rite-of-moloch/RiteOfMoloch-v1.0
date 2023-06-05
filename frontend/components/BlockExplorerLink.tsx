import { Flex, Link } from "@raidguild/design-system";
import { RxOpenInNewWindow } from "react-icons/rx";

const BlockExplorerLink = (chain: any, name: string, address: string) => {
  return (
    <Link
      href={`${chain?.blockExplorers?.default.url}/address/${address}`}
      isExternal
    >
      <Flex alignItems="center">
        {`${name}`}
        <span style={{ marginLeft: "0.5em" }}>
          {<RxOpenInNewWindow color="white" />}
        </span>
      </Flex>
    </Link>
  );
};

export default BlockExplorerLink;
