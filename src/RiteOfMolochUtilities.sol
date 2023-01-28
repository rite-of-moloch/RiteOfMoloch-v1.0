// SPDX-License-Identifier: MIT
// @author huntrr / Raid Guild
pragma solidity ^0.8.13;

import {IBaal} from "src/baal/IBaal.sol";

contract RiteOfMolochUtilities {
    // Baal DAO
    IBaal private baal;

    // Hats protocol
    address private HATS;

    /*************************
     EVENTS
     *************************/

    // logs new initiation data
    event Initiation(
        address newInitiate,
        address benefactor,
        uint256 tokenId,
        uint256 stake,
        uint256 deadline
    );

    // logs data when failed initiates get slashed
    event Sacrifice(address sacrifice, uint256 slashedAmount, address slasher);

    // logs data when a user successfully claims back their stake
    event Claim(address newMember, uint256 claimAmount);

    // log the new staking requirement
    event ChangedStake(uint256 newStake);

    // log the new minimum shares for DAO membership
    event ChangedShares(uint256 newShare);

    // log the new duration before an initiate can be slashed
    event ChangedTime(uint256 newTime);

    // log feedback data on chain for aggregation and graph
    event Feedback(address user, address treasury, string feedback);

    /*************************
     UTILITY FUNCTIONS
     *************************/

    /**
     * @dev Encoding function for Baal Shaman
     */
    function _encodeShamanProposal(address shaman, uint256 permission)
        internal
        pure
        returns (bytes memory)
    {
        address[] memory _shaman = new address[](1);
        _shaman[0] = shaman;

        uint256[] memory _permission = new uint256[](1);
        _permission[0] = permission;

        return
            abi.encodeWithSignature(
                "setShamans(address[],uint256[])",
                _shaman,
                _permission
            );
    }

    /**
     * @dev Encoding functions for building on existing Hats tree
     */
    function _encodeCreateHatProposal(uint256 _topHat)
        internal
        view
        returns (bytes memory)
    {
        return
            abi.encodeWithSignature(
                "createHat(uint256,string,uint32,address,address,bool,string)",
                _topHat,
                "ROM Super-Admin",
                1,
                address(baal),
                address(baal),
                true,
                ""
            );
    }

    function _encodeMintHatProposal(uint256 _adminHat, address _deployer)
        internal
        pure
        returns (bytes memory)
    {
        return
            abi.encodeWithSignature(
                "mintHat(uint256,address)",
                _adminHat,
                _deployer
            );
    }

    /**
     * @dev Format multiSend for 2 encoded functions
     */
    function _encodeMultiMetaTx(bytes[2] memory _data)
        internal
        view
        returns (bytes memory)
    {
        address[] memory targets = new address[](2);
        targets[0] = address(baal);
        targets[1] = address(HATS);

        bytes memory metaTx;

        for (uint256 i = 0; i < _data.length; i++) {
            metaTx = abi.encodePacked(
                metaTx,
                uint8(0),
                targets[i],
                uint256(0),
                uint256(_data[i].length),
                _data[i]
            );
        }
        return abi.encodeWithSignature("multiSend(bytes)", metaTx);
    }

    /**
     * @dev Format multiSend for a single encoded function
     */
    function _encodeSingleMetaTx(bytes memory _data, address _target)
        internal
        view
        returns (bytes memory)
    {
        bytes memory metaTx;

        metaTx = abi.encodePacked(
            metaTx,
            uint8(0),
            address(_target),
            uint256(0),
            uint256(_data.length),
            _data
        );
        return abi.encodeWithSignature("multiSend(bytes)", metaTx);
    }

    /**
     * @dev Submit voting proposal to Baal DAO
     */
    function _submitBaalProposal(bytes memory multiSendMetaTx) internal {
        uint256 proposalOffering = baal.proposalOffering();
        require(msg.value == proposalOffering, "Missing tribute");

        baal.submitProposal{value: proposalOffering}(
            multiSendMetaTx,
            0,
            0,
            '{"proposalType": "ADD_SHAMAN", "title": "ROM to Shaman", "description": "Demo through a contract"}'
        );
    }
}
