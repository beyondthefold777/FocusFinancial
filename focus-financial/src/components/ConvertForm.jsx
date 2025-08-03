import { useParams } from 'react-router-dom';
import { useState } from 'react';

export default function ConvertForm() {
  const { pair } = useParams();
  const [usdAmount, setUsdAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [totalToSend, setTotalToSend] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const formatPair = (text) => {
    return text
      .toUpperCase()
      .replace('USDTTRC20', 'USDT-TRC20')
      .replace('USDTETH', 'USDT-ETH')
      .replace('USDTERC20', 'USDT-ERC20')
      .replace('USDC', 'USDC')
      .replace('DAI', 'DAI')
      .replace('BUSD', 'BUSD')
      .replace('USDP', 'USDP')
      .replace('TUSD', 'TUSD')
      .replace('PAX', 'PAX')
      .replace('GUSD', 'GUSD');
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setUsdAmount(value);
    setSubmitted(false);
    setError('');
    setCopied(false);

    if (!isNaN(value) && value > 0) {
      setError('');
      const baseAmount = parseFloat(value);
      const fee = baseAmount * 0.08;
      setTotalToSend((baseAmount + fee).toFixed(2));
    } else {
      setTotalToSend(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!totalToSend || !walletAddress || error) return;

    // Submission logic here (or placeholder)
    setSubmitted(true);
  };

  const handleBack = () => {
    setSubmitted(false);
    setCopied(false);
  };

  const baseAmount = parseFloat(usdAmount) || 0;
  const feeAmount = (baseAmount * 0.08).toFixed(2);

  const wireInfo = `
Bank Name: JPMorgan Chase Bank, N.A.
Bank Address: 270 Park Avenue, New York, NY 10017
Account Name: Focus Financial LLC
Account Number: 570631252
ABA Routing Number: 044000037
ACH Routing Number: 044000037
SWIFT Code: CHASUS33
`;

  const handleCopy = async () => {
    try {
      const fullText = `Send $${totalToSend} to:\n\n${wireInfo}`;
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="selector">
      <h2>Convert USD to {formatPair(pair)}</h2>
      <p className="form-info">
        💰 An <strong>8% fee</strong> is added on top of your desired amount.
      </p>

      {!submitted ? (
        <form className="convert-form" onSubmit={handleSubmit}>
          <input
            type="number"
            value={usdAmount}
            onChange={handleChange}
            placeholder="Enter amount you want to receive"
            className="input-field"
          />

          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder={`Enter your ${formatPair(pair)} wallet address`}
            className="input-field"
          />

          {error && <p className="form-info" style={{ color: '#ff7675' }}>{error}</p>}

          {totalToSend && !error && (
            <div className="total-display">
              <p>You will receive: <strong>${usdAmount}</strong></p>
              <p>Fee (8%): <strong>${feeAmount}</strong></p>
              <p>You need to send: <strong>${totalToSend}</strong></p>
            </div>
          )}

          <button className="btn" type="submit" disabled={!usdAmount || !walletAddress || !!error}>
            Submit
          </button>
        </form>
      ) : (
        <div className="selector" style={{ marginTop: '2rem', textAlign: 'center' }}>
          <h2>Transaction submitted.</h2>
          <p>
            Please send <strong>${totalToSend}</strong> to the wire details below. Your stablecoins will be delivered within 2-6 hours.
          </p>

          <div
            style={{
              marginTop: '1rem',
              color: '#d1c4f7',
              lineHeight: '1.8',
              whiteSpace: 'pre-wrap',
              background: '#111',
              padding: '1rem',
              borderRadius: '8px'
            }}
          >
            {wireInfo}
          </div>

          <button className="btn" onClick={handleCopy} style={{ marginTop: '1.5rem' }}>
            📋 {copied ? 'Copied!' : 'Copy Bank Info'}
          </button>

          <button onClick={handleBack} className="btn" style={{ marginTop: '1rem' }}>
            🔁 Change Amount
          </button>
        </div>
      )}
    </div>
  );
}
