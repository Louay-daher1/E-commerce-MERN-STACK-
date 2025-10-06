import Typography  from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useCart } from "../context/cart/CartContext";
import Box from "@mui/material/Box";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
const CartPage=()=>{

    const {cartItems,totalAmount,updateItemInCart,removeItemFromCart}= useCart()
   const handelQuantity=(productId:string,quantity:number)=>{
    if(quantity<1){
        return;
    }
    updateItemInCart(productId,quantity)
   }
   const handleRemoveItem=(productId:string)=>{
    removeItemFromCart(productId)
   }
    return  (
    <Container fixed sx={{ mt: 2}}>  
     <Typography variant="h4">My Cart</Typography>   
     <Box gap={4} display='flex' flexDirection='column'>
     {cartItems.map((item)=>
 
        <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'sx={{border:1,borderColor:"#f1f1f1",borderRadius:5,padding:2}}>
            <Box display='flex' flexDirection='row' alignItems="center" gap={3}>
           <img src={item.image} width={50}/> 
           <Box >
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
    )}
     <Box>
      <Typography variant="h4"> Total Amount:{totalAmount}$</Typography> 
     </Box>
    </Box>
    </Container>
    )
}
export default CartPage;