const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const walletController = require('../controllers/walletController');

// Add wallet address for a user
router.post('/wallet/add', authMiddleware, walletController.addWallet);

// Get all wallet addresses for a user
router.get('/wallet/list', authMiddleware, walletController.getWallets);

// Update wallet address for a user
router.put('/wallet/update/:id', authMiddleware, walletController.updateWallet);

// Delete wallet address for a user
router.delete('/wallet/delete/:id', authMiddleware, walletController.deleteWallet);

module.exports = router;
