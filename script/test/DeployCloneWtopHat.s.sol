// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {TestHelperScript} from "script/utils/TestHelper.s.sol";

// create with verify
// forge script script/test/DeployCloneWtopHat.s.sol:DeployCloneWtopHatScript --rpc-url $RU --private-key $PK --broadcast --verify --etherscan-api-key $EK -vvvv

contract DeployCloneWtopHatScript is TestHelperScript {
    function run() public {
        setUp();

        // DAO's topHat id
        topHatMoloch = 2129835786704900543778694191874550823217334409380705226007185209688064;

        // check id is topHat
        require(HATS.isTopHat(topHatMoloch), "Hat is not topHat!");

        // check that DAO is wearer / admin of topHat id
        require(
            HATS.isAdminOfHat(baalAvatar, topHatMoloch),
            "DAO not owner of hat!"
        );

        // topHat: YES, shaman: NO
        createInitData(topHatMoloch, false);

        vm.startBroadcast();

        // deploy ROM-factory and produce ROM-clone
        ROMF = new RiteOfMolochFactory(hatsProtocol, factoryOperatorHat);
        ROM = RiteOfMoloch(ROMF.createCohort(Data, 1));

        vm.stopBroadcast();
    }
}
