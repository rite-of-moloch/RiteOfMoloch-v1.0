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
    address constant ROM_DAO = 0xc197931D784b8C1A0A206D14551c71a6088842Ca;
    address constant ROM_DAO_SAFE = 0x4Af06F8490c75d55A75488b022da7b1B734291Ce;
    address constant HATS_PROTOCOL = 0x850f3384829D7bab6224D141AFeD9A559d745E3D;
    address constant SUS_TREASURY = 0x849233B1a9ca424716458297589f474B250bf1f2;
    uint256 constant SUS_FEE = 10_000;

    uint256 topHatFactory;

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
        vm.startBroadcast(deployer);

        implementation = new RiteOfMoloch();

        // deploy ROM-factory
        // address _implementation,
        // address _hatsProtocol,
        // address _sustainabilityTreasury,
        // uint256 _sustainabilityFee,
        // address owner
        factory = new RiteOfMolochFactory(
            address(implementation),
            HATS_PROTOCOL,
            SUS_TREASURY,
            SUS_FEE,
            ROM_DAO
        );

        console2.log('"implementation": "%s"', address(implementation));
        console2.log('"factory": "%s"', address(factory));

        vm.stopBroadcast();
    }
}
