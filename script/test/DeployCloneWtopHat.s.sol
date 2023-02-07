// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "src/InitializationData.sol";
import {RiteOfMolochFactory} from "src/RiteOfMolochFactory.sol";
import {RiteOfMoloch} from "src/RiteOfMoloch.sol";
import {IHats} from "src/hats/IHats.sol";
import {ERC20} from "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {IBaal} from "src/baal/IBaal.sol";

// create with verify
// forge script script/test/DeployCloneWtopHat.s.sol:DeployCloneWtopHatScript --rpc-url $RU --private-key $PK --broadcast --verify --etherscan-api-key $EK -vvvv

// --use solc:0.8.13

// create without verify
// forge script script/test/DeployCloneWtopHat.s.sol:DeployCloneWtopHatScript --rpc-url $RU --private-key $PK --broadcast -vvvv

contract DeployCloneWtopHatScript is Script, InitializationData {
    // constants
    ERC20 constant token = ERC20(0xA49dF10dD5B84257dE634F4350218f615471Fc69);
    IBaal constant baal = IBaal(0x6053dE194226843E4FD99A82C1386B4C76E19E34);
    address constant baalAvatar = 0x473472560B4bce45249B045699dd45d761ed300d;
    address constant deployer = 0x1A4B691738C9c8Db8f2EDf0b9207f6acb24ADF07;
    address constant admin1 = 0xa25256073cB38b8CAF83b208949E7f746f3BEBDc;
    uint256 constant minStake = 250 * 10e18;

    // variables
    InitData Data;
    RiteOfMolochFactory public ROMF;
    // RiteOfMolochFactory public ROMF =
    //     RiteOfMolochFactory(0x225DDADbf700C5DF4dA7A3E0e02cfFE3770E3709);
    RiteOfMoloch public ROM;
    // Hats
    IHats public HATS;
    uint256 public topHatFactory;
    uint256 public topHatMoloch =
        2129835786704900543778694191874550823217334409380705226007185209688064;
    uint256 public factoryOperatorHat;
    address public hatsProtocol = 0xcf912a0193593f5cD55D81FF611c26c3ED63f924;

    function run() public {
        require(baalAvatar == baal.avatar(), "Incorrect avatar");

        HATS = IHats(hatsProtocol);

        require(HATS.isTopHat(topHatMoloch), "Hat is not topHat!");

        require(
            HATS.isAdminOfHat(baalAvatar, topHatMoloch),
            "DAO not owner of hat!"
        );

        hatTreeSetup();

        createInitData();

        vm.startBroadcast();

        ROMF = new RiteOfMolochFactory(hatsProtocol, factoryOperatorHat);

        ROM = RiteOfMoloch(ROMF.createCohort(Data, 1));

        vm.stopBroadcast();
    }

    function createInitData() public {
        Data.membershipCriteria = address(baal);
        Data.stakingAsset = address(token);
        Data.treasury = baalAvatar;
        Data.admin1 = admin1;
        Data.admin2 = address(0);
        Data.cohortSize = 5;
        Data.joinDuration = 10 days;
        Data.threshold = 10;
        Data.assetAmount = minStake;
        Data.stakeDuration = 10 days;
        Data.topHatId = topHatMoloch;
        Data.cohortName = "SeasonV";
        Data.sbtName = "RiteOfMolochSBT";
        Data.sbtSymbol = "SBTMoloch";
        Data.baseUri = "";
        Data.shamanOn = false;
    }

    function hatTreeSetup() public {
        // Hat for ROM Factory
        topHatFactory = HATS.mintTopHat(
            address(this),
            "ROM-Factoryx TopHat",
            ""
        );

        factoryOperatorHat = HATS.createHat(
            topHatFactory,
            "ROM-Factoryx Operator",
            1,
            baalAvatar,
            baalAvatar,
            true,
            ""
        );

        HATS.mintHat(factoryOperatorHat, msg.sender);
    }
}
