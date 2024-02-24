import express from 'express';
import router from './routes/index.js';

import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
//for making dotenv actully work
dotenv.config();

import connectToDatabase from './config/mongoose.js';

const app  = express();

app.use(cookieParser());
app.use(express.json());

const PORT = 3000;

connectToDatabase();
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

app.use('/',router);

//error handler
//for making error handeling easier in controllers
//just use next function add pass the error to it
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    return res.status(statusCode).json({
        sucess:false,
        statusCode,
        message
    })

});

