import productModel from "../models/productModel.js";

export const getAllProducts = async () => {
  return await productModel.find();
}
interface createProductInput {
  title: string,
  image: string,
  price: number,
  stock: number
}
export const createProduct = async ({ title, image, price, stock }: createProductInput) => {
  try {
    const newProduct = new productModel({ title, image, price, stock })
    await newProduct.save()
    return { data: newProduct, StatusCode: 200 }
  } catch (err) {
    throw err;
  }
}
export const seedInitialProducts = async () => {
  try {
    const products = [
      {
        title: "Dell Laptop",
        image: "https://tse2.mm.bing.net/th/id/OIP.xwYV4w8bzm1kj-sFwDw4KwHaEc?rs=1&pid=ImgDetMain&o=7&rm=3",
        price: 120,
        stock: 80,
      },
      {
        title: "Assus Laptop",
        image: "https://tse1.mm.bing.net/th/id/OIP.q6YmIA-h_zO2RPSgmopKHgHaGF?rs=1&pid=ImgDetMain&o=7&rm=3",
        price: 150,
        stock: 95,
      },
      {
        title: "HP Laptop",
        image: "https://th.bing.com/th/id/OIP.g-_DZCSZ_jSSYSmgz3pIjAHaFj?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
        price: 190,
        stock: 80,
      },

    ];
    const existingProducts = await getAllProducts();
    if (existingProducts.length === 0) {
      await productModel.insertMany(products);
    }
  } catch (err) {
    console.error("Cannot see database", err)
  }
}

