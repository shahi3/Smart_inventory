const bcrypt=require('bcryptjs');
const User =require('../model/user');
const genratetoken =require('../utils/generateToken');
const authMiddleware=require('../middleware/authmiddleware')
// REGISTER
exports.registerUser = async(req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        const userExists=await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                message: 'user already exists'
            });
        }
        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt);
        const user=await User.create({
            name,
            email,
            password: hashedpassword,
            role
        });
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email: user.email,
            role:user.role,
            token: genratetoken(user._id)
        });
    }
    catch (err){
        res.status(500).json({
            message: err.message
        });
    }
};
//LOGIN
exports.loginUser = async(req,res)=>{
    try{
        const{email ,password}= req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message:'you have entered the wrong mail or password'
            });
        }
        const isMatch =await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                message:'you have enterd the wrong password or mail'
            });
        }
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: genratetoken(user._id)

        });
    }
    catch (err){
        res.status(500).json({
            message: err.message
        });
    }
}