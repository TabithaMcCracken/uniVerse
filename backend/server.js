// import express from 'express'
const express = require('express')

// import 'dotenv/config'
require('dotenv').config();

const connectToDb = require('./config/db.js')
// import connectToDb from './config/db.js'

// import cors from 'cors';
const cors = require('cors');
// import appUsers from './routes/userRoutes.js'
const appUsers = require('./routes/userRoutes.js')

// Create Express App
const app = express()
const PORT = process.env.PORT || 5050;

// Connect to the database
connectToDb();

// Middleware for Parsing
app.use(cors());
app.use(express.json())


// Middleware for Logging Time Stamp and Request info
app.use((req, res, next) => {
    const time = new Date();
  
    console.log(
      `-----
  ${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
    );
    if (Object.keys(req.body).length > 0) {
      console.log("Containing the data:");
      console.log(`${JSON.stringify(req.body)}`);
    }
    next();
  });

// Routes
app.use('/users', appUsers)

// Set route handler for the root URL ("/")
app.get('/', (req, res) => {
    res.send('Hello! (from the Server)')
})

// Global error handling
app.use((err, _req, res, next) => {
    res.status(500).send("Seems like we messed up somewhere...");
  });

app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT)
})