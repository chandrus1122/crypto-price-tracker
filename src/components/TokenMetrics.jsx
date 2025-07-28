// TokenMetrics.jsx
import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchCoinData = async (coinId) => {
  const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`);
  return res.data;
};

const TokenMetrics = ({ coinId }) => {
  const { data: coin, error, isLoading, isError } = useQuery({
    queryKey: ['coin', coinId],
    queryFn: () => fetchCoinData(coinId),
    refetchInterval: 30000, // auto-refetch every 30 seconds
    enabled: !!coinId, // only run if coinId is truthy
  });

  if (isLoading) return <p style={{ color: 'gray', textAlign: 'center' }}>Loading token metrics...</p>;
  if (isError) return <p style={{ color: 'red', textAlign: 'center' }}>Loading token metrics data...</p>;
  if (!coin || !coin.market_data) return null;

  const {
    fully_diluted_valuation,
    total_value_locked,
    circulating_supply,
    total_supply,
    max_supply,
  } = coin.market_data;

  return (
    <div
      style={{
        backgroundColor: '#1e1e2f',
        borderRadius: '12px',
        padding: '20px',
        color: 'white',
        maxWidth: '700px',
        margin: '10px auto',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
      }}
    >
      <h3 style={{ marginBottom: '20px', borderBottom: '1px solid #444', paddingBottom: '10px' }}>
        📘 Token Metrics
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '16px', columnGap: '20px' }}>
        <div><strong>Fully Diluted Valuation:</strong></div>
        <div>{fully_diluted_valuation?.usd ? `$${fully_diluted_valuation.usd.toLocaleString()}` : 'N/A'}</div>

        <div><strong>Total Value Locked (TVL):</strong></div>
        <div>{total_value_locked?.usd ? `$${total_value_locked.usd.toLocaleString()}` : 'N/A'}</div>

        <div><strong>Circulating Supply:</strong></div>
        <div>{circulating_supply ? circulating_supply.toLocaleString() : 'N/A'}</div>

        <div><strong>Total Supply:</strong></div>
        <div>{total_supply ? total_supply.toLocaleString() : 'N/A'}</div>

        <div><strong>Max Supply:</strong></div>
        <div>{max_supply ? max_supply.toLocaleString() : 'N/A'}</div>
      </div>
    </div>
  );
};

export default TokenMetrics;
