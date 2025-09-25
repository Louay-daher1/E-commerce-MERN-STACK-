import { cartModel, type ICartItem } from "../models/cartModel.js";
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
  return{data:"Item already exists in carrt!",statusCode:400}
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
interface updateItemInCart{
  productId:any;
  quantity:string;
  userId:string
}
export const updateItemInCart=async({productId,quantity,userId}:updateItemInCart)=>{
  const cart =await getActiveCartForUser({userId});
  const existsInCart=await cart.items.find((p)=>p.product.toString()===productId);
  if(!existsInCart){
    return{data:"Item does not exists in carrt!",statusCode:400}
  }
  const product=await productModel.findById(productId);
if(!product){
  return{data:"Product Not Found",statusCode:400};
}
if(product.stock<parseInt(quantity)){
  return {data:"Low stock for items",statusCode:400};
}
  existsInCart.quantity=parseInt(quantity);

  const otherCartItems=cart.items.filter((p)=>p.product.toString()!==productId);
  let total=otherCartItems.reduce((sum,product)=>{//
    sum+=product.quantity*product.unitPrice;
    return sum;
  },0)
  total+=existsInCart.quantity*existsInCart.unitPrice;
  cart.totalAmount=total;
  const updatedCart=await cart.save()
return {data:updatedCart,statusCode:200};
}
interface deleteItemInCart{
  productId:any;
  userId:string
}
export const deleteItemInCart=async({productId,userId}:deleteItemInCart)=>{
  const cart =await getActiveCartForUser({userId});
  const existsInCart=await cart.items.find((p)=>p.product.toString()===productId);
  if(!existsInCart){
    return{data:"Item does not exists in carrt!",statusCode:400}
  }
 
  const otherCartItems=cart.items.filter((p)=>p.product.toString()!==productId);
  let total=otherCartItems.reduce((sum,product)=>{//
    sum+=product.quantity*product.unitPrice;
    return sum;
  },0)
  cart.items=otherCartItems
  cart.totalAmount=total;
  const updatedCart=await cart.save()
  return {data:updatedCart,statusCode:200};
}
interface clearItemInCart{
  userId:string
}
export const clearItemInCart=async({userId}:clearItemInCart)=>{
  const cart =await getActiveCartForUser({userId});
  cart.items=[];
  cart.totalAmount=0;
  const updatedCart=await cart.save();
  return{data:updatedCart,statusCode:200}
}
