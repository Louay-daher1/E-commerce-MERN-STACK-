import { CheckCircleOutline } from "@mui/icons-material"
import { Button, Typography } from "@mui/material";
import Container from "@mui/material/Container"
import { useNavigate } from "react-router-dom";

const OrderSuccessPage=()=>{
    const navigate=useNavigate()
    const handleGoTOHome=()=>{
        navigate('/')
    }
    return (
        <Container fixed sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2,alignItems:'center',justifyContent:"center" }}>
    <CheckCircleOutline sx={{color:'green',fontSize:'80px'}}/>
    <Typography variant="h4">Thanks for your order</Typography>
    <Typography>We started processing it,and we will get back to you soon</Typography>
    <Button variant="contained" onClick={handleGoTOHome}>Go to Home</Button>



    </Container>
    );
};
export default OrderSuccessPage