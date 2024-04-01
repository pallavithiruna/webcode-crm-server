import mongoose from "mongoose";
const UserSchema =new mongoose.Schema(
    {
        username:{type:String,required:true,unique:true},
        gender:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        role:{type:String,required:true},
        password:{type:String,required:true}
    }
)
const UserModel =mongoose.model("User",UserSchema)

export{UserModel as User}
