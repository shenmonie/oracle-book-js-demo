// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const Web3 = require("web3");
const abi = JSON.parse(`[{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getByTokenId","outputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint8","name":"status","type":"uint8"},{"internalType":"uint16","name":"avatarType","type":"uint16"},{"internalType":"uint8","name":"rank","type":"uint8"},{"internalType":"uint64","name":"mintTime","type":"uint64"},{"internalType":"uint256","name":"randomNumber","type":"uint256"},{"internalType":"uint64","name":"lastUpdateTime","type":"uint64"},{"internalType":"uint32","name":"chronosis","type":"uint32"},{"internalType":"uint32","name":"echo","type":"uint32"},{"internalType":"uint32","name":"convergence","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"mintSwitch","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalNormalAvatar","outputs":[{"internalType":"uint256","name":"count","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"whitelistMint","outputs":[],"stateMutability":"payable","type":"function"}]`)

export default async function handler(req, res) {
  const query = req.query;
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${process.env.NETWORK}.infura.io/v3/${process.env.NETWORK_KEY}`
    )
  );
  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
  web3.eth.accounts.wallet.add(signer);
  // Creating a Contract instance
  const contract = new web3.eth.Contract(
    abi,
    // Replace this with the address of your deployed contract
    process.env.CONTRACT_ADDRESS,
  );

  contract.methods.getByTokenId(query["token"]).call(
    function (err, res_get) {
      if (err) {
        console.log("An error occurred", err)
        res.status(500).json({
          message: `${err}`
        })
      }
      var avatar = {
        id: query["token"],
        owner: res_get["owner"],
        status: res_get["status"],
        avatarType: res_get["avatarType"],
        rank: res_get["rank"],
        mintTime: res_get["mintTime"],
        randomNumber: res_get["randomNumber"],
        lastUpdateTime: res_get["lastUpdateTime"],
        chronosis: res_get["chronosis"],
        echo: res_get["echo"],
        convergence: res_get["convergence"]
      }
      res.status(200).json({
        message: "ok",
        data: avatar
      })
    }
  )
}
