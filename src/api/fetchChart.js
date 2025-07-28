// src/api/fetchChart.js
import axios from 'axios';

export const fetchCryptoChart = async (id) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
    {
      params: {
        vs_currency: 'usd',
        days: 7, // You can change to 1, 7, 30, etc.
        interval: 'daily',
      },
    }
  );
  return response.data.prices;
};
