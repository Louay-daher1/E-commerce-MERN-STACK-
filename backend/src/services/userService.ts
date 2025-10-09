import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { orderModel } from "../models/orderModel.js";

interface registerUser{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}
const registerUser=async({firstName,lastName,email,password}:registerUser)=>{
 const findUser=await userModel.findOne({email})
 if (findUser){

    return {data:"User already Exist",statusCode:400}
 }
 const hashedPassword=await bcrypt.hash(password,10)
 const newUser=new userModel({firstName,lastName,email,password:hashedPassword})
 await newUser.save()
 return {data:generateJwt({firstName,lastName,email}),statusCode:200}
}
interface loginUser{
    email:string;
    password:string
}
const loginUser=async({email,password}:loginUser)=>{
    const findUser=await userModel.findOne({email})
    if(!findUser){
        return {data:"Incorrect email or password",statusCode:400}
    }
    const passwordMatch=await bcrypt.compare(password,findUser.password)
    if (passwordMatch){
        return{data:generateJwt({firstName:findUser.firstName,email:findUser.email}),statusCode:200}
    }
    return {data:"Incorrect email or password",statusCode:400}
}
interface GetMyOrders{
    userId:string
}
 
const getMyOrders=async({userId}:GetMyOrders)=>{
    try{
        console.log(userId)
     return {data:await orderModel.find({userId}),statusCode:200};
    }catch(err){
     throw err;
    }
}
const generateJwt=(data:any)=>{
return jwt.sign(data,process.env.JWT_SECRET||'') // data,secret key when i get the jwt i encode it with the secret key to assur this is my secret key and i can add {expiresIn:'24h'}to expire this token
}
export { registerUser, loginUser,getMyOrders };