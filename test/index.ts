import { describe } from "mocha";
import { expect } from "chai";
import { deployments, ethers, getNamedAccounts } from "hardhat";
import { SlingCoinERC20 } from "../typechain-types/contracts/SlingCoinERC20";

describe("SlingCoinERC20", function () {
    let owner: string;
    let contract: SlingCoinERC20;

    beforeEach(async () => {
        await deployments.fixture([ 'SlingCoinERC20' ]);
        const { deployer } = await getNamedAccounts();
        owner = deployer;
        contract =  await ethers.getContract("SlingCoinERC20") as SlingCoinERC20;
    });

    it("Should deployer be same address as owner", async function () {
        const contractOwner = await contract.getOwner();

        expect(contractOwner).to.be.equal(owner);
    });

    it("Should deploy with initial supply as owners balance", async function () {
        const ownerBalance = await contract.balanceOf(owner);
        const totalSupply = await contract.totalSupply();

        expect(ownerBalance).to.be.equal(totalSupply);
    });

    it("Should keep a record of signed up wallets", async function () {
        const wallet = ethers.Wallet.createRandom();
        await contract.newWallet(wallet.address, 100);
        const walletExists = await contract.doesWalletExist(wallet.address);

        expect(walletExists).to.be.true;
    });

    it("Should create new wallet with starting balance", async function () {
        const wallet = ethers.Wallet.createRandom();
        await contract.newWallet(wallet.address, 100);
        const walletBalance = await contract.balanceOf(wallet.address);

        expect(walletBalance).to.be.equal(100);
    });

    it("Should not sign up wallet twice", async function () {
        const wallet = ethers.Wallet.createRandom();
        await contract.newWallet(wallet.address, 100);

        expect(contract.newWallet(wallet.address, 100))
        .to.be.revertedWith("SlingCoinERC20: Wallet already exist");
    });

    it("Should not allow to access non signed up wallets", async function () {
        const wallet = ethers.Wallet.createRandom();

        expect(contract.mint(wallet.address, 100))
        .to.be.revertedWith("SlingCoinERC20: Wallet does not exist");
    });

    it("Should allow to send to a wallet", async function () {
        const wallet = ethers.Wallet.createRandom();
        await contract.newWallet(wallet.address, 0);
        await contract.mint(wallet.address, 100);
        const walletBalance = await contract.balanceOf(wallet.address);

        expect(walletBalance).to.be.equal(100);
    });

    it("Should not allow non-owner account to send to another account", async function () {
        const wallet = ethers.Wallet.createRandom();
        const wallet2 = ethers.Wallet.createRandom();
        await contract.newWallet(wallet.address, 50);
        
        expect(contract.connect(wallet2.address).mint(wallet.address, 60))
        .to.be.revertedWith("SlingCoinERC20: Request can only be performed by Owner");
    });

    it("Should allow to add up tokens", async function () {
        const wallet = ethers.Wallet.createRandom();
        await contract.newWallet(wallet.address, 50);
        await contract.mint(wallet.address, 100);
        await contract.mint(wallet.address, 100);
        const walletBalance = await contract.balanceOf(wallet.address);

        expect(walletBalance).to.be.equal(250);
    });

    it("Should allow to deduct tokens from a wallet", async function () {
        const wallet = ethers.Wallet.createRandom();
        await contract.newWallet(wallet.address, 50);
        await contract.deduct(wallet.address, 20);
        const walletBalance = await contract.balanceOf(wallet.address);

        expect(walletBalance).to.be.equal(30);
    });

    it("Should not deduct less than wallet balance", async function () {
        const wallet = ethers.Wallet.createRandom();
        await contract.newWallet(wallet.address, 50);
        
        expect(contract.deduct(wallet.address, 60))
        .to.be.revertedWith("ERC20: burn amount exceeds balance");
    });

    it("Should not allow non-owner account to deduct form another account", async function () {
        const wallet = ethers.Wallet.createRandom();
        const wallet2 = ethers.Wallet.createRandom();
        await contract.newWallet(wallet.address, 50);
        
        expect(contract.connect(wallet2.address).deduct(wallet.address, 60))
        .to.be.revertedWith("SlingCoinERC20: Request can only be performed by Owner");
    });
});
