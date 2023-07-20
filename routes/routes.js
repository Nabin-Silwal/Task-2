require("dotenv").config();
const express = require("express");
const axios = require('axios');
const router = express.Router();
const Wallet = require("../models/wallet.model");
const HistoricalData = require("../models/historicalData.model");


// Fetch and Save Wallet Balance
async function fetchAndSaveWalletBalance() {
    try {
      const wallets = await Wallet.find({});
      const promises = wallets.map(async (wallet) => {
        try {
          const response = await axios.get(
            `https://api.bscscan.com/api?module=account&action=balance&address=${wallet.address}&tag=latest&apikey=${process.env.API_KEY}`
          );
          const balance = parseFloat(response.data.result) / 10 ** 18;
          wallet.balance = balance;
          await wallet.save();
  
          // Save balance data to another collection (historical data)
          const historicalData = new HistoricalData({
            user: wallet.user,
            address: wallet.address,
            balance: wallet.balance,
          });
          await historicalData.save();
  
          console.log(`Balance for wallet ${wallet.address} updated successfully.`);
        } catch (error) {
          console.error(`Error fetching balance for wallet ${wallet.address}:`, error.message);
        }
      });
      await Promise.all(promises);
    } catch (err) {
      console.error('Error fetching wallets:', err);
    }
  }


// Fetch and Save Wallet Balance every 5 minutes
setInterval(fetchAndSaveWalletBalance, 5 * 60 * 1000);

// API to Fetch Saved Data with Daily, Weekly, and Monthly Balance Changes
router.get('/api/wallets', async (req, res) => {
  try {
    const wallets = await Wallet.find({});
    const data = wallets.map((wallet) => {
      return {
        user: wallet.user,
        address: wallet.address,
        balance: wallet.balance,
      };
    });
    res.json(data);
  } catch (error) {
    console.error('Error fetching wallet data:', error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
