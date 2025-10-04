import { useState, type FC, type PropsWithChildren } from "react";
import { CartContext } from "./CartContext";
import type { CartItem } from "../../types/CartItem";
import baseUrl from "../../constants/baseUrl";
import { useAuth } from "../auth/AuthContext";

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
    const {token}=useAuth()
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [error, setError] = useState('');

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
            const cartItemMapped = cart.items.map(({ product }:{product:any}) => ({ productId: product._id, title: product.title, image: product.image, unitPrice: product.unitPrice }))
            setCartItems([...cartItemMapped])
            setTotalAmount(cart.totalAmount)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <CartContext.Provider value={{ cartItems, totalAmount, addItemToCart }}>
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider;
