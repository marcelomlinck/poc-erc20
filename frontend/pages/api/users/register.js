const bcrypt = require('bcryptjs');

import { apiHandler, usersRepo } from 'helpers/api';
import { ethers } from "ethers";

let WillowCoinERC20 = require('contracts/WillowCoinERC20.json');

export default apiHandler({
    post: register
});

async function register(req, res) {
    // split out password from user details
    const { password, ...user } = req.body;

    // validate
    if (usersRepo.find(x => x.username === user.username))
        throw `User with the username "${user.username}" already exists`;

    // hash password
    user.hash = bcrypt.hashSync(password, 10);  
    
    // create wallet 
    const wallet = ethers.Wallet.createRandom();
    user.publicAddress = wallet.address;
    user.publicKey = wallet.publicKey;
    user.privateKey = wallet.privateKey;

    const provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_NETWORK_URL)
    const ownerWallet = new ethers.Wallet(process.env.BLOCKCHAIN_PRIVATE_KEY, provider);
    const contract = new ethers.Contract(process.env.BLOCKCHAIN_CONTRACT_ADDRESS, WillowCoinERC20.abi, ownerWallet)
    return contract.newWallet(user.publicAddress, process.env.BLOCKCHAIN_START_AMOUNT).then(() => {
        usersRepo.create(user)
        return res.status(200).json({});
    })
    .catch(() => {
        return res.status(500).json({});
    });
}