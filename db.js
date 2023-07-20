 require("dotenv").config();

// const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

// const url = process.env.MONGO_URI
//     // Connect MongoDB at default port 27017.
// let mong = mongoose.connect(url, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// }, (err) => {
//     if (!err) {
//         console.log('MongoDB Connection Succeeded.')
//     } else {
//         console.log('Error in DB connection: ' + err)
//     }
// });

const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI

const connectToMongo = async () => {
try {
    mongoose.set('strictQuery', false)
    mongoose.connect(mongoURI) 
    console.log('Mongo connected')
}
catch(error) {
    console.log(error)
    process.exit()
}
}
module.exports = connectToMongo;
