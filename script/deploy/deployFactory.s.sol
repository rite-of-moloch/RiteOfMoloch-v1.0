// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {RiteOfMolochFactory} from "src/RiteOfMolochFactory.sol";
import {DeployHelper} from "script/deploy/helpers.sol";


// forge script script/deploy/deployFactory.s.sol:DeployMockFactory --fork-url https://eth-goerli.g.alchemy.com/v2/ld62l45P8mlwdUKr-lKsQX8U2EMGNKKw --broadcast

/// @notice deploys a mock ROMFactory on it's own to Goerli
contract DeployMockFactory is Script, DeployHelper {


    function run() public {
        vm.startBroadcast(vm.envUint("PK"));

        _deployFactory();

        vm.stopBroadcast();
    }



}
