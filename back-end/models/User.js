const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String, 
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

// we say User = mongoose so that we dont have to assign
// to variable elsewhere and we can just refer to this 
// collection as db.User
module.exports = User = mongoose.model('User', UserSchema)
