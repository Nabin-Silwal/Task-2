// controllers/walletController.js
const Wallet = require('../models/wallet.model');

// Add wallet address for a user
const addWallet = async (req, res) => {
  const { address } = req.body;

  try {
    let wallet = new Wallet({
      address,
      user: req.user.id,
    });

    await wallet.save();

    res.json(wallet);
  } catch (error) {
    console.error('Error adding wallet address:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all wallet addresses for a user
const getWallets = async (req, res) => {
  try {
    let wallets = await Wallet.find({ user: req.user.id });

    res.json(wallets);
  } catch (error) {
    console.error('Error getting wallet addresses:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update wallet address for a user
const updateWallet = async (req, res) => {
  const { address } = req.body;

  try {
    let wallet = await Wallet.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { address },
      { new: true }
    );

    res.json(wallet);
  } catch (error) {
    console.error('Error updating wallet address:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete wallet address for a user
const deleteWallet = async (req, res) => {
  try {
    await Wallet.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    res.json({ message: 'Wallet address deleted successfully' });
  } catch (error) {
    console.error('Error deleting wallet address:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { addWallet, getWallets, updateWallet, deleteWallet };
