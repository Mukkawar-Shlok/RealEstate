import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    avatar:{
        type:String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw3VFdp_vN14SOH6Ev0PEAFH&ust=1704003881483000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCLDb_KHDtoMDFQAAAAAdAAAAABAE"
    }
},{timestamps:true});

const User = mongoose.model('User',userSchema);

export default User;