const HistoricalData = require('../models/historicalData.model');

// Get historical data for all addresses
const getHistoricalData = async (req, res) => {
  try {
    const historicalData = await HistoricalData.find().sort({ timestamp: -1 });
    res.json(historicalData);
  } catch (error) {
    console.error('Error fetching historical data:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get historical data for a specific address
const getHistoricalDataForAddress = async (req, res) => {
  const { address } = req.params;
  try {
    const historicalData = await HistoricalData.find({ address }).sort({ timestamp: -1 });
    res.json(historicalData);
  } catch (error) {
    console.error('Error fetching historical data for address:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getHistoricalData, getHistoricalDataForAddress };
