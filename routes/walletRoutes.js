const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const walletController = require('../controllers/walletController');

// Add wallet address for a user
router.post('/add', authMiddleware, walletController.addWallet);

// Get all wallet addresses for a user
router.get('/list', authMiddleware, walletController.getWallets);

// Update wallet address for a user
router.put('/update/:id', authMiddleware, walletController.updateWallet);

// Delete wallet address for a user
router.delete('/delete/:id', authMiddleware, walletController.deleteWallet);

module.exports = router;
