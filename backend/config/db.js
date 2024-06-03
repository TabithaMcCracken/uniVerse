// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const connectionString = process.env.ATLAS_URI || ""

async function connectToDb(){
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to MongoDB');

    }  catch (err){
        console.log(err);
    } 

}

module.exports = connectToDb;