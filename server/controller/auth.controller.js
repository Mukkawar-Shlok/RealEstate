import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

//custom error creater function which takes status code and message in string as parameters
import errorHandeler from '../utils/error.js';

export default async function signup(req,res,next){
    const {username,email,password} = req.body;
    try{

        //if any coming information in incomplete
        if(!username || !email || !password) return res.status(500).json({message:"Incomplete information", sucess:false})

        // create hashed password 
        const hashedPassword = bcrypt.hashSync(password,10);

        //save hashed password for making the application more secure
        const newUser = new User({username,email,password:hashedPassword});
        await newUser.save()
            .then(()=>{
                res.status(201).json({message:"User created sucessfully",sucess:true});
            }).catch((err)=>{
                // res.status(500).json({message:"Failed to create user."})
                next(err);
            })
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error.", sucess:false})
    }

};