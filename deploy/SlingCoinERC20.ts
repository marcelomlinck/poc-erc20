import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const deployFunction: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployer } = await hre.getNamedAccounts()
    const { deploy, log } = hre.deployments

    log('deploying to', hre.network.name)

    await deploy('SlingCoinERC20', {
        from: deployer,
        args: [ 0 ],
        log: true
    })
}

export default deployFunction

deployFunction.tags = [ 'SlingCoinERC20' ]