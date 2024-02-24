import errorHandeler from "./error.js";
import jwt from "jsonwebtoken";
export const verifyToken =(req,res,next)=>{
    try{
        const token = req.cookies.access_token;
        if(!token) return next(errorHandeler(401,"Access Denied..."))
        
        jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
            if(err) return next(errorHandeler(503,"Forbidden..."))
            req.user = user;
            next();
        })

    }catch(error){
        next(error);
    }
} 