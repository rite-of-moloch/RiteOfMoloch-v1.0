// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {TestHelperScript} from "script/test/utils/TestHelper.s.sol";
import {RiteOfMoloch} from "src/RiteOfMoloch.sol";

// create with verify
// forge script script/test/DeployCloneWtopHatWshaman.s.sol:DeployCloneWtopHatWshamanScript --rpc-url $RU --broadcast --verify --etherscan-api-key $EK -vvvv

contract DeployCloneWtopHatWshamanScript is TestHelperScript {
    function run() public {
        vm.startBroadcast(vm.envUint("PK1"));

        setUpHelper();

        // DAO's topHat id
        topHatMoloch = 215679573337205118357336120696157045389097155380324579848828881993728;

        // check id is topHat
        require(hats.isTopHat(topHatMoloch), "Hat is not topHat!");

        // check that DAO is wearer / admin of topHat id
        require(hats.isAdminOfHat(baalAvatar, topHatMoloch), "DAO not owner of hat!");

        // topHat: YES, shaman: YES
        createInitData(topHatMoloch, true);

        // deploy ROM-clone
        riteOfMoloch = RiteOfMoloch(romFactory.createCohort(cohortData, 1));

        vm.stopBroadcast();
    }
}
