import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import './GlobalStats.css';

const fetchGlobalStats = async () => {
  const res = await axios.get('https://api.coingecko.com/api/v3/global');
  return res.data.data;
};

const GlobalStats = () => {
  const {
    data: globalData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['globalStats'],
    queryFn: fetchGlobalStats,
    refetchInterval: 30000, // 30s refresh
  });

  if (isLoading)
    return <p className="loading-text">Loading global stats...</p>;

  if (isError)
    return <p className="error-text">Error: {error.message}</p>;

  if (!globalData) return null;

  return (
    <div className="global-stats-container">
      <h2 className="global-stats-heading">🌐 Global Crypto Stats</h2>
      <div className="stats-grid">
        <div><strong>Coins:</strong> {globalData.active_cryptocurrencies}</div>
        <div><strong>Exchanges:</strong> {globalData.markets}</div>
        <div><strong>Market Cap:</strong> ${Number(globalData.total_market_cap.usd).toLocaleString()}</div>
        <div><strong>24h Volume:</strong> ${Number(globalData.total_volume.usd).toLocaleString()}</div>
        <div><strong>BTC Dominance:</strong> {globalData.market_cap_percentage.btc.toFixed(2)}%</div>
        <div><strong>ETH Dominance:</strong> {globalData.market_cap_percentage.eth.toFixed(2)}%</div>
        <div><strong>ETH Gas:</strong> {globalData.eth_gas_price} Gwei</div>
      </div>
    </div>
  );
};

export default GlobalStats;
