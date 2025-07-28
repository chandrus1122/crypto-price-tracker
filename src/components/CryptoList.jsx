import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCryptos } from '../api/fetchCryptos';
import CryptoCard from './CryptoCard';
import './CryptoList.css';

const CryptoList = () => {
  const [visibleCount, setVisibleCount] = useState(50);

  const {
    data: coins = [],
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['cryptos'],
    queryFn: fetchCryptos,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000); // Auto-refresh every 30s

    return () => clearInterval(interval);
  }, [refetch]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 50);
  };

  if (isLoading) return <p className="loading-text">Loading...</p>;
  if (isError) return <p className="error-text">Failed to load data.</p>;

  return (
    <div className="crypto-list-container">
      <h2 className="crypto-list-heading">Digital Asset Price Dashboard</h2>

      <div className="refresh-button-wrapper">
        <button
          onClick={refetch}
          disabled={isFetching}
          className={`refresh-button ${isFetching ? 'disabled' : ''}`}
        >
          🔄 {isFetching ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="crypto-list">
        {coins.slice(0, visibleCount).map((coin) => (
          <CryptoCard key={coin.id} coin={coin} />
        ))}
      </div>

      {visibleCount < coins.length && (
        <div className="show-more-wrapper">
          <button onClick={handleShowMore} className="show-more-button">
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default CryptoList;
