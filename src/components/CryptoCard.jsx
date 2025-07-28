import React from 'react';
import './CryptoCard.css';
import { Link } from 'react-router-dom';

const CryptoCard = ({ coin }) => {
  if (!coin) return null;

  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <Link to={`/coin/${coin.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="crypto-card">
        <img src={coin.image} alt={coin.name} className="crypto-logo" />
        <h2 className="crypto-title">
          {coin.name} <span>({coin.symbol.toUpperCase()})</span>
        </h2>
        <p className="crypto-price"><strong>Price:</strong> ${coin.current_price.toLocaleString()}</p>
       
        
      </div>
    </Link>
  );
};

export default CryptoCard;

