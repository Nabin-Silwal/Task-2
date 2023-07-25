 require("dotenv").config();
const express = require('express');
const app = express();
const errorHandler = require('./middleware/errorHandler');
const startCronJob = require('./cron');
const connectToMongo = require('./db');

// Connect to MongoDB
connectToMongo()

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/wallets', require('./routes/walletRoutes'));
app.use('/api', require('./routes/balanceRoutes'));

// Error handling middleware
app.use(errorHandler);

// Start cron job
startCronJob();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
