import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

//custom error creater function which takes status code and message in string as parameters
import errorHandeler from '../utils/error.js';

import  jwt  from 'jsonwebtoken';

export async function signup(req,res,next){
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

export async function signin(req,res,next){

    const {email,password}  = req.body;
    try{
        const validUser = await User.findOne({email:email})
        if(!validUser) return next(errorHandeler(404,"User does not exists"));
        
        const validPassword = bcrypt.compareSync(password,validUser.password);
        if(!validPassword) return next(errorHandeler(404,"Wrong Credentials"));
        
        const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)
        const {password :passw,...userInfo} = validUser._doc;
        res.cookie('access_token',token,{httpOnly:true,expires:new Date(Date.now() + 24*60*60)}).status(200).json(userInfo)
        

    }catch(error){
        next(error);
    }

}

export async function google(req,res,next){
    try{
        const user = await User.findOne({email:req.body.email})
        if(user){
            const token  = jwt.sign({id:user._id},process.env.JWT_SECRET);
            const {password:pass,...userInfo} = user._doc;
            res.cookie('access_token',token,{httpOnly:true,expires:new Date(Date.now() + 24*60*60)}).status(200).json(userInfo)
        }else{
            const GeneratedPassword = Math.random.toString(36).slice(-8) + Math.random.toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(GeneratedPassword,10)
            const newUsername = req.body.name.split(" ").join().toLowerCase() + Math.random.toString(36).slice(-4)
            const newUser = User.create({username:newUsername,email:req.body.email,password:hashedPassword,avatar:req.body.photo})
            (await newUser).save()
            const {password:pass,...userInfo} = newUser._doc;
            const token  = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
            res.cookie('access_token',token,{httpOnly:true,expires:new Date(Date.now() + 24*60*60)}).status(200).json(userInfo)
        }
    }catch(error){
        //passing the error to next function defined in index.js
        next(error)
    }
}