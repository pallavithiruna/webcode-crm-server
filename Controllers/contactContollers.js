import contactModel from "../models/Contact.js"

 const createcontact=async(req,res)=>{
  try {
   const {name,companyname,address,phone}=req.body
   const Newuser=  new contactModel({
    name,companyname,address,phone
   })
   await Newuser.save()

   res.status(200).json({success:true,message:"User Created Successfully.", Newuser})
  } catch (error) {
    console.log(error)
  return  res.status(500).json({success:false,message:"Interl server eror"})
  }
}


///////Read api
const getcontact=async(req,res)=>{

    try {
      const users= await contactModel.find()
     if (!users) {
       return  res.status(404).json({success:false})
     }
 
     res.status(200).json({users})
 } catch (error) {
     console.log(error)
     
     res.status(500).json({success:false})
    }
 
 }

 const getonecontact =async(req,res)=>{
  try {
    const id=req.params.id;
    const userExist =await contactModel.findById(id);
    if(!userExist){
      return res.status(404).json({msg:"User not found"})
    }
    res.status(200).json(userExist)
  } catch (error) {
    res.status(500).json({error:error})
  }
  }
  
 
 ////////update user api
 const updatecontact=async(req,res)=>{
  try {
      const userId=req.params.id
  
  const updateuser=await contactModel.findByIdAndUpdate(userId,req.body,{new:true})
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
 const deletecontact=async(req,res)=>{
 try {
        const userId=req.params.id
    const deletuser= await contactModel.findByIdAndDelete(userId)
    if (!deletuser) {
    return res.status(404).json({ success: false, message: 'user Not found' });
    }
    res.status(200).json({ success: true, message: 'user Deleted successfully' });
 } catch (error) {
     console.log(error)
     res.status(500).json({ success: false, message: 'Internal server error' });
 }
 }
 


export {createcontact,getcontact,getonecontact,updatecontact,deletecontact}