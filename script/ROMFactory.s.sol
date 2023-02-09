// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {RiteOfMolochFactory} from "src/RiteOfMolochFactory.sol";
import {IHats} from "src/hats/IHats.sol";

// create with verify
// forge script script/ROMFactory.s.sol:ROMFactoryScript --rpc-url $RU --private-key $PK --broadcast --verify --etherscan-api-key $EK -vvvv

contract ROMFactoryScript is Script {
    // ROM factory contract
    RiteOfMolochFactory public ROMF;

    // Hats interface
    IHats public HATS;

    // Hats protocol implementation
    address public hatsProtocol = 0x96bD657Fcc04c71B47f896a829E5728415cbcAa1;

    // Hats / roles
    uint256 public topHatFactory;
    uint256 public factoryOperatorHat;

    function setUp() public {
        // point to Hats implementation
        HATS = IHats(hatsProtocol);
    }

    function run() public {
        vm.startBroadcast();
        hatTreeSetup();

        // change Hats Protocol for chain
        ROMF = new RiteOfMolochFactory(hatsProtocol, factoryOperatorHat);

        vm.stopBroadcast();
    }

    function hatTreeSetup() public {
        // this Script contract will be the admin of the factory (for development only)
        topHatFactory = HATS.mintTopHat(msg.sender, "ROM-Factory TopHat", "");

        factoryOperatorHat = HATS.createHat(
            topHatFactory,
            "ROM-Factory Operator",
            2,
            0x37c5B029f9c3691B3d47cb024f84E5E257aEb0BB,
            0x37c5B029f9c3691B3d47cb024f84E5E257aEb0BB,
            true,
            ""
        );

        HATS.mintHat(factoryOperatorHat, msg.sender);
    }
}
