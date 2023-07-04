// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {RiteOfMoloch} from "src/RiteOfMoloch.sol";
import {RiteOfMolochFactory} from "src/RiteOfMolochFactory.sol";
import {IInitData} from "src/interfaces/IInitData.sol";
import {TestToken} from "test/mocks/Token.sol";
import {Hats} from "hats-protocol/Hats.sol";
import {IBaal} from "src/baal/IBaal.sol";

// forge test --match-contract TestHelper -vv

contract TestHelper is Test, IInitData {
    uint256 constant DAY_IN_SECONDS = 86400;

    address dao = 0x90F79bf6EB2c4f870365E785982E1f101E93b906;
    TestToken public stakingAsset = new TestToken();
    TestToken public sharesToken = new TestToken();

    InitData data;

    // DAO members
    address deployer = address(this); // superAdmin & admin
    address alice = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266; // admin
    address bob = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8; // user
    address charlie = 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC; // attacker

    // ROM factory and clone seed
    RiteOfMoloch public riteOfMoloch;
    RiteOfMolochFactory public romFactory;

    // Hats protocol
    Hats public hatsProtocol;

    // Hats / roles
    uint256 public factoryTopHat;
    uint256 public factoryOperatorHat;

    // arbitrary DAO address for factory deployment
    address constant molochDAO = address(1);

    // staking
    uint256 minStake = 200 ether;

    // Treasury that will receive sustainability fee
    address sustainabilityTreasury = address(0xcafebebe);

    // %5 of 1 milion (PERC_POINTS = 1e6)
    uint256 sustainabilityFee = 50_000;

    function setUp() public virtual {
        vm.mockCall(dao, abi.encodeWithSelector(IBaal.sharesToken.selector), abi.encode(sharesToken));
        // set and deploy ROM-Factory
        setUpFactory();
        // set initial data for ROM clone
        createInitData();
        // deploy ROM clone with default implementation (0)
        riteOfMoloch = RiteOfMoloch(romFactory.createCohort(data, 0));
    }

    function setUpFactory() public {
        // deploy Hats protocol
        hatsProtocol = new Hats("Local-Hats", "");

        // factory hats setup
        createFactoryHats();
        // deploy ROM factory
        romFactory = new RiteOfMolochFactory(
            address(hatsProtocol),
            factoryOperatorHat,
            sustainabilityTreasury,
            sustainabilityFee
        );
    }

    // INIT CLONE DATA
    function createInitData() public virtual {
        data.membershipCriteria = dao;
        data.stakingAsset = address(stakingAsset);
        data.daoTreasury = dao;
        data.admin1 = alice;
        data.admin2 = address(0);
        data.cohortSize = 3;
        data.joinDuration = 2 weeks;
        data.threshold = 10;
        data.assetAmount = minStake;
        data.stakeDuration = 1 weeks;
        data.topHatId = 0;
        data.cohortName = "SeasonV";
        data.sbtName = "RiteOfMolochSBT";
        data.sbtSymbol = "SBTMoloch";
        data.baseUri = "x";
        data.shamanOn = false;
    }

    // UTILS
    function mintTokens(address eoa) public {
        stakingAsset.mint(eoa, 1000 ether);
    }

    function mintTokens(address[4] memory eoas) public {
        for (uint256 i = 0; i < eoas.length; i++) {
            stakingAsset.mint(eoas[i], 1000 ether);
        }
    }

    function prankJoinInititation(address initiate) public {
        vm.startPrank(initiate, initiate);
        stakingAsset.approve(address(riteOfMoloch), minStake);
        riteOfMoloch.joinInitiation(initiate);
        vm.stopPrank();
    }

    function emitUserDeadline(string memory name, address initiate) public {
        emit log_named_uint(string.concat(name, " deadline"), riteOfMoloch.getDeadline(initiate) / DAY_IN_SECONDS);
    }

    function createFactoryHats() public {
        // mint topHat
        factoryTopHat = hatsProtocol.mintTopHat(address(this), "Factory-TopHat", "");

        // create factory operator hat
        factoryOperatorHat =
            hatsProtocol.createHat(factoryTopHat, "Factory-Operator", 1, molochDAO, molochDAO, true, "");
        // mint factory operator
        hatsProtocol.mintHat(factoryOperatorHat, msg.sender);
        hatsProtocol.transferHat(factoryTopHat, address(this), address(444444));
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
        emit log_named_address("ROMF Contract", address(romFactory));
    }

    // clone deployment
    function cloneDeployment() public {
        // contract addresses
        emit log_named_address("ROM  Contract", address(romFactory));
        emit log_named_address("ROM  Treasury", riteOfMoloch.daoTreasury());
        // cohort settings
        emit log_named_uint("Min     Share", riteOfMoloch.minimumShare());
        emit log_named_uint("Min     Stake", riteOfMoloch.minimumStake());
        emit log_named_uint("Max      Time", riteOfMoloch.maximumTime() / DAY_IN_SECONDS);
    }

    // Hat ids
    function hatsIdentities() public {
        // protocol
        emit log_named_address("Hats Protocol", address(hatsProtocol));
        // hats
        emit log_named_uint("Top       Hat", riteOfMoloch.topHat());
        emit log_named_uint("Admin     Hat", riteOfMoloch.adminHat());
    }
}
