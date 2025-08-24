const User = require("../model/userSchema");
const Doctor  = require("../model/doctorschema")
const bcrypt = require("bcrypt");

const validate = require("../utils/validate");
const jwt = require("jsonwebtoken");

const register = async (req,res)=>{
    try{
        validate(req.body);
        const {fullName,email,password,role,phone} = req.body;

        if(!["patient","doctor"].includes(role)){
            throw new Error("Invalid Role Requested");
        }
        req.body.password=await bcrypt.hash(password,10);

        const user= await User.create(req.body)

        const token =jwt.sign({_id:user._id,email:email,role:role},"d9cc6805b6757f777411cede9009e0a8ffb6f3589855903b83fa714361690959",{expiresIn:3600})
        res.cookie("token",token,{maxAge:60*60*1000})

        if (role === "doctor") {
            await Doctor.create({
                user: user._id, 
            });
        }
        const reply = {
            fullName:user.fullName,
            email:user.email,
            role:user.role,
            phone:user.phone,
            id:user._id,
        }

        res.status(200).json({
            message:"Registered",
            user:reply
        })

    }catch(err){
        res.status(400).send("Bad Request"+err);
    }
}

const login = async (req,res)=>{
    try{

        const {email,password} = req.body;
        if(!email)
        {
            throw new Error("invalid Credentials")
        }
        if(!password)
        {
            throw new Error("Invalid Credentials")
        }

        const user= await User.findOne({email});
        const match = await  bcrypt.compare(password,user.password);

        if(!match){
            throw new Error("Invalid Credentials");
        }

        const token = jwt.sign({_id:user._id,email:email,role:user.role},"d9cc6805b6757f777411cede9009e0a8ffb6f3589855903b83fa714361690959",{expiresIn:3600})
        res.cookie("token",token,{maxAge:60*60*1000});
        const reply = {
            fullName:user.fullName,
            userName:user.userName,
            email:user.email,
            role:user.role,
            phone:user.phone,
            id:user._id,
        }

        res.status(200).json({
            message:"Login Successfull",
            user:reply
        })

        
    }catch(err){
        res.status(400).send("Login Failed"+err)
    }

}

const logout = async (req, res) => {
  try {  
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).send("Logged out Successfully");
  } catch (err) {
    res.status(500).send("Logout Failed: " + err.message);
  }
};

module.exports = {login,logout,register}

