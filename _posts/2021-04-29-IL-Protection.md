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
