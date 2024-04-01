import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser'
dotenv.config()
import { UserRouter } from "./routes/user.js";
import { User } from "./models/User.js";

const app=express();
app.use(cors({
  origin:"https://pallavi-crm.netlify.app",
  credentials:true,
}));

// app.use(cors(["*"]))

app.use(express.json());
app.use(cookieParser());

app.use('/auth',UserRouter)


app.get("/", function (req, res) {
    res.send("🙋‍♂️, 🌏 🎊✨🤩");
  });

// app.get("/getAllUser",async(req,res)=>{
//  try {
//    res.send(await User.find())
//  } catch (error) {
//   console.log(error)
//  }
// })
  

const MONGO_URL=process.env.URL;

mongoose.connect(MONGO_URL)





app.listen(process.env.PORT,
    ()=>{console.log("Server is Running")})