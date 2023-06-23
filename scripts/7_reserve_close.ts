import NftContractProvider from "../lib/NftContractProvider";

async function main() {
    // attach to deploy contract
    const contract = await NftContractProvider.getContract();

    // Disable whitelist sale (if needed)
  if (((await contract.feature(2)).isOpen)) {
    console.log('Disabling reserve...');

    await (await contract.openWhitelistMint(2, false)).wait();
  }
    
    console.log("Reserve has been disabled!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});