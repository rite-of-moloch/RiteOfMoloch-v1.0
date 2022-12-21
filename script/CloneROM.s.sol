// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Script.sol";
import "forge-std/Test.sol";
import { RiteOfMolochFactory } from "src/RiteOfMolochFactory.sol";
import "src/InitializationData.sol";

contract CloneROMScript is Script, InitializationData, Test {
	RiteOfMolochFactory public ROMF = RiteOfMolochFactory(0xd13A6B033F98994B1897CeFCCae673D3d1BF0892);
	InitData Data;
	uint256 id; // implementatin id
	address dao = 0x69830F52d75Ed8d1431c17AECFe09F083dDc7761;
	address token = 0x1Cfb862056ecF2677615F9eB3420B04fb4911C01;

	function setUp() public {}

	function run() public {
		vm.startBroadcast();

		// create InitData struct
		createInitData();

		// set implementation id
		id = id + 1;

		// call createCohort on ROMF w/ InitData
		emit log_named_address("ROM Contract", ROMF.createCohort(Data, id));

		vm.stopBroadcast();
	}

	// create initial data
	function createInitData() public {
		Data.membershipCriteria = dao;
		Data.stakingAsset = token;
		Data.treasury = dao;
		Data.threshold = 10;
		Data.assetAmount = 10;
		Data.duration = 10;
		Data.name = "RiteOfMolochSBT";
		Data.symbol = "SBTM";
		Data.baseUri = "";
	}
}