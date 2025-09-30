import productModel from "../models/productModel.js";
  
export const getAllProducts=async ()=>{
    return await productModel.find();
}
export const seedInitialProducts=async ()=>{
  try{
    const products = [
        {
          title: "Wireless Headphones",
          image: "https://picsum.photos/seed/headphones/400/300",
          price: 120,
          stock: 80,
        },
        {
          title: "Smart Watch",
          image: "https://picsum.photos/seed/watch/400/300",
          price: 150,
          stock: 95,
        },
        
      ];
       const existingProducts=await getAllProducts();
       if (existingProducts.length===0){
        await productModel.insertMany(products);
       }
  }catch(err){
    console.error("Cannot see database",err)
  }
}

