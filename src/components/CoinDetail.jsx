import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PriceChart from './PriceChart';
import TokenMetrics from './TokenMetrics';
import CoinAbout from './CoinAbout';
import CoinConverter from './CoinConverter';
import CoinLinks from './CoinLinks';
import './CoinDetail.css';

const CoinDetail = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null);

  const fetchCoin = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
      setCoin(res.data);
    } catch (error) {
      console.error('Loading coin data...', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoin();
    intervalRef.current = setInterval(() => fetchCoin(), 30000);
    return () => clearInterval(intervalRef.current);
  }, [id]);

  if (loading) return <p className="coin-loading">Loading coin data...</p>;
  if (!coin) return <p className="coin-loading">Loading coin details...</p>;

  return (
    <div className="coin-detail-container">
      <div className="coin-header">
        <img src={coin.image?.large} alt={`${coin.name} logo`} className="coin-logo" />
        <h2>
          {coin.name} {coin.symbol ? `(${coin.symbol.toUpperCase()})` : ''}
        </h2>
        {coin.market_cap_rank && (
          <p className="coin-rank">Rank #{coin.market_cap_rank}</p>
        )}
        <p className="coin-price">
          <strong>Price:</strong>{' '}
          ${coin.market_data?.current_price?.usd?.toLocaleString() || 'N/A'}
        </p>
        <p
          className="coin-change"
          style={{
            color: coin.market_data?.price_change_percentage_24h >= 0 ? 'lightgreen' : 'salmon',
          }}
        >
          <strong>24h Change:</strong>{' '}
          {coin.market_data?.price_change_percentage_24h?.toFixed(2)}%
        </p>
        <p className="coin-marketcap">
          <strong>Market Cap:</strong>{' '}
          ${coin.market_data?.market_cap?.usd?.toLocaleString() || 'N/A'}
        </p>
        <button onClick={fetchCoin} className="refresh-button">
          🔄 Refresh Data
        </button>
      </div>

      <CoinConverter coin={coin} />

      <div className="coin-grid">
        <div className="chart-container">
          <PriceChart coinId={coin.id} />
        </div>
        <div className="metrics-container">
          <TokenMetrics coinId={id} />
        </div>
      </div>

      <CoinAbout coin={coin} />
      <CoinLinks coin={coin} />
    </div>
  );
};

export default CoinDetail;
