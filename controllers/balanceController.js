const { calculateBalanceChange } = require('../utils/balanceCalculator');
const BalanceData = require('../models/balanceData')

const fetchAndSaveBalances = async (req, res) => {
  try {
    const { addresses } = req.body;
    const balanceDataList = [];

    for (const address of addresses) {
      const balanceData = await calculateBalanceChange(address);
      balanceDataList.push(balanceData);
      await saveBalanceData(balanceData);
    }

    return res.json(balanceDataList);
  } catch (error) {
    console.error('Error fetching and saving wallet balances:', error.message);
    return res.status(500).json({ error: 'Failed to fetch and save wallet balances' });
  }
};

const saveBalanceData = async (data) => {
    try {
      // Save the data to your MongoDB collection
      await BalanceData.create(data);
    } catch (error) {
      console.error('Error saving balance data to the database:', error.message);
    }
  };


module.exports = { fetchAndSaveBalances, saveBalanceData };
