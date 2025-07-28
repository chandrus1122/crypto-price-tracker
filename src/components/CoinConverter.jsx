import React, { useState } from 'react';
import './CoinConverter.css';

const CoinConverter = ({ coin }) => {
  const [amount, setAmount] = useState(1);
  const [currency, setCurrency] = useState('usd');

  if (!coin || !coin.market_data) return null;

  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleCurrencyChange = (e) => setCurrency(e.target.value);

  const rate = coin.market_data.current_price[currency];
  const result = (amount * rate).toLocaleString();

  return (
    <div className="converter-container">
      <div className="converter-overlay" />

      <div className="converter-content">
        <h3>🔁 Convert {coin.symbol.toUpperCase()}</h3>

        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          min="0"
          className="converter-input"
        />

        <select
          value={currency}
          onChange={handleCurrencyChange}
          className="converter-select"
        >
          <option value="usd">USD ($)</option>
          <option value="inr">INR (₹)</option>
        </select>

        <p className="converter-result">
          {amount} {coin.symbol.toUpperCase()} ={' '}
          <strong>{currency === 'usd' ? '$' : '₹'}{result}</strong>
        </p>
      </div>
    </div>
  );
};

export default CoinConverter;
