const mongoose = require("mongoose");

// Define the schema for a saved verse
const savedVerseSchema = new mongoose.Schema({
  book: { type: String, required: true },
  chapter: { type: Number, required: true },
  verse: { type: Number, required: true },
  practiceAttempts: { type: Number, default: 0 },
  progress: { type: Number, default: 0 },
  dateSaved: { type: Date, default: Date.now },
});

// Define the schema for a user
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedVerses: [savedVerseSchema],
});

module.exports = mongoose.model("users", userSchema);
