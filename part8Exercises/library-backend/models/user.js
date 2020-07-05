const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  favouriteGenre: String,
  passwordHash: String
});

module.exports = mongoose.model('User', userSchema);