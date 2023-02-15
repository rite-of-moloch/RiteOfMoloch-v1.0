// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {TestHelperScript} from "script/test/utils/TestHelper.s.sol";
import {RiteOfMoloch} from "src/RiteOfMoloch.sol";

// create with verify
// forge script script/test/DeployCloneWtopHat.s.sol:DeployCloneWtopHatScript --rpc-url $RU --broadcast --verify --etherscan-api-key $EK -vvvv

contract DeployCloneWtopHatScript is TestHelperScript {
    function run() public {
        vm.startBroadcast(vm.envUint("PK1"));

        setUpHelper();

        // DAO's topHat id
        topHatMoloch = 215679573337205118357336120696157045389097155380324579848828881993728;

        // check id is topHat
        require(HATS.isTopHat(topHatMoloch), "Hat is not topHat!");

        // check that DAO is wearer / admin of topHat id
        require(
            HATS.isAdminOfHat(baalAvatar, topHatMoloch),
            "DAO not owner of hat!"
        );

        // topHat: YES, shaman: NO
        createInitData(topHatMoloch, false);

        // deploy ROM-clone
        ROM = RiteOfMoloch(ROMF.createCohort(Data, 1));

        vm.stopBroadcast();
    }
}
