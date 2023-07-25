const express = require('express');
const router = express.Router();
const { fetchAndSaveBalances } = require('../controllers/balanceController');

// API route to fetch and save wallet balances
router.post('/balances', fetchAndSaveBalances);

module.exports = router;
