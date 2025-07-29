import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const fetchTrending = async () => {
  const res = await axios.get('https://api.coingecko.com/api/v3/search/trending');
  return res.data.coins.map(c => c.item).slice(0, 3);
};

const fetchGainers = async () => {
  const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 50,
      page: 1,
      price_change_percentage: '24h',
    },
  });
  return res.data
    .filter(c => c.price_change_percentage_24h !== null)
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, 3);
};

const Highlights = () => {
  const {
    data: trending = [],
    isLoading: trendingLoading,
    isError: trendingError,
  } = useQuery(['trending'], fetchTrending, {
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: gainers = [],
    isLoading: gainersLoading,
    isError: gainersError,
  } = useQuery(['gainers'], fetchGainers, {
    staleTime: 1000 * 60 * 5,
  });

  if (trendingLoading || gainersLoading) return <p style={{ color: 'white' }}>Loading Highlights...</p>;
  if (trendingError || gainersError) return <p style={{ color: 'red' }}>Error loading highlights data.</p>;

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        {/* Trending Section */}
        <div style={styles.card}>
          <div style={styles.header}>
            <span style={styles.title}>🔥 Trending</span>
          </div>
          <ul style={styles.list}>
            {trending.map((coin, i) => (
              <li key={i} style={styles.listItem}>
                <Link to={`/coin/${coin.id}`} style={styles.itemLink}>
                  <img src={coin.thumb} alt={coin.name} style={styles.icon} />
                  <div style={styles.textGroup}>
                    <span style={styles.name}>{coin.name}</span>
                    <span style={styles.symbol}>{coin.symbol.toUpperCase()}</span>
                  </div>
                  <span style={styles.price}>${coin.price_btc.toFixed(8)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Top Gainers Section */}
        <div style={styles.card}>
          <div style={styles.header}>
            <span style={styles.title}>🚀 Top Gainers</span>
          </div>
          <ul style={styles.list}>
            {gainers.map((coin, i) => (
              <li key={i} style={styles.listItem}>
                <Link to={`/coin/${coin.id}`} style={styles.itemLink}>
                  <img src={coin.image} alt={coin.name} style={styles.icon} />
                  <div style={styles.textGroup}>
                    <span style={styles.name}>{coin.name}</span>
                    <span style={styles.symbol}>{coin.symbol.toUpperCase()}</span>
                  </div>
                  <span style={styles.gain}>+{coin.price_change_percentage_24h.toFixed(1)}%</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundColor: 'black',
    padding: '20px',
    textAlign: 'center',
  },
  container: {
    display: 'flex',
    gap: '24px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '16px',
    width: '320px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  title: {
    fontWeight: '600',
    fontSize: '18px',
    color: '#000',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px',
  },
  itemLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    width: '100%',
    color: '#000',
  },
  icon: {
    width: '28px',
    height: '28px',
    marginRight: '8px',
  },
  textGroup: {
    flex: 1,
    lineHeight: '1.2',
  },
  name: {
    fontWeight: '500',
    fontSize: '15px',
    display: 'block',
  },
  symbol: {
    fontSize: '12px',
    color: '#888',
  },
  price: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#0a0',
  },
  gain: {
    fontSize: '14px',
    fontWeight: '500',
    color: 'green',
  },
};

export default Highlights;
