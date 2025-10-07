import Typography  from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useCart } from "../context/cart/CartContext";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import { useRef } from "react";
import { TextField } from "@mui/material";
const CheckoutPage=()=>{

    const {cartItems,totalAmount}= useCart()
    const addressRef=useRef<HTMLInputElement>(null)
const HandelcART = () => (
 <Box gap={2} display='flex' flexDirection='column' sx={{border:1,borderColor:"#f1f1f1",borderRadius:5,padding:2}}>
     {cartItems.map((item) => (
        <Box key={item.productId} display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' width="100%">
            <Box display='flex' flexDirection='row' alignItems="center" gap={3} width="100%">
           <img src={item.image} width={50}/> 
           <Box display="flex" flexDirection="row" justifyContent='space-between'alignItems='center' width="100%">
          <Typography variant="h6"> {item.title}</Typography>
          <Typography> {item.quantity}x{item.unitPrice} $</Typography>
          </Box>
          </Box>
        </Box>
     ))}
      <Box >
        <Typography variant="body2" sx={{textAlign:"right"}}> Total Amount:{totalAmount}$</Typography>
      </Box>
 </Box>
)
    return  (
    <Container fixed sx={{ mt: 2,display:"flex",flexDirection:"column",gap:1}}>  
    <Box display="flex" justifyContent='space-between'>
     <Typography variant="h4">Checkout</Typography>   
    </Box>
    <TextField inputRef={addressRef} label="Delevery Address" fullWidth/>
         { HandelcART()}

    <Button variant="contained" fullWidth sx={{mt:1}}>Pay Now</Button>

    </Container>
    )
}
export default CheckoutPage;