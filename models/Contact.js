import mongoose from "mongoose";

const ContactSchema= new mongoose.Schema({
        name:{
        type:String,
        required:true
        },
        companyname:{
        type:String,
         required:true
        }, 
       address:{
        type:String,
        required:true
        },
        phone:{
            type:String,
            required:true
        }    
},{timestamps:true})


const contactModel= mongoose.model('Contact',ContactSchema)

export default contactModel