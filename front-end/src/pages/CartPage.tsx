import Typography  from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useCart } from "../context/cart/CartContext";
import Box from "@mui/material/Box";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
const CartPage=()=>{

    const {cartItems,totalAmount,updateItemInCart,removeItemFromCart,clearAllItemFromCart}= useCart()
   const handelQuantity=(productId:string,quantity:number)=>{
    if(quantity<1){
        return;
    }
    updateItemInCart(productId,quantity)
   }
   const handleRemoveItem=(productId:string)=>{
    removeItemFromCart(productId)
   }
   const clearAllItemFromCarts=()=>{
    clearAllItemFromCart();
   }
   const navigate=useNavigate()

   const handelCheckout=()=>{
    navigate('/checkout')
   }
const HandelcART = () => (
 <Box gap={4} display='flex' flexDirection='column'>
     {cartItems.map((item) => (
        <Box key={item.productId} display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' sx={{border:1,borderColor:"#f1f1f1",borderRadius:5,padding:2}}>
            <Box display='flex' flexDirection='row' alignItems="center" gap={3}>
           <img src={item.image} width={50}/> 
           <Box>
          <Typography variant="h6"> {item.title}</Typography>
          <Typography> {item.quantity}x{item.unitPrice} $</Typography>
          <Button sx={{background:'red' ,color:'white'}} onClick={()=>handleRemoveItem(item.productId)}>Remove Item</Button>
          </Box>
          </Box>
          <ButtonGroup
                disableElevation
                variant="contained"
                aria-label="Disabled button group"
                >
                <Button onClick={()=>handelQuantity(item.productId,item.quantity-1)}>-</Button>
                <Button onClick={()=>handelQuantity(item.productId,item.quantity+1)}>+</Button>
            </ButtonGroup>
        </Box>
     ))}
      <Box display="flex" flexDirection="row" justifyContent='space-between' alignItems='center'>
        <Typography variant="h4"> Total Amount:{totalAmount}$</Typography>
        <Button variant="contained"onClick={handelCheckout}>GO TO CHECKOUT</Button>
      </Box>
 </Box>
)
    return  (
    <Container fixed sx={{ mt: 2}}>  
    <Box display="flex" justifyContent='space-between'>
     <Typography variant="h4">My Cart</Typography>   
    <Button onClick={clearAllItemFromCarts}>Clear Cart </Button> 
    </Box>
     
     {cartItems.length ? (
          HandelcART()
             ) : (
            <Typography variant="h6"sx={{mt:4}}>Your Cart is empty ,Please Start Shopping </Typography>
            )}
    
  
    </Container>
    )
}
export default CartPage;