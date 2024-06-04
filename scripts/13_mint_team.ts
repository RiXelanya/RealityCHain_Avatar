import MerkleTree from "merkletreejs";
import NftContractProvider, { NftContractType } from "../lib/NftContractProvider";
import keccak256 from "keccak256";
import { ethers } from "hardhat";
import fs from 'fs';
import CollectionConfig from "../config/CollectionConfig";
import ContractArguments from "../config/ContractArguments";

enum AVATAR {
  LEGENDARY = 0,
  EPIC = 1,
  RARE = 2,
}

type TotalMintLeft = {
  [AVATAR.LEGENDARY]: number,
  [AVATAR.EPIC]: number,
  [AVATAR.RARE]: number, 
}

const TIERS = [AVATAR.LEGENDARY, AVATAR.EPIC, AVATAR.RARE];
const AVATARS = {
  [AVATAR.LEGENDARY]: "Legendary",
  [AVATAR.EPIC]: "Epic",
  [AVATAR.RARE]: "Rare",
};

const defaultTotalMintLeft = {
  [AVATAR.LEGENDARY]: -1,
  [AVATAR.EPIC]: -1,
  [AVATAR.RARE]: -1,
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

const MAX_MINTING_AMOUNT_PER_ROUND = 10;

async function main() {
    const [deployer, teamAddress] = await ethers.getSigners();
    const totalMintLeftPath = "total-mint-left.json";
    const nftContractPath = "nft-contract.json";

    let isError = false;

    try {
      if (!deployer || !teamAddress) {
        throw new Error('Please set the private key');
      }

      // Deploying the contract
      let contractAddress = readFile<{ contract: string }>(nftContractPath)?.contract;

      if (!contractAddress) {
        console.log("\nStart deploying contract..");
        console.log("============================");

        const Contract = await ethers.getContractFactory(CollectionConfig.contractName);
        const contract = await Contract.deploy(...ContractArguments) as unknown as NftContractType;
      
        await contract.deployed();

        console.log("Greeter deployed to:", contract.address);

        contractAddress = contract.address;

        fs.writeFileSync(nftContractPath, JSON.stringify({ contract: contractAddress }));
      }

      const contract = await NftContractProvider.getContract(contractAddress);

      // Set base uri
      const uri = process.env.COLLECTION_URI_PREFIX;
      await contract.connect(deployer).setBaseUri(uri);

      // Mint Avatar
      const totalMintLeft = readFile<TotalMintLeft>(totalMintLeftPath) || defaultTotalMintLeft;
      const leafNodes = [deployer.address, teamAddress.address].map(addr => keccak256(addr));
      const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
      const rootHash = merkleTree.getHexRoot();
      const proof = merkleTree.getHexProof(keccak256(teamAddress.address));

      console.log("\nTeam address:", teamAddress.address);
      console.log(`Start minting avatar...`);
      console.log("=======================");
      for (const tier of TIERS) {
        try {
          const { cost, supply, isOpen } = await contract.avatar(tier);

          if (!isOpen) {
            await contract.connect(deployer).toggleMint(tier, true);
          }
  
          if (tier !== AVATAR.RARE) {
            await contract.connect(deployer).setMerkleRoot(tier, rootHash);
          }
  
          const mintingAmount = totalMintLeft[tier] < 0 ? Math.ceil(Number(supply) / 5) : totalMintLeft[tier];

          if (mintingAmount === 0) {
            continue;
          }

          const maxMintingAmountPerRound = MAX_MINTING_AMOUNT_PER_ROUND <= 0 ? mintingAmount : MAX_MINTING_AMOUNT_PER_ROUND;
          const totalRound = Math.ceil((mintingAmount) / maxMintingAmountPerRound);
          
          console.log(`Start minting ${mintingAmount} ${AVATARS[tier]} avatar...`);
                  
          let mintingAmountLeft = mintingAmount;
          for (let i = 0; i < totalRound; i++) {
            const amount = maxMintingAmountPerRound <= mintingAmountLeft ? maxMintingAmountPerRound : mintingAmountLeft;
  
            console.log(`Round ${i + 1}: Minting ${amount}...`);
  
            if (tier === AVATAR.LEGENDARY) {
              await contract.connect(teamAddress).mintLegendary(BigInt(amount), proof, { 
                value: BigInt(cost) * BigInt(amount),
              });
            }
    
            if (tier === AVATAR.EPIC) {
              await contract.connect(teamAddress).mintEpic(BigInt(amount), proof, { 
                value: BigInt(cost) * BigInt(amount),
              });
            }
    
            if (tier === AVATAR.RARE) {
              await contract.connect(teamAddress).mintRare(BigInt(amount), { 
                value: BigInt(cost) * BigInt(amount),
              });
            }
  
            mintingAmountLeft -= amount;
            totalMintLeft[tier] = mintingAmountLeft

            fs.writeFileSync(totalMintLeftPath, JSON.stringify(totalMintLeft, undefined, 2));

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
      console.log("Minting is failed\n");
      console.log("See: ./ethers-error.log");
    }

    if (isError) {
      console.log("See: ./[tier]-error.log");
    } else {
      fs.unlink(totalMintLeftPath, () => ({}));
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