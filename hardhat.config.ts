import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "solidity-coverage";
import "hardhat-deploy";
//import "ethereum-waffle";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  namedAccounts: { 
    deployer: {
      default:0
    } 
  },
  networks: {
    hardhat: {
      chainId: 31337
    },
    rinkeby: {
      accounts: [ `${process.env.BLOCKCHAIN_RINKEBY_PRIVATE_KEY}` ],
      url: `https://rinkeby.infura.io/v3/${process.env.BLOCKCHAIN_INFURA_KEY}`,
      chainId: 4,
    }
  }
};

export default config;
