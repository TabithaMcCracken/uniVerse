// Import the mongoose module
const mongoose = require("mongoose");

// Retrieve the MongoDB connection string from environment variables
const connectionString = process.env.ATLAS_URI || "";

async function connectToDb() {
  try {
    // Attempt to connect to the MongoDB database
    await mongoose.connect(connectionString);
    console.log("Connected to MongoDB");
  } catch (err) {
    // Log any errors that occur during the connection attempt
    console.log(err);
  }
}

module.exports = connectToDb;
