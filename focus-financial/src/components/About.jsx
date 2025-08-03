// src/pages/About.jsx

export default function About() {
  return (
    <div className="p-6 text-white space-y-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-focusPurple">About Focus Financial</h1>

      <p>
        Focus Financial provides seamless and secure access to stablecoins like USDT (TRC-20, ERC-20), USDC, and others. We help individuals and businesses in the Caribbean and globally convert USD into digital assets with ease.
      </p>

      <p>
        Our process is simple: clients submit the amount they wish to receive, and we calculate the total USD required (including an 8% service fee). Once the wire transfer is sent to our JPMorgan Chase account and cleared, the equivalent stablecoins are delivered directly to the client’s wallet.
      </p>

      <p>
        To complete the process, clients include their stablecoin wallet address when submitting the form. Once the transfer is verified, we handle the stablecoin delivery and provide a transaction hash for your records.
      </p>

      <h2 className="text-2xl font-semibold text-focusPurpleLight mt-6">Fees & Processing</h2>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>8% service fee</strong> is added to your desired amount</li>
        <li><strong>No transaction maximum</strong> — send any amount over $1,000 USD</li>
        <li><strong>Minimum transaction:</strong> $1,000 USD</li>
        <li><strong>One wire only:</strong> all funds (amount + fee) are sent to Focus Financial</li>
        <li><strong>Stablecoins delivered within 24–48 hours</strong> of wire confirmation</li>
      </ul>
    </div>
  );
}
