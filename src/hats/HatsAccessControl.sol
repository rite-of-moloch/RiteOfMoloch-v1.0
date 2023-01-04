// SPDX-License-Identifier: CC0
pragma solidity >=0.8.13;

import "lib/openzeppelin-contracts-upgradeable/contracts/utils/ContextUpgradeable.sol";
import "./IHats.sol";

/**
 * @notice forked from OpeZeppelin (https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/AccessControl.sol)
 * @author Hats Protocol
 * @dev Contract module that allows children to implement role-based access
 */
abstract contract HatsAccessControl is ContextUpgradeable {
    error NotWearingRoleHat(bytes32 role, uint256 hat, address account);

    error RoleAlreadyAssigned(bytes32 role, uint256 roleHat);

    bytes32 public constant DEFAULT_ADMIN_ROLE = 0x00;

    event RoleGranted(
        bytes32 indexed role,
        uint256 indexed hat,
        address indexed sender
    );

    event RoleRevoked(
        bytes32 indexed role,
        uint256 indexed hat,
        address indexed sender
    );

    event RoleAdminChanged(
        bytes32 indexed role,
        bytes32 indexed previousAdminRole,
        bytes32 indexed newAdminRole
    );

    event HatsContractChanged(
        address indexed previousHatsContract,
        address indexed newHatsContract
    );

    event RoleHatChanged(
        bytes32 indexed role,
        uint256 indexed previousRoleHat,
        uint256 indexed newRoleHat
    );

    struct RoleData {
        uint256 hat;
        bytes32 adminRole;
    }

    IHats private HATS;

    mapping(bytes32 => RoleData) private _roles;

    /**
     * @dev Modifier that checks that an account has a specific role. Reverts
     * with a standardized message including the required role.
     */
    modifier onlyRole(bytes32 role) {
        _checkRole(role);
        _;
    }

    /**
     * @dev Returns `true` if `account` has been granted `role`,
     * based on the account wearing the correct hat.
     */
    function hasRole(bytes32 role, address account)
        public
        view
        virtual
        returns (bool)
    {
        return HATS.isWearerOfHat(account, _roles[role].hat);
    }

    /**
     * @dev Revert with a standard message if `_msgSender()` is missing `role`.
     * Overriding this function changes the behavior of the {onlyRole} modifier.
     * Format of the revert message is described in {_checkRole}.
     * _Available since v4.6._
     */
    function _checkRole(bytes32 role) internal view virtual {
        _checkRole(role, _msgSender());
    }

    /**
     * @dev Revert `account` is missing `role`.
     */
    function _checkRole(bytes32 role, address account) internal view virtual {
        if (!hasRole(role, account)) {
            revert NotWearingRoleHat(role, _roles[role].hat, account);
        }
    }

    function hatsContract() public view virtual returns (address) {
        return address(HATS);
    }

    /**
     * @dev Returns the admin role that controls `role`. See {grantRole} and
     * {revokeRole}.
     * To change a role's admin, use {_setRoleAdmin}.
     */
    function getRoleAdmin(bytes32 role) public view virtual returns (bytes32) {
        return _roles[role].adminRole;
    }

    /**
     * @dev Grants `role` to `hat`.
     * If `hat` had not been already granted `role`, emits a {RoleGranted} event.
     * Requirements:
     * - the caller must wear ``role``'s hat's admin hat.
     * May emit a {RoleGranted} event.
     */
    function grantRole(bytes32 role, uint256 hat)
        public
        virtual
        onlyRole(getRoleAdmin(role))
    {
        _grantRole(role, hat);
    }

    function changeRoleHat(bytes32 role, uint256 newRoleHat)
        public
        virtual
        onlyRole(getRoleAdmin(role))
    {
        _changeRoleHat(role, newRoleHat);
    }

    /**
     * @dev Revokes `role` from `hat`.
     * If `hat` had been granted `role`, emits a {RoleRevoked} event.
     * Requirements:
     * - the caller must wear ``role``'s hat's admin hat.
     */
    function revokeRole(bytes32 role, uint256 hat)
        public
        virtual
        onlyRole(getRoleAdmin(role))
    {
        _revokeRole(role, hat);
    }

    /**
     * @dev Points to a new Hats Protocol implementation
     * Emits a {RoleAdminChanged} event.
     */

    /**
     * @dev Points to a new Hats Protocol implementation
     * Only callable by the wearer of the default admin role's hat
     * Emits a {RoleAdminChanged} event.
     */

    function changeHatsContract(address newHatsContract)
        public
        virtual
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _changeHatsContract(newHatsContract);
    }

    function _changeHatsContract(address newHatsContract) internal virtual {
        address previousHatsContract = address(HATS);
        HATS = IHats(newHatsContract);

        emit HatsContractChanged(previousHatsContract, newHatsContract);
    }

    function _changeRoleHat(bytes32 role, uint256 newRoleHat) internal virtual {
        uint256 roleHat = _roles[role].hat;
        if (roleHat == 0) {
            _grantRole(role, newRoleHat);
        }
        if (roleHat != newRoleHat) {
            _roles[role].hat = newRoleHat;
            emit RoleHatChanged(role, roleHat, newRoleHat);
        }
    }

    /**
     * @dev Sets `adminRole` as ``role``'s admin role.
     * Emits a {RoleAdminChanged} event.
     */
    function _setRoleAdmin(bytes32 role, bytes32 adminRole) internal virtual {
        bytes32 previousAdminRole = getRoleAdmin(role);
        _roles[role].adminRole = adminRole;
        emit RoleAdminChanged(role, previousAdminRole, adminRole);
    }

    /**
     * @dev Grants `role` to `hat`.
     * Internal function without access restriction.
     */
    function _grantRole(bytes32 role, uint256 hat) internal virtual {
        uint256 roleHat = _roles[role].hat;
        if (roleHat > 0) {
            revert RoleAlreadyAssigned(role, roleHat);
        }
        if (roleHat != hat) {
            _roles[role].hat = hat;
            emit RoleGranted(role, hat, _msgSender());
        }
    }

    /**
     * @dev Revokes `role` from `account`.
     * Internal function without access restriction.
     */
    function _revokeRole(bytes32 role, uint256 hat) internal virtual {
        if (_roles[role].hat == hat) {
            _roles[role].hat = 0;
            emit RoleRevoked(role, hat, _msgSender());
        }
    }
}
