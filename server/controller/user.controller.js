import errorHandeler from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";
 function home(req,res) {
    res.send('Hello, this is the home d awdadw route!');
};

 async function updateUser(req,res,next){

    try{
        if(req.params.id !== req.user.id){
            return next(errorHandeler(401,"You can only update yourn own account."))
        }
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10)
        }

        const updated = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username :req.body.username,
                password :req.body.password,
                email : req.body.email,
            }
        },{new:true})

        const {password,...others} = updated._doc;
        return res.send({
            message:"User updated Succesfully.",
            success:true,
            data:others
        })

    }catch(err){
        next(err)
    }
 }

 export {
    home,
    updateUser
 }