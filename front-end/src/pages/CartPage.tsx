import Typography  from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import baseUrl from "../constants/baseUrl";
import { useAuth } from "../context/auth/AuthContext";

const CartPage=()=>{

    const [cart,setCart]=useState();
    const [error,SetError]=useState("")
    const{token} =useAuth();
    useEffect(()=>{
        if(!token){
            SetError("You must be Loggin")
            return 
        }
        const fetchCart=async()=>{

            try{
            const response=await fetch(`${baseUrl}/cart`,{
               headers:{
                'Authorization':`Bearer ${token}`
               }
            })
            const data=await response.json()
            setCart(data)
        }catch(error){
            SetError("Failed to fetch user CART")
        }
        };
        fetchCart()
    },[token])

    return  (
    <Container sx={{ mt: 2 ,ml:0}}>  
     <Typography variant="h4">My Cart</Typography>                           
    </Container>
    )
}
export default CartPage;