const calculateBalanceChange = async (address) => {
  try {
    // Get the current balance using the external API (e.g., BSCScan)
    const currentBalance = await getWalletBalance(address);

    // Fetch historical data from the database for the given wallet address
    const historicalData = await BalanceData.find({ address }).sort({ timestamp: -1 }).limit(1);

    // Check if there is any historical data available for this address
    let lastBalance = 0;
    if (historicalData.length > 0) {
      lastBalance = historicalData[0].balance;
    }

    // Calculate the balance change based on the current balance and last balance
    const balanceChange = currentBalance - lastBalance;
    const balanceChangePercentage = (balanceChange / lastBalance) * 100;

    // Calculate daily, weekly, and monthly balance changes
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
    const oneWeek = 7 * oneDay; // One week in milliseconds
    const oneMonth = 30 * oneDay; // One month in milliseconds

    const historicalDataWithinOneDay = await BalanceData.find({
      address,
      timestamp: { $gt: new Date(Date.now() - oneDay) },
    }).sort({ timestamp: -1 });

    const historicalDataWithinOneWeek = await BalanceData.find({
      address,
      timestamp: { $gt: new Date(Date.now() - oneWeek) },
    }).sort({ timestamp: -1 });

    const historicalDataWithinOneMonth = await BalanceData.find({
      address,
      timestamp: { $gt: new Date(Date.now() - oneMonth) },
    }).sort({ timestamp: -1 });

    const dailyBalanceChange = currentBalance - (historicalDataWithinOneDay[0]?.balance || currentBalance);
    const weeklyBalanceChange = currentBalance - (historicalDataWithinOneWeek[0]?.balance || currentBalance);
    const monthlyBalanceChange = currentBalance - (historicalDataWithinOneMonth[0]?.balance || currentBalance);

    return {
      address,
      currentBalance,
      lastBalance,
      balanceChange,
      balanceChangePercentage,
      dailyBalanceChange,
      weeklyBalanceChange,
      monthlyBalanceChange,
    };
  } catch (error) {
    console.error('Error calculating balance change:', error.message);
    throw new Error('Error calculating balance change');
  }
};

module.exports = { calculateBalanceChange };
