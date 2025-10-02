import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid';
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import baseUrl from "../constants/baseUrl";
import { Box } from "@mui/material";

const HomePage = () => {
    const [products,SetProducts]=useState<Product[]>([])
    const [error,SetError]=useState(false)
    useEffect(()=>{
        const fetchProducts=async()=>{
            try{
            const response=await fetch(`${baseUrl}/product`)
            const data=await response.json()
            SetProducts(data)
        }catch(error){
            SetError(true)
        }
        };
        fetchProducts()
    },[])
    if(error){
        return <Box>Something want wrong</Box>
    }

  return (
    <Container sx={{ mt: 2 }}>
   <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
  {products.map((product) => (
    <Grid  size={{ xs: 2, sm: 4, md: 4 }}>
      <ProductCard _id={product._id} title={product.title} image={product.image} price={product.price}></ProductCard>
    </Grid>
  ))}
</Grid>
  </Container>
  );
};

export default HomePage;