const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: { type: String, required: true },
    wallets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' }],
  })
);

module.exports = User;
