// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import { RiteOfMoloch } from "src/RiteOfMoloch.sol";
import { RiteOfMolochFactory } from "src/RiteOfMolochFactory.sol";
import { MockInits, IInitData } from "script/deploy/mockInits.sol";
import { IHats } from "hats-protocol/Interfaces/IHats.sol";

contract DeployHelper is MockInits {
    // ROM contract;
    RiteOfMoloch public riteOfMoloch;

    // ROM factory contract
    RiteOfMolochFactory public romFactory;
    // Hats protocol implementation on Goerli
    address public hatsProtocol = 0x96bD657Fcc04c71B47f896a829E5728415cbcAa1;
    // Hats interface
    IHats public HATS = IHats(hatsProtocol);

    // Hats / roles
    uint256 public topHat;
    uint256 public factoryOperatorHat;

    // sustainability
    address adminTreasury = 0x849233B1a9ca424716458297589f474B250bf1f2;
    uint256 adminFee = 0;

    function _deployFactory() internal {
        _mintFactoryTopHat();

        riteOfMoloch = new RiteOfMoloch();

        // change Hats Protocol for chain
        romFactory = new RiteOfMolochFactory(
            address(riteOfMoloch),
            hatsProtocol,
            factoryOperatorHat,
            adminTreasury,
            adminFee
        );
    }

    function _deployCohorts() internal returns (address[] memory roms) {
        InitData[] memory mockInits = _getMockInitData();
        roms = new address[](mockInits.length);
        for (uint256 i = 0; i < mockInits.length; i++) {
            roms[i] = romFactory.createCohort(mockInits[i], 1);
        }
    }

    function _mintFactoryTopHat() internal {
        // point to Hats implementation
        topHat = HATS.mintTopHat(msg.sender, "ROM-Factory TopHat #1", "");

        // create factory operator hat
        factoryOperatorHat = HATS.createHat(topHat, "ROM-Factory Operator #1", 1, molochDAO, molochDAO, true, "");

        // mint factory operator
        HATS.mintHat(factoryOperatorHat, msg.sender);
    }
}
