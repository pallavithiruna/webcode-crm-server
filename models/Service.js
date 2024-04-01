import mongoose from "mongoose";

const ServiceSchema= new mongoose.Schema({
        company:{
        type:String,
        required:true
        },
        servicerequest:{
        type:String,
         required:true
        }, 
       details:{
        type:String,
        required:true
        },
        requestdate:{
            type:String,
            required:true
        }   
},{timestamps:true})


const serviceModel= mongoose.model('Service',ServiceSchema)

export default serviceModel