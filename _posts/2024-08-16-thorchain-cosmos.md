---
title: "THORChain + Cosmos Update"
categories:
  - THORChain
tags:
  - THORChain
  - Cosmos
author_profile: false
classes: wide
---

A lot is happening with THORChain, so I've been doing research to understand it better. I wanted to dive deeper into COSMWASM, IBC, and the upcoming Kujira partnership. Using various sources, I used ChatGPT to create the following summary that I wanted to share with the community. Enjoy! This is just one part of the ongoing developments within THORChain which I will put into a video soon.

# THORChain x Kujira Integration Summary

## THORChain Overview

THORChain is a Cosmos-based blockchain designed for cross-chain liquidity and decentralized finance (DeFi) applications. It is primarily known for enabling the swapping of native assets across different blockchains without the need for wrapped tokens or centralized exchanges. THORChain's native asset, RUNE, plays a crucial role in liquidity provision, security, and the overall functionality of the network.

## COSMWASM and Its Role

COSMWASM is a smart contract platform built for the Cosmos ecosystem, enabling Rust-based smart contracts within THORChain. It allows for the development of decentralized applications (dApps) and DeFi protocols on THORChain's layer 2 (L2).

### Benefits of COSMWASM

- **Custom DeFi Apps**: COSMWASM enables the deployment of DeFi applications directly on THORChain. This includes decentralized exchanges (DEXs), lending platforms, and more.
- **Modular Contracts**: Contracts can be deployed and updated modularly, with testing on a staging network before going live on the mainnet.
- **Native Asset Support**: COSMWASM supports all native tokens within THORChain, allowing them to interact seamlessly within the smart contract environment.

### Risk Separation

By adding features in the L2 space through COSMWASM, THORChain can de-risk changes to the L1 base layer. Experimental and innovative features can be implemented more quickly in the L2 space without compromising the stability of the L1 layer. This risk separation ensures that THORChain's L1 remains stable, while the L2 layer can evolve with new features.

## Kujira Integration

### Kujira's Features

Kujira brings a suite of DeFi protocols that will be integrated into THORChain's ecosystem through COSMWASM:

- **FIN**: The first on-chain order book for Cosmos, allowing decentralized trading with a 100% on-chain order book.
- **Orca**: A liquidation platform that allows users to participate in liquidations, providing more decentralized opportunities for trading.
- **Ghost**: A money market with significant TVL (Total Value Locked) that will take over THORChain's Lending feature, offering a more robust platform for borrowing and lending.
- **BLUE**: An overview of the user's portfolio on Kujira, ability to stake KUJI, mint the protocol-native stablecoin USK and vote on governance proposals from the Kujira community
- **Pilot**: A launchpad that will benefit from THORChain's larger liquidity pool, enabling more capital to participate in new project launches.

### Benefits of the Integration

- **DeFi on L2**: Kujira's DeFi protocols will run on top of THORChain's base layer, acting as the application layer, and will be the first L2 on THORChain.
- **Increased Liquidity**: Kujira's platforms will gain access to THORChain's deep liquidity pools, solving their current liquidity challenges.
- **Native Assets**: Kujira will benefit from THORChain's native asset support, moving away from reliance on wrapped assets.
- **User Acquisition**: THORChain's larger user base and decentralized liquidity will help Kujira overcome its challenges in user acquisition and volume generation.

## Inter-Blockchain Communication (IBC) and Its Role

THORChain will also enable IBC for the first time. IBC is a protocol for transferring tokens and data across different blockchains within the Cosmos ecosystem. It enables interoperability between different blockchains, allowing them to communicate and transfer assets securely. Learn more about IBC [below](#ibc-in-detail).

### Benefits of IBC

- **Cross-Chain Liquidity**: IBC will allow THORChain to tap into the liquidity and assets of other Cosmos-based chains, enhancing the variety of assets available for swaps and DeFi activities.
- **Asset Transfers**: Assets from other IBC-enabled chains can be brought into THORChain, and THORChain's assets can be transferred out, increasing the network's utility and reach.
- **Enhanced Security and Redundancy**: The ability to communicate with other blockchains can bolster THORChain's resilience, offering more decentralized and robust security mechanisms.

## Integration with Keplr Chain Registry

THORChain's upcoming integration with the Keplr chain registry means it will be fully supported within the Keplr wallet, a widely-used wallet for Cosmos ecosystem assets. This will make it easier for users to interact with THORChain, manage RUNE and other assets, and participate in THORChain's DeFi ecosystem.

## Strategic Implications

- **Cosmos Integration**: By enabling COSMWASM and IBC, THORChain significantly enhances its capabilities, supporting complex DeFi protocols and interacting with a broader range of blockchains. This positions THORChain as a more versatile and interconnected platform within the Cosmos ecosystem.
- **L2 Development**: The development of L2 applications using COSMWASM will drive innovation on THORChain, potentially leading to a diverse range of DeFi products that leverage TOR and contribute to the overall ecosystem's growth.
- **De-Risking L1**: By focusing on L2 development, THORChain can maintain the stability and security of its L1 base layer while enabling rapid innovation in the L2 space.

## Future Developments

- **Hard Forks**: THORChain’s second hard fork is imminent, followed by another to integrate COSMWASM and Kujira. Full integration of Kujira’s apps is expected by September, after which focus will shift to expanding the ecosystem and enhancing user experience.
- **RUNE and KUJI Incentives**: Both the THORChain and Kujira teams are incentivized for long-term development, with plans to align RUNE and KUJI holders with the success of the integrated ecosystem.

In conclusion, the integration of COSMWASM and IBC will position THORChain as a more powerful and interconnected player within the Cosmos ecosystem, with significant implications for DeFi development, cross-chain interoperability.

## Sources

- https://winkhub.app/posts/kujira-recovery-plan-thorchain-partnership
- https://x.com/Accelerath0r/status/1823429064071274984
- https://discord.com/channels/838986635756044328/838986636665815072/1270552359981813835

Note: At this stage USDC is being considered to price assets instead of TOR. [Source](https://discord.com/channels/838986635756044328/1270552359981813835/1270735855178350730)

## IBC In detail

**Inter-Blockchain Communication (IBC)** is a protocol that enables different blockchains to communicate and transfer assets and data between each other securely. It is a fundamental technology in the Cosmos Ecosystem, which aims to create an "Internet of Blockchains," where multiple independent blockchains can interoperate seamlessly.

### How IBC Works:

**Communication Channels:**

- IBC establishes communication channels between two blockchains, known as "IBC-enabled chains." These channels are created through a process called "handshaking," where both blockchains agree on a common communication protocol.
- Once a channel is established, it can be used to send data packets between the chains. These data packets could include asset transfers, information, or even cross-chain contract calls.

**Light Clients:**

- Each blockchain participating in IBC runs a "light client" of the other blockchain. A light client is a lightweight version of the blockchain that only stores the necessary information to verify the state of the other blockchain (such as the latest block header).
- This light client ensures that the data being sent between the two blockchains is valid and that both blockchains are in sync.

**Transaction Process:**

- When an asset transfer is initiated, the sending blockchain locks the asset in a specific smart contract or module. This action is recorded on the blockchain, and a proof of this transaction (a cryptographic proof) is generated.
- The proof is then sent through the IBC channel to the receiving blockchain, where the light client verifies the proof.
- Once verified, the receiving blockchain mints a corresponding asset (or recognizes the asset) and credits it to the recipient's account. This ensures that assets transferred via IBC are unique and cannot be duplicated.
- This process ensures that the asset is not duplicated, and only one valid version of the asset exists across both blockchains.

**Security:**

- IBC relies on the security of the underlying blockchains. Since each blockchain independently verifies transactions and states, the protocol itself does not need to rely on a central authority or intermediary.
- The security of IBC comes from the consensus mechanisms of the participating blockchains and the cryptographic proofs exchanged between them.

### How Asset Transfer Works with IBC:

1. Lock and Mint:
  • On the sending blockchain, an asset (e.g., tokens) is locked in a specific IBC module or contract. This means the asset is effectively frozen and cannot be used on the sending blockchain while it's locked.
  • A proof of this lock is generated and sent to the receiving blockchain.

2. Verification and Minting:
  • The receiving blockchain, upon receiving the proof, verifies it using its light client. If the proof is valid, the receiving blockchain mints a corresponding token (or recognizes the asset) and credits it to the recipient's account.
  • The minted token represents the original asset but is now usable on the receiving blockchain.

3. Unlock and Burn (Reverse Process):
  • If the user wants to move the asset back to the original blockchain, they can initiate a reverse process. The minted token on the receiving blockchain is burned (destroyed), and a proof of this burn is sent back to the original blockchain.
  • Upon verification, the original asset is unlocked and returned to the user's account on the original blockchain.

### Benefits of IBC for THORChain:

  1. Cross-Chain Liquidity: IBC allows THORChain to access and provide liquidity for assets from other blockchains within the Cosmos Ecosystem, expanding the range of assets and markets available on THORChain.
  2. Interoperability: IBC enables THORChain to interact with other blockchains, supporting cross-chain applications, data sharing, and decentralized exchanges.
  3. Decentralization and Security: IBC’s reliance on light clients and cryptographic proofs ensures that asset transfers are secure and do not depend on centralized intermediaries.
  4. Expansion of the Ecosystem: With IBC, THORChain can integrate with a broader range of blockchains, bringing in more users, assets, and applications into its ecosystem, thereby increasing its overall utility and value proposition.
