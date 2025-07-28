// api/fetchCryptos.js
import axios from 'axios';

export const fetchCryptos = async () => {
  const response = await axios.get(
    'https://api.coingecko.com/api/v3/coins/markets',
    {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 200,
        page: 1,
        sparkline: false,
      },
    }
  );
  return response.data;
};
