import express from 'express'
import validateJWT from '../middlewares/validateJWT.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { createProduct, getAllProducts } from '../services/productService.js';


const router = express.Router();
 
router.get('/dashboard',validateJWT,isAdmin,(req,res)=>{
    try{
    res.status(200).send("Welcome Admin")
    }catch(err){
        res.status(400).send(err)
    }
})
router.get('/products',validateJWT,isAdmin,async (req,res)=>{
    try{
        const products=await getAllProducts();
        res.send(products)
    }catch(err){
        res.status(400).send(err)
    }
})
router.post('/products',validateJWT,isAdmin,async (req,res)=>{
    try{
       const {title,image,price,stock}= req.body
        const products=await createProduct({title,image,price,stock});
        res.send(products)
    }catch(err){
        res.status(400).send(err)
    }
})
export default router;