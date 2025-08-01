import { ArrowRightCircle } from 'lucide-react';

export default function StablecoinSelector() {
  const stablecoinPairs = [
    { label: "USD → USDT (TRC-20)", value: "usdt-trc20" },
    { label: "USD → USDT (ERC-20)", value: "usdt-eth" },
    { label: "USD → USDC (Ethereum)", value: "usdc-eth" },
    { label: "USD → USDC (Solana)", value: "usdc-sol" },
    { label: "USD → USDT (Polygon)", value: "usdt-polygon" },
    { label: "USD → DAI", value: "dai" },
    { label: "USD → TUSD", value: "tusd" },
    { label: "USD → EURC", value: "eurc" },
    { label: "USD → PYUSD", value: "pyusd" },
    { label: "USD → GUSD", value: "gusd" },
  ];

  return (
    <section className="max-w-2xl mx-auto text-center mt-16">
      <h2 className="text-3xl font-bold mb-8 text-white">
        Choose Your Stablecoin Pair
      </h2>

      <div className="space-y-4">
        {stablecoinPairs.map((pair) => (
          <button
            key={pair.value}
            className="w-full flex items-center justify-between bg-gradient-to-r from-focusPurple to-focusPurpleLight text-white px-6 py-4 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            <span className="text-base sm:text-lg font-medium">{pair.label}</span>
            <ArrowRightCircle size={24} />
          </button>
        ))}
      </div>
    </section>
  );
}
