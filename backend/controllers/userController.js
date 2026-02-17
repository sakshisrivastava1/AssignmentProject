import userModel from "../models/userModel.js"

export const getCurrentUser = async (req, res) => {
  try {
      const userId = req.user.id
      
      const user = await userModel.findById(userId).select('-email -password -createdAt -updatedAt -__v ')     
  
      if(!user){
          return res.status(400).json({success:false,message:'User not found!'})
      }
  
     res.status(200).json({
      success: true,
      user
    });
  
     } catch (error) {
       console.log(error)
       return res.status(500).json({message:error.message})
     }
}
