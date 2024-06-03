// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const savedVerseSchema = new mongoose.Schema({
  book: { type: String, required: true },
  chapter: { type: Number, required: true },
  verse: { type: Number, required: true },
  text: { type: String, required: true },
  practiceAttempts: { type: Number, default: 0 },
  progress: { type: Number, default: 0 },
  dateSaved: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedVerses: [savedVerseSchema]
});

// export default mongoose.model('users', userSchema);

module.exports = mongoose.model('users', userSchema);