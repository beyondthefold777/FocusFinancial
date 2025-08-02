// src/pages/About.jsx

export default function About() {
  return (
    <div className="p-6 text-white space-y-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-focusPurple">About Focus Financial</h1>
      <p>
        Focus Financial provides simple, secure access to stablecoins like USDT (TRC-20, Ethereum) and USDC, helping clients in the Caribbean and beyond transact digitally with confidence.
      </p>
      <p>
        Our service is designed to bridge the gap between traditional banking and modern crypto finance. Clients send a wire transfer in USD, and we handle the conversion and delivery of the chosen stablecoin directly to your wallet address.
      </p>
      <h2 className="text-2xl font-semibold text-focusPurpleLight mt-6">Fees & Limits</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>6% service fee on each transaction</li>
        <li>Minimum transaction: <strong>$1,000 USD</strong></li>
        <li>Maximum transaction: <strong>$100,000 USD</strong></li>
        <li>One transaction every 24 hours to allow settlement and delivery</li>
        <li>Stablecoins delivered after the wire settles (typically within 24–48 hours depending on your bank and Kraken's processing time)</li>
      </ul>
    </div>
  );
}
