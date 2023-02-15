// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {TestHelperScript} from "script/test/utils/TestHelper.s.sol";
import {RiteOfMoloch} from "src/RiteOfMoloch.sol";

// create with verify
// forge script script/test/AccessControl.s.sol:AccessControlScript --rpc-url $RU --broadcast --verify --etherscan-api-key $EK -vvvv

// test; no broadcast
// forge script script/test/AccessControl.s.sol:AccessControlScript --rpc-url $RU -vvvv

contract AccessControlScript is TestHelperScript {
    function run() public {
        vm.startBroadcast(vm.envUint("PK1"));

        setUpHelper();

        // topHat: NO, shaman: NO
        createInitData(0, false);

        // deploy ROM-clone
        ROM = RiteOfMoloch(ROMF.createCohort(Data, 1));

        uint256 joinTime1 = ROM.joinDuration();
        ROM.changeJoinTimeDuration(20 days);
        uint256 joinTime2 = ROM.joinDuration();
        require(joinTime1 < joinTime2);

        uint256 endTime1 = ROM.joinEndTime();
        ROM.extendJoinTimeLimit(7 days);
        uint256 endTime2 = ROM.joinEndTime();
        require(endTime1 + 7 days == endTime2);

        uint256 sizeLimit1 = ROM.cohortSize();
        ROM.changeJoinSizeLimit(99);
        uint256 sizeLimit2 = ROM.cohortSize();
        require(sizeLimit1 < sizeLimit2);

        ROM.setMinimumStake(55);
        ROM.setShareThreshold(65);
        ROM.setMaxDuration(75);

        vm.stopBroadcast();
    }
}
