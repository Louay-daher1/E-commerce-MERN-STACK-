import express, { type Request } from 'express'
import { addItemToCart, checkout, clearItemInCart, deleteItemInCart, getActiveCartForUser, updateItemInCart } from '../services/cartService.js';
import validateJWT from '../middlewares/validateJWT.js';
import type { ExtendRequest } from '../types/extendedRequest.js';

const router=express.Router();

router.get('/',validateJWT,async(req:ExtendRequest,res)=>{
    // get active cart for user
    const userId=req.user._id;
    const cart=await getActiveCartForUser({userId:userId})
    res.status(200).send(cart);
})
router.post('/items',validateJWT,async (req:ExtendRequest,res)=>{
const userId=req?.user?._id;
const {productId,quantity}=req.body
const response= await addItemToCart({userId,productId,quantity})
res.status(response.statusCode).send(response.data)
})

router.put('/items',validateJWT,async(req:ExtendRequest,res)=>{
    const userId=req?.user?._id;
const {productId,quantity}=req.body
const response= await updateItemInCart({userId,productId,quantity})
res.status(response.statusCode).send(response.data)
})
router.delete('/items/:productId',validateJWT,async(req:ExtendRequest,res)=>{
    const userId=req?.user?._id;
    const{productId}=req.params;
    const response=await deleteItemInCart({userId,productId});
    res.status(response.statusCode).send(response.data)

})
router.delete("/",validateJWT,async(req:ExtendRequest,res)=>{
    const userId=req?.user?._id;
    const response=await clearItemInCart({userId});
    res.status(response.statusCode).send(response.data)
})
router.post("/checkout",validateJWT,async (req:ExtendRequest,res)=>{
    const userId=req?.user?._id;
    const {address}=req.body
    const response=await checkout({userId,address});
    res.status(response.statusCode).send(response.data);
})
export default router;