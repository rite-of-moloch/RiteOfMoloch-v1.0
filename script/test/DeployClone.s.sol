// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {TestHelperScript} from "script/utils/TestHelper.s.sol";

// create with verify
// forge script script/test/DeployClone.s.sol:DeployCloneScript --rpc-url $RU --private-key $PK --broadcast --verify --etherscan-api-key $EK -vvvv

contract DeployCloneScript is TestHelperScript {
    function run() public {
        setUp();

        // topHat: NO, shaman: YES
        createInitData(0, true);

        vm.startBroadcast();

        // deploy ROM-factory and produce ROM-clone
        ROMF = new RiteOfMolochFactory(hatsProtocol, factoryOperatorHat);
        ROM = RiteOfMoloch(ROMF.createCohort(Data, 1));

        vm.stopBroadcast();
    }
}
