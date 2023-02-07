// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {TestHelperScript} from "script/test/utils/TestHelper.s.sol";
import {RiteOfMoloch} from "src/RiteOfMoloch.sol";

// create with verify
// forge script script/test/DeployCloneWshaman.s.sol:DeployCloneWshamanScript --rpc-url $RU --private-key $PK --broadcast --verify --etherscan-api-key $EK -vvvv

contract DeployCloneWshamanScript is TestHelperScript {
    function run() public {
        vm.startBroadcast();

        setUpHelper();

        // topHat: NO, shaman: YES
        createInitData(0, true);

        // deploy ROM-clone
        ROM = RiteOfMoloch(ROMF.createCohort(Data, 1));

        vm.stopBroadcast();
    }
}
