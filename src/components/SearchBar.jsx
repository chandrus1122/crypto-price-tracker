// components/SearchBar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import debounce from 'lodash.debounce';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [coins, setCoins] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/list')
      .then(res => setCoins(res.data))
      .catch(err => console.error('Coin list fetch failed:', err));
  }, []);
const debouncedFetchCoins = debounce((searchTerm) => {
  axios.get(`https://api.coingecko.com/api/v3/coins/list`)
    .then(res => { /* handle success */ })
    .catch(err => console.error("Coin list fetch failed:", err));
}, 500); // 500ms delay

  const handleSelect = (coinId) => {
    setQuery('');
    navigate(`/coin/${coinId}`);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5); // limit suggestions

  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search cryptocurrency..."
        style={{ padding: '10px', width: '250px', borderRadius: '8px', border: '1px solid #ccc' }}
      />
      {query && (
        <div style={{ background: '#1a1a1a', color: '#fff', width: '250px', margin: 'auto', borderRadius: '8px', marginTop: '5px' }}>
          {filteredCoins.map(coin => (
            <div
              key={coin.id}
              onClick={() => handleSelect(coin.id)}
              style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #333' }}
            >
              {coin.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
