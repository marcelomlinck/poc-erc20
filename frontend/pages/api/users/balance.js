import { apiHandler, usersRepo } from 'helpers/api';
import { ethers } from "ethers";

let WillowCoinERC20 = require('contracts/WillowCoinERC20.json');

export default apiHandler({
    post: balance
});

async function balance(req, res) {
    const user = usersRepo.getById(req.body.userId);
    if (!user) throw 'User Not Found';

    const provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_NETWORK_URL)
    const ownerWallet = new ethers.Wallet(process.env.BLOCKCHAIN_PRIVATE_KEY, provider);
    const contract = new ethers.Contract(process.env.BLOCKCHAIN_CONTRACT_ADDRESS, WillowCoinERC20.abi, ownerWallet)
    return contract.balanceOf(user.publicAddress).then((balanceBigNumber) => { 
        return res.status(200).json(balanceBigNumber.toNumber());
    })
    .catch(() => {
        return res.status(500).json({});
    });
}
