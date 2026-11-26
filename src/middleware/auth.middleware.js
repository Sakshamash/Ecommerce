const user=require("../models/User.model");
const jwt=require("jsonwebtoken")
const authMiddleware = async (req, res, next) => {

    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    console.log(token)
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }  
    const decoded=jwt.verify(token,process.env.JWT_SECRET)


    const existinguser=await user.findById(decoded.id);
    
    if (!existinguser) {
        return res.status(401).json({ message: "Access denied. User not found." });
    }
    req.user = existinguser;
    next();
}
module.exports = authMiddleware;