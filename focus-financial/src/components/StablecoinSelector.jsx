import { useNavigate } from 'react-router-dom';

const pairs = [
  'USD/USDC',
  'USD/USDT (TRC20)',
  'USD/USDT (ETH)',
  'USD/USDT (ERC20)', // Updated pair here
  'USD/DAI',
  'USD/BUSD',
  'USD/USDP',
  'USD/TUSD',
  'USD/PAX',
  'USD/GUSD',
];

export default function StablecoinSelector() {
  const navigate = useNavigate();

  const handleClick = (pair) => {
    // Extract the stablecoin symbol without 'USD/' and format it for URL
    const urlPair = pair.split('/')[1].replace(/\s/g, '').replace(/[()]/g, '').toLowerCase();
    navigate(`/convert/${urlPair}`);
  };

  return (
    <div className="selector">
      <h2>Select a stablecoin pair to convert</h2>
      <div className="selector-grid">
        {pairs.map((pair) => (
          <div
            key={pair}
            className="option"
            onClick={() => handleClick(pair)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleClick(pair);
            }}
          >
            {pair}
          </div>
        ))}
      </div>
    </div>
  );
}
