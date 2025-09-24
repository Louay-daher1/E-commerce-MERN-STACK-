import type { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import type { JsonWebTokenError } from "jsonwebtoken";
import { userModel } from "../models/userModel.js";


interface ExtendReques extends Request{
    user?:any;
}
const validateJWT=(req:ExtendReques,res:Response,next:NextFunction)=>{
 const authorizationHeader=req.get('authorization');
 if(!authorizationHeader){
  res.status(403).send('Authorization headder was not provided');
  return;
 }
 const token=authorizationHeader.split(' ')[1];
 if(!token){
    res.status(403).send('Bearer Token not found');
    return;
 }
jwt.verify(token,"XAV5lrINXwfAWNdVwKOwGJ4RazdhYlnUOL2i05jcnTA=",async(err,payload)=>{
    if (err){
        res.status(403).send("Invalid Token");
        return;
    }
    if(!payload){
        res.send(403).send('Invalid Token payload')
    }
  
    const user=await userModel.findOne({email:(payload as any).email})
    req.user=user
    next();

})
}
export default validateJWT