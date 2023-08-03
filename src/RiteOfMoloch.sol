// SPDX-License-Identifier: MIT
// @author st4rgard3n, bitbeckers, MrDeadce11, huntrr / Raid Guild
pragma solidity ^0.8.13;

import { CountersUpgradeable } from "openzeppelin-contracts-upgradeable/utils/CountersUpgradeable.sol";
import {
    ERC721Upgradeable,
    ContextUpgradeable
} from "openzeppelin-contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import { IERC20 } from "openzeppelin-contracts/token/ERC20/IERC20.sol";
import { IInitData } from "src/interfaces/IInitData.sol";
import { IRiteOfMoloch } from "src/interfaces/IROM.sol";
import { HatsAccessControl, IHats, Context } from "hats-auth/HatsAccessControl.sol";
import { IBaal } from "src/baal/IBaal.sol";

contract RiteOfMoloch is IInitData, ERC721Upgradeable, HatsAccessControl, IRiteOfMoloch {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    bytes32 public constant ADMIN = keccak256("ADMIN");

    /**
     * @dev The number of percentage points used for the sustainability fee; set to 1_000_000.
     *
     * We use the PERC_POINTS together with `sustainabilityFee` to calculate the sustainability fee deducted from
     * stakes.
     * For example, to calculate the fee represented by a `value` as a percentage of a `total`, you can use the
     * following code:
     *
     * ```
     * uint256 stake = 5 * 1e18; // 5 ether
     * uint256 sustainabilityFee = 50_000; // 5%
     * uint256 fee = (stake / PERC_POINTS) * sustainabilityFee; // (5 ether / 1e6) * 50,000 = 0.25 ether
     * ```
     */
    uint256 public constant PERC_POINTS = 1e6;

    /**
     *
     *  MAPPINGS AND ARRAYS
     *
     */

    // initiation participant token balances
    mapping(address => uint256) internal _staked;

    // the time a participant joined the initiation
    mapping(address => uint256) public deadlines;

    // initiates by season: season# => id# => initiateAddress
    mapping(uint256 => mapping(uint256 => address)) internal initiates;

    /**
     *
     *  STATE VARIABLES
     *
     */

    CountersUpgradeable.Counter internal _tokenIdCounter;

    /**
     * @dev The `baal` variable represents the Baal DAO contract.
     */
    IBaal public baal;

    /**
     * @dev The `_sharesToken` variable represents the Baal shares token contract.
     */
    IERC20 private _sharesToken;

    /**
     * @dev The `_token` variable represents the ERC20 interface for the token that will be staked to join the cohort.
     */
    IERC20 private _token;

    /**
     * @dev The `__baseURI` variable represents the cohort's base URI for accessing token metadata.
     */
    string internal __baseURI;

    /**
     * @dev The `cohortName` variable represents the name of the cohort.
     */
    string public cohortName;

    /**
     * @dev The `cohortSeason` variable represents the cohort season counter, which increases after each Sacrifice.
     */
    uint256 public cohortSeason;

    /**
     * @dev The `cohortSize` variable represents the cohort size limit.
     */
    uint256 public cohortSize;

    /**
     * @dev The `cohortCounter` variable represents the cohort size count.
     */
    uint256 public cohortCounter;

    /**
     * @dev The `joinDuration` variable represents the cohort join duration.
     */
    uint256 public joinDuration;

    /**
     * @dev The `joinEndTime` variable represents the cohort join expiration.
     */
    uint256 public joinEndTime;

    /**
     * @dev The `shareThreshold` variable represents the minimum amount of DAO shares required to be considered a
     * member.
     */
    uint256 public shareThreshold;

    /**
     * @dev The `minimumStake` variable represents the minimum amount of staked tokens required to join the initiation.
     */
    uint256 public minimumStake;

    /**
     * @dev The `stakeDuration` variable represents the maximum length of time for initiates to succeed at joining.
     */
    uint256 public stakeDuration;

    /**
     * @dev The `sustainabilityFee` variable represents the percentage cut from stakes to support RoM maintenance and
     * development.
     */
    uint256 public sustainabilityFee;

    /**
     * @dev The `daoTreasury` variable represents the address of the DAO treasury which will receive the slashed stakes.
     */
    address public daoTreasury;

    /**
     * @dev The `sustainabilityTreasury` variable represents the address of the sustainability treasury.
     */
    address public sustainabilityTreasury;

    /**
     * @dev The `hats` variable represents the Hats protocol contract.
     */
    IHats public hats;

    /**
     * @dev The `topHat` variable represents the ID of the top hat.
     */
    uint256 public topHat;

    /**
     * @dev The `adminHat` variable represents the ID of the admin hat.
     */
    uint256 public adminHat;

    //TODO: rm admin vars and replace w/ Hats Protocol subgraph query
    address public admin1;
    address public admin2;

    // Hats initializer lock
    bool private initHatTreeLock;

    constructor() {
        _disableInitializers();
    }

    /**
     * @dev Deploys a new clone proxy instance for cohort staking
     * @param initData the complete initialization data
     * @param caller_ the deployer of the new cohort clone
     */
    function initialize(
        InitData calldata initData,
        address hatsProtocol,
        address caller_,
        address _sustainabilityTreasury,
        uint256 _sustainabilityFee
    )
        external
        payable
        initializer
    {
        // increment the counter so our first sbt has token id of one
        _tokenIdCounter.increment();

        // set cohort season to 1
        cohortSeason = 1;

        // set cohort name
        cohortName = initData.cohortName;

        // set size limit on cohort
        cohortSize = initData.cohortSize;

        // set join duration
        joinDuration = initData.joinDuration;

        // set join expiration
        joinEndTime = block.timestamp + joinDuration;

        // initialize the SBT
        __ERC721_init(initData.sbtName, initData.sbtSymbol);

        // set the interface for accessing the Baal's public members mapping
        baal = IBaal(initData.membershipCriteria);

        // reference sharesToken of Baal
        _sharesToken = IERC20(baal.sharesToken());

        // set the DAO treasury daoAddress
        daoTreasury = initData.daoTreasury;

        // set the admin treasury daoAddress
        sustainabilityTreasury = _sustainabilityTreasury;

        // set the address for accessing the required staking token
        _token = IERC20(initData.stakingAsset);

        // set the sustainabilityFee for blood penance
        sustainabilityFee = _sustainabilityFee;

        // set the minimum stake requirement
        _setMinimumStake(initData.assetAmount);

        // set the minimum shares
        _setShareThreshold(initData.shareThreshold);

        // set the cohort staking duration
        _setStakeDuration(initData.stakeDuration);

        // set the cohort token's base uri
        _setBaseUri(initData.baseUri);

        // point to Hats Protocol
        hats = IHats(hatsProtocol);

        // point access control functionality to Hats protocol
        _changeHatsContract(hatsProtocol);

        if (initData.shamanOn) {
            bytes memory shamanData;

            // encode shaman proposal
            shamanData = _encodeShamanProposal(address(this), 2);

            // submit SHAMAN proposal
            bytes[] memory data = new bytes[](1);
            data[0] = shamanData;

            address[] memory targets = new address[](1);
            targets[0] = address(baal);

            _submitBaalProposal(_encodeMultiMetaTx(data, targets), 1);
        }

        if (hats.isWearerOfHat(daoTreasury, initData.topHatId)) {
            bytes memory accessHatData;
            bytes memory buildHatData;

            // encode hats proposals; access topHat and initialize hat tree
            topHat = initData.topHatId;
            admin1 = initData.admin1;
            admin2 = initData.admin2;
            accessHatData = _encodeTransferHat(topHat, daoTreasury, address(this));
            buildHatData = _encodeBuildHatTree(caller_, admin1, admin2);

            // submit HATS proposal
            bytes[] memory data = new bytes[](2);
            data[0] = accessHatData;
            data[1] = buildHatData;

            address[] memory targets = new address[](2);
            targets[0] = address(hats);
            targets[1] = address(this);

            _submitBaalProposal(_encodeMultiMetaTx(data, targets), 2);
        } else {
            // creates a new topHat, initialize hat tree
            topHat = hats.mintTopHat(address(this), "ROM TopHat", "");
            initializeHatTree(caller_, initData.admin1, initData.admin2);
        }
    }

    /**
     *
     *  MODIFIERS
     *
     */

    /**
     * @dev Modifier for preventing calls from contracts
     * Safety feature for preventing malicious contract call backs
     */
    modifier callerIsUser() {
        require(tx.origin == msg.sender, "The caller is another contract!");
        _;
    }

    /**
     * @dev Modifier for enforcing function callable from DAO members only
     * Allows decentralized control by DAO members
     */
    modifier onlyMember() {
        _checkMember();
        _;
    }

    /**
     * @dev Modifier for checkin that RiteOfMoloch has Shaman privileges
     * Prevents calling functions that will revert
     */
    modifier onlyShaman() {
        _checkManager();
        _;
    }

    /**
     *
     *  USER FUNCTIONS
     *
     */

    /**
     * @dev Allows an initiate to join the current cohort.
     * @param user The address of the initiate to join.
     *
     * This function allows an initiate to join the current cohort. It first checks that the cohort is still open for
     * joining and that the cohort has not reached its size limit. It then enforces the initiate or sponsor to transfer
     * the correct tokens to the contract by calling the internal `_stake` function. If the stake is successful, the
     * function increments the cohort count, adds the initiate to the tracker by season and ID, and issues a soul bound
     * token by calling the internal `_soulBind` function.
     *
     */
    function joinInitiation(address user) public callerIsUser {
        require(block.timestamp <= joinEndTime, "This cohort is now closed");
        require(_tokenIdCounter.current() <= cohortSize, "This cohort is already full");

        // enforce the initiate or sponsor transfers correct tokens to the contract
        require(_stake(user), "Staking failed!");

        // increment cohort count
        cohortCounter++;

        // add initiate to tracker by season and id
        initiates[cohortSeason][cohortCounter] = msg.sender;

        // issue a soul bound token
        _soulBind(user);
    }

    /**
     * @dev Allows a member to claim their staked tokens after the stake duration has passed.
     *
     * This function allows a member to claim their staked tokens after the stake duration has passed. It first checks
     * that the member has a stake. If the claim is successful, the
     * function passes. Otherwise, it reverts.
     *
     */
    function claimStake() external onlyMember {
        require(_claim(), "Claim failed!");
    }

    /**
     * @dev Allows a cohort participant to submit feedback to the DAO.
     * @param feedback The feedback message to submit.
     *
     * This function allows a cohort participant to submit feedback to the DAO treasury. It first checks that the
     * participant has a balance of 1, which means they have successfully committed to the initiation. If the check
     * passes,
     * the function emits a `Feedback` event with the participant's address, the DAO treasury address, and the feedback
     * message.
     *
     */
    function cryForHelp(string calldata feedback) public {
        require(balanceOf(msg.sender) == 1, "Only cohort participants!");
        emit Feedback(msg.sender, daoTreasury, feedback);
    }

    /**
     * @dev Bleeds the life force of failed initiates into the treasury
     */
    function sacrifice() external onlyRole(ADMIN) {
        _darkRitual();
    }

    /**
     *
     *  ACCESS CONTROL FUNCTIONS
     *
     */

    /**
     * @dev Sets the duration of the join time window for new cohorts.
     * @param _newJoinTimeDuration The new duration of the join time window, in seconds.
     */
    function setJoinTimeDuration(uint256 _newJoinTimeDuration) external onlyRole(ADMIN) {
        _setJoinTimeDuration(_newJoinTimeDuration);
    }

    /**
     * @dev Extends the join time window for new cohorts by a specified amount.
     * @param _extension The amount of time, in seconds, by which to extend the join time window.
     */
    function extendJoinTimeLimit(uint256 _extension) external onlyRole(ADMIN) {
        _setJoinTimeLimit(joinEndTime + _extension);
    }

    /**
     * @dev Sets the maximum size of a cohort.
     * @param _newMaxCohortSize The new maximum size of a cohort.
     */
    function setMaxCohortSize(uint256 _newMaxCohortSize) external onlyRole(ADMIN) {
        _setMaxCohortSize(_newMaxCohortSize);
    }

    /**
     * @dev Allows DAO members to change the staking requirement
     * @param newMinimumStake the minimum quantity of tokens a user must stake to join the cohort
     */
    function setMinimumStake(uint256 newMinimumStake) external onlyRole(ADMIN) {
        _setMinimumStake(newMinimumStake);
    }

    /**
     * @dev Allows changing the DAO member share threshold
     * @param newShareThreshold the number of shares required to be considered a DAO member
     */
    function setShareThreshold(uint256 newShareThreshold) external onlyRole(ADMIN) {
        _setShareThreshold(newShareThreshold);
    }

    /**
     * @dev Allows changing the maximum initiation duration
     * @param newMaxTime the length in seconds until an initiate's stake is forfeit
     */
    function setStakeDuration(uint256 newMaxTime) external onlyRole(ADMIN) {
        _setStakeDuration(newMaxTime);
    }

    /**
     * @dev Bleeds the life force of a single failed initiate into the treasury
     */
    function slaughter(address _sacrificialLamb) external onlyRole(ADMIN) {
        _bloodLetting(_sacrificialLamb);
        cohortCounter--;
    }

    /**
     * BAAL DAO FUNCTIONS
     */

    /**
     * @dev If ROM is a Shaman: Allows minting shares of Baal DAO to become member
     * @param to the list of initiate addresses who have passed their rites to become member
     */
    function batchMintBaalShares(address[] calldata to) external onlyRole(ADMIN) onlyShaman {
        uint256 length = to.length;
        uint256[] memory shares = new uint256[](length);

        // can only mint minimum share for Baal DAO membership
        for (uint256 i = 0; i < length; i++) {
            shares[i] = shareThreshold;
        }

        baal.mintShares(to, shares);
    }

    /**
     * @param _to initiate address who has passed their rite to become member
     */
    function singleMintBaalShares(address _to) external onlyRole(ADMIN) onlyShaman {
        uint256[] memory shares = new uint256[](1);
        address[] memory to = new address[](1);

        // can only mint minimum share for Baal DAO membership
        shares[0] = shareThreshold;
        to[0] = _to;

        baal.mintShares(to, shares);
    }

    /**
     *
     *  PRIVATE OR INTERNAL
     *
     */

    /**
     * RITE OF MOLOCH FUNCTIONS
     */

    /**
     * @dev Removes a failed initiate's stake and deadline.
     * @param _failedInitiate The address of the failed initiate.
     * @return The amount of the failed initiate's stake that was removed.
     */
    function _bloodLetting(address _failedInitiate) internal virtual returns (uint256) {
        // access each initiate's balance
        uint256 balance = _staked[_failedInitiate];

        // remove the sacrifice's balance
        delete _staked[_failedInitiate];

        // remove the sacrifice's starting time
        delete deadlines[_failedInitiate];

        // log sacrifice data
        emit Sacrifice(_failedInitiate, balance, msg.sender);

        return balance;
    }

    /**
     * @dev Internal function to process a successful claim by a member.
     * @return A boolean indicating whether the claim was successful.
     *
     * This function is called internally when a member successfully claims their stake. It first checks that the member
     * has staked tokens, and then stores the member's balance in a local variable. It then deletes the member's balance
     * and deadline timestamp from the contract's storage. Finally, it emits a `Claim` event with the member's address
     * and balance, and transfers the member's original stake back to their address using the `_token.transfer`
     * function.
     */
    function _claim() internal virtual returns (bool) {
        address msgSender = _msgSender();
        // enforce that the initiate has stake
        require(_staked[msgSender] > 0, "User has no stake!!");

        // store the user's balance
        uint256 balance = _staked[msgSender];

        // delete the balance
        delete _staked[msgSender];

        // delete the deadline timestamp
        delete deadlines[msgSender];

        // log data for this successful claim
        emit Claim(msgSender, balance);

        // return the new member's original stake
        return _token.transfer(msgSender, balance);
    }

    function _darkRitual() internal virtual {
        // the total amount of blood debt
        uint256 blood;
        uint256 newCohortCount;
        uint256 season = cohortSeason;
        uint256 nextSeason = cohortSeason + 1;

        for (uint256 i = 1; i <= cohortCounter; i++) {
            // store each initiate's address
            address initiate = initiates[season][i];
            uint256 index = 1;

            if (_staked[initiate] > 0) {
                if (block.timestamp > deadlines[initiate]) {
                    // slash failed initiate
                    blood += _bloodLetting(initiate);
                    delete initiates[season][i];
                } else {
                    // carry-over non-failed active initiates into next cohort
                    initiates[nextSeason][index] = initiate;
                    index++;
                    newCohortCount++;
                    delete initiates[season][i];
                }
            } else {
                // delete initiates that have already claimed their stake or been slaughtered
                delete initiates[season][i];
            }
        }

        // blood feast for Baal
        require(_token.transfer(daoTreasury, blood), "Failed Sacrifice!");

        // reset cohortCount, reset joinInitiation period, increase season
        cohortCounter = newCohortCount;
        joinEndTime = block.timestamp + joinDuration;
        cohortSeason++;
    }

    /**
     * @dev Internal function to stake tokens on behalf of an initiate.
     * @param _user The address of the initiate to stake tokens for.
     * @return success A boolean indicating whether the stake was successful.
     *
     * This function is called internally to stake tokens on behalf of an initiate. It first checks that the initiate
     * hasn't previously staked by verifying that their balance is zero. It then calculates the sustainability fee as a
     * percentage of the minimum stake, subtracts this fee from the minimum stake to get the actual stake amount, and
     * sets the initiate's stake total to this amount. It also sets the initiate's deadline timestamp to the current
     * block timestamp plus the stake duration.
     *
     * If the sustainability fee is greater than zero, the function transfers the stake amount minus the fee to the
     * contract's address, and transfers the fee to the sustainability treasury. If the sustainability fee is zero, the
     * function transfers the entire stake amount to the contract's address.
     *
     */
    function _stake(address _user) internal virtual returns (bool success) {
        // enforce that the initiate hasn't previously staked
        require(balanceOf(_user) == 0, "Already joined the initiation!");

        uint256 fee = (minimumStake / PERC_POINTS) * sustainabilityFee;

        // change the initiate's stake total
        _staked[_user] = minimumStake - fee;

        // set the initiate's deadline
        deadlines[_user] = block.timestamp + stakeDuration;

        // Transfer funds to rite (and sustainability treasury if applicable)
        if (fee > 0) {
            success = _token.transferFrom(msg.sender, address(this), minimumStake - fee)
                && _token.transferFrom(msg.sender, sustainabilityTreasury, fee);
        } else {
            success = _token.transferFrom(msg.sender, address(this), minimumStake);
        }
    }

    /**
     * @dev Mints soul bound tokens to the initiate
     * @param _user the recipient of the cohort SBT
     */
    function _soulBind(address _user) internal virtual {
        // store the current token counter
        uint256 tokenId = _tokenIdCounter.current();

        // increment the token counter
        _tokenIdCounter.increment();

        // mint the user's soul bound initiation token
        _mint(_user, tokenId);

        // log the initiation data
        emit Initiation(_user, msg.sender, tokenId, minimumStake, deadlines[_user]);
    }

    /**
     * BAAL INTERNAL
     */

    /**
     * @dev Submit voting proposal to Baal DAO
     */
    function _submitBaalProposal(bytes memory multiSendMetaTx, uint256 options) internal {
        require(msg.value == baal.proposalOffering(), "Missing tribute");

        string memory metaString;

        if (options == 1) {
            metaString =
                '{"proposalType": "ADD_SHAMAN", "title": "Rite of Moloch (ROM): Shaman Proposal", "description": "Assign ROM as a Manager-Shaman to mint minimum DAO shares"}';
        } else if (options == 2) {
            metaString =
                '{"proposalType": "BORROW_TOPHAT", "title": "Rite of Moloch (ROM): Hats Proposal", "description": "Create and mint ROM-Admin hats from DAO TopHat"}';
        } else if (options == 3) {
            metaString =
                '{"proposalType": "MINT_ADMINHAT", "title": "Rite of Moloch (ROM): Mint Admin Hat", "description": "Mint ROM-Admin hat to EOA"}';
        } else if (options == 4) {
            metaString =
                '{"proposalType": "TRANSFER_ADMINHAT", "title": "Rite of Moloch (ROM): Transfer Admin Hat", "description": "Transfer ROM-Admin hat to EOA"}';
        } else {
            metaString =
                '{"proposalType": "UNDEFINED", "title": "Rite of Moloch (ROM): undefined", "description": "Undefined"}';
        }

        baal.submitProposal{ value: msg.value }(multiSendMetaTx, 0, 0, metaString);
    }

    /**
     * CONFIGURATION FUNCTIONS
     */

    /**
     * @dev Sets base URI during initialization
     * @param baseURI the base uri for accessing token metadata
     */
    function _setBaseUri(string calldata baseURI) internal virtual {
        __baseURI = baseURI;
    }

    function _setJoinTimeDuration(uint256 _newJoinDuration) internal {
        uint256 oldDuration = joinDuration;
        joinDuration = _newJoinDuration;
        emit UpdatedJoinTimeDuration(oldDuration, _newJoinDuration);
    }

    function _setJoinTimeLimit(uint256 _newJoinTimeLimit) internal {
        uint256 oldLimit = joinEndTime;
        joinEndTime = _newJoinTimeLimit;
        emit UpdatedJoinTimeLimit(oldLimit, _newJoinTimeLimit);
    }

    function _setMaxCohortSize(uint256 _newMaxCohortSize) internal {
        uint256 oldSize = cohortSize;
        cohortSize = _newMaxCohortSize;
        emit UpdatedMaxCohortSize(oldSize, _newMaxCohortSize);
    }

    function _setMinimumStake(uint256 newMinimumStake) internal virtual {
        // enforce that the minimum stake isn't zero
        require(newMinimumStake > 0, "Minimum stake must be greater than zero!");

        uint256 oldMinimumStake = minimumStake;
        // set the minimum staking requirement
        minimumStake = newMinimumStake;

        //  new staking requirement data
        emit UpdatedMinimumStake(oldMinimumStake, newMinimumStake);
    }

    function _setShareThreshold(uint256 newShareThreshold) internal virtual {
        // enforce that the minimum share threshold isn't zero
        require(newShareThreshold > 0, "Minimum shares must be greater than zero!");

        uint256 oldShareThreshold = shareThreshold;

        // set the minimum number of DAO shares required to graduate
        shareThreshold = newShareThreshold;

        // log data for the new minimum share threshold
        emit UpdatedShareThreshold(oldShareThreshold, newShareThreshold);
    }

    function _setStakeDuration(uint256 newStakeDuration) internal virtual {
        require(newStakeDuration > 0, "Stake duration must be greater than 0!");

        uint256 oldStakeDuration = stakeDuration;

        // set the maximum length of time for initiations
        stakeDuration = newStakeDuration;

        // log the new duration before stakes can be slashed
        emit UpdatedStakeDuration(oldStakeDuration, newStakeDuration);
    }

    /**
     * @dev Authenticates users through the DAO contract
     */
    function _checkMember() internal virtual {
        require(_sharesToken.balanceOf(msg.sender) >= shareThreshold, "You must be a member!");
    }

    function _checkManager() internal virtual {
        require(baal.isManager(address(this)), "This RiteOfMoloch is not a Manager-Shaman!");
    }

    /**
     *
     *  VIEW AND PURE FUNCTIONS
     *
     */

    function checkStake(address user) external view returns (uint256) {
        return _staked[user];
    }

    /**
     * @dev returns the user's deadline for onboarding
     */
    function getDeadline(address user) public view returns (uint256) {
        return deadlines[user];
    }

    /**
     * @dev returns the user's member status
     */
    function isMember(address user) public view returns (bool) {
        return (_sharesToken.balanceOf(user) >= shareThreshold);
    }

    /**
     * @dev returns the token to stake in this cohort
     */
    function stakingAsset() public view returns (address) {
        return address(_token);
    }

    /**
     *
     *  OVERRIDES
     *
     */

    function _msgSender() internal view override(Context, ContextUpgradeable) returns (address) {
        return msg.sender;
    }

    function _msgData() internal pure override(Context, ContextUpgradeable) returns (bytes calldata) {
        return msg.data;
    }

    function _baseURI() internal view override returns (string memory) {
        return __baseURI;
    }

    // Cohort NFTs cannot be transferred
    function _beforeTokenTransfer(
        address _from,
        address,
        uint256, /* firstTokenId */
        uint256
    )
        internal
        virtual
        override
    {
        require(_from == address(0), "SBT cannot be transferred");
    }

    // The following functions are overrides required by Solidity.
    function supportsInterface(bytes4 interfaceId) public view override(ERC721Upgradeable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    /**
     *
     *  HATS ACCESS CONTROL SETUP
     *
     */

    /**
     * @dev create & mint admin hats to deployer & admin addresses
     * DAO can grant/revoke adminHats (after topHat is transferred below)
     */
    function initializeHatTree(address _deployer, address _admin1, address _admin2) public {
        require(initHatTreeLock == false, "Hats already initialized");
        initHatTreeLock = true;

        // admin privileges: access control
        adminHat = hats.createHat(topHat, "ROM Admin", 3, address(baal), address(baal), true, "");

        // grant Hat Access Control role
        _grantRole(ADMIN, adminHat);

        hats.mintHat(adminHat, _deployer);

        if (_admin1 != address(0)) {
            hats.mintHat(adminHat, _admin1);
        }
        if (_admin2 != address(0)) {
            hats.mintHat(adminHat, _admin2);
        }

        // return topHat to  Baal Avatar
        hats.transferHat(topHat, address(this), daoTreasury);
    }

    /**
     * @dev send proposal to Baal to mint another admin
     * protected by Hats protocol logic and Baal governance
     */
    function mintAdminHatProposal(address _to) external payable {
        bytes memory hatData;

        hatData = _encodeMintHat(adminHat, _to);

        bytes[] memory data = new bytes[](1);
        data[0] = hatData;

        address[] memory targets = new address[](1);
        targets[0] = address(hats);

        _submitBaalProposal(_encodeMultiMetaTx(data, targets), 3);
    }

    /**
     * @dev send proposal to Baal to transfer adminHat to new EOA
     * protected by Hats protocol logic and Baal governance
     */
    function transferAdminHatProposal(address _from, address _to) external payable {
        bytes memory hatData;

        hatData = _encodeTransferHat(adminHat, _from, _to);

        bytes[] memory data = new bytes[](1);
        data[0] = hatData;

        address[] memory targets = new address[](1);
        targets[0] = address(hats);

        _submitBaalProposal(_encodeMultiMetaTx(data, targets), 4);
    }

    /**
     *
     *  ENCODING
     *
     */

    /**
     * @dev Encoding function for Baal Shaman
     */
    function _encodeShamanProposal(address shaman, uint256 permission) internal pure returns (bytes memory) {
        address[] memory _shaman = new address[](1);
        _shaman[0] = shaman;

        uint256[] memory _permission = new uint256[](1);
        _permission[0] = permission;

        return abi.encodeWithSignature("setShamans(address[],uint256[])", _shaman, _permission);
    }

    /**
     * @dev Encoding function for accessing an existing topHat
     */
    function _encodeTransferHat(uint256 _hat, address _from, address _to) internal returns (bytes memory) {
        // todo: rm admin vars and replace w/ Hats Protocol subgraph query
        if (admin1 == _from) {
            admin1 = _to;
        } else if (admin2 == _from) {
            admin2 = _to;
        }
        return abi.encodeWithSignature("transferHat(uint256,address,address)", _hat, _from, _to);
    }

    /**
     * @dev Encoding function for minting an adminHat
     */
    function _encodeMintHat(uint256 _hat, address _to) internal returns (bytes memory) {
        // todo: rm admin vars and replace w/ Hats Protocol subgraph query
        if (admin1 == address(0)) {
            admin1 = _to;
        } else if (admin1 != address(0) && admin2 == address(0)) {
            admin2 = _to;
        }
        return abi.encodeWithSignature("mintHat(uint256,address)", _hat, _to);
    }

    /**
     * @dev Encoding function for building on existing Hats tree
     */
    function _encodeBuildHatTree(
        address _deployer,
        address _admin1,
        address _admin2
    )
        internal
        pure
        returns (bytes memory)
    {
        return abi.encodeWithSignature("initializeHatTree(address,address,address)", _deployer, _admin1, _admin2);
    }

    /**
     * @dev Format multiSend for encoded functions
     */
    function _encodeMultiMetaTx(bytes[] memory _data, address[] memory _targets) internal pure returns (bytes memory) {
        bytes memory metaTx;

        for (uint256 i = 0; i < _data.length; i++) {
            metaTx = abi.encodePacked(metaTx, uint8(0), _targets[i], uint256(0), uint256(_data[i].length), _data[i]);
        }
        return abi.encodeWithSignature("multiSend(bytes)", metaTx);
    }
}
