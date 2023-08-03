// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { TestHelperScript } from "script/test/utils/TestHelper.s.sol";
import { RiteOfMoloch } from "src/RiteOfMoloch.sol";

// create with verify and broadcast
// forge script script/test/SacrificeExisting.s.sol:SacrificeExistingScript --rpc-url $RU --broadcast --verify
// --etherscan-api-key $EK -vvvv

// test; no broadcast
// forge script script/test/SacrificeExisting.s.sol:SacrificeExistingScript --rpc-url $RU -vvvv

contract SacrificeExistingScript is TestHelperScript {
    function run() public {
        vm.startBroadcast(vm.envUint("PK1"));

        // set ROM-clone
        riteOfMoloch = RiteOfMoloch(0xdE86E7702BE3e492ea1c34308954807C0a0Bd54d);

        riteOfMoloch.sacrifice();
        vm.stopBroadcast();
    }
}
