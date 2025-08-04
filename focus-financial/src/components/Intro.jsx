import { ShieldCheck, Globe, DollarSign } from 'lucide-react';
import '../styles/global.css'; // Importing global CSS

export default function Intro() {
  return (
    <section className="intro-container">
      <h1 className="intro-title">
        Empowering the World with Stablecoin Access
      </h1>
      <p className="intro-description">
        Focus Financial offers seamless solutions for acquiring stablecoins like{' '}
        <span className="highlight-text">USDT (TRC-20, ERC-20), USDC</span>, and more. 
        We're reshaping how money moves — empowering individuals and businesses with faster, 
        more secure, and borderless financial tools.
      </p>

      <div className="features">
        <div className="feature-item">
          <ShieldCheck className="feature-icon" />
          <span>Secure Transfers</span>
        </div>
        <div className="feature-item">
          <Globe className="feature-icon" />
          <span>Global Access</span>
        </div>
        <div className="feature-item">
          <DollarSign className="feature-icon" />
          <span>Stable Payments</span>
        </div>
      </div>
    </section>
  );
}