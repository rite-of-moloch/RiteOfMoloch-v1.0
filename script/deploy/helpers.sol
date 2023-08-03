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
    address public hatsProtocol = 0x850f3384829D7bab6224D141AFeD9A559d745E3D;
    // Hats interface
    IHats public HATS = IHats(hatsProtocol);

    // sustainability
    address adminTreasury = 0x849233B1a9ca424716458297589f474B250bf1f2;
    uint256 adminFee = 0;

    function _deployFactory() internal {
        riteOfMoloch = new RiteOfMoloch();

        // change Hats Protocol for chain
        romFactory = new RiteOfMolochFactory(
            address(riteOfMoloch),
            hatsProtocol,
            adminTreasury,
            adminFee,
            msg.sender
        );
    }

    function _deployCohorts() internal returns (address[] memory roms) {
        InitData[] memory mockInits = _getMockInitData();
        roms = new address[](mockInits.length);
        for (uint256 i = 0; i < mockInits.length; i++) {
            roms[i] = romFactory.createCohort(mockInits[i], 1);
        }
    }
}
