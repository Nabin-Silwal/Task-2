const cron = require('node-cron');
const { calculateBalanceChange } = require('./utils/balanceCalculator');
const Wallet = require('./models/wallet.model');
const BalanceData = require('./models/balanceData');
const HistoricalBalanceData = require('./models/historicalData.model');

const CRON_EXPRESSION = '*/5 * * * *'; // Run every 5 minutes

const startCronJob = () => {
  cron.schedule(CRON_EXPRESSION, async () => {
    try {
      const wallets = await Wallet.find();
      for (const wallet of wallets) {
        const balanceData = await calculateBalanceChange(wallet.address);

        // Create a new document in the BalanceData collection with the calculated balance data
        const newBalanceData = await BalanceData.create({
          address: balanceData.address,
          currentBalance: balanceData.currentBalance,
          balanceChange: balanceData.balanceChange,
          balanceChangePercentage: balanceData.balanceChangePercentage,
        });

        // Create a new document in the HistoricalBalanceData collection with the reference to the newBalanceData
        await HistoricalBalanceData.create({
          address: balanceData.address,
          balanceData: newBalanceData._id,
        });

        console.log('Balance data stored:', balanceData);
      }
      console.log('Wallet balances updated');
    } catch (error) {
      console.error('Error updating wallet balances:', error.message);
    }
  });
};

module.exports = startCronJob;
