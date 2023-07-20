const mongoose = require("mongoose");

const HistoricalData = mongoose.model(
  "HistoricalData",
  new mongoose.Schema({
    user: { type: String, required: true },
    address: { type: String, required: true },
    balance: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now },
  })
);

module.exports = HistoricalData;
