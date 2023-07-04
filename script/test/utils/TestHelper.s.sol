// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "src/interfaces/IInitData.sol";
import {RiteOfMolochFactory} from "src/RiteOfMolochFactory.sol";
import {RiteOfMoloch} from "src/RiteOfMoloch.sol";
import {IHats} from "hats-protocol/Interfaces/IHats.sol";
import {ERC20} from "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {IBaal} from "src/baal/IBaal.sol";

/**
 * @dev RiteOfMoloch line 239 needs to be commented out:
 * disable callerIsUser for Forge tests/scripts
 */

contract TestHelperScript is Script, IInitData {
    // test token for staking asset
    ERC20 public constant token = ERC20(0xB6Bd6e0e1A104782EB6477120C7Aaf424e0656E1);
    uint256 public constant minStake = (10 * 1e18) / 2; // 0.5 erc20token

    // Baal V3 address and Gnosis Safe Avatar (treasury)
    IBaal public constant baal = IBaal(0x6053dE194226843E4FD99A82C1386B4C76E19E34);
    address public constant baalAvatar = 0x473472560B4bce45249B045699dd45d761ed300d;

    // contracts
    InitData cohortData;
    RiteOfMolochFactory public romFactory;
    RiteOfMoloch public riteOfMoloch;

    // EOAs
    address public constant deployer = 0x1A4B691738C9c8Db8f2EDf0b9207f6acb24ADF07;
    address public constant admin1 = 0xa25256073cB38b8CAF83b208949E7f746f3BEBDc;

    // Hats interface and current deployment release
    IHats public hats;
    address public constant hatsProtocol = 0x9D2dfd6066d5935267291718E8AA16C8Ab729E9d;

    // Hats topHat for testing Baal proposal with existing topHat
    uint256 public topHatMoloch;

    // Hats for ROM-Factory, not for ROM-clone (for development only)
    uint256 public factoryOperatorHat;
    uint256 public topHatFactory;

    // sustainability
    address adminTreasury = 0x849233B1a9ca424716458297589f474B250bf1f2;
    uint256 adminFee = 0;

    /**
     * @dev initialization data for ROM-clone
     * @param _topHat = 0 || id of DAO's topHat
     * @param _shamanOn = true || false, to make ROM-clone a Manager-Shaman of Baal
     */
    function createInitData(uint256 _topHat, bool _shamanOn) public {
        cohortData.membershipCriteria = address(baal);
        cohortData.stakingAsset = address(token);
        cohortData.daoTreasury = baalAvatar;
        cohortData.admin1 = admin1;
        cohortData.admin2 = address(0);
        cohortData.cohortSize = 5;
        cohortData.joinDuration = 10 days;
        cohortData.threshold = 10;
        cohortData.assetAmount = minStake;
        cohortData.stakeDuration = 10 days;
        cohortData.topHatId = _topHat; // hats proposal data
        cohortData.cohortName = "SeasonV";
        cohortData.sbtName = "RiteOfMolochSBT";
        cohortData.sbtSymbol = "SBTMoloch";
        cohortData.baseUri = "";
        cohortData.shamanOn = _shamanOn; // shaman proposal data
    }

    /**
     * @dev this Hats setup is only for ROM-Factory admin, not for ROM-clone
     */
    function hatTreeSetup() public {
        // this Script contract will be the admin of the factory (for development only)
        topHatFactory = hats.mintTopHat(deployer, "ROM-Factory TopHat", "");

        factoryOperatorHat = hats.createHat(
            topHatFactory,
            "ROM-Factory Operator",
            2,
            address(333), // arbitrary elgibility addr
            address(333), // arbitrary toggle addr
            true,
            ""
        );

        hats.mintHat(factoryOperatorHat, deployer);
    }

    function setUpHelper() public {
        // check link between Baal and Avatar
        require(baalAvatar == baal.avatar(), "Incorrect avatar");

        // set Hats protocol implementation
        hats = IHats(hatsProtocol);

        // create Hats tree for ROM-Factory
        hatTreeSetup();

        // deploy ROM-factory
        romFactory = new RiteOfMolochFactory(
            hatsProtocol,
            factoryOperatorHat,
            adminTreasury,
            adminFee
        );
    }

    function joinCohort(address initiate) public {
        // approve tokens to be used by ROM
        token.approve(address(riteOfMoloch), minStake);

        // stake on ROM contract
        riteOfMoloch.joinInitiation(initiate);

        // check staking deadline (to confirm successful join)
        riteOfMoloch.deadlines(initiate);
    }
}
