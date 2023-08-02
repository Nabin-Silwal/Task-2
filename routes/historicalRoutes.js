const express = require('express');
const router = express.Router();
const historicalDataController = require('../controllers/historicalDataController');


// Fetch historical data for all addresses
router.get('/historical-data', historicalDataController.getHistoricalData);

// Fetch historical data for a specific address
router.get('/historical-data/:address', historicalDataController.getHistoricalDataForAddress);


module.exports = router;
