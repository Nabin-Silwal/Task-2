const mongoose = require("mongoose");

const HistoricalData = mongoose.model(
  "HistoricalData",
  new mongoose.Schema({
    wallet: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' },
    balance: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  })
);

module.exports = HistoricalData;
