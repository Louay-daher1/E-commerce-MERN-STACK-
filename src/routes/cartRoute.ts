import express, { type Request } from 'express'
import { getActiveCartForUser } from '../services/cartService.js';
import validateJWT from '../middlewares/validateJWT.js';

const router=express.Router();
interface ExtendReques extends Request{
    user?:any;
}
router.get('/',validateJWT,async(req:ExtendReques,res)=>{
    // get active cart for user
    const userId=req.user._id;
    const cart=await getActiveCartForUser({userId:userId})
    res.status(200).send(cart);
})

export default router;