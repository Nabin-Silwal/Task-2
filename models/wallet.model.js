const mongoose = require("mongoose");

const Wallet = mongoose.model(
  "Wallet",
  new mongoose.Schema({
    user: { type: String, required: true },
    address: { type: String, required: true },
    balance: { type: Number, default: 0 },
  })
);

module.exports = Wallet;
