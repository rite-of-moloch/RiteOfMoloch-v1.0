// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.13;

// import "forge-std/Script.sol";
// import {RiteOfMoloch} from "src/singletons/RiteOfMolochSingleton.sol";
// import {IHats} from "src/hats/IHats.sol";

// // create with verify
// // forge script script/VerifySingleton.s.sol:VerifySingletonScript --rpc-url $RU --private-key $PK --broadcast --verify --etherscan-api-key $EK -vvvv

// contract VerifySingletonScript is Script {
//     function setUp() public {}

//     function run() public {
//         vm.startBroadcast();

//         new RiteOfMoloch();

//         vm.stopBroadcast();
//     }
// }
