// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "src/RiteOfMoloch.sol";
import "src/RiteOfMolochFactory.sol";
import "src/InitializationData.sol";
import "./utils/TestToken.sol";

// forge test --match-contract TestHelper -vv

contract TestHelper is Test, InitializationData {
	address deployer = address(this);
	TestToken public daoToken;
	InitData Data;

	RiteOfMoloch public ROM;
	RiteOfMolochFactory public ROMF;

	function setUp() public {
		// set token to be staked
		daoToken = new TestToken();

		// deploy ROM factory
		ROMF = new RiteOfMolochFactory();

		// set initial data for ROM clone
		createInitData();

		// deploy ROM clone
		ROM = RiteOfMoloch(ROMF.createCohort(Data, 1));
	}

	function createInitData() public {
		Data.membershipCriteria = address(0);
		Data.stakingAsset = address(daoToken);
		Data.treasury = address(0);
		Data.threshold = 10;
		Data.assetAmount = 10;
		Data.duration = 10;
		Data.name = "RiteOfMolochSBT";
		Data.symbol = "SBTMoloch";
		Data.baseUri = "";
	}

	function testCloneDeployment() public {
		emit log_named_address("ROM Contract", address(ROM));
		emit log_named_address("ROM Treasury", ROM.treasury());
		emit log_named_uint("min share", ROM.minimumShare());
		emit log_named_uint("min stake", ROM.minimumStake());
		emit log_named_uint("max  time", ROM.maximumTime());
	}
}
