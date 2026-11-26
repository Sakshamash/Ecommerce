const express=require("express");
const { registerUser, loginUser, getme } = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const { validateRegister, validateLogin } = require("../middleware/validate.middleware");

const router=express.Router();

router.post("/register",validateRegister,registerUser)
router.post("/login",validateLogin,loginUser)
router.get("/getme",authMiddleware, getme);

module.exports=router