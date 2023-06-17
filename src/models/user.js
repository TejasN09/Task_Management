const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const user = new mongoose.Schema({
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
  userId: {
    type: String,
    default: uuidv4(),
    required: true,
    unique: true
  },

});

const User = mongoose.model('User', user);

module.exports = User;

