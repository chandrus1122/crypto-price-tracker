// src/components/SelectedCryptoCard.jsx
import React from 'react';
import './SelectedCryptoCard.css';

const SelectedCryptoCard = ({ coin }) => {
  const isPositive = coin.market_data.price_change_percentage_24h >= 0;

  return (
    <div className="selected-crypto-card">
      <img src={coin.image.large} alt={coin.name} className="crypto-logo" />
      <h2>
        {coin.name} ({coin.symbol.toUpperCase()})
      </h2>
      <p><strong>Current Price:</strong> ${coin.market_data.current_price.usd.toLocaleString()}</p>
      <p><strong>Market Cap:</strong> ${coin.market_data.market_cap.usd.toLocaleString()}</p>
      <p style={{ color: isPositive ? 'lime' : 'red' }}>
        <strong>24h Change:</strong> {coin.market_data.price_change_percentage_24h.toFixed(2)}%
      </p>
    </div>
  );
};

export default SelectedCryptoCard;
