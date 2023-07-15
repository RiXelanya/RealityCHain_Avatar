/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomicfoundation/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "IERC2981",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC2981__factory>;
    getContractFactory(
      name: "IERC4906",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC4906__factory>;
    getContractFactory(
      name: "ERC2981",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC2981__factory>;
    getContractFactory(
      name: "ERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721__factory>;
    getContractFactory(
      name: "ERC721URIStorage",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721URIStorage__factory>;
    getContractFactory(
      name: "IERC721Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Metadata__factory>;
    getContractFactory(
      name: "IERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721__factory>;
    getContractFactory(
      name: "IERC721Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Receiver__factory>;
    getContractFactory(
      name: "ERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "TestRealityChainAvatar",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestRealityChainAvatar__factory>;
    getContractFactory(
      name: "ERC721A__IERC721Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721A__IERC721Receiver__factory>;
    getContractFactory(
      name: "ERC721A",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721A__factory>;
    getContractFactory(
      name: "IERC721A",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721A__factory>;
    getContractFactory(
      name: "DefaultOperatorFilterer",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DefaultOperatorFilterer__factory>;
    getContractFactory(
      name: "IOperatorFilterRegistry",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IOperatorFilterRegistry__factory>;
    getContractFactory(
      name: "OperatorFilterer",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OperatorFilterer__factory>;

    getContractAt(
      name: "Ownable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "IERC2981",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC2981>;
    getContractAt(
      name: "IERC4906",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC4906>;
    getContractAt(
      name: "ERC2981",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC2981>;
    getContractAt(
      name: "ERC721",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721>;
    getContractAt(
      name: "ERC721URIStorage",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721URIStorage>;
    getContractAt(
      name: "IERC721Metadata",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Metadata>;
    getContractAt(
      name: "IERC721",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721>;
    getContractAt(
      name: "IERC721Receiver",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Receiver>;
    getContractAt(
      name: "ERC165",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165>;
    getContractAt(
      name: "IERC165",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "TestRealityChainAvatar",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.TestRealityChainAvatar>;
    getContractAt(
      name: "ERC721A__IERC721Receiver",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721A__IERC721Receiver>;
    getContractAt(
      name: "ERC721A",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721A>;
    getContractAt(
      name: "IERC721A",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721A>;
    getContractAt(
      name: "DefaultOperatorFilterer",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.DefaultOperatorFilterer>;
    getContractAt(
      name: "IOperatorFilterRegistry",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IOperatorFilterRegistry>;
    getContractAt(
      name: "OperatorFilterer",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.OperatorFilterer>;

    deployContract(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable>;
    deployContract(
      name: "IERC2981",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC2981>;
    deployContract(
      name: "IERC4906",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC4906>;
    deployContract(
      name: "ERC2981",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC2981>;
    deployContract(
      name: "ERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721>;
    deployContract(
      name: "ERC721URIStorage",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721URIStorage>;
    deployContract(
      name: "IERC721Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Metadata>;
    deployContract(
      name: "IERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721>;
    deployContract(
      name: "IERC721Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Receiver>;
    deployContract(
      name: "ERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165>;
    deployContract(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165>;
    deployContract(
      name: "TestRealityChainAvatar",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestRealityChainAvatar>;
    deployContract(
      name: "ERC721A__IERC721Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721A__IERC721Receiver>;
    deployContract(
      name: "ERC721A",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721A>;
    deployContract(
      name: "IERC721A",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721A>;
    deployContract(
      name: "DefaultOperatorFilterer",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DefaultOperatorFilterer>;
    deployContract(
      name: "IOperatorFilterRegistry",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IOperatorFilterRegistry>;
    deployContract(
      name: "OperatorFilterer",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OperatorFilterer>;

    deployContract(
      name: "Ownable",
      args: any[],
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable>;
    deployContract(
      name: "IERC2981",
      args: any[],
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC2981>;
    deployContract(
      name: "IERC4906",
      args: any[],
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC4906>;
    deployContract(
      name: "ERC2981",
      args: any[],
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC2981>;
    deployContract(
      name: "ERC721",
      args: any[],
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721>;
    deployContract(
      name: "ERC721URIStorage",
      args: any[],
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721URIStorage>;
    deployContract(
      name: "IERC721Metadata",
      args: any[],
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Metadata>;
    deployContract(
      name: "IERC721",
      args: any[],
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721>;
    deployContract(
      name: "IERC721Receiver",
      args: any[],
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Receiver>;
    deployContract(
      name: "ERC165",
      args: any[],
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165>;
    deployContract(
      name: "IERC165",
      args: any[],
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165>;
    deployContract(
      name: "TestRealityChainAvatar",
      args: any[],
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestRealityChainAvatar>;
    deployContract(
      name: "ERC721A__IERC721Receiver",
      args: any[],
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721A__IERC721Receiver>;
    deployContract(
      name: "ERC721A",
      args: any[],
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721A>;
    deployContract(
      name: "IERC721A",
      args: any[],
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721A>;
    deployContract(
      name: "DefaultOperatorFilterer",
      args: any[],
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DefaultOperatorFilterer>;
    deployContract(
      name: "IOperatorFilterRegistry",
      args: any[],
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IOperatorFilterRegistry>;
    deployContract(
      name: "OperatorFilterer",
      args: any[],
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OperatorFilterer>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      args: any[],
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.Contract>;
  }
}
