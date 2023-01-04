// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";

// import "src/inheritedSetup/RiteOfMoloch2.sol";
import "src/RiteOfMoloch.sol";

import "src/RiteOfMolochFactory.sol";
import "src/InitializationData.sol";
import "test/utils/TestToken.sol";
import {Hats} from "test/utils/hats/HatsT.sol";

// forge test --match-contract TestHelperB -vv

contract TestHelperB is Test, InitializationData {
    event Log(string message);

    address dao = 0x90F79bf6EB2c4f870365E785982E1f101E93b906;
    TestToken public daoToken;
    InitData Data;

    // DAO members
    address deployer = address(this); // superAdmin & admin
    address alice = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266; // admin
    address bob = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8; // user
    address charlie = 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC; // attacker

    // ROM factory and clone seed
    RiteOfMoloch public ROM;
    RiteOfMolochFactory public ROMF;

    // Hats protocol
    Hats public hats;

    function setUp() public {
        // set token to be staked
        daoToken = new TestToken();

        // deploy Hats protocol
        hats = new Hats("Local-Hats", "");

        // deploy ROM factory
        ROMF = new RiteOfMolochFactory();

        ROMF.addHatsProtocol(5, address(hats));

        // set initial data for ROM clone
        createInitData();

        // deploy ROM clone
        ROM = RiteOfMoloch(ROMF.createCohort(Data, 1));
    }

    // create initial data
    function createInitData() public {
        Data.membershipCriteria = dao;
        Data.stakingAsset = address(daoToken);
        Data.treasury = dao;
        Data.topHatWearer = address(0);
        Data.admin1 = alice;
        Data.admin2 = address(0);
        Data.threshold = 10;
        Data.assetAmount = 10;
        Data.duration = 10;
        Data.chainId = 5;
        Data.topHatId = 0;
        Data.name = "RiteOfMolochSBT";
        Data.symbol = "SBTMoloch";
        Data.baseUri = "";
    }

    // log deployment information
    function testCloneDeployment() public {
        // deployer address
        emit log_named_address("ROM  Deployer", deployer);
        // contract addresses
        emit log_named_address("ROMF Contract", address(ROMF));
        emit log_named_address("ROM  Contract", address(ROM));
        emit log_named_address("ROM  Treasury", ROM.treasury());
        emit log_named_address("Hats Protocol", address(ROM.HATS()));
        // Hat ids
        emit log_named_uint("Top       Hat", ROM.topHat());
        emit log_named_uint("SupAdmin  Hat", ROM.superAdminHat());
        emit log_named_uint("Admin     Hat", ROM.adminHat());
        // cohort settings
        emit log_named_uint("Min     Share", ROM.minimumShare());
        emit log_named_uint("Min     Stake", ROM.minimumStake());
        emit log_named_uint("Max      Time", ROM.maximumTime());
    }
}
