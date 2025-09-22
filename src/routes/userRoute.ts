import express from "express";
import { loginUser, registerUser } from "../services/userService.js";


const router =express.Router()
router.post('/register',async(req,res)=>{
    const {firstName,lastName,email,password}=req.body;
    const {data,statusCode}=await registerUser({firstName,lastName,email,password})
    res.status(statusCode).send(data);
})
router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    const {data,statusCode}=await loginUser({email,password})
    res.status(statusCode).send(data);
})
export default router;