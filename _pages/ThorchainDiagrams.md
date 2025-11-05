---
permalink: /THORChainDiagrams/
title: "THORChain Diagrams and Code Flow"
layout: splash
classes: wide
toc: true
---

Working pictures of THORChain. Work in progress. Please provide feedback in the Dev discord server - DevOps channel.

## High Level App Overview

![THORChain architecture diagram showing major components including Cosmos BaseApp, THORChain module, Bifrost, and TSS vault structure]({{ site.baseurl }}/assets/images/TCALHL.png)
These are the major components within THORChain.
THORChain extends the Cosmos BaseApp and has its own module for specific message handling and processing.

See my [Develop on THORChain - Full Guide](https://youtu.be/Qowrasst2UQ) video for more detailed information.

### Swap Example - Inbound and Outbound

Example BTC to ETH Swap overview - High Level.

![THORChain BTC to ETH cross-chain swap flow diagram showing inbound transaction, Asgard vault, swap processing, and outbound transaction path]({{ site.baseurl }}/assets/images/THORChain Swap.png)
See larger PDF version [ here]({{ site.baseurl }}/assets/documents/THORChain-Swap.pdf)

Key points in the diagram:

1. THORChain will see the BTC transaction in the Mempool. However, transactions must be confirmed and wait times are applied before processing based on the swap size (inbound liquidity). This is seen by the `blockscanner` which has access to a full BTC node running within the THORNode cluster. THORChain translates this transaction into a standard witness transaction and sent to the `Observer` service. From there they are packaged, signed and sent to THORChain for processing (via the bridge).
1. Inbound funds are sent to the [Asgard Vault](https://thornode.ninerealms.com/thorchain/inbound_addresses).
1. Virtual Machines (VMs) does not apply to THORChain, it is a blockchain application or a replicated state machine.
1. THORChain has two levels of processing – external (TSS) and internal (Tendermint).
1. Tendermint broadcasts messages via the Gossip protocol (same as flooding) and gets consensus on the txs, but it is up to THORChain to check everything is good, e.g. Tx Out matches Swap Tx In, BlockHeight is correct and so on.
1. Nodes agree on the `out tx` (as per above). A TSS vault is selected to send the ETH Transaction.
1. Asgard/TSS is used for outbound txs. 2/3 of TSS Key Gen set is required to sign the outgoing ETH Tx.
1. Bifrost can only send messages that it gets from the THORChain bridge, so indirectly when the Asgard Vault sends an ETH transaction, it already has 2/3 consensus.
1. Transaction goes to ETH’s mempool as normal.
1. Once the funds leave THORChain, it creates an `OutboundTx` which is then observed by THORChain (Bifrost). This ensures that what was sent is what was meant to be sent.

Memos types like `swap` will create an outbound message, others like `add` or `RUNEPool+` do not. See [Transaction Memos](https://dev.thorchain.org/concepts/memos.html) for a full list of memos.

### Swap Example - Msg Flow

Another look at the same swap as above but looking the message flow.
![THORChain swap message flow diagram showing MsgObservedTxIn, swap handler processing, and MsgOutboundTx execution]({{ site.baseurl }}/assets/images/THORChain Swap Msg.png)

### Swap Example Detailed Code Flow

This diagram follows the inbound process only. There would be a separate flow for the outbound `MsgOutboundTx` once the ETH is sent.
![Swap Code Flow]({{ site.baseurl }}/assets/images/THORChain-Swap-CodeFlow.jpg)
See larger PDF version [ here]({{ site.baseurl }}/assets/documents/THORChain-Swap.pdf)

## High Level Add Liquidity Example

![THORChain add liquidity flow diagram showing deposit transaction, pool addition, and liquidity provider unit calculation]({{ site.baseurl }}/assets/images/TC-AddLiq-Flow.png)

## Add Liquidity  Example Detailed Code Flow

![THORChain add liquidity message flow diagram showing MsgDeposit processing, add liquidity handler, and pool state updates]({{ site.baseurl }}/assets/images/TC-AddLiq-Msg-Flow.png)

In this example, there is no outbound message.

### Add Liquidity Example Code Flow

See larger PDF version [ here]({{ site.baseurl }}/assets/documents/THORChain-Add.pdf)

---

### Write up by HildisvíniÓttar on MsgSend and MsgDeposit

In handler.go there are various ways of receiving incoming. You basically have Bifrost observations that require 2/3 consensus, cli node functions (require auth), and the two generic ones (i.e. supported by Ledger): ~`MsgSend` and `MsgDeposit`

```go
// Consensus handlers - can only be sent by addresses in
//   the active validator set.
m[MsgTssPool{}.Type()] = NewTssHandler(mgr)
m[MsgObservedTxIn{}.Type()] = NewObservedTxInHandler(mgr)
m[MsgObservedTxOut{}.Type()] = NewObservedTxOutHandler(mgr)
m[MsgTssKeysignFail{}.Type()] = NewTssKeysignHandler(mgr)
m[MsgErrataTx{}.Type()] = NewErrataTxHandler(mgr)
m[MsgBan{}.Type()] = NewBanHandler(mgr)
m[MsgNetworkFee{}.Type()] = NewNetworkFeeHandler(mgr)
m[MsgSolvency{}.Type()] = NewSolvencyHandler(mgr)

// cli handlers (non-consensus)
m[MsgMimir{}.Type()] = NewMimirHandler(mgr)
m[MsgSetNodeKeys{}.Type()] = NewSetNodeKeysHandler(mgr)
m[MsgSetVersion{}.Type()] = NewVersionHandler(mgr)
m[MsgSetIPAddress{}.Type()] = NewIPAddressHandler(mgr)
m[MsgNodePauseChain{}.Type()] = NewNodePauseChainHandler(mgr)

// native handlers (non-consensus)
m[MsgSend{}.Type()] = NewSendHandler(mgr)
m[MsgDeposit{}.Type()] = NewDepositHandler(mgr)
```

External Message Mapping for the THORChain Module. These are received and routed by the `ExternalHandler`.

Anybody can post a MsgSend or MsgDeposit to the /txs endpoint - see `x\thorchain\client\rest`. It's just some JSON. Cosmos does require you have a valid signature for one of the fields, e.g. from_address or signer. This ensures you are authorised to perform the function.

### Deposit Msg

Note: Deposit Msg is when Rune gets sent in, e.g. Bond - it does not come via Bifrost.

At its heart, THORChain is a key-value database containing everybody’s balances, plus a bunch of other stuff. It starts at genesis state, and processes every Msg sent to it in order, and mutates the state. Until you get to the current state. Cosmos/Tendermint handles the underlying message stuff. Thornode is the bit that reads these messages and mutates its database to keep track of everything.

In MsgSend handler, it just checks the KV database to ensure you have enough balance for what you asked to send, subtracts fee and sends balance to whomever you specified. Done. At the beginning it stops early if "HaltTHORChain" is enabled. Which is currently set.

In MsgDeposit handler (handler_deposit.go) it's a little more complex. It deducts the coins you sent in with MsgDeposit from your balance, then reads the MEMO you sent, works out what kind of "internal" message (function) you are trying to perform, and executes one of the internal handlers, such as Bond, Unbond, LEAVE, .....

```go
	m := make(map[string]MsgHandler)
	m[MsgOutboundTx{}.Type()] = NewOutboundTxHandler(mgr)
	m[MsgSwap{}.Type()] = NewSwapHandler(mgr)
	m[MsgReserveContributor{}.Type()] = NewReserveContributorHandler(mgr)
	m[MsgBond{}.Type()] = NewBondHandler(mgr)
	m[MsgUnBond{}.Type()] = NewUnBondHandler(mgr)
	m[MsgLeave{}.Type()] = NewLeaveHandler(mgr)
	m[MsgDonate{}.Type()] = NewDonateHandler(mgr)
	m[MsgWithdrawLiquidity{}.Type()] = NewWithdrawLiquidityHandler(mgr)
	m[MsgAddLiquidity{}.Type()] = NewAddLiquidityHandler(mgr)
	m[MsgRefundTx{}.Type()] = NewRefundHandler(mgr)
	m[MsgMigrate{}.Type()] = NewMigrateHandler(mgr)
	m[MsgRagnarok{}.Type()] = NewRagnarokHandler(mgr)
	m[MsgNoOp{}.Type()] = NewNoOpHandler(mgr)
	m[MsgConsolidate{}.Type()] = NewConsolidateHandler(mgr)
	m[MsgManageTHORName{}.Type()] = NewManageTHORNameHandler(mgr)
	m[MsgLoanOpen{}.Type()] = NewLoanOpenHandler(mgr)
	m[MsgLoanRepayment{}.Type()] = NewLoanRepaymentHandler(mgr)
	m[MsgTradeAccountDeposit{}.Type()] = NewTradeAccountDepositHandler(mgr)
	m[MsgTradeAccountWithdrawal{}.Type()] = NewTradeAccountWithdrawalHandler(mgr)
	m[MsgRunePoolDeposit{}.Type()] = NewRunePoolDepositHandler(mgr)
	m[MsgRunePoolWithdraw{}.Type()] = NewRunePoolWithdrawHandler(mgr)
```

Internal Message Mapping. This is handled by `InternalHandler`

Some of these are disabled by MsgDeposit handler, so you only have a finite list of things you can do. These are the things being audited now.
So that's thornode. Basically send it a MsgSend or MsgDeposit and it authorises you via digital signature and reads your memo and tries to perform the function. Plus you can send it Set IP Address, Node Keys and Version via CLI tools (but these require signer to be an active node, etc).

### Bifrost

The other side of THORChain is "Bifrost". This is where a user use an external chain to interact with THORChain

This is a process that reads every block (and sometimes mempool) from all the supported chains: BTC, ETH, BCH, LTC, GIA, AVAX, BSC and DOGE. Call it a block scanner. It also has the ability to sign transactions out.

For observations, Bifrost will "see" a transaction inbound to one of its monitored addresses. Say you send some BTC to the BTC vault with memo `"BTC/BTC+"` (savers addition). Bifrost reads this and goes "Yep that's legit" and sends a `MsgObservedTxIn` to Thornode. This gets passed to the observed_txin handler. The first thing it does is "vote" on this transaction being legit. If you are the first bifrost to "see" this, nothing happens - you actually get slashed. Then the next 1-2 seconds as all the other Bifrost also "see" this tx in, and send `MsgObservedTxIn` to their thornodes, the "vote count" increases, until 2/3 of active nodes have seen this tx, and it's considered legit. You get your slash removed, and your tx in handler processes the rest of the transaction.

### Message Types

The following code snippets show how different transaction types are classified.

```go
func (tx TxType) IsInbound() bool {
	switch tx {
	case TxAdd, TxWithdraw, TxTradeAccountDeposit, TxRunePoolDeposit, TxRunePoolWithdraw, TxSwap, TxLimitOrder, TxDonate, TxBond, TxUnbond, TxLeave, TxReserve, TxNoOp, TxTHORName, TxLoanOpen, TxLoanRepayment:
		return true
	default:
		return false
	}
}

func (tx TxType) IsOutbound() bool {
	switch tx {
	case TxOutbound, TxRefund, TxRagnarok:
		return true
	default:
		return false
	}
}

func (tx TxType) IsInternal() bool {
	switch tx {
	case TxMigrate, TxConsolidate:
		return true
	default:
		return false
	}
}
```
