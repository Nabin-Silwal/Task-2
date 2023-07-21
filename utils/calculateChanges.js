const calculateChanges = (data) => {
    // Perform calculations for daily, weekly, and monthly balance changes
    const sortedData = data.sort((a, b) => a.createdAt - b.createdAt);
    
    const dailyChanges = [];
    const weeklyChanges = [];
    const monthlyChanges = [];
  
    const currentDate = new Date();
    let lastDayBalance = sortedData[0].balance;
    let lastWeekBalance = sortedData[0].balance;
    let lastMonthBalance = sortedData[0].balance;
  
    for (const entry of sortedData) {
      const entryDate = new Date(entry.createdAt);
      
      // Calculate daily change
      if (entryDate.toDateString() === currentDate.toDateString()) {
        const dailyChange = entry.balance - lastDayBalance;
        dailyChanges.push(dailyChange);
        lastDayBalance = entry.balance;
      }
  
      // Calculate weekly change
      const daysDiff = Math.floor((currentDate - entryDate) / (1000 * 60 * 60 * 24));
      if (daysDiff <= 7) {
        const weeklyChange = entry.balance - lastWeekBalance;
        weeklyChanges.push(weeklyChange);
        lastWeekBalance = entry.balance;
      }
  
      // Calculate monthly change
      const monthDiff = currentDate.getMonth() - entryDate.getMonth() +
        12 * (currentDate.getFullYear() - entryDate.getFullYear());
      if (monthDiff <= 1) {
        const monthlyChange = entry.balance - lastMonthBalance;
        monthlyChanges.push(monthlyChange);
        lastMonthBalance = entry.balance;
      }
    }
  
    return { dailyChanges, weeklyChanges, monthlyChanges };
  };
  
  module.exports = calculateChanges;
  