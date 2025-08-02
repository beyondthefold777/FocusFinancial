import { useParams } from 'react-router-dom';
import { useState } from 'react';

export default function ConvertForm() {
  const { pair } = useParams();
  const [usdAmount, setUsdAmount] = useState('');
  const [total, setTotal] = useState(null);
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
      const calculated = parseFloat(value) * 1.06;

      if (calculated > 100000) {
        setError('⚠️ Value exceeds the maximum allowed after fees.');
        setTotal(null);
      } else {
        setTotal(calculated.toFixed(2));
      }
    } else {
      setTotal(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!total || error) return;
    setSubmitted(true);
  };

  const handleBack = () => {
    setSubmitted(false);
    setCopied(false);
  };

  const wireInfo = `
Focus Financial Wire Transfer Info:

Account Name: Payward Interactive, Inc.
Bank Name: The Dart Bank
Company Address: 106 E. Lincolnway, Fourth Floor, Cheyenne, WY 82001
Bank Address: 368 S. Park Street, Mason, MI 48854
Account Number: 4002001191590007
Routing Number: 072410903
`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(wireInfo);
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
        💰 <strong>6% fee</strong> applied per transaction. <br />
        ⛔ <strong>Max total including fee: $100,000</strong>
      </p>

      {!submitted ? (
        <form className="convert-form" onSubmit={handleSubmit}>
          <input
            type="number"
            value={usdAmount}
            onChange={handleChange}
            placeholder="Enter USD amount"
            className="input-field"
            max="100000"
          />

          {error && <p className="form-info" style={{ color: '#ff7675' }}>{error}</p>}

          {total && !error && (
            <p className="total-display">
              Total (incl. 6% fee): <strong>${total}</strong>
            </p>
          )}

          <button className="btn" type="submit" disabled={!usdAmount || !!error}>
            Submit
          </button>
        </form>
      ) : (
        <div className="selector" style={{ marginTop: '2rem', textAlign: 'center' }}>
          <h2>Send ${total} via Bank Wire Transfer to the Details Below</h2>
        <div
            style={{
              marginTop: '1rem',
              color: '#d1c4f7',
              lineHeight: '1.8',
              whiteSpace: 'pre-wrap',
            }}
          >
            {wireInfo}
          </div>

          <button className="btn" onClick={handleCopy} style={{ marginTop: '1.5rem' }}>
            📋 {copied ? 'Copied!' : 'Copy Wire Info'}
          </button>

          <button onClick={handleBack} className="btn" style={{ marginTop: '1rem' }}>
            🔁 Change Amount
          </button>
        </div>
      )}
    </div>
  );
}
