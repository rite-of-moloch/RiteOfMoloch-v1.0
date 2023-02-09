// SPDX-License-Identifier: MIT
// @author st4rgard3n, bitbeckers, MrDeadce11, huntrr / Raid Guild
pragma solidity ^0.8.13;

import "lib/openzeppelin-contracts-upgradeable/contracts/utils/CountersUpgradeable.sol";
import "lib/openzeppelin-contracts-upgradeable/contracts/token/ERC721/ERC721Upgradeable.sol";
import "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "src/interfaces/IInitData.sol";
import "src/interfaces/IRiteOfMolochEvents.sol";
import "src/hats/HatsAccessControl.sol";
import {IHats} from "src/hats/IHats.sol";
import {IBaal} from "src/baal/IBaal.sol";

contract RiteOfMoloch is
    IInitData,
    ERC721Upgradeable,
    HatsAccessControl,
    IRiteOfMolochEvents
{
    using CountersUpgradeable for CountersUpgradeable.Counter;
    mapping(bytes32 => RoleData) public _roles;

    bytes32 public constant ADMIN = keccak256("ADMIN");

    /*************************
     MAPPINGS AND ARRAYS
     *************************/

    // initiation participant token balances
    mapping(address => uint256) internal _staked;

    // the time a participant joined the initiation
    mapping(address => uint256) public deadlines;

    // the number of user's a member has sacrificed
    mapping(address => uint256) public totalSlash;

    // list of initiates in current cohort
    address[] internal initiates;

    // list of carry-over initiates from previous cohort
    address[] internal survivors;

    /*************************
     STATE VARIABLES
     *************************/

    CountersUpgradeable.Counter internal _tokenIdCounter;

    // Baal DAO
    IBaal public baal;

    // Baal sharesToken
    IERC20 private _sharesToken;

    // ERC20 interface for staking asset
    IERC20 private _token;

    // cohort's base URI for accessing token metadata
    string internal __baseURI;

    // cohort name
    string public cohortName;

    // cohort season counter (increases after each Sacrifice)
    uint256 public cohortSeason;

    // cohort size limit
    uint256 public cohortSize;

    // cohort size count
    uint256 public cohortCounter;

    // cohort join duration
    uint256 public joinDuration;

    // cohort join expiration
    uint256 public joinEndTime;

    // minimum amount of dao shares required to be considered a member
    uint256 public minimumShare;

    // minimum amount of staked tokens required to join the initiation
    uint256 public minimumStake;

    // maximum length of time for initiates to succeed at joining
    uint256 public maximumTime;

    // DAO treasury address
    address public treasury;

    // Hats protocol:
    IHats public HATS;

    // Hats variables
    uint256 public topHat;
    uint256 public adminHat;

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
        address caller_
    ) external initializer {
        // increment the counter so our first sbt has token id of one
        _tokenIdCounter.increment();

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
        // _sharesToken = IERC20(initData.stakingAsset); // <= for local testing only
        _sharesToken = IERC20(baal.sharesToken()); // <= correct

        // store the treasury daoAddress
        treasury = initData.treasury;

        // set the interface for accessing the required staking token
        _token = IERC20(initData.stakingAsset);

        // set the minimum stake requirement
        _setMinimumStake(initData.assetAmount);

        // set the minimum shares
        _setShareThreshold(initData.threshold);

        // set the cohort staking duration
        _setMaxDuration(initData.stakeDuration);

        // set the cohort token's base uri
        _setBaseUri(initData.baseUri);

        // point to Hats Protocol
        HATS = IHats(hatsProtocol);

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

            _submitBaalProposal(_encodeMultiMetaTx(data, targets), true);
        }

        if (HATS.isWearerOfHat(treasury, initData.topHatId)) {
            bytes memory accessHatData;
            bytes memory buildHatData;

            // encode hats proposals; access topHat and initialize hat tree
            topHat = initData.topHatId;
            accessHatData = _encodeHatProposal();
            buildHatData = _encodeBuildHatTree(
                caller_,
                initData.admin1,
                initData.admin2
            );

            // submit HATS proposal
            bytes[] memory data = new bytes[](2);
            data[0] = accessHatData;
            data[1] = buildHatData;

            address[] memory targets = new address[](2);
            targets[0] = address(HATS);
            targets[1] = address(this);

            _submitBaalProposal(_encodeMultiMetaTx(data, targets), false);
        } else {
            // creates a new topHat, initialize hat tree
            topHat = HATS.mintTopHat(address(this), "ROM TopHat", "");
            initializeHatTree(caller_, initData.admin1, initData.admin2);
        }
    }

    /*************************
     MODIFIERS
     *************************/

    /**
     * @dev Modifier for preventing calls from contracts
     * Safety feature for preventing malicious contract call backs
     */
    modifier callerIsUser() {
        // for testing in Forge: disable
        // require(tx.origin == msg.sender, "The caller is another contract!");
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

    /*************************
     USER FUNCTIONS
     *************************/

    /**
     * @dev Allows users to join the DAO initiation
     * @param user the address which will be activated for the cohort
     * Stakes required tokens and mints soul bound token
     */
    function joinInitiation(address user) public callerIsUser {
        require(block.timestamp <= joinEndTime, "This cohort is now closed");
        require(
            _tokenIdCounter.current() <= cohortSize,
            "This cohort is already full"
        );

        // enforce the initiate or sponsor transfers correct tokens to the contract
        require(_stake(user), "Staking failed!");

        // add user to initiate's list
        initiates.push(user);

        // increment cohort count
        cohortCounter++;

        // issue a soul bound token
        _soulBind(user);
    }

    /**
     * @dev Allows DAO members to claim their initiation stake
     */
    function claimStake() external onlyMember {
        require(_claim(), "Claim failed!");
    }

    /**
     * @dev Allows initiates to log permanent feedback data on-chain
     * @param feedback "Developers do something!"
     * Doesn't change contract state; simply passes call-data through an event
     */
    function cryForHelp(string calldata feedback) public {
        require(balanceOf(msg.sender) == 1, "Only cohort participants!");
        emit Feedback(msg.sender, treasury, feedback);
    }

    function checkStake(address user) external returns (uint256) {
        return _staked[user];
    }

    /*************************
     ACCESS CONTROL FUNCTIONS
     *************************/

    function changeJoinTimeDuration(uint256 _joinDuration)
        external
        onlyRole(ADMIN)
    {
        joinDuration = _joinDuration;
    }

    function extendJoinTimeLimit(uint256 _extension) external onlyRole(ADMIN) {
        joinEndTime = joinEndTime + _extension;
    }

    function changeJoinSizeLimit(uint256 _cohortSize) external onlyRole(ADMIN) {
        cohortSize = _cohortSize;
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
    function setShareThreshold(uint256 newShareThreshold)
        external
        onlyRole(ADMIN)
    {
        _setShareThreshold(newShareThreshold);
    }

    /**
     * @dev Allows changing the maximum initiation duration
     * @param newMaxTime the length in seconds until an initiate's stake is forfeit
     */
    function setMaxDuration(uint256 newMaxTime) external onlyRole(ADMIN) {
        _setMaxDuration(newMaxTime);
    }

    /**
     * @dev If ROM is a Shaman: Allows minting shares of Baal DAO to become member
     * @param to the list of initiate addresses who have passed their rites to become member
     */
    function batchMintBaalShares(address[] calldata to)
        external
        onlyRole(ADMIN)
        onlyShaman
    {
        uint256 length = to.length;
        uint256[] memory shares = new uint256[](length);

        // can only mint minimum share for Baal DAO membership
        for (uint256 i = 0; i < length; i++) {
            shares[i] = minimumShare;
        }

        baal.mintShares(to, shares);
    }

    /**
     * @param _to initiate address who has passed their rite to become member
     */
    function singleMintBaalShares(address _to)
        external
        onlyRole(ADMIN)
        onlyShaman
    {
        uint256[] memory shares = new uint256[](1);
        address[] memory to = new address[](1);

        // can only mint minimum share for Baal DAO membership
        shares[0] = minimumShare;
        to[0] = _to;

        baal.mintShares(to, shares);
    }

    /**
     * @dev Claims the life force of failed initiates for the dao
     */
    function sacrifice() external onlyRole(ADMIN) {
        _darkRitual();
    }

    /*************************
     PRIVATE OR INTERNAL
     *************************/

    function _setMinimumStake(uint256 newMinimumStake) internal virtual {
        // enforce that the minimum stake isn't zero
        require(
            newMinimumStake > 0,
            "Minimum stake must be greater than zero!"
        );

        // set the minimum staking requirement
        minimumStake = newMinimumStake;

        //  new staking requirement data
        emit ChangedStake(newMinimumStake);
    }

    function _setShareThreshold(uint256 newShareThreshold) internal virtual {
        // enforce that the minimum share threshold isn't zero
        require(
            newShareThreshold > 0,
            "Minimum shares must be greater than zero!"
        );

        // set the minimum number of DAO shares required to graduate
        minimumShare = newShareThreshold;

        // log data for the new minimum share threshold
        emit ChangedShares(newShareThreshold);
    }

    function _setMaxDuration(uint256 newMaxTime) internal virtual {
        // enforce that the minimum time is greater than 1 week
        require(newMaxTime > 0, "Minimum duration must be greater than 0!");

        // set the maximum length of time for initiations
        maximumTime = newMaxTime;

        // log the new duration before stakes can be slashed
        emit ChangedTime(newMaxTime);
    }

    /**
     * @dev Sets base URI during initialization
     * @param baseURI the base uri for accessing token metadata
     */
    function _setBaseUri(string calldata baseURI) internal virtual {
        __baseURI = baseURI;
    }

    /**
     * @dev Stakes the user's tokens
     * @param _user the address to activate for the cohort
     */
    function _stake(address _user) internal virtual returns (bool) {
        // enforce that the initiate hasn't previously staked
        require(balanceOf(_user) == 0, "Already joined the initiation!");

        // change the initiate's stake total
        _staked[_user] = minimumStake;

        // set the initiate's deadline
        deadlines[_user] = block.timestamp + maximumTime;

        return _token.transferFrom(msg.sender, address(this), minimumStake);
    }

    /**
     * @dev Claims the successful new members stake
     */
    function _claim() internal virtual returns (bool) {
        address msgSender = msg.sender;
        // enforce that the initiate has stake
        require(_staked[msgSender] > 0, "User has no stake!!");

        // store the user's balance
        uint256 balance = _staked[msgSender];

        // delete the balance
        delete _staked[msgSender];

        // delete the deadline timestamp
        delete deadlines[msgSender];

        // return the new member's original stake
        return _token.transfer(msgSender, balance);

        // log data for this successful claim
        emit Claim(msgSender, balance);
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
        emit Initiation(
            _user,
            msg.sender,
            tokenId,
            minimumStake,
            deadlines[_user]
        );
    }

    /**
     * @dev Claims failed initiate tokens for the DAO
     */
    function _darkRitual() internal virtual {
        // the total amount of blood debt
        uint256 total;

        for (uint256 i = 0; i < initiates.length; ++i) {
            // store each initiate's address
            address initiate = initiates[i];

            // access each initiate's starting time
            uint256 deadline = deadlines[initiate];

            if (block.timestamp > deadline && _staked[initiate] > 0) {
                total += _bloodLetting(initiate);
                delete initiates[i];
            } else {
                continue;
            }
        }

        _bloodFeast(total);
        _consolidateSurvivors();
        _riseFromAshes();
    }

    function _bloodLetting(address _failedInitiate)
        internal
        virtual
        returns (uint256)
    {
        // access each initiate's balance
        uint256 balance = _staked[_failedInitiate];

        // log sacrifice data
        emit Sacrifice(_failedInitiate, balance, msg.sender);

        // remove the sacrifice's balance
        delete _staked[_failedInitiate];

        // remove the sacrifice's starting time
        delete deadlines[_failedInitiate];

        return balance;
    }

    function _bloodFeast(uint256 _blood) internal virtual {
        // drain the life force from the sacrifice
        require(_token.transfer(treasury, _blood), "Failed Sacrifice!");

        // increase the slasher's essence
        totalSlash[msg.sender] += _blood;
    }

    /**
     * @dev initiates who were sacrificed in _darkRitual are no longer in initiates array
     * so, the remaining initiates are survivors and added to the survivors array
     * the initiates array is deleted to remove all zeroed placeholders
     * then repopulated with the survivors
     */
    function _consolidateSurvivors() internal virtual {
        for (uint256 i = 0; i < initiates.length; i++) {
            if (initiates[i] != address(0)) {
                // add survivors of bloodLetting to survivors array
                survivors.push(initiates[i]);
            } else {
                continue;
            }
        }
        // replace initiates array with updated survivors array
        initiates = survivors;

        // reset survivors to an empty array
        delete survivors;
    }

    function _riseFromAshes() internal virtual {
        // reset to initData values
        cohortCounter = initiates.length;

        // carry-over is less then cohort
        require(
            cohortCounter <= cohortSize,
            "Carry-over initiates exceed cohort-count"
        );

        joinEndTime = block.timestamp + joinDuration;
        cohortSeason++;
    }

    /**
     * @dev Authenticates users through the DAO contract
     */
    function _checkMember() internal virtual {
        uint256 shares = _sharesToken.balanceOf(msg.sender);
        require(shares >= minimumShare, "You must be a member!");
    }

    function _checkManager() internal virtual {
        require(
            baal.isManager(address(this)) == true,
            "This RiteOfMoloch is not a Manager-Shaman!"
        );
    }

    /*************************
     VIEW AND PURE FUNCTIONS
     *************************/

    /**
     * @dev returns the user's deadline for onboarding
     */
    function getDeadline(address user) public view returns (uint256) {
        return deadlines[user];
    }

    /**
     * @dev returns the user's member status
     */
    function isMember(address user) public returns (bool) {
        uint256 shares = _sharesToken.balanceOf(msg.sender);

        return (shares >= minimumShare);
    }

    /*************************
     OVERRIDES
     *************************/

    function _baseURI() internal view override returns (string memory) {
        return __baseURI;
    }

    // Cohort NFTs cannot be transferred
    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        revert();
    }

    // The following functions are overrides required by Solidity.
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721Upgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /*************************
     HATS ACCESS CONTROL SETUP
     *************************/

    /**
     * @dev create & mint admin hats to deployer & admin addresses
     * DAO can grant/revoke adminHats (after topHat is transferred below)
     */
    function initializeHatTree(
        address _deployer,
        address _admin1,
        address _admin2
    ) public {
        require(initHatTreeLock == false, "Hats already initialized");
        initHatTreeLock = true;

        // admin privileges: access control
        adminHat = HATS.createHat(
            topHat,
            "ROM Admin",
            3,
            address(baal),
            address(baal),
            true,
            ""
        );

        // grant Hat Access Control role
        _grantRole(ADMIN, adminHat);

        HATS.mintHat(adminHat, _deployer);

        if (_admin1 != address(0)) {
            HATS.mintHat(adminHat, _admin1);
        }
        if (_admin2 != address(0)) {
            HATS.mintHat(adminHat, _admin2);
        }

        // return topHat to  Baal Avatar
        HATS.transferHat(topHat, address(this), treasury);
    }

    /*************************
     ENCODING
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
     * @dev Encoding function for accessing an existing topHat
     */
    function _encodeHatProposal() internal view returns (bytes memory) {
        return
            abi.encodeWithSignature(
                "transferHat(uint256,address,address)",
                topHat,
                treasury,
                address(this)
            );
    }

    /**
     * @dev Encoding function for building on existing Hats tree
     */
    function _encodeBuildHatTree(
        address _deployer,
        address _admin1,
        address _admin2
    ) internal view returns (bytes memory) {
        return
            abi.encodeWithSignature(
                "initializeHatTree(address,address,address)",
                _deployer,
                _admin1,
                _admin2
            );
    }

    /**
     * @dev Format multiSend for encoded functions
     */
    function _encodeMultiMetaTx(bytes[] memory _data, address[] memory _targets)
        internal
        view
        returns (bytes memory)
    {
        bytes memory metaTx;

        for (uint256 i = 0; i < _data.length; i++) {
            metaTx = abi.encodePacked(
                metaTx,
                uint8(0),
                _targets[i],
                uint256(0),
                uint256(_data[i].length),
                _data[i]
            );
        }
        return abi.encodeWithSignature("multiSend(bytes)", metaTx);
    }

    /**
     * @dev Submit voting proposal to Baal DAO
     */
    function _submitBaalProposal(bytes memory multiSendMetaTx, bool shaman)
        internal
    {
        uint256 proposalOffering = baal.proposalOffering();
        require(msg.value == proposalOffering, "Missing tribute");

        string memory metaString;

        if (shaman) {
            metaString = '{"proposalType": "ADD_SHAMAN", "title": "Rite of Moloch (ROM): Shaman Proposal", "description": "Assign ROM as a Manager-Shaman to mint minimum DAO shares"}';
        } else {
            metaString = '{"proposalType": "BORROW_TOPHAT", "title": "Rite of Moloch (ROM): Hats Proposal", "description": "Create and mint ROM-Admin hats from DAO TopHat"}';
        }

        baal.submitProposal{value: proposalOffering}(
            multiSendMetaTx,
            0,
            0,
            metaString
        );
    }
}
