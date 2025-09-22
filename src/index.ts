import express, { response } from "express"
import mongoose from "mongoose"
import userRoute from "./routes/userRoute.js"
import { seedInitialProducts } from "./services/productService.js";
import productRoute from "./routes/productRoute.js"
const app=express();
const port=3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Ecommerce2').then(
    ()=>{
        console.log('Connected to mongodb')
    }
).catch((err)=>{
    console.log("Error connecting to mongodb",err)
});
app.use('/user',userRoute);
app.use('/product',productRoute);
app.get('/', (request, response) => {
    response.send('Hello Worrld!');
});
seedInitialProducts();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
