import fs from 'fs';
import CollectionConfig from "../config/CollectionConfig";
import ContractArguments from "../config/ContractArguments";
import NftContractProvider, { NftContractType } from "../lib/NftContractProvider";
import { ethers } from "hardhat";


enum AVATAR {
  LEGENDARY = 0,
  EPIC = 1,
  RARE = 2,
}

const TIERS = [AVATAR.LEGENDARY, AVATAR.EPIC, AVATAR.RARE];
const AVATARS = {
  [AVATAR.LEGENDARY]: "Legendary",
  [AVATAR.EPIC]: "Epic",
  [AVATAR.RARE]: "Rare",
};

// Preparation
// - Create an empty folder on your computer
// - Open your command line and change the directory to your created folder
// - Run ``git clone https://github.com/RiXelanya/RealityCHain_Avatar/ .``
// - Run ``yarn install``

// Set the configuration
// - Set TEAM_PRIVATE_KEY in the env
// - Set MAX_MINTING_AMOUNT_PER_ROUND to 0 if you want to mint all in one round (default: 55)

// Start minting
// - Run script ``yarn mint-team --network <your network (mainnet | testnet | localhost | truffle)>``

const MAX_MINTING_AMOUNT_PER_ROUND = 1;
const GAS_LIMIT = 5000000;

async function main() {
    const [deployer, teamAddress] = await ethers.getSigners();
    const nftContractPath = "nft-contract.json";

    let isError = false;

    try {
      if (!deployer || !teamAddress) {
        throw new Error('Please set the deployer or team address private key');
      }

      // Deploying the contract
      let init = false;
      let contractAddress = readFile<{ contract: string }>(nftContractPath)?.contract;

      if (!contractAddress) {
        console.log("\nStart deploying contract..");
        console.log("============================");

        const Contract = await ethers.getContractFactory(CollectionConfig.contractName);
        const contract = await Contract.deploy(...ContractArguments) as unknown as NftContractType;
      
        await contract.deployed();

        console.log("Greeter deployed to:", contract.address);

        init = true;
        contractAddress = contract.address;

        fs.writeFileSync(nftContractPath, JSON.stringify({ contract: contractAddress }));
      }

      const contract = await NftContractProvider.getContract(contractAddress);

      if (init) {
        // Set base uri
        const uri = process.env.COLLECTION_URI_PREFIX;
        await contract.connect(deployer).setBaseUri(uri);
      }

      console.log("\nTeam address:", teamAddress.address);
      console.log(`Start minting avatar...`);
      console.log("=======================");
      for (const tier of TIERS) {
        try {
          const { cost, supply, isOpen } = await contract.avatar(tier);

          if (!isOpen) {
            await contract.connect(deployer).toggleMint(tier, true);
          }
  
          const totalMintClaimed = await contract.getAddressAlreadyClaimed(tier, teamAddress.address);
          const totalMintLeft = Math.ceil(Number(supply) / 5) - Number(totalMintClaimed);

          if (totalMintLeft === 0) {
            console.log(`${AVATARS[tier]} is already minted. Total:`, totalMintClaimed.toString());
            continue;
          }

          const mintingAmount = totalMintLeft;
          const maxMintingAmountPerRound = MAX_MINTING_AMOUNT_PER_ROUND <= 0 ? mintingAmount : MAX_MINTING_AMOUNT_PER_ROUND;
          const totalRound = Math.ceil((mintingAmount) / maxMintingAmountPerRound);
          
          console.log(`Start minting ${mintingAmount} ${AVATARS[tier]} avatar...`);
                  
          let mintingAmountLeft = mintingAmount;
          for (let i = 0; i < totalRound; i++) {
            const amount = maxMintingAmountPerRound <= mintingAmountLeft ? maxMintingAmountPerRound : mintingAmountLeft;
  
            console.log(`Round ${i + 1}: Minting ${amount}...`);

            await contract.connect(teamAddress).mintTeam(BigInt(amount), tier, {
              value: BigInt(cost) * BigInt(amount),
              gasLimit: BigInt(GAS_LIMIT),
            });
  
            mintingAmountLeft -= amount;

            // Withdraw
            await contract.connect(deployer).withdraw();
          }
  
          console.log(`${AVATARS[tier]} avatar is minted!\n`);
        } catch (err: any) {
          isError = true;
          fs.writeFileSync(`${AVATARS[tier].toLowerCase()}-error.log`, err.toString());
          console.log("Minting is failed\n");
        }
      }
    } catch (err: any) {
      fs.writeFileSync("ethers-error.log", err.toString());
    }

    if (!isError) {
      fs.unlink(nftContractPath, () => ({}));
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

function readFile<T>(path: string): T | null {
  try {
    const data = fs.readFileSync(path, "utf-8");
    return JSON.parse(data);
  } catch {
    //
  }

  return null;
}
