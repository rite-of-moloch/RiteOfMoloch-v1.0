pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "src/RiteOfMoloch.sol";
import "src/RiteOfMolochFactory.sol";
import "src/InitializationData.sol";

// forge test --match-contract TestHelper -vv

contract TestHelper is Test, InitializationData {
	RiteOfMoloch public ROM;
	RiteOfMolochFactory public ROMF;

	address deployer = address(this);

	function setUp() public {}

	function testCloneROM() public {
		InitData memory Data;
		Data.membershipCriteria = 0x7BdE8f8A3D59b42d0d8fab3a46E9f42E8e3c2dE8;
		Data.stakingAsset = 0x18E9262e68Cc6c6004dB93105cc7c001BB103e49;
		Data.treasury = 0x7BdE8f8A3D59b42d0d8fab3a46E9f42E8e3c2dE8;
		Data.threshold = 10;
		Data.assetAmount = 10;
		Data.duration = 10;
		Data.name = "RiteOfMolochSBT";
		Data.symbol = "SBTMoloch";
		Data.baseUri = "";

		emit log_named_address("ROM Contract", ROMF.createCohort(Data, 1));
		// ROM = RiteOfMoloch(ROMF.createCohort(Data, 1));
		// emit log_named_address("ROM Contract", address(ROM));
		// emit log_named_address("ROM Treasury", ROM.treasury());
	}
}