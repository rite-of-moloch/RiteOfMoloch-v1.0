// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "forge-std/Test.sol";
import "src/RiteOfMoloch.sol";
import "src/RiteOfMolochFactory.sol";
import "src/InitializationData.sol";
import "test/TestHelper.sol";
import "test/utils/TestToken.sol";
import {Hats} from "test/utils/hats/HatsT.sol";

// forge test --match-contract TestHelperB -vv

contract TestHelper is Test, InitializationData {
    uint256 constant DAY_IN_SECONDS = 86400;

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
    Hats public HATS;

    // Hats protocol implementation
    address public hatsProtocol;

    // Hats / roles
    uint256 public factoryTopHat;
    uint256 public factoryOperatorHat;

    // arbitrary DAO address for factory deployment
    address constant molochDAO = address(1);

    // staking
    uint256 minStake = 200;

    function setUpFactory() public {
        // deploy Hats protocol
        HATS = new Hats("Local-Hats", "");

        // set token to be staked
        daoToken = new TestToken();

        // factory hats setup
        createFactoryHats();

        // deploy ROM factory
        ROMF = new RiteOfMolochFactory(address(HATS), factoryOperatorHat);
    }

    // create initial data
    function createInitData() public virtual {
        Data.membershipCriteria = dao;
        Data.stakingAsset = address(daoToken);
        Data.treasury = dao;
        Data.topHatWearer = address(0);
        Data.admin1 = alice;
        Data.admin2 = address(0);
        Data.cohortSize = 3;
        Data.joinDuration = 2 weeks;
        Data.threshold = 10;
        Data.assetAmount = minStake;
        Data.stakeDuration = 1 weeks;
        Data.topHatId = 0;
        Data.cohortName = "SeasonV";
        Data.sbtName = "RiteOfMolochSBT";
        Data.sbtSymbol = "SBTMoloch";
        Data.baseUri = "x";
    }

    function createFactoryHats() public {
        // mint topHat
        factoryTopHat = HATS.mintTopHat(address(this), "Factory-TopHat", "");

        // create factory operator hat
        factoryOperatorHat = HATS.createHat(
            factoryTopHat,
            "Factory-Operator",
            1,
            molochDAO,
            molochDAO,
            true,
            ""
        );

        // mint factory operator
        HATS.mintHat(factoryOperatorHat, msg.sender);

        HATS.transferHat(factoryTopHat, address(this), address(444444));
    }

    function mintTokens() public {
        daoToken.mint(alice, 1000);
        daoToken.mint(bob, 1000);
        daoToken.mint(charlie, 1000);
        daoToken.mint(deployer, 1000);
    }

    // deployment logs
    function testLogs() public {
        // deployer address
        emit log_named_address("ROM  Deployer", deployer);

        // factoryDeployment();
        // cloneDeployment();
        // hatsIdentities();
    }

    // factory deployment
    function factoryDeployment() public {
        emit log_named_address("ROMF Contract", address(ROMF));
    }

    // clone deployment
    function cloneDeployment() public {
        // contract addresses
        emit log_named_address("ROM  Contract", address(ROM));
        emit log_named_address("ROM  Treasury", ROM.treasury());

        // cohort settings
        emit log_named_uint("Min     Share", ROM.minimumShare());
        emit log_named_uint("Min     Stake", ROM.minimumStake());
        emit log_named_uint(
            "Max      Time",
            ROM.maximumTime() / DAY_IN_SECONDS
        );
    }

    // Hat ids
    function hatsIdentities() public {
        // protocol
        emit log_named_address("Hats Protocol", address(ROM.HATS()));
        // hats
        emit log_named_uint("Top       Hat", ROM.topHat());
        emit log_named_uint("SupAdmin  Hat", ROM.superAdminHat());
        emit log_named_uint("Admin     Hat", ROM.adminHat());
    }
}
