import { ethers } from "ethers";
import fs from "fs";
import "dotenv/config";

async function main() {
  const wallet = new ethers.Wallet("" + process.env.PRIVATE_KEY);
  const encryptedJsonKey = await wallet.encrypt(
    "" + process.env.PASSWORD,
    process.env.PRIVATE_KEY
  );

  fs.writeFileSync("./.encryptedJSON.json", encryptedJsonKey);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
