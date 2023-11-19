import express from 'express';

import dotenv from 'dotenv';
//for making dotenv actully work
dotenv.config();

import connectToDatabase from './config/mongoose.js';

const app  = express();

const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

connectToDatabase();