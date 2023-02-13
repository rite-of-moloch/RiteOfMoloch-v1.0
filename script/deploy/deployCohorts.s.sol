// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {RiteOfMolochFactory} from "src/RiteOfMolochFactory.sol";
import {DeployHelper} from "script/deploy/helpers.sol";


// forge script script/deploy/deployCohorts.s.sol:DeployMockCohorts --fork-url https://eth-goerli.g.alchemy.com/v2/ld62l45P8mlwdUKr-lKsQX8U2EMGNKKw --broadcast

/// @notice deploys mock cohorts to Goerli for an existing factory
contract DeployMockCohorts is Script, DeployHelper {

    /// @notice replace this address with your target ROM factory
    address public existingFactory = 0x65e34A4962f81F59465c95fEC096644A937D4AaB;

    function run() public {
        ROMF = RiteOfMolochFactory(existingFactory);

        address[] memory roms;

        vm.startBroadcast(vm.envUint("PK"));

        roms = _deployCohorts();

        vm.stopBroadcast();
    }


}
