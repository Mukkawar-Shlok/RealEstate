import express from 'express';
import router from './routes/index.js';

import dotenv from 'dotenv';
//for making dotenv actully work
dotenv.config();

import connectToDatabase from './config/mongoose.js';

const app  = express();

app.use(express.json());

const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

app.use('/',router);

//error handler
app.use((err,req,res,next)=>{

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    return res.status(statusCode).json({
        sucess:false,
        statusCode,
        message
    })

});

connectToDatabase();