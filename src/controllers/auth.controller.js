const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const bcrypt=require("bcrypt")


const registerUser=async (req,res)=>{
 
    try{
    const {name,email,password,phone}=req.body

        if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const userExists=await User.findOne({email});
    if(userExists){
        return res.status(400).json({
            message:"User is already registered"
        })
    }


    const newuser=await User.create({name,email,password,phone});

    return res.status(201).json({
        message:"User registered successfully",
        user:newuser.name,
        email:newuser.email,
        phone:newuser.phone
    })
}
    catch(error){
        res.status(500).json({message:error.message})
    }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!existingUser) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token=jwt.sign({id:existingUser._id},process.env.JWT_SECRET,{expiresIn:"1d"})

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });



    // Missing in your snippet: send back user data + JWT token
    res.status(200).json({
      token: token,
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
      phone: existingUser.phone,
      addresses: existingUser.addresses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getme=async(req,res)=>{
  const user=req.user

  res.status(200).json({
    _id: user._id,
    name: user.name,    
    email: user.email,
    role: user.role,
    phone: user.phone,
    addresses: user.addresses,
  })
}

module.exports={registerUser,loginUser,getme }