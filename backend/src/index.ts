import dotenv from "dotenv";
import('dotenv/config')
import express, { response } from "express"
import mongoose from "mongoose"
import userRoute from "./routes/userRoute.js"
import { seedInitialProducts } from "./services/productService.js";
import productRoute from "./routes/productRoute.js"
import cartRoute from "./routes/cartRoute.js"
import  cors from "cors"
import adminRoute from "./routes/adminRoute.js";
dotenv.config();
const app=express();
const port=3000;

app.use(express.json());
app.use(cors());
mongoose.connect(process.env.DATABASE_URL||"").then(
    ()=>{
        console.log('Connected to mongodb')
    }
).catch((err)=>{
    console.log("Error connecting to mongodb",err)
});
app.use('/admin',adminRoute)
app.use('/cart',cartRoute);
app.use('/user',userRoute);
app.use('/product',productRoute);
app.get('/', (request, response) => {
    response.send('Hello Worrld!');
});
seedInitialProducts();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
