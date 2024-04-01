import express from 'express'
import bcrypt from 'bcrypt'
const router =express.Router();
import {User} from '../models/User.js'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { createcontact,getcontact,updatecontact,deletecontact,getonecontact} from '../Controllers/contactContollers.js'
import {createservice,getservice,getoneservice,updateservice,deleteservice} from '../Controllers/serviceController.js'



router.post('/signup',async(req,res)=>{
    const {username,gender,email,role,password}=req.body;
    console.log(req.body.email)
    const user=await User.findOne({email},undefined,{lean:true})
    console.log(user)
    if(user){
        return res.json({message:"user already existed"})
    }
    const hashpassword= await bcrypt.hash(password,10)
    const newUser=new User({
        username,
        gender,
        email,
        role,
        password:hashpassword
    })
    await newUser.save()
    return res.json({status:true,message:"record registered"})
})

router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    // console.log(req.body.email)
    const user=await User.findOne({email})
    console.log(user)
    if(!user){
        return res.json({message:"user is not registered"})
    }
    const validPassword= await bcrypt.compare(password,user.password)

    if(!validPassword){
        return res.json({message:"password is not valid"})
    }
    const token=jwt.sign({username:user.username},process.env.KEY,{expiresIn:'1h'})
    res.cookie('token',token,{maxAge:360000})
    return res.json({status:true,message:"login successfully"})
})
router.post('/forgotpassword',async(req,res)=>{
    const {email}=req.body;
    try{
        const user=await User.findOne({email})
         if(!user){
        return res.json({message:"user is not registered"})
         }
        const token=jwt.sign({id:user._id},process.env.KEY,{expiresIn:'10m'})
         var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'pallavithiruna@gmail.com',
              pass: 'kwkhdnrofmgxqinw'
            }
          });
          console.log(email);
          const encodedToken=encodeURIComponent(token).replace(/\./g,"%2E")
          var mailOptions = {
            from: 'pallavithiruna@gmail.com',
            to: email,
            subject: 'Reset Password',
            text: `http://localhost:5173/resetpassword/${encodedToken}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              return res.json({message:"error sending email"})
            } else {
              return res.json({status:true,message:"email sent"})
            }
          });
    }
    catch(err){
     console.log(err)
    }
})


router.post('/resetpassword/:token',async(req,res)=>{
  const token=req.params.token;
  const {password}=req.body;
  try{
const decoded= await jwt.verify(token,process.env.KEY)
const id=decoded.id;
const hashPassword= await bcrypt.hash(password,10)
await User.findByIdAndUpdate({_id:id},{password:hashPassword})
return res.json({status:true,message:"updated password"})
  }
  catch(err){
  return res.json("invalid token")
  }
})

router.get('/logout',async(req,res)=>{
  res.clearCookie('token')
    return  res.json({status:true})
})


// crud creation start for user login ,this is done by manager

router.get('/getAllUser',async(req,res)=>{
  try {
    res.send(await User.find())
  } catch (error) {
   console.log(error)
  }
 }
)

router.get('/getOneUser/:id',async(req,res)=>{
try {
  const id=req.params.id;
  const userExist =await User.findById(id);
  if(!userExist){
    return res.status(404).json({msg:"User not found"})
  }
  res.status(200).json(userExist)
} catch (error) {
  res.status(500).json({error:error})
}
}
)

router.put('/updateUser/:id',async(req,res)=>{
  try {
    const id=req.params.id;
    const userExist =await User.findById(id);
    if(!userExist){
      return res.status(404).json({msg:"User not found"})
    }
    const updatedData =await User.findByIdAndUpdate(id,req.body,{new:true});
    res.status(200).json(updatedData)
  } catch (error) {
    res.status(500).json({error:error})
  }
  }
  )

  router.delete('/deleteUser/:id',async(req,res)=>{
    try {
      const id=req.params.id;
      const userExist =await User.findById(id);
      if(!userExist){
        return res.status(404).json({msg:"User not found"})
      }
      await User.findByIdAndDelete(id);
      res.status(200).json({msg:"User deleted Successfully"});
    } catch (error) {
      res.status(500).json({error:error})
    }
    }
    )

   
    router.post('/admin-login',async(req,res)=>{
      const {email,password}=req.body;
      // console.log(req.body.email)
      const user=await User.findOne({email})
      // console.log(user.role)
      if(!((user.role==='admin') || (user.role==='manager') )){
          return res.json({message:"only admins allowed"})
      }
      const validPassword= await bcrypt.compare(password,user.password)
      if(!validPassword){
          return res.json({message:"password is not valid"})
      }
      const token=jwt.sign({username:user.username},process.env.KEY,{expiresIn:'1h'})
      res.cookie('token',token,{maxAge:360000})
      return res.json({status:true,message:"login successfully"})
  })

  router.post('/contact',createcontact)
  router.get('/getcontact',getcontact)
  router.get('/getonecontact/:id',getonecontact)
  router.put('/updatecontact/:id',updatecontact)
  router.delete('/deletecontact/:id',deletecontact)

  router.post('/service',createservice)
  router.get('/getservice',getservice)
  router.get('/getoneservice/:id',getoneservice)
  router.put('/updateservice/:id',updateservice)
  router.delete('/deleteservice/:id',deleteservice)

export {router as UserRouter}
