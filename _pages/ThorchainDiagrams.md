---
permalink: /THORChainDiagrams/
title: "THORChain Diagrams"
layout: splash
toc: true
---

Working pictures of THORChain. Work in progress. Please put feedback in the Dev discord server - DevOps channel. 

### Swap Example
Example BTC to ETH Swap. *** Not reviewed and Simplified ***

![High Level App View]({{ site.baseurl }}/assets/images/THORChain Swap.jpg)
See PDF version [ here]({{ site.baseurl }}/assets/documents/THORChain-Swap.pdf)

Some points on the Diagram. 
1.	Yep, usually the UI creates the Tx for the user. 
2.	THORChain will see the BTC Tx in the Mempool – but wait times are applied before processing (depending on the size of the swap (inbound liquidity)). This is seen by the blockscanner which can see the mempool of the full BTC node. This is where witness transactions are created then sent to THORChain for processing (via the bridge)
3.	Inbound funds are sent to Asgard. 
5.	VM does not apply to THORChain, is a blockchain application or a replicated state machine. 
6.	THORChain has two levels of processing – external and internal. Consensus is needed for each one – thus, from what I understand, a Swap will create 4 msgs in THORChain, each one needed consensus – and consensus is definitely checked in the Inbound and Outbound handlers. This 2 layered approach, separates external THORChain msg handling from internal msg handling.
7.	Tendermint broadcasts messages via the Gossip protocol (same as flooding) and gets consensus on the txs, but it is up to THORChain to check everything is good, e.g. Tx Out matches Swap Tx In, BlockHeight is correct and so on.
8.	Nodes agree on the outbound tx (as per above) but only one node is selected to send the ETH Tx. 
9.	Asgard/TSS is not required for outbound Txs, usually sent to a Ygg vault. Asgard will send funds if 1. Outbound is too large for a node to do it or the node failed to do it within a timely fashion (like 2 minutes but I forget the exact time), in which case, 2/3 of TSS Key Gen set would be required to sign the outgoing ETH Tx. 
10.	Bifrost can only send messages that it gets from the THORChain bridge, so indirectly when a node send an ETH Tx, it already has 2/3 consensus. That said, as a node has the private key to its own YGG vault, the node does not need consensus to send from it's own vault (but it will be slashed 1.5x value if it does).
11.	Yep, Tx goes to ETH’s mempool as normal. 


### High Level App View
![High Level App View]({{ site.baseurl }}/assets/images/TCALHL.png)

### High Level Add Liquidity Example Flow
![High Level App View]({{ site.baseurl }}/assets/images/TC-AddLiq-Flow.png)
