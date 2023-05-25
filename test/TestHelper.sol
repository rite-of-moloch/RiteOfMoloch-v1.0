// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {RiteOfMoloch} from "src/RiteOfMoloch.sol";
import {RiteOfMolochFactory} from "src/RiteOfMolochFactory.sol";
import {IInitData} from "src/interfaces/IInitData.sol";
import {TestToken} from "test/mocks/Token.sol";
import {Hats} from "hats-protocol/Hats.sol";

// forge test --match-contract TestHelper -vv

/**
 * @dev RiteOfMoloch line 139 needs to be changed for local testing:
 * from: _sharesToken = IERC20(baal.sharesToken());
 * to:   _sharesToken = IERC20(initData.stakingAsset);
 */

/**
 * @dev RiteOfMoloch line 239 needs to be commented out:
 * disable callerIsUser for Forge tests/scripts
 */

contract TestHelper is Test, IInitData {
    uint256 constant DAY_IN_SECONDS = 86400;

    address dao = 0x90F79bf6EB2c4f870365E785982E1f101E93b906;
    TestToken public stakingAsset;
    InitData Data;

    // DAO members
    address deployer = address(this); // superAdmin & admin
    address alice = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266; // admin
    address bob = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8; // user
    address charlie = 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC; // attacker

    // Admin Treasury
    address adminTreasury = address(0xcafebebe);

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
    uint256 minStake = 200 * 1e18;

    uint256 adminFee = 5;

    function setUp() public virtual {
        // set and deploy ROM-Factory
        setUpFactory();
        // set initial data for ROM clone
        createInitData();
        // // deploy ROM clone
        ROM = RiteOfMoloch(ROMF.createCohort(Data, 1));
    }

    function setUpFactory() public {
        // deploy Hats protocol
        HATS = new Hats("Local-Hats", "");
        // set token to be staked
        stakingAsset = new TestToken();
        // factory hats setup
        createFactoryHats();
        // deploy ROM factory
        ROMF = new RiteOfMolochFactory(address(HATS), factoryOperatorHat);
    }

    // INIT CLONE DATA
    function createInitData() public virtual {
        Data.membershipCriteria = dao;
        Data.stakingAsset = address(stakingAsset);
        Data.daoTreasury = dao;
        Data.admin1 = alice;
        Data.admin2 = address(0);
        Data.adminTreasury = address(0xcafebebe);
        Data.cohortSize = 3;
        Data.joinDuration = 2 weeks;
        Data.threshold = 10;
        Data.assetAmount = minStake;
        Data.stakeDuration = 1 weeks;
        Data.topHatId = 0;
        Data.adminFee = 5;
        Data.cohortName = "SeasonV";
        Data.sbtName = "RiteOfMolochSBT";
        Data.sbtSymbol = "SBTMoloch";
        Data.baseUri = "x";
        Data.shamanOn = false;
    }

    // UTILS
    function mintTokens(address[4] memory eoas) public {
        for (uint256 i = 0; i < eoas.length; i++) {
            stakingAsset.mint(eoas[i], 1000 * 1e18);
        }
    }

    function prankJoinInititation(address initiate) public {
        vm.startPrank(initiate);
        stakingAsset.approve(address(ROM), minStake);
        ROM.joinInitiation(initiate);
        vm.stopPrank();
    }

    function emitUserDeadline(string memory name, address initiate) public {
        emit log_named_uint(
            string.concat(name, " deadline"),
            ROM.getDeadline(initiate) / DAY_IN_SECONDS
        );
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

    // LOGS
    function testLogs() public {
        // deployer address
        emit log_named_address("ROM  Deployer", deployer);

        // LOGS
        /**
         * @dev uncomment logs to view deployment confirmations
         */
        // factoryDeployment();
        // tokenDeployment();
        // hatsIdentities();
        // cloneDeployment();
    }

    function tokenDeployment() public {
        emit log_named_address("Staking Asset", address(stakingAsset));
    }

    // factory deployment
    function factoryDeployment() public {
        emit log_named_address("ROMF Contract", address(ROMF));
    }

    // clone deployment
    function cloneDeployment() public {
        // contract addresses
        emit log_named_address("ROM  Contract", address(ROM));
        emit log_named_address("ROM  Treasury", ROM.daoTreasury());
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
        emit log_named_uint("Admin     Hat", ROM.adminHat());
    }
}
