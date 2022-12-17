// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Script.sol";

contract CloneROMScript is Script {
	function setUp() public {}

	function run() public {
		vm.startBroadcast();
		// lookup deployed ROMF

		// create InitData struct

		// call createCohort on ROMF w/ InitData
		
		vm.stopBroadcast();
	}
}