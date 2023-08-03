// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { TestHelperScript } from "script/test/utils/TestHelper.s.sol";
import { RiteOfMoloch } from "src/RiteOfMoloch.sol";
import { RiteOfMolochFactory } from "src/RiteOfMolochFactory.sol";

// create with verify
// forge script script/test/CohortUser.s.sol:CohortUserScript --rpc-url $RUG --broadcast --verify --etherscan-api-key
// $EK -vvvv
// forge script script/test/CohortUser.s.sol:CohortUserScript --rpc-url $RUS --broadcast --verify --etherscan-api-key
// $EK -vvvv

// test; no broadcast
// forge script script/test/CohortUser.s.sol:CohortUserScript --rpc-url $RUG -vvvv
// forge script script/test/CohortUser.s.sol:CohortUserScript --rpc-url $RUS -vvvv

contract CohortUserScript is TestHelperScript {
    function run() public {
        vm.startBroadcast(vm.envUint("PK1"));

        // setUpHelper();
        romFactory = RiteOfMolochFactory(0xfeaE869E19FC4f40Eb9d980c48689d247A160c81);

        // topHat: NO, shaman: NO
        createInitData(0, false);

        // deploy ROM-clone
        riteOfMoloch = RiteOfMoloch(romFactory.createCohort(cohortData, 1));

        // test joinInitiation
        joinCohort(deployer);

        riteOfMoloch.cryForHelp("testing 1, 2, 3...");

        require(riteOfMoloch.checkStake(deployer) > 0);
        require(riteOfMoloch.checkStake(address(9)) == 0);

        vm.stopBroadcast();
    }
}
