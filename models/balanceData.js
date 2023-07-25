// models/balanceData.model.js
const mongoose = require('mongoose');

const balanceDataSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  currentBalance: {
    type: Number,
    required: true,
  },
  balanceChange: {
    type: Number,
    required: true,
  },
  balanceChangePercentage: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BalanceData = mongoose.model('BalanceData', balanceDataSchema);

module.exports = BalanceData;
