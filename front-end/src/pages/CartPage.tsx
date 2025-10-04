import Typography  from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import baseUrl from "../constants/baseUrl";
import { useAuth } from "../context/auth/AuthContext";
import { useCart } from "../context/cart/CartContext";
import Box from "@mui/material/Box";

const CartPage=()=>{

    const [cart,setCart]=useState();
    const [error,SetError]=useState("")
    const{token} =useAuth();
    const {cartItems,totalAmount}= useCart()
   
    return  (
    <Container sx={{ mt: 2 ,ml:0}}>  
     <Typography variant="h4">My Cart</Typography>   
     {cartItems.map((item)=>
          <Box>{item.title}</Box>                        

    )}
    </Container>
    )
}
export default CartPage;