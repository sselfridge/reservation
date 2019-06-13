const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  // email: {type: String, required: true, unique: true},
  // familyName: {type: String},
  // givenName: {type: String},
  // googleId: {type: String, required: true, unique: true},
  // cookieId: { type: String, required: true, unique: true },
  // createdAt: { type: Date, expires: 30, default: Date.now }
  username: String,
  googleId: String,
  phone: String,
});

module.exports = mongoose.model('Session', sessionSchema);