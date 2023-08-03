// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { TestHelperScript } from "script/test/utils/TestHelper.s.sol";
import { RiteOfMoloch } from "src/RiteOfMoloch.sol";

// create with verify
// forge script script/test/ShamanMint.s.sol:ShamanMintScript --rpc-url $RU --broadcast --verify --etherscan-api-key $EK
// -vvvv

// test; no broadcast
// forge script script/test/SacrificeMint.s.sol:SacrificeMintScript --rpc-url $RU -vvvv

contract ShamanMintScript is TestHelperScript {
    function run() public {
        vm.startBroadcast(vm.envUint("PK1"));

        // deploy ROM-clone
        riteOfMoloch = RiteOfMoloch(0xdE86E7702BE3e492ea1c34308954807C0a0Bd54d); // point to DAO that has approved ROM
            // as a shaman

        vm.stopBroadcast();

        vm.startBroadcast(vm.envUint("PK2"));
        token.approve(address(riteOfMoloch), minStake);
        riteOfMoloch.joinInitiation(0x37c5B029f9c3691B3d47cb024f84E5E257aEb0BB);
        vm.stopBroadcast();

        vm.startBroadcast(vm.envUint("PK3"));
        token.approve(address(riteOfMoloch), minStake);
        riteOfMoloch.joinInitiation(0xa25256073cB38b8CAF83b208949E7f746f3BEBDc);
        vm.stopBroadcast();

        vm.startBroadcast(vm.envUint("PK1"));
        riteOfMoloch.singleMintBaalShares(0xa25256073cB38b8CAF83b208949E7f746f3BEBDc);
        vm.stopBroadcast();

        vm.startBroadcast(vm.envUint("PK3"));
        riteOfMoloch.claimStake();
        vm.stopBroadcast();
    }
}
