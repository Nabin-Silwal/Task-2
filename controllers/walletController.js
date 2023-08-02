const Wallet = require('../models/wallet.model');


const addWallet = async (req, res) => {
  const { walletId, address } = req.body;

  // Check if the walletId is null or not provided
  if (!walletId) {
    return res.status(400).json({ error: 'WalletId is required' });
  }

  try {
    // Check if the walletId already exists for the user
    let wallet = await Wallet.findOne({ walletId, user: req.user.id });
    if (wallet) {
      return res.status(400).json({ error: 'Wallet address already exists for this user' });
    }

    wallet = new Wallet({
      walletId,
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
// const updateWallet = async (req, res) => {
//   const { walletId, address } = req.body;

//   try {
//     let wallet = await Wallet.findOneAndUpdate(
//       { walletId, user: req.user.id },
//       { address },
//       { new: true }
//     );

//     res.json(wallet);
//   } catch (error) {
//     console.error('Error updating wallet address:', error.message);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

const updateWallet = async (req, res) => {
  const { walletId, address } = req.body;

  try {
    // Find the wallet to update based on walletId and user ID
    const walletToUpdate = await Wallet.findOne({
      walletId: req.params.id,
      user: req.user.id,
    });

    if (!walletToUpdate) {
      return res.status(404).json({ error: 'Wallet address not found or unauthorized' });
    }

    // Update the walletId and address
    walletToUpdate.walletId = walletId;
    walletToUpdate.address = address;
    await walletToUpdate.save();

    res.json({ message: 'Wallet address updated successfully', wallet: walletToUpdate });
  } catch (error) {
    console.error('Error updating wallet address:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};



// Delete wallet address for a user
const deleteWallet = async (req, res) => {
  try {
    await Wallet.findOneAndDelete({
      walletId: req.params.id,
      user: req.user.id,
    });

    res.json({ message: 'Wallet address deleted successfully' });
  } catch (error) {
    console.error('Error deleting wallet address:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { addWallet, getWallets, updateWallet, deleteWallet };
