const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const connectToMongo = require('./db');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

//require('./db')
connectToMongo()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', require('./routes/routes'));


// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000;
 app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
