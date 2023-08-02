
const { calculateBalanceChange } = require('./utils/balanceCalculator');
const Wallet = require('./models/wallet.model');
const BalanceData = require('./models/balanceData');
const HistoricalBalanceData = require('./models/historicalData.model');

const fetchWalletData = async () => {
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
};

// Set the interval for fetching wallet data every 5 minutes (300,000 milliseconds)
const fetchInterval = 300000;

// Function to start the service
const startWalletService = () => {
  fetchWalletData(); // Fetch data immediately when the service starts

  // Schedule periodic execution of the service
  setInterval(fetchWalletData, fetchInterval);
};

startWalletService(); // Start the service
