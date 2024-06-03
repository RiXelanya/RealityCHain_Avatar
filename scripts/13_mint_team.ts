import MerkleTree from "merkletreejs";
import NftContractProvider from "../lib/NftContractProvider";
import keccak256 from "keccak256";
import { ethers } from "hardhat";
import fs from 'fs';

// Step
// - Set team address private key in the env
// - Set max minting amount per round (default: 55) 
//   if you want to mint all in one round set to 0

enum AVATAR {
  LEGENDARY = 0,
  EPIC = 1,
  RARE = 2,
}

const MAX_MINTING_AMOUNT_PER_ROUND = 55; // Set the max minting amount / round
const TIERS = [AVATAR.LEGENDARY, AVATAR.EPIC, AVATAR.RARE];
const AVATARS = {
  [AVATAR.LEGENDARY]: "Legendary",
  [AVATAR.EPIC]: "Epic",
  [AVATAR.RARE]: "Rare",
};

async function main() {
    const [deployer, teamAddress] = await ethers.getSigners();

    const contract = await NftContractProvider.getContract();

    let isError = false;

    try {
      if (!deployer || !teamAddress) {
        throw new Error('Please set the private key');
      }

      if (await contract.getTeamAddress() !== teamAddress.address) {
        console.log("\nStart registering team address...");
        console.log("===================================");
        await contract.setTeamAddress(teamAddress.address);
        console.log(await contract.getTeamAddress(), "is registered!");
      }

      const leafNodes = [deployer.address, teamAddress.address].map(addr => keccak256(addr));
      const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
      const rootHash = merkleTree.getHexRoot();
      const proof = merkleTree.getHexProof(keccak256(teamAddress.address));

      console.log(`\n${teamAddress.address} is starting to mint avatar...`);
      console.log("========================================================================");
      for (const tier of TIERS) {
        try {
          const { cost, supply, isOpen } = await contract.avatar(tier);

          if (!isOpen) {
            await contract.connect(deployer).toggleMint(tier, true);
          }
  
          if (tier !== AVATAR.RARE) {
            await contract.connect(deployer).setMerkleRoot(tier, rootHash);
          }
  
          const mintingAmount = Math.ceil(Number(supply) / 5);
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
          }
  
          console.log(`${AVATARS[tier]} avatar is minted!\n`);
        } catch (err: any) {
          isError = true;
          fs.writeFileSync("ethers-error.log", err.toString());
          console.log("Minting is failed\n");
        }
      }
    } catch (err: any) {
      fs.writeFileSync("ethers-error.log", err.toString());
      console.log("Minting is failed\n");
    }

    if (isError) {
      console.log("See: ./ethers-error.log");
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});