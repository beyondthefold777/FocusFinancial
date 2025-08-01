import { ShieldCheck, Globe, DollarSign } from 'lucide-react';

export default function Intro() {
  return (
    <section className="text-center max-w-3xl mx-auto">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-focusPurpleLight">
        Empowering the Caribbean with Stablecoin Access
      </h1>
      <p className="text-lg text-gray-300 leading-relaxed mb-8">
        Focus Financial offers seamless solutions for acquiring stablecoins like{' '}
        <span className="text-white font-semibold">USDT (TRC-20, ERC-20), USDC</span>, and more. 
        We're reshaping how money moves — empowering individuals and businesses with faster, 
        more secure, and borderless financial tools.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-6 text-gray-300">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-focusPurpleLight" />
          <span>Secure Transfers</span>
        </div>
        <div className="flex items-center gap-3">
          <Globe className="text-focusPurpleLight" />
          <span>Global Access</span>
        </div>
        <div className="flex items-center gap-3">
          <DollarSign className="text-focusPurpleLight" />
          <span>Stable Payments</span>
        </div>
      </div>
    </section>
  );
}
