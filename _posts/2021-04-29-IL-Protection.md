---
title: "THORChain Impermanent Loss Protection"
categories:
  - Defi
  - THORChain
tags:
  - MCCN  
  - "Impermanent Loss"
  - "Liquidity Provider"
  - "Liquidity Pool"
  - "Cross Chain Swaps"
author_profile: false
classes: wide
---

THORChain has implemented Impermanent Loss Protection in MCCN. If you not sure about Impermanent Loss, [see here first.]({% post_url 2020-11-21-impermanent-loss-explained %})
Once you have seen the video, you can read below for a more detailed explainaiton and learning. 

###  Impermanent Loss Protection Explained
{% include video id="yce7OJ_z57g" provider="youtube" %}

### Additional Notes - How it is really asset based, not priced based. 
THORChain does to care about price at all. To get a price it looks at the ratio of Rune to say BUSD to get the price of Rune then looks at the ratio of RUNE / BTC to get the price of BTC. This assumes that pool is balanced. 
When you deposit, the amount of assets is record, remembering all deposits (and withdraws) are calculated symmetrically. If BTC doubles and RUNE stays flat, then the ratio will change to have less BTC and more RUNE. But funds are lost during the re balancing process (by Arbing) so the amount of assets will be less than if you just holding, even if the ratio is the same. 
When you withdraw, THORChain looks at what you deposited and what you are withdrawing and then compares the asset difference on each side to what you 'should" have if you where holding. It will pay out the difference. 
Note: the withdraw-ed assets includes fess/revenue earned as a LP, hence the net difference, so the difference may be 0. 
THORChain works out from the asset amounts only. It can put a price on it as described above. This is what is done in the coverage section of the spec, this is combined with the protection part to find the % of payment you are entitled to (1-100%). 

### More Detailed information about Impermanent Loss
I have previously explained that Impermanent Loss is cause due to the rebalancing process, e.g. arbs taking funds from the pool. While at the basic level, it is good way to think about it, it is not really true. Like with most things in Crypto, the deeper you go, the more complex it becomes and the more high-level explanations become false. 

To be specific, Impermanent Loss is strictly caused by a change of price of one more assets in the pool. This will change the ratio of asset to rune in the pool, which will change the pool price. So one side will be selling at discount, and the other will be at premium, this then incentives arbs to take advantage of the price different, as explained in my Liquidity Pooling video, which will then bring the pool back into balance. It is the change of the Pool price (due to the change of price) that causes IL, not the arb process. 
There are a number of distinct steps here, let’s use a BTC/RUNE pool here, but the process is the same for any pool 2 asset pool in an any AMM. 

1. Price of an asset in the pool changes.
1. Ratio of BTC to Rune Pool changes in response to the price change
1. Due to ratio change, the price of BTC and RUNE is changed (either up or down, depending on the price movement). At this point Impermanent Loss has occurred.
1. Now an opportunity is presented to arbs – however they are not forced to take it. 

Hope that helps!


### Extra details form a write up in THORChain Dev Discord. (Added 22nd Nov 21)
Below is as of version 75 of the code. 

ILP is calculated within the withdraw_handler and does not care at all how liquidity has been added or how is going to be withdrawn. ILP is calculated in RUNE (like everything else in THORChain) making it impartial to all/any assets. Only the ratio of the pool at the time of the withdraw is important. 
Let me lay it out.

The line [`if fullProtectionLine > 0 && pool.Status == PoolAvailable`](https://gitlab.com/thorchain/thornode/-/blob/develop/x/thorchain/withdraw_current.go#L83) sees if ILP is active (protection line is taken from the constants (`FullImpLossProtectionBlocks`)) and if the pool is active. 
ILP is calculated within [`calcImpLossV75`](https://gitlab.com/thorchain/thornode/-/blob/develop/x/thorchain/withdraw_current.go#L222) and uses the formular `coverage = ((A0 * P1) + R0) - ((A1 * P1) + R1)` – this puts all the values into rune. The Calculation is then as simple as:  rune value when deposited take rune value when withdrawing. If the result is > 0, there is going to be a payout.


 `protectionBasisPoints` (calculated previously form `protectionBasisPoints := calcImpLossProtectionAmtV1(ctx, lastAddHeight, fullProtectionLine`) is used to work out the [`coverage`](https://gitlab.com/thorchain/thornode/-/blob/develop/x/thorchain/withdraw_current.go#L243) e.g. how many days the LPer has been in the pool. 100 days or more equals 100%. 


If there is going to be an ILP payout, THORChain  [adds](https://gitlab.com/thorchain/thornode/-/blob/develop/x/thorchain/withdraw_current.go#L100) the liquidity (the rune value of the ILP) to the LPer BEFORE the actual withdraw is done - thus their position (Liquidity Units) are updated before withdraw.

<b>Note:</b> Liquidity Units are denoted in RUNE (like everything is) so by incrementing someone’s liquidity units (e.g. RUNE) you are by consequence adding the corresponding asset value to the LPer taking into consideration the ratio of the pool at the time. Thus, in general (at least at deposit and in this context), a LPer’s Liquidity Units is going to be the Rune side of the pool. Again, making THORChain processing impartial to all assets. That is how I understand it anyway 😊 See [`calculating-pool-ownership` in the docs](https://docs.thorchain.org/thorchain-finance/continuous-liquidity-pools#calculating-pool-ownership) for the exact details. 

After the ILP Payout is calculated, how the withdraw is going to be done, e.g. Asym or Sym (done in `calculateWithdrawV75`) and the gas requirements for the withdraw are calculated. The actual withdraw of liquidity is then done.

Given this, it is clear ILP is irrespective of how liquidity is added, removed or even what asset is in question. Also if there is a payout, a LPer’s position is updated before the withdraw process is done. 
I created this video going through a detailed example following the same process, if anyone wants to know more or see a working example. https://www.youtube.com/watch?v=C8cYaugKSFw
YouTube.

### What happens if you withdraw part of your liquidity?
`withdrawBasisPoints` is used to work out how much you are withdrawing, everything is actually calculated form that. 

``
    // taking withdrawBasisPoints, calculate how much of the coverage the user should receives
    coverage = common.GetSafeShare(withdrawBasisPoints, cosmos.NewUint(10000), coverage)
``

Thus, given the following situation
1. 1 April - Deposit RUNE+ETH @ 200:1
1. 1 Aug - Withdraw 50% of LP @ 300:1 (ILP given)
1. 1 Sep - Withdraw balance @ 400:1

**Q:** Will the protocol will give ILP based on 400:1 vs 200:1 and not 400:1 vs 300:1 right?

**A:** You will get the ratio at the time you withdraw. So 2 and 3 apply. This is done so it is a proper comparison against holding - at the time of withdraw.

Last note for the pedantic. V75 did update the ILP calculation to `coverage = ((A0 * P1) + R0) - ((A1 * P1) + R1) => ((A0 * R1/A1) + R0) - (R1 + R1)`. (https://gitlab.com/thorchain/thornode/-/merge_requests/1993) 

This works out the same as `coverage = ((A0 * P1) + R0) - ((A1 * P1) + R1)`. V75 is just adding an additional check to see if `R1*2` is greater than to or equal to `((A1 * P1) + R1)`, as `(A1 * P1)` the asset value into RUNE at the time of withdraw.