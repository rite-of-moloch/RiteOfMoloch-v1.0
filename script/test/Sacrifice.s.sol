// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {TestHelperScript} from "script/test/utils/TestHelper.s.sol";
import {RiteOfMoloch} from "src/RiteOfMoloch.sol";

// create with verify and broadcast
// forge script script/test/Sacrifice.s.sol:SacrificeScript --rpc-url $RUS --broadcast --verify --etherscan-api-key $EK -vvvv

// test; no broadcast
// forge script script/test/Sacrifice.s.sol:SacrificeScript --rpc-url $RUS -vvvv

contract SacrificeScript is TestHelperScript {
    function run() public {
        vm.startBroadcast(vm.envUint("PK1"));

        setUpHelper();

        // topHat: NO, shaman: NO
        createInitData(0, false);

        // deploy ROM-clone
        riteOfMoloch = RiteOfMoloch(romFactory.createCohort(cohortData, 1));

        // test joinInitiation multiple
        joinCohort(deployer);
        vm.stopBroadcast();

        vm.startBroadcast(vm.envUint("PK2"));
        joinCohort(0x37c5B029f9c3691B3d47cb024f84E5E257aEb0BB);
        vm.stopBroadcast();

        vm.startBroadcast(vm.envUint("PK3"));
        joinCohort(0xa25256073cB38b8CAF83b208949E7f746f3BEBDc);
        vm.stopBroadcast();

        vm.startBroadcast(vm.envUint("PK1"));
        riteOfMoloch.sacrifice();
        vm.stopBroadcast();
    }
}
