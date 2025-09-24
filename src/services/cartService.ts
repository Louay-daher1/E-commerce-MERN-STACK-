import { cartModel } from "../models/cartModel.js";
import productModel from "../models/productModel.js";

interface createCartForUser{
    userId:string;
    
}

const createCartForUser=async ({userId}:createCartForUser)=>{
  const cart=await cartModel.create({userId,totalAmount:0})
  await cart.save();
  return cart;

}
export interface getActiveCartForUser{
  userId:string;

}
export const getActiveCartForUser=async({userId}:getActiveCartForUser)=>{
 let cart =await cartModel.findOne({userId,status:"active"})
 if(!cart){
    cart=await createCartForUser({userId})
 }

 return cart

}
interface addItemToCart{
  productId:any;
  quantity:string;
  userId:string
}
export const addItemToCart=async({productId,quantity,userId}:addItemToCart)=>{
const cart =await getActiveCartForUser({userId});
const existsInCart=await cart.items.find((p)=>p.product.toString()===productId);
if(existsInCart){
  return{data:"Item already existsin carrt!",statusCode:400}
}
const product=await productModel.findById(productId);
if(!product){
  return{data:"Product Not Found",statusCode:400};
}
if(product.stock<parseInt(quantity)){
  return {data:"Low stock for items",statusCode:400};
}
cart.items.push({product:productId,unitPrice:product.price,quantity:parseInt(quantity)})
cart.totalAmount+=product.price*parseInt(quantity)
const updatedCart=await cart.save()
return {data:updatedCart,statusCode:200}
}