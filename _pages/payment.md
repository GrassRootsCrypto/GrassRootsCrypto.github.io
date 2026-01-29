---
permalink: /payment/
title: "Pay with Bitcoin"
layout: single
toc: false
excerpt: "Accept Bitcoin and Lightning Network payments for GrassRoots Crypto services. Privacy-focused, self-custodial payments via BTCPay Server."
---

## Bitcoin & Lightning Payments

Pay for GrassRoots Crypto services using Bitcoin or the Lightning Network. All payments are processed through our self-hosted BTCPay Server — no third parties, no KYC, just peer-to-peer value transfer.

### How to Pay

1. **Select your service** from the payment terminal below
2. **Choose payment method**: Bitcoin on-chain or Lightning Network
3. **Complete payment** using your Bitcoin wallet
4. **Receive confirmation** via email (if provided)

The payment terminal will generate an invoice with a QR code you can scan with your mobile wallet, or copy the payment details to your desktop wallet.

<div class="btcpay-container">
  <iframe
    src='https://btcpay.grchomelab.xyz/apps/2g92S5VisCayAiJ7vP3bC6D6jzji/pos'
    style='max-width: 100%; width: 100%; min-height: 720px; border: 0; border-radius: 8px;'
    title="BTCPay Server Point of Sale Terminal"
    loading="lazy">
  </iframe>
</div>

---

## Need Help?

**Don't have a Bitcoin wallet yet?** Book a [Crypto Basics](/services/getting-started/) or [Wallet Setup](/services/getting-started/) session first — I'll walk you through getting set up safely.

**Questions about payment?** [Contact me](/contact/) and I'll help you through the process.

**Prefer to book first, pay later?** No problem. Book a session via the [contact page](/contact/) and we can arrange payment after our session.

---

## Want to Accept Bitcoin Payments in Your Business?

This payment terminal is powered by BTCPay Server — a self-hosted, privacy-focused Bitcoin payment gateway. I offer a **BTCPay Managed Service** where I host, maintain, and monitor your Bitcoin and Lightning payment infrastructure for you.

**What's Included:**

- Your own branded Bitcoin/Lightning payment storefront or POS tablet
- Full Bitcoin node + Lightning Network node hosting
- 99.9% uptime on enterprise-grade hardware (ECC RAM, NVMe, RAID storage)
- Security hardening, backups, and monitoring
- Payment notifications and webhook setup
- Technical support and ongoing maintenance
- **You control your wallet and funds** — no third-party intermediary

**Pricing:**

- Setup fee: $150 (one-time)
- Hosting: From $39/month (single store)
- Multi-store discounts available
- **First month free** for new customers

**Why BTCPay Managed Service?**

No hardware costs, no maintenance burden, professional uptime, expert support. Get enterprise-grade infrastructure at a fraction of cloud hosting costs (AWS/Google Cloud would cost $500+/month for equivalent specs).

Interested? [Contact me to discuss your needs](/contact/) or [view the full service agreement](/btcpay-service-agreement/).

---

<div style="text-align: center; margin: 2rem 0;">
  <a href="/services/" class="btn btn--inverse">← Back to Services</a>
  <a href="/contact/" class="btn btn--primary">Contact Me</a>
</div>

<style>
.btcpay-container {
  max-width: 800px;
  margin: 2rem auto;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .btcpay-container {
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }
}

/* Responsive iframe sizing */
@media (max-width: 768px) {
  .btcpay-container iframe {
    min-height: 600px;
  }
}

/* Ensure iframe loads smoothly */
.btcpay-container iframe {
  display: block;
  background: #f5f5f5;
}
</style>
