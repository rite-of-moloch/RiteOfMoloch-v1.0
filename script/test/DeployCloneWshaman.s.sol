// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { TestHelperScript } from "script/test/utils/TestHelper.s.sol";
import { RiteOfMoloch } from "src/RiteOfMoloch.sol";

// create with verify
// forge script script/test/DeployCloneWshaman.s.sol:DeployCloneWshamanScript --rpc-url $RU --broadcast --verify
// --etherscan-api-key $EK -vvvv

contract DeployCloneWshamanScript is TestHelperScript {
    function run() public {
        vm.startBroadcast(vm.envUint("PK1"));

        setUpHelper();

        // topHat: NO, shaman: YES
        createInitData(0, true);

        // deploy ROM-clone
        riteOfMoloch = RiteOfMoloch(romFactory.createCohort(cohortData, 1));

        vm.stopBroadcast();
    }
}
