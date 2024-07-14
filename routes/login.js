import express from 'express'
import User from './../model/User.js'
import { responseMsg } from './../helper/response.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()


router.post('/login',async(req,res)=>{
    const {email,password} = req.body
    const isUser  = await User.findOne({email})
    if(!isUser){
       return res.status(401).json({...responseMsg,statusCode:401,message:"Email does not Exist."})
    }
    try{
        const matchPassword = await bcrypt.compare(password,isUser.password)
        if(matchPassword){
            const {password,...info} = isUser._doc
            const accessToken = jwt.sign(
                {...info},
                process.env.JWT_SECRET,
                {expiresIn:'1d'}
            )
            res.cookie('accessToken', accessToken, { httpOnly: true });
          return  res.status(201).json({...responseMsg,statusCode:201,message:'User Logged In',data:{...info,accessToken}})
        }else{
            return res.status(401).json({...responseMsg,statusCode:401,message:'Password Does not match'})
        }
    }catch(err){
        return res.status(500).json({...responseMsg,statusCode:500,message:err.message})
    }
})

router.post('/signup',async(req,res)=>{
    const {email,name,password} = req.body
    const isEmail = await User.findOne({email})
    if(isEmail){
        return res.status(409).json({...responseMsg,statusCode:409,message:"Email Already Exist"})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try{

        const newUSer = await new User({
            email,
            name,
            password:hashedPassword
        })
        const response = await newUSer.save()
        response.save()
        const {password,...result} = response.toObject()
        res.status(201).json({...responseMsg,statusCode:201,message:'New User Created',data:result})
    }catch(err){
        return res.status(500).json({...responseMsg,statusCode:500,message:err.message})
    }
})

router.post('/logout',async(req,res)=>{
    res.clearCookie('accessToken');
    res.send('Logged out');
})

export default router
