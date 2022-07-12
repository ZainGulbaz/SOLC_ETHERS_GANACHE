import { ethers } from "ethers";
import * as fs from "fs";
import "dotenv/config";
import { env } from "process";

const main = async () => {
  try {
    let provider = new ethers.providers.JsonRpcProvider(
      "HTTP://127.0.0.1:7545"
    );
    let encryptedJSON = fs.readFileSync("./.encryptedJSON.json", "utf8");
    if (!encryptedJSON) encryptedJSON = " ";
    let wallet = ethers.Wallet.fromEncryptedJsonSync(
      encryptedJSON,
      "" + env.password
    );

    wallet = wallet.connect(provider);
    const abi = fs.readFileSync(
      "./SimpleStorage_sol_SimpleStorage.abi",
      "utf8"
    );
    const bin = fs.readFileSync(
      "./SimpleStorage_sol_SimpleStorage.bin",
      "utf8"
    );
    let contractFactory = new ethers.ContractFactory(abi, bin, wallet);
    console.log("Deploying......please wait");
    let contract = await contractFactory.deploy();

    // //The transaction Receipt wait for the one block to mine and then show the details
    // // let transactionReceipt = await contract.deployTransaction.wait(1);
    // // console.log(transactionReceipt);
    // // //Transaction detials just after deployment before mining
    // // console.log(contract.deployTransaction);
    let myFavNum = await contract.retrieve();
    console.log(myFavNum.toString());
    await contract.store("100");
    await contract.deployTransaction.wait(1);
    let updatedFavNum = await contract.retrieve();
    console.log(updatedFavNum.toString());
  } catch (err) {
    console.log("Here is Error", err);
  }
};
main();
