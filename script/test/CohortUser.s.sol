// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "src/InitializationData.sol";
import {RiteOfMolochFactory} from "src/RiteOfMolochFactory.sol";
import {RiteOfMoloch} from "src/RiteOfMoloch.sol";
import {IHats} from "src/hats/IHats.sol";
import {ERC20} from "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

// create with verify
// forge script script/test/CohortUser.s.sol:CohortUserScript --rpc-url $RU --private-key $PK --broadcast --verify --etherscan-api-key $EK -vvvv

// create without verify
// forge script script/test/CohortUser.s.sol:CohortUserScript --rpc-url $RU --private-key $PK --broadcast -vvvv

contract CohortUserScript is Script, InitializationData {
    // constants
    ERC20 constant token = ERC20(0xA49dF10dD5B84257dE634F4350218f615471Fc69);
    address constant molochDAO = 0x69830F52d75Ed8d1431c17AECFe09F083dDc7761;
    // address constant admin1 = 0x1A4B691738C9c8Db8f2EDf0b9207f6acb24ADF07;
    address constant admin1 = 0xa25256073cB38b8CAF83b208949E7f746f3BEBDc;
    uint256 constant minStake = 250 * 10e18;

    // variables
    InitData Data;
    RiteOfMolochFactory public ROMF;
    RiteOfMoloch public ROM;

    // Hats
    IHats public HATS;
    uint256 public topHat;
    uint256 public factoryOperatorHat;
    address public hatsProtocol = 0xcf912a0193593f5cD55D81FF611c26c3ED63f924;

    function run() public {
        hatTreeFactory();

        createInitData();

        vm.startBroadcast();

        ROMF = new RiteOfMolochFactory(hatsProtocol, factoryOperatorHat);

        ROM = RiteOfMoloch(ROMF.createCohort(Data, 1));

        token.approve(address(ROM), minStake);

        vm.stopBroadcast();
    }

    function createInitData() public {
        Data.membershipCriteria = molochDAO;
        Data.stakingAsset = address(token);
        Data.treasury = molochDAO;
        Data.topHatWearer = address(0);
        Data.admin1 = admin1;
        Data.admin2 = address(0);
        Data.cohortSize = 2;
        Data.joinDuration = 20 minutes;
        Data.threshold = 10;
        Data.assetAmount = minStake;
        Data.stakeDuration = 1 minutes;
        Data.topHatId = 0;
        Data.cohortName = "SeasonV";
        Data.sbtName = "RiteOfMolochSBT";
        Data.sbtSymbol = "SBTMoloch";
        Data.baseUri = "";
    }

    function hatTreeFactory() public {
        HATS = IHats(hatsProtocol);

        topHat = HATS.mintTopHat(address(this), "ROM-Factoryx TopHat", "");

        factoryOperatorHat = HATS.createHat(
            topHat,
            "ROM-Factoryx Operator",
            1,
            molochDAO,
            molochDAO,
            true,
            ""
        );

        HATS.mintHat(factoryOperatorHat, msg.sender);
    }
}
