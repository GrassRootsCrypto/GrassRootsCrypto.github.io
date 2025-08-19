---
title: "THORChain February Update"
categories:
  - THORChain
tags:
  - THORChain
  - THORFi
author_profile: false
classes: wide
---

I wanted create a post about THORChain as a lot has happened this year. The biggest update is regarding THORFi and there is a lot to unpack, so I will leave it to the article below to do that. 

## Introduction

THORChain has paused THORFi features and initiated the process of unwinding its lending and savings programs to resolve outstanding liabilities and stabilise the network. This article provides an objective and detailed account of the events, key decisions, and technical actions undertaken to stabilise the network and chart a path forward. 

## THORFi Background

The THORFi suite, which includes Savers and Lending, was designed to expand the utility of the THORChain ecosystem. Over time, however, concerns about the growing liabilities and potential risks to network stability intensified. By January 2025, these concerns culminated in critical events that have reshaped the network's future.

Both Savers and Lending relied on the assumption that RUNE would outperform, or at least not significantly underperform, major assets used within THORFi. Specifically:

- Savers: Savers introduced leverage into the pool, which is a double-edged sword. If the pool grew, Dual Liquidity Providers (DLPs) would receive greater returns than they normally would. Conversely, if the pool shrank due to impermanent loss (IL), DLPs would be disproportionately impacted. IL is a slippery slope—when RUNE underperforms relative to other assets like Bitcoin and Ethereum, IL worsens, negatively affecting both DLPs and the overall pool.

- Lending: The lending mechanism involved burning RUNE to create loans and minting RUNE to close them. The ratio of RUNE to the collateral asset was set at loan opening and closure. If RUNE performed poorly after loans were opened, more RUNE would be minted upon closure than was initially burned. While a circuit breaker was in place to cap the minting, the absence of deadlines and the 0% interest rate meant that for lending to succeed long-term, RUNE needed to maintain its value relative to Bitcoin and Ethereum.

As altcoins, including RUNE, began disconnecting from Bitcoin, concerns about THORFi grew. This sparked widespread debate regarding RUNE’s price and ways to stabilize it, along with the impact a declining RUNE price was having on THORFi. Negative discussions on platforms like Twitter and within Discord fueled uncertainty, which led to further price disconnection. This decline quickly became a self-fulfilling prophecy, compounding the situation beyond market trends alone.

Despite THORChain continuing to operate as intended during this period, RUNE's price decline was driven primarily by panic selling fueled by speculation and negative chatter, rather than any underlying technical or operational issues. This feedback loop of fear and misinformation spiraled further, creating a price drop detached from the network’s actual performance.

## Timeline of Key Events

### January 9, 2025: JP THOR’s Temporary THORFi Pause

JP THOR used an admin key to temporarily pause Lending and Savers at 08:27 (UTC). He outlined a plan while giving Node Operators the option to reverse the pause.The pause was overturned by Node Operators at 15:07 (UTC) on the same day..

The event raised concerns about use of an Admin key within a decentralisation network. In response, development efforts were accelerated to permanently remove all Admin keys from THORChain. The code change was submitted in GitLab (merge request 3886), and is scheduled for release in THORNode version 3.2.0, pending adoption by Node Operators.

Additionally, the event intensified the debate over the risks posed by THORFi and contributed to market instability.

### January 24, 2025: THORFi Pause by Node Vote

As concerns escalated over price volatility and declining liquidity, at 01:51 (UTC), four Nodes independently voted to pause Lending. Less than a minute later, Nine Realms proposed  pausing THORFi via Node Vote. Multiple Nodes further voted to suspend both Lending and Savers, with Savers being successfully paused at 01:52 (UTC).

The justification was rooted in the risk that loan closures would trigger significant RUNE minting, increasing supply and consequently reducing its price. This price reduction would lead to impermanent loss (IL) in the liquidity pools, exacerbated by synthetic asset leverage, which magnifies impermanent loss incurred by Dual Liquidity Providers (DLPs), significantly increasing the likelihood of DLPs suffering substantial losses or being left with nothing. 

At the time of the pause, THORChain had accrued approximately $200 million in outstanding liabilities:

- Savers: $96.22 million
    - BTC: $55.66 million
    - ETH: $16.11 million
    - Stablecoins: $9.94 million
    - Other Native Assets: $14.49 million
- Lending: $105.66 million
    - BTC: $84.96 million
    - ETH: $20.7 million

A full list of liabilities and tracking can be found here [https://thorfi-unwind.vercel.app/](https://thorfi-unwind.vercel.app/). A [Replit](https://replit.com/@Orion9R/TCY-Claim-Calculation-Process?v=1) has also been created.

### January 30, 2025: Synth Yield Redirection

To reduce the impact Savers have on DLPers during the discussion period, at 17:52 (UTC), it was proposed that `MaxSynthsForSaversYield` and `SynthYieldBasisPoints` network parameters be set to 0.

This would ensure that all yield generated from Savers collateral was directed back to Liquidity Providers (LPs) instead of Savers. These changes took effect via Node Vote on January 31, 2025, at 23:46 (UTC).

### February 2, 2025: Community Proposals and Node Vote

Following the pause, a discussion period began, during which any community member could submit a proposal to resolve the outstanding liabilities, unwind THORFi, and establish a path forward.

After discussions, a total of 8 independent proposals were presented to Node Operators to vote on. This was issued on February 2, 2025, at 00:25 (UTC).

### February 3, 2025: Proposal 6 Approval

On February 3, 2025, at 08:45 (UTC), a majority of 67% of Node Operators formally approved Proposal 6 (author: AaluxxMyth, founder of Maya Protocol). An announcement was made approximately 5 minutes later.

## Overview of Proposal 6

[Convert defaulted debt to $TCY equity with no private raise](https://gitlab.com/-/snippets/4801556)

Proposal 6 outlines a comprehensive approach to addressing the approx $200 million in liabilities and unwinding THORFi:

* __Debt to Equity Conversion:__ $TCY, a new token, will be issued with a fixed supply of 200 million. Borrowers and Savers can claim one $TCY per $1 of their owed liability.
* __Revenue Sharing:__ $TCY holders will receive 10% of the network’s revenue in perpetuity, distributed daily in RUNE.
* __Liquidity Pool & Market Exit:__ A RUNE/$TCY liquidity pool will be created, and seeded by the THORChain treasury. The treasury will also allocate $5 million to buybacks. As market demand for a share of THORChain’s revenue materialises in $TCY’s price, holders will have the flexibility to exit on their terms or hold for long-term revenue distributions.
* __Elimination of THORFi Products:__ Lending, Savers, PoL, and RUNEPool will be retired, and Liquidity Nodes will be introduced to increase capital efficiency and offset the revenue share allocated to $TCY holders.

### Implementation Details of Proposal 6

1. The full implementation details have been [published on GitLab](https://gitlab.com/thorchain/thornode/-/issues/2152) with an [amendment](https://gitlab.com/thorchain/thornode/-/issues/2154). 
1. A node vote changed the Emission Curve to reduce the block rewards. This will reduce the block emissions from approx. This changes emissions from approx 25,000 RUNE a day to 2 RUNE a day, or 750 RUNE per year.
1. To support the amendment to proposal 6, [MR3926](https://gitlab.com/thorchain/thornode/-/merge_requests/3926) has been created to allow LP deposits to be paused on a specific chain.

## Next Steps

The implementation of Proposal 6 will follow a structured process that ensures transparency, community involvement, and adherence to the Architecture Decision Record (ADR) process. The steps are as follows:

1. Based on the outcomes of the discussion, any required changes will be formalised in an ADR and voted on by Nodes.
1. Developers will make the necessary code updates to implement the approved ADR, including the $TCY claim process and revenue model changes. [MR3924](https://gitlab.com/thorchain/thornode/-/merge_requests/3924) is being developed to add $TCY.
1. Nodes will adopt the updated code in a new THORNode release.
1. Users will be able to claim their $TCY tokens once the implementation is live.

## Conclusion

The THORFi unwind represents a pivotal moment in THORChain's evolution. The network has demonstrated resilience and adaptability, navigating a complex and challenging situation while maintaining operational integrity. With Proposal 6 approved and development efforts underway, THORChain is positioned to emerge stronger and more robust.

## References

### January 9, 2025: JP THOR’s Temporary THORFi Pause

* [JP THOR pauses Lending, block 19355522](https://discord.com/channels/838986635756044328/906262316457263144/1326829796919087148)
* [JP THOR pauses Savers, block 19355525](https://discord.com/channels/838986635756044328/906262316457263144/1326829881165877278)
* [JP THOR announcement](https://discord.com/channels/838986635756044328/839001804812451873/1326830072681992203)
* [Nodes resume Lending, block 19359390](https://discord.com/channels/838986635756044328/906262316457263144/1326930357572079730)
* [Nodes resume Savers, block 19359395](https://discord.com/channels/838986635756044328/906262316457263144/1326930483510116353)
* [GitLab: THORNode merge request 3886: remove admin mimir](https://gitlab.com/thorchain/thornode/-/merge_requests/3886)

### January 24, 2025: THORFi Pause by Node Vote

* [Nine Realms announcement](https://discord.com/channels/838986635756044328/839002619481554955/1332166055950417981)
* [Nodes pause Lending, block 19562019](https://discord.com/channels/838986635756044328/906262316457263144/1332165912807346257)
* [Nodes pause Savers, block 19562029](https://discord.com/channels/838986635756044328/906262316457263144/1332166167963631636)

### January 30, 2025: Synth Yield Redirection

* [Nine Realms announcement](https://discord.com/channels/838986635756044328/839001804812451873/1334581970709123132)
* [Nodes set SynthYieldBasisPoints=0, block 19673423](https://discord.com/channels/838986635756044328/906262316457263144/1335033334534766632)
* [Nodes set MaxSynthsForSaversYield=0, block 19673426](https://discord.com/channels/838986635756044328/906262316457263144/1335033420040110182)

### February 2, 2025: Community Proposals and Node Vote

* [Nine Realms announcement](https://discord.com/channels/838986635756044328/839001804812451873/1335405811240796273)
* [Proposal 1: Indefinite freeze until the price threshold is reached, author: DoSmart BorrowDohuya](https://gitlab.com/-/snippets/4801524) (deleted by author)
* [Proposal 2: Thorchain Restructure Proposal, author: Crypto_XZ](https://gitlab.com/-/snippets/4801514) (deleted by author)
* [Proposal 3: THORFi Restructure Proposal: Painful V2, author: Steve](https://gitlab.com/-/snippets/4801491)
* [Proposal 4 ("9RProposal"): Priority Haircuts, author: Nine Realms](https://gitlab.com/-/snippets/4801269)
* [Proposal 5: Restructuring ThorFi, author: TCB](https://gitlab.com/thorchain/thornode/-/issues/2144)
* [Proposal 6: Convert defaulted debt to $TCY equity with no private raise (V1), author: AaluxxMyth](https://gitlab.com/-/snippets/4801556)
* [Proposal 7: TCB V2.1, author: Boone](https://gitlab.com/-/snippets/4801554)
* [Proposal 8: ADD: THORFi Unwind Module and Manager, author: JP THOR](https://gitlab.com/thorchain/thornode/-/issues/2143)

### February 3, 2025: Proposal 6 Approval

* [Nodes final vote (67% consensus), block 19692752](https://discord.com/channels/838986635756044328/906262316457263144/1335531469761806338)
* [Nine Realms announcement](https://discord.com/channels/838986635756044328/839001804812451873/1335532896416432200)

### February 11, 2025: Emission Curve Change

* [Change of Emission Curve Mimir](https://discord.com/channels/838986635756044328/906262316457263144/1338793965956370433)

