// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import { RiteOfMoloch } from "src/RiteOfMoloch.sol";
import { RiteOfMolochFactory } from "src/RiteOfMolochFactory.sol";
import { IHats } from "hats-protocol/Interfaces/IHats.sol";

import { console2 } from "forge-std/console2.sol";

// Simulate deployment:
// forge script script/ROMWithFactory.s.sol:ROMWithFactoryScript --fork-url gnosis --force

// Actual deployment:
// forge script script/ROMWithFactory.s.sol:ROMWithFactoryScript --broadcast --verify -vvvv --fork-url gnosis

contract ROMWithFactoryScript is Script {
    address internal deployer;
    uint256 internal deployerPk;

    // Contracts to deploy

    RiteOfMoloch implementation;
    RiteOfMolochFactory factory;

    // Hats interface and protocol implementation
    IHats internal hats;

    // RoM DAO
    address constant OPERATOR = 0xd083764c39Eddb70A749e0c1F808C14706b0CF44;
    address constant ROM_DAO_SAFE = 0x4Af06F8490c75d55A75488b022da7b1B734291Ce;
    address constant HATS_PROTOCOL = 0x9D2dfd6066d5935267291718E8AA16C8Ab729E9d;
    address constant SUS_TREASURY = 0x849233B1a9ca424716458297589f474B250bf1f2;
    uint256 constant SUS_FEE = 10_000;

    uint256 topHatFactory;

    // Operator hat for ROM-factory deployment
    uint256 public factoryOperatorHat;

    function setUp() public virtual {
        string memory mnemonic = vm.envString("MNEMONIC");
        if (bytes(mnemonic).length > 0) {
            console2.log("Using mnemonic");

            (deployer,) = deriveRememberKey(mnemonic, 0);
        } else {
            console2.log("Using private key");

            deployerPk = vm.envUint("PRIVATE_KEY");
        }

        hats = IHats(HATS_PROTOCOL);
    }

    function run() public {
        vm.startBroadcast();
        hatTreeSetup();

        implementation = new RiteOfMoloch();

        // deploy ROM-factory
        factory = new RiteOfMolochFactory(
            address(implementation),
            HATS_PROTOCOL,
            factoryOperatorHat,
            SUS_TREASURY,
            SUS_FEE
        );

        hats.transferHat(topHatFactory, msg.sender, ROM_DAO_SAFE);

        console2.log('"implementation": "%s"', address(implementation));
        console2.log('"factory": "%s"', address(factory));

        vm.stopBroadcast();
    }

    function hatTreeSetup() public {
        // this Script contract will be the admin of the factory (for development only)
        topHatFactory = hats.mintTopHat(msg.sender, "ROM-Factory TopHat", "");

        factoryOperatorHat = hats.createHat(topHatFactory, "ROM-Factory Operator", 2, OPERATOR, OPERATOR, true, "");

        hats.mintHat(factoryOperatorHat, OPERATOR);
        hats.mintHat(factoryOperatorHat, ROM_DAO_SAFE);
    }
}
