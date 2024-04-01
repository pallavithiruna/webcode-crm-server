import serviceModel from "../models/Service.js"

 const createservice=async(req,res)=>{
  try {
   const {company,servicerequest,details,requestdate}=req.body
   const Newuser=  new serviceModel({
    company,servicerequest,details,requestdate
   })
   await Newuser.save()
   res.status(200).json({success:true,message:"User Created Successfully.", Newuser})
  } catch (error) {
    console.log(error)
  return  res.status(500).json({success:false,message:"Interl server eror"})
  }
}

///////Read api
const getservice=async(req,res)=>{
    try {
      const users= await serviceModel.find()
     if (!users) {
       return  res.status(404).json({success:false})
     }
     res.status(200).json({users})
 } catch (error) {
     console.log(error)
     res.status(500).json({success:false})
    }
 }

 const getoneservice =async(req,res)=>{
  try {
    const id=req.params.id;
    const userExist =await serviceModel.findById(id);
    if(!userExist){
      return res.status(404).json({msg:"User not found"})
    }
    res.status(200).json(userExist)
  } catch (error) {
    res.status(500).json({error:error})
  }
  }
  
 
 ////////update user api
 const updateservice=async(req,res)=>{
  try {
      const userId=req.params.id
  
  const updateuser=await serviceModel.findByIdAndUpdate(userId,req.body,{new:true})
    if (!updateuser) {
       return res.status(404).json({ success: false, message: 'User not found' });
     }
      res.status(200).json({ success: true, message: 'User updated successfully', updateuser });
  } catch (error) {
      console.log(error);
     res.status(500).json({ success: false, message: 'Internal server error' });
  }
 }
 
 // delet user ap
 const deleteservice=async(req,res)=>{
 try {
        const userId=req.params.id
    const deletuser= await serviceModel.findByIdAndDelete(userId)
    if (!deletuser) {
    return res.status(404).json({ success: false, message: 'user Not found' });
    }
    res.status(200).json({ success: true, message: 'user Deleted successfully' });
 } catch (error) {
     console.log(error)
     res.status(500).json({ success: false, message: 'Internal server error' });
 }
 }
 


export {createservice,getservice,getoneservice,updateservice,deleteservice}