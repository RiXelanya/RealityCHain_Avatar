import CollectionConfigInterface from "../lib/CollectionConfigInterface";
import * as Networks from "../lib/Networks";
import * as Marketpalce from "../lib/Marketplaces";
import freeMint from "./freeMint.json";
import reserve from "./reserve.json";
import guaranted from "./guarantedd.json";

function getTimestampForFutureDate(daysToAdd: number): number {
    const timestamp = daysToAdd * 24 * 60 * 60;
    return timestamp;
  }

const CollectionConfig: CollectionConfigInterface = {
    testnet: Networks.polygonTestnet,
    mainnet: Networks.ethereumMainnet,
    contractName: "TestingLOG",
    durationLockToken: getTimestampForFutureDate(7),
    hiddenMetadata: "ipfs://QmbygiS9xLr2dDsRUDGSNYoDATGai1YQ2xnUFqwVczzn5j/LOG.json",
    contractAddress: "0x5E2066E7E8C052d34D6043012a495A8ccf38D136",
    marketplaceIdentifier: "This-is-only-a-demo-test-nft",
    marketplaceConfig: Marketpalce.openSea,
    freeMintAddress: freeMint, // on changes
    reserveAddress: reserve,
    guarantedAddress: guaranted
};

export default CollectionConfig;