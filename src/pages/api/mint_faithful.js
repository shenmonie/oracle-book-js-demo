// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// HARDCODE ADDRESS OF CONTRACTS & WALLETS FOR A DEMO ON VERCEL

const Web3 = require("web3");
const fs = require("fs");
const abi = JSON.parse(`[{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getByTokenId","outputs":[{"internalType":"uint256","name":"randomNumber","type":"uint256"},{"internalType":"uint8","name":"status","type":"uint8"},{"internalType":"uint8","name":"attack","type":"uint8"},{"internalType":"uint8","name":"defense","type":"uint8"},{"internalType":"uint8","name":"fortune","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"totalSupply_","type":"uint256"}],"stateMutability":"view","type":"function"}]`)

export default async function handler(req, res) {
  const network = "goerli";
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${network}.infura.io/v3/57c27c52a64641d2b0d7d008a6abc7aa`
    )
  );
  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    "dc7b2ac217d285128ddf229439761e43292beac9859cf023a6d5a5648cbf2eb0"
  );
  web3.eth.accounts.wallet.add(signer);
  // Creating a Contract instance
  const contract = new web3.eth.Contract(
    abi,
    // Replace this with the address of your deployed contract
    "0x65b624aC09a3d33095F6337bbaf42be64513707F"
  );
  // Issuing a transaction that calls the `echo` method
  console.log(`Start minting`)
  const tx = contract.methods.mint("0xf91D9DBf3D015fDba5EB612b69F994DfE46C765b");
  console.log(`Finish minting`)
  const receipt = await tx
    .send({
      from: "0xf91D9DBf3D015fDba5EB612b69F994DfE46C765b",
      to: "0x96fF4518A1e15b4C7bE7897408ad56e35f462A43",
      gas: await tx.estimateGas(),
    })
    .once("transactionHash", (txhash) => {
      console.log(`Mining transaction ...`);
      console.log(`https://${network}.etherscan.io/tx/${txhash}`);
    });
  // The transaction is now on chain!
  console.log(JSON.stringify(receipt))
  console.log(`Mined in block ${receipt.blockNumber}`);
  const msg = `Mining transaction ...\nhttps://${network}.etherscan.io/tx/${receipt.transactionHash}\nMined in block ${receipt.blockNumber}`
  res.status(200).json({ message: `${msg}` })
}
