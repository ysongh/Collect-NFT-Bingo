require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

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

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.6.12",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 80001
    },
    // npx hardhat run scripts/sample-script.js --network mumbai
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMYAPI_KEY}`,
      accounts: [process.env.PRIVATEKEY],
      gasPrice: 8000000000
    }
  },
};
