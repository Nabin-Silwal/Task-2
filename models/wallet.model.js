const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
  walletId: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  timestamp: { type: Date, default: Date.now },
});

const Wallet = mongoose.model('Wallet', WalletSchema);

module.exports = Wallet;
