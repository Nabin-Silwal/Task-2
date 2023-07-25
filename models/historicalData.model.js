const mongoose = require("mongoose");

const HistoricalData = mongoose.model(
  "HistoricalData",
  new mongoose.Schema({
    address: {
      type: String,
      required: true,
    },
    balanceData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BalanceData',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
);

module.exports = HistoricalData;
