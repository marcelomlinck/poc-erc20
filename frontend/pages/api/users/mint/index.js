import { apiHandler } from 'helpers/api';
import { usersRepo, omit } from 'helpers/api';

import { ethers } from "ethers";

let SlingCoinERC20 = require('contracts/SlingCoinERC20.json');

export default apiHandler({
    post: mint,
});

function mint(req, res) {
    if (!Number.isInteger(req.body.userId) || !Number.isInteger(req.body.amount)) {
        return res.status(400).json({message:"Invalid body"});
    }

    const user = usersRepo.getById(req.body.userId);

    if (!user) throw 'User Not Found';

    const provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_NETWORK_URL)
    const ownerWallet = new ethers.Wallet(process.env.BLOCKCHAIN_PRIVATE_KEY, provider);
    const contract = new ethers.Contract(process.env.BLOCKCHAIN_CONTRACT_ADDRESS, SlingCoinERC20.abi, ownerWallet)
    return contract.mint(user.publicAddress, req.body.amount).then(() => {
        return res.status(200).json({});
    })
    .catch(() => {
        return res.status(500).json({});
    });
}
