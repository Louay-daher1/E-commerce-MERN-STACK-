
import Container from "@mui/material/Container"
import { useAuth } from "../context/auth/AuthContext";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";

const MyOrderPage=()=>{
    const {getMyOrders,myOrders}=useAuth();
    useEffect(()=>{
        getMyOrders();

    },[])


    return (
        <Container fixed sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2,alignItems:'center',justifyContent:"center" }}>
            <Typography variant='h4'>My Orders</Typography>
        {myOrders.map(({_id,address,orderItems,total})=>(
            <Box sx={{border:1,borderColor:"gray",borderRadius:2,padding:1}}>
        <Typography>Address:{address}</Typography>
        <Typography>Items:{orderItems.length}</Typography>
        <Typography>Total:{total}</Typography>

        </Box>
        ))}


    </Container>
    );
};
export default MyOrderPage