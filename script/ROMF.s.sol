// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Script.sol";
import { RiteOfMolochFactory } from "src/RiteOfMolochFactory.sol";

contract ROMFScript is Script {
	function setUp() public {}

	function run() public {
		vm.startBroadcast();
		new RiteOfMolochFactory();
		vm.stopBroadcast();
	}
}