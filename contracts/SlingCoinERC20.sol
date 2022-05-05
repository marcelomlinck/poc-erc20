//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract SlingCoinERC20 is ERC20 {
    using SafeMath for uint256;

    address private immutable owner;
    mapping (address => bool) public walletExists;

    event SignedUpNewWallet(address _address, uint256 _amount);
    event MintedTo(address _address, uint256 _amount);
    event BurnedFrom(address _address, uint256 _amount);

    constructor(uint256 _initialSupply) ERC20("SlingCoin", "SLG") {
        owner = msg.sender;
        _mint(msg.sender, _initialSupply * 10**decimals());
        walletExists[msg.sender] = true;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "SlingCoinERC20: Request can only be performed by Owner");
        _;
    }

    modifier mustWalletExist(address _address) {
        require(walletExists[_address] == true, "SlingCoinERC20: Wallet does not exist");
        _;
    }

    modifier mustNotWalletExist(address _address) {
        require(walletExists[_address] == false, "SlingCoinERC20: Wallet already exists");
        _;
    }

    function getOwner() external view returns (address) {
        return owner;
    }

    function newWallet(address _address, uint256 _amount) external onlyOwner mustNotWalletExist(_address) {
        _mint(_address, _amount);
        walletExists[_address] = true;

        emit SignedUpNewWallet(_address, _amount);
    }

    function mint(address _to, uint256 _amount) external onlyOwner mustWalletExist(_to) {
        _mint(_to, _amount);

        emit MintedTo(_to, _amount);
    }

    function deduct(address _from, uint256 _amount) external onlyOwner mustWalletExist(_from) {
        _burn(_from, _amount);

        emit BurnedFrom(_from, _amount);
    }

    function doesWalletExist(address _address) external view onlyOwner returns (bool){
        return walletExists[_address];
    }

}
