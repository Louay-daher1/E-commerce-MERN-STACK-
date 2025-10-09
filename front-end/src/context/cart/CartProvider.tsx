import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import { CartContext } from "./CartContext";
import type { CartItem } from "../../types/CartItem";
import baseUrl from "../../constants/baseUrl";
import { useAuth } from "../auth/AuthContext";

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
    const {token}=useAuth()
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [error, setError] = useState('');
    
    useEffect(()=>{
        if(!token){
            setError("You must be Loggin")
            return 
        }
        const fetchCart=async()=>{

            try{
            const response=await fetch(`${baseUrl}/cart`,{
               headers:{
                'Authorization':`Bearer ${token}`
               }
            })
            const cart=await response.json()
           

            const cartItemMapped = cart.items.map(({ product,quantity,unitPrice }:{product:any,quantity:number,unitPrice:number}) => ({ productId: product._id, title: product.title, image: product.image ,quantity,unitPrice}))
           
            setCartItems([...cartItemMapped])
            setTotalAmount(cart.totalAmount)
            setCartItems(cartItemMapped)
        }catch(error){
            setError("Failed to fetch user CART")
        }
        };
        fetchCart()
    },[token])

    const addItemToCart = async (productId: string) => {
        try {
            const response = await fetch(`${baseUrl}/cart/items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body: JSON.stringify({
                    productId,
                    quantity: 1
                })
            });
            if (!response.ok) {
                setError('Failed to add to Cart')
            }
            const cart = await response.json();
            if (!cart) {
                setError("Failed to parse cart data")
            }
            const cartItemMapped = cart.items.map(({ product,quantity,unitPrice }:{product:any,quantity:number,unitPrice:number}) => ({ productId: product._id, title: product.title, image: product.image ,quantity,unitPrice}))
            setCartItems([...cartItemMapped])
            setTotalAmount(cart.totalAmount)
        } catch (error) {
            console.error(error)
        }
    }
    const updateItemInCart = async (productId: string,quantity:number) => {
        try {
            const response = await fetch(`${baseUrl}/cart/items`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body: JSON.stringify({
                    productId,
                    quantity: quantity
                })
            });
            if (!response.ok) {
                setError('Failed to update quantity to product in the Cart')
            }
            const cart = await response.json();
            if (!cart) {
                setError("Failed to parse cart data")
            }
            const cartItemMapped = cart.items.map(({ product,quantity,unitPrice }:{product:any,quantity:number,unitPrice:number}) => ({ productId: product._id, title: product.title, image: product.image ,quantity,unitPrice}))
            setCartItems([...cartItemMapped])
            setTotalAmount(cart.totalAmount)
        } catch (error) {
            console.error(error)
        }
    }
    const removeItemFromCart = async (productId: string) => {
        try {
            const response = await fetch(`${baseUrl}/cart/items/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body: JSON.stringify({
                    productId,
                })
            });
            if (!response.ok) {
                setError('Failed to delete product from the Cart')
            }
            const cart = await response.json();
            if (!cart) {
                setError("Failed to parse cart data")
            }
            const cartItemMapped = cart.items.map(({ product,quantity,unitPrice }:{product:any,quantity:number,unitPrice:number}) => ({ productId: product._id, title: product.title, image: product.image ,quantity,unitPrice}))
            setCartItems([...cartItemMapped])
            setTotalAmount(cart.totalAmount)
        } catch (error) {
            console.error(error)
        }
    }
    const clearAllItemFromCart=async()=>{
        try {
            const response = await fetch(`${baseUrl}/cart`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`
                }
            });
            if (!response.ok) {
                setError('Failed to update quantity to product in the Cart')
            }
            setCartItems([])
            setTotalAmount(0)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <CartContext.Provider value={{ cartItems, totalAmount, addItemToCart ,updateItemInCart,removeItemFromCart,clearAllItemFromCart}}>
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider;
