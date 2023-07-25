require("dotenv").config();
const axios = require('axios');

const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY;

const getWalletBalance = async (address) => {
  try {
    const response = await axios.get(
      `https://api.bscscan.com/api?module=account&action=balance&address=${address}&tag=latest&apikey=${BSCSCAN_API_KEY}`
    );

    return response.data.result;
  } catch (error) {
    console.error('Error fetching wallet balance:', error.message);
    throw new Error('Error fetching wallet balance');
  }
};

module.exports =  getWalletBalance;
