const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    default: 'user',
  },
  image: {
    type: String,
    default: 'default_profile.jpg', // Set the default profile image filename
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
