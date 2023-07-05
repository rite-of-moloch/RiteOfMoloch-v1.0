// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import { RiteOfMoloch } from "src/RiteOfMoloch.sol";
import { IHats } from "hats-protocol/Interfaces/IHats.sol";

// create with verify
// forge script script/ROMverify.s.sol:ROMverifyScript --rpc-url $RUS --private-key $PK --broadcast --verify
// --etherscan-api-key $EK
// forge script script/ROMverify.s.sol:ROMverifyScript --rpc-url https://rpc.gnosischain.com --private-key $PK
// --broadcast --verify --etherscan-api-key $GK

contract ROMverifyScript is Script {
    function run() public {
        vm.startBroadcast();

        // deploy ROM singleton
        new RiteOfMoloch();

        vm.stopBroadcast();
    }
}
