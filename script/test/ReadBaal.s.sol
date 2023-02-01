// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {IBaal} from "src/baal/IBaal.sol";

// create with verify
// forge script script/test/ReadBaal.s.sol:ReadBaalScript --rpc-url $RU --private-key $PK --broadcast --verify --etherscan-api-key $EK -vvvv

// create without verify
// forge script script/test/ReadBaal.s.sol:ReadBaalScript --rpc-url $RU --private-key $PK --broadcast -vvvv

contract ReadBaalScript is Script {
    IBaal constant baalV3 = IBaal(0x6053dE194226843E4FD99A82C1386B4C76E19E34);

    function run() public {
        baalV3.avatar();
    }
}
