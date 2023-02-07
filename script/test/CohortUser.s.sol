// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {TestHelperScript} from "script/test/utils/TestHelper.s.sol";
import {RiteOfMoloch} from "src/RiteOfMoloch.sol";

// create with verify
// forge script script/test/CohortUser.s.sol:CohortUserScript --rpc-url $RU --private-key $PK --broadcast --verify --etherscan-api-key $EK -vvvv

contract CohortUserScript is TestHelperScript {
    function run() public {
        vm.startBroadcast();

        setUpHelper();

        // topHat: NO, shaman: NO
        createInitData(0, false);

        // deploy ROM-clone
        ROM = RiteOfMoloch(ROMF.createCohort(Data, 1));

        // test joinInitiation
        joinCohort();

        vm.stopBroadcast();
    }

    function joinCohort() public {
        // approve tokens to be used by ROM
        token.approve(address(ROM), minStake);

        // stake on ROM contract
        ROM.joinInitiation(deployer);

        // check staking deadline (to confirm successful join)
        ROM.deadlines(deployer);
    }
}
