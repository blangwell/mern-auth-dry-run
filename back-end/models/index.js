// MONGO SET UP AND CONFIG
require('dotenv').config()
const mongoose = require('mongoose');


// Mongo connection 
// we dont set process.env.MONGO_URI to a var for memory best practice
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
});

// Mongoose connection object
const db = mongoose.connection;

// set up an event listener to fire once the connection opens
// console log what host and port its running on

db.once('open', () => {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`)
});

db.on('error', (err) => {
  console.log(`Database Error \n ${err}`)
});

module.exports.User = require('./User')