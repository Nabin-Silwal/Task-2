 require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorHandler');
const startCronJob = require('./cron');
const connectToMongo = require('./db');

// Connect to MongoDB
connectToMongo()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api', require('./routes/userRoutes'));
app.use('/api', require('./routes/walletRoutes'));
app.use('/api', require('./routes/balanceRoutes'));
app.use('/api', require('./routes/historicalRoutes'));


// Error handling middleware
app.use(errorHandler);

// Start cron job
//startCronJob();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
