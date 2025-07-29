import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Highlights = () => {
  const [trending, setTrending] = useState([]);
  const [gainers, setGainers] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchData = async () => {
    try {
      // ✅ Trending from CoinGecko
      const trendingRes = await axios.get('https://api.coingecko.com/api/v3/search/trending');
      const trendingCoins = trendingRes.data.coins.map(c => c.item);
      setTrending(trendingCoins.slice(0, 3));

      // ✅ Gainers from Coinpaprika
      const res = await axios.get('https://api.coinpaprika.com/v1/tickers');
      const allCoins = res.data;

      const sorted = allCoins
        .filter(c => c.quotes?.USD?.percent_change_24h !== null)
        .sort((a, b) => b.quotes.USD.percent_change_24h - a.quotes.USD.percent_change_24h)
        .slice(0, 3);

      setGainers(sorted);
    } catch (err) {
      console.error('Highlights fetch error:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshTrigger]);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div style={styles.wrapper}>
      <button onClick={handleRefresh} style={styles.refreshBtn}>🔄 Refresh</button>

      <div style={styles.container}>
        {/* 🔥 Trending */}
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

        {/* 🚀 Top Gainers */}
        <div style={styles.card}>
          <div style={styles.header}>
            <span style={styles.title}>🚀 Top Gainers</span>
          </div>
          <ul style={styles.list}>
            {gainers.map((coin, i) => (
              <li key={i} style={styles.listItem}>
                <Link to={`/coin/${coin.id}`} style={styles.itemLink}>
                  <img
                    src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                    onError={(e) => (e.target.style.display = 'none')}
                    alt={coin.name}
                    style={styles.icon}
                  />
                  <div style={styles.textGroup}>
                    <span style={styles.name}>{coin.name}</span>
                    <span style={styles.symbol}>{coin.symbol.toUpperCase()}</span>
                  </div>
                  <span style={styles.gain}>
                    +{coin.quotes.USD.percent_change_24h.toFixed(1)}%
                  </span>
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
  refreshBtn: {
    backgroundColor: '#1e88e5',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    fontSize: '14px',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '24px',
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
