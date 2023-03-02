const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const express = require("express") ///no need for express so commenting it out....
const dotenv = require("dotenv");
dotenv.config();

const registerUser = async(req, res) => {
    try{
        
        const data=await User.findOne({email:req.body.email});
        if(data)
        {
         return  res.status(200).json({
             message:"user already exist"
         })
        }
        const number=await User.findOne({phone:req.body.phone});
        if(number)
        {
         return  res.status(200).json({
             message:"mobile number already registered"
         })
        }
 
        const {userName,email,password,phone}=req.body;  //adding select as we gave it's default value as empty string
        bcrypt.hash(password,10,async function(err, hash) {
         if(err)
         {
            return res.status(500).json({
                 status:"failed",
                 message:err.message
             })
         }
         const dataafterhash=await User.create({
             userName,
             email,
             password:hash,
             phone,
         })
         res.status(201).json({
             message:"registered successfully",
             dataafterhash
             
         })
     });
     }
     catch(err){
         res.status(400).json({
             status:"failed",
             message:err.message
         })
     }
}

const loginUser = async(req, res) => {
    
    try{
       
        const {phone,password}=req.body;
    const user= await User.findOne({phone});
    //if user is not present in database...
    if(!user)
    {
        return res.status(200).json({
            status:"failed",
            message:"user should register"
        }) 
    }
   //if user is present we are checking weather the credentials are matching and generating web token accordingly...
        bcrypt.compare(password, user.password, function(err, result) {
            if(err){
                return res.status(500).json({
                    status:"failed",
                    message:err.message
                })
            }
            if(result){
                let tokenData = {
                                  data: user,
                                  date: new Date()  ///new date is for handling logout where we forcefully expire the token..
                                }
                const token=jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),// 1 hour
                    data: tokenData,
                  },process.env.JWT_SECRET_KEY);
                return res.cookie("jwttoken", token, {maxAge: 60*60*1000,httpOnly: true})
                    .status(200).json({
                    status:"success",
                    message:"user logged in",
                    token
                })
            }
            else{
                res.status(200).json({
                    status:"failed",
                    message:"invalid credentials"
                })
            }
        });
    
    }
    catch(e){
         res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
}

const logoutUser = async(req, res) => {
    res.cookie("jwttoken","", {     ///expiring the cookie forcefully and emptying its field??
        maxAge:0
    })
    res.clearCookie("jwttoken")
    res.status(200).json({
        message:"Logged Out Successfully"
    })
}

const getUserInfo = async (req, res) => {                        //here we are getting req.result from authentication step
    if(req.result.data.vendorName===undefined){
       const data=await User.findById(req.result.data.data._id)
            res.status(200).json({
                msg:"Success",
                result:data
            })
        
    } else {
        res.status(400).json({
            msg:"Failure"
        })
    }
}

const updateSelection = (req, res) => {

        User.findByIdAndUpdate(req.params.userId, req.body).then(data=>{
            res.status(200).json({
                msg:"Success",
                result:data
            })
        }).catch(err=>{
            res.status(400).json({
                msg:"Failure",
                result:err
            })
        })
    
}


module.exports = { registerUser, loginUser, logoutUser, getUserInfo, updateSelection };