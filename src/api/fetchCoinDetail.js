// api/fetchCoinDetail.js
import axios from 'axios';

export const fetchCoinDetail = async (id) => {
  const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
  return response.data;
};
