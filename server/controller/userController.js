const user =require('../model/user');
exports.getusers =async (req,res)=>{
    try{
        const User=await user.find().select('-password');
        res.status(200).json(User);

    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}
exports.getuser =async (req,res)=>{
    try{
        const User=await user.findById(req.params.id).select('-password');
        if(!User){
            res.status(404).json({
                message:'user not found'
            });
        }
        else{
            res.status(200).json(User);
        }

    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}
exports.updateuser =async (req,res)=>{
    try{
        const User=await user.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        }).select('-password');
        if(!User){
            res.status(404).json({
                message:'user not found'
            });
        }
        else{
            res.status(200).json(User);
        }

    }
    catch(err){
        res.status(400).json({
            message:err.message
        });
    }
}
exports.deleteuser =async (req,res)=>{
    try{
        const User =await user.findByIdAndDelete(req.params.id);
        if(!User){
            res.status(404).json({
                message:'user not found'
            });
        }
        else{
            res.status(200).json({
                message:'user deleted successfully'
            });
        }

    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}