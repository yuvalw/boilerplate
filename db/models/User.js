const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },
  meta: {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    nickname: { type: String, required: true }
  }
});

mongoose.model('users', userSchema);
