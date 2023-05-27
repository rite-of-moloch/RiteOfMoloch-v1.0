// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {RiteOfMolochFactory} from "src/RiteOfMolochFactory.sol";
import {IHats} from "hats-protocol/Interfaces/IHats.sol";

// create with verify
// forge script script/ROMFactory.s.sol:ROMFactoryScript --rpc-url $RUS --private-key $PK --broadcast --verify --etherscan-api-key $EK -vvvv
// forge script script/ROMFactory.s.sol:ROMFactoryScript --rpc-url https://rpc.gnosischain.com --private-key $PK --broadcast --verify --etherscan-api-key $GK -vvvv

contract ROMFactoryScript is Script {
    // Hats interface and protocol implementation
    IHats internal HATS;
    address constant OPERATOR = 0xd083764c39Eddb70A749e0c1F808C14706b0CF44;
    address constant ROM_DAO_SAFE = 0x4Af06F8490c75d55A75488b022da7b1B734291Ce;
    address constant hatsProtocol = 0x9D2dfd6066d5935267291718E8AA16C8Ab729E9d;
    address constant susTreasury = 0x849233B1a9ca424716458297589f474B250bf1f2;
    uint256 constant susFee = 1;

    uint256 topHatFactory;

    // Operator hat for ROM-factory deployment
    uint256 public factoryOperatorHat;

    function setUp() public {
        HATS = IHats(hatsProtocol);
    }

    function run() public {
        vm.startBroadcast();
        hatTreeSetup();

        // deploy ROM-factory
        new RiteOfMolochFactory(
            hatsProtocol,
            factoryOperatorHat,
            susTreasury,
            susFee
        );

        HATS.transferHat(topHatFactory, msg.sender, ROM_DAO_SAFE);

        vm.stopBroadcast();
    }

    function hatTreeSetup() public {
        // this Script contract will be the admin of the factory (for development only)
        topHatFactory = HATS.mintTopHat(msg.sender, "ROM-Factory TopHat", "");

        factoryOperatorHat = HATS.createHat(
            topHatFactory,
            "ROM-Factory Operator",
            3,
            OPERATOR,
            OPERATOR,
            true,
            ""
        );

        HATS.mintHat(factoryOperatorHat, OPERATOR);
        HATS.mintHat(
            factoryOperatorHat,
            0x81865ebC7694Dfba6608F6503BBA50Abb04644b4
        );
        HATS.mintHat(
            factoryOperatorHat,
            0x1C9F765C579F94f6502aCd9fc356171d85a1F8D0
        );
    }
}
