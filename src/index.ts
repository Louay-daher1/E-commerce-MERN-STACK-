import express, { response } from "express"
import mongoose from "mongoose"
import userRoute from "./routes/userRoute.js"

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
app.use('/user',userRoute)
app.get('/', (request, response) => {
    response.send('Hello Worrld!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
