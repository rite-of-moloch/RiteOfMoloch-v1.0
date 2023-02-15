// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {TestHelperScript} from "script/test/utils/TestHelper.s.sol";
import {RiteOfMoloch} from "src/RiteOfMoloch.sol";

// create with verify
// forge script script/test/CohortUser.s.sol:CohortUserScript --rpc-url $RU --broadcast --verify --etherscan-api-key $EK -vvvv

// test; no broadcast
// forge script script/test/CohortUser.s.sol:CohortUserScript --rpc-url $RU -vvvv

contract CohortUserScript is TestHelperScript {
    function run() public {
        vm.startBroadcast(vm.envUint("PK1"));

        setUpHelper();

        // topHat: NO, shaman: NO
        createInitData(0, false);

        // deploy ROM-clone
        ROM = RiteOfMoloch(ROMF.createCohort(Data, 1));

        // test joinInitiation
        joinCohort(deployer);

        ROM.cryForHelp("testing 1, 2, 3...");

        require(ROM.checkStake(deployer) > 0);
        require(ROM.checkStake(address(9)) == 0);

        vm.stopBroadcast();
    }
}
