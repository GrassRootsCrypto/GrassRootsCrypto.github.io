---
title: "THORNode Lending Code Walkthrough notes"
categories:
  - Defi
  - THORChain
  - THORFI
tags:
  - "THORFI Lending"
  - "Synths"
  - "Cross Chain Swaps"
author_profile: false
classes: wide
---

I am keeping an eye on THORFi lending and trying to push a plan for its release. There is a lot of discussion around the pros/cons of lending, so I would like to see a comprehensive testing and review process.
[Learn more abount the risks of lending here]({% post_url 2023-02-01-THORFi-Risks-Explained %})


The code is in review at moment across three branches. 

## MRs
1. https://gitlab.com/thorchain/thornode/-/merge_requests/2713 (Lending)
1. https://gitlab.com/thorchain/thornode/-/merge_requests/2658 (Virtual pool gets generate at the beginning of each swap)
1. https://gitlab.com/thorchain/thornode/-/merge_requests/2723 (Circuit Breaker)

## Code walkthrough nodes

### [Derived Asset Virtual Pool, recalc pre swap]( https://www.youtube.com/watch?v=Wke82WgK8Ao )
1. Has derived asset type (which is already used for TOR)
1. V Pool spawned twice. 1. on begin block to allow API query (to allow lending quotes). 2. On v pool swap as required, calcs pool depth to determine the exact slip. 
1. Virtual Pool depts are re-calculated before every Virtual Pool swap, so no sandwich attacks or swap queue manipulation is possible.
1. RUNE slip is fee is burnt. 

### [Lending Open and Close Loans]( https://www.youtube.com/watch?v=8qCiyLy4YEw ) 
1. Min out will be added for min loan amount (open/close), like LIM for a swap. Will be in a different but provisions allowed for it in msg structures. 
1. 5 new mimirs
   1. Min CR
   1. Max CR
   1. Pause Loans - stop open and close loans
   1. LoanRepaymentMaturity - enable min time for loan open. 
   1. CRPoolMultipler - cap collateral in a pool 
   1. EnableDerivedAssets
   1. (MaxRuneSupply for circuit breaker but no in code)
1. Loan Open message
   1. Has affiliate for first L1 swap.
   1. Has Dex aggregation support to taking out the debit (target asset)
1. Loan Close message
   1. Can pay off with any asset (is converted to TOR)
1. Data for total pool collateral is collected and published in pool and pools endpoints. 
1. New Memos for loan open and close with an example
1. New events emitted on loan open and repayment.
1. Has collateral up and down (13:45) - gives better data over time and allows credit rollover for new loan when overpaid. (though the 4 vars are not in the current code base)
1. Anyone can payoff anyone else’s loan, no restrictions. 
1. Loan Close: Asset in calls LoanRepayment_handler that calls Swap handler (to swap L1 to TOR) that then calls LoanRepayment_handler after asset in has been swapped to TOR - thus and LoanRepayement_handler is recursive. Be good to map thatin a digram

### [Circuit Breaker Part 1]( https://www.youtube.com/watch?v=e6gZ77DdMrc )
1. Part 1: For loan close, will not mint Rune beyond 500 mil, checks native supply before minting new RUNE. If over, will move RUNE from the reserve instead. 
1. Part 2 is in the lending PR (2713) but not covered in the video
   1. If the supply of RUNE is 500M (MaxRuneSupply Mimir) or greater, don’t allow the creation of new loans.
   1. Can’t find Mimir value in constants
   1. I put comment on the MR about this
