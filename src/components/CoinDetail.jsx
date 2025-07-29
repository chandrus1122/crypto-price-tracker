import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import PriceChart from './PriceChart';
import TokenMetrics from './TokenMetrics';
import CoinAbout from './CoinAbout';
import CoinConverter from './CoinConverter';
import CoinLinks from './CoinLinks';

import './CoinDetail.css';

const fetchCoin = async ({ queryKey }) => {
  const [_key, id] = queryKey;
  const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
  return res.data;
};

const CoinDetail = () => {
  const { id } = useParams();

  const {
    data: coin,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['coin', id],
    queryFn: fetchCoin,
    refetchInterval: 30000,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p className="coin-loading">Loading coin data...</p>;
  if (isError || !coin) return <p className="coin-loading">Error loading coin details...</p>;

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
            color:
              coin.market_data?.price_change_percentage_24h >= 0
                ? 'lightgreen'
                : 'salmon',
          }}
        >
          <strong>24h Change:</strong>{' '}
          {coin.market_data?.price_change_percentage_24h?.toFixed(2)}%
        </p>
        <p className="coin-marketcap">
          <strong>Market Cap:</strong>{' '}
          ${coin.market_data?.market_cap?.usd?.toLocaleString() || 'N/A'}
        </p>
        <button onClick={refetch} className="refresh-button">
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
