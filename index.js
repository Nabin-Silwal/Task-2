require("dotenv").config();
const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const nodeCron = require('node-cron');
const User = require('./models/user.model');
const Wallet = require('./models/wallet.model');
const HistoricalData = require('./models/historicalData.model');
const calculateChanges = require('./utils/calculateChanges');
const connectToMongo = require("./db");

const app = express();
const port = 3000;

const API_KEY = process.env.API_KEY 
const BSCSCAN_API_BASE_URL = 'https://api.bscscan.com/api';
const WALLET_UPDATE_INTERVAL = 5 * 60 * 1000; // 5 minutes


connectToMongo();

const fetchBalanceData = async (wallet) => {
  try {
    const response = await axios.get(`${BSCSCAN_API_BASE_URL}/accountbalance`, {
      params: {
        address: wallet.address,
        apikey: API_KEY,
      },
    });

    const balance = parseFloat(response.data.result) / 10 ** 18; // Convert balance to BNB
    const historicalData = new HistoricalData({ wallet: wallet._id, balance });
    await historicalData.save();

    console.log(`Balance data for wallet ${wallet.address} saved successfully.`);
  } catch (error) {
    console.error(`Error fetching balance data for wallet ${wallet.address}:`, error.message);
  }
};

const updateWalletBalances = async () => {
  const users = await User.find().populate('wallets');
  users.forEach((user) => {
    user.wallets.forEach((wallet) => {
      fetchBalanceData(wallet);
    });
  });
};

nodeCron.schedule(`*/${WALLET_UPDATE_INTERVAL} * * * *`, () => {
  updateWalletBalances();
});

app.get('/api/balance', async (req, res) => {
  try {
    const historicalData = await HistoricalData.find();
    const changes = calculateChanges(historicalData);

    res.json({ historicalData, ...changes });
  } catch (err) {
    console.error('Error fetching data from the database:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
