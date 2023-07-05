// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { TestHelperScript } from "script/test/utils/TestHelper.s.sol";
import { RiteOfMoloch } from "src/RiteOfMoloch.sol";

// create with verify and broadcast
// forge script script/test/ShamanHatTrans.s.sol:ShamanHatTransScript --rpc-url $RU --broadcast --verify
// --etherscan-api-key $EK -vvvv

// test; no broadcast
// forge script script/test/ShamanHatTrans.s.sol:ShamanHatTransScript --rpc-url $RU -vvvv

contract ShamanHatTransScript is TestHelperScript {
    function run() public {
        vm.startBroadcast(vm.envUint("PK1"));

        // set ROM-clone
        riteOfMoloch = RiteOfMoloch(0xdE86E7702BE3e492ea1c34308954807C0a0Bd54d);

        riteOfMoloch.transferAdminHatProposal(
            0xD5d1bb95259Fe2c5a84da04D1Aa682C71A1B8C0E, 0x37c5B029f9c3691B3d47cb024f84E5E257aEb0BB
        );

        vm.stopBroadcast();
    }
}
