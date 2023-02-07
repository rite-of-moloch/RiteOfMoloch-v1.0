// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {TestHelperScript} from "script/utils/TestHelper.s.sol";

// create with verify
// forge script script/test/CohortUser.s.sol:CohortUserScript --rpc-url $RU --private-key $PK --broadcast --verify --etherscan-api-key $EK -vvvv

contract CohortUserScript is TestHelperScript {
    function run() public {
        setUp();

        // topHat: NO, shaman: NO
        createInitData(0, false);

        vm.startBroadcast();

        // deploy ROM-factory and produce ROM-clone
        ROMF = new RiteOfMolochFactory(hatsProtocol, factoryOperatorHat);
        ROM = RiteOfMoloch(ROMF.createCohort(Data, 1));

        token.approve(address(ROM), minStake + 100);

        ROM.joinInitiation(deployer);

        vm.stopBroadcast();
    }
}
