// import { createContext, useContext, useState, useEffect, useRef } from "react";
// import axios from "axios";

// const CartContext = createContext();
// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//     const [cart, setCart] = useState(() => {
//         const savedCart = localStorage.getItem("cart");
//         return savedCart ? JSON.parse(savedCart) : [];
//     });

//     const userId = localStorage.getItem("user_Id"); // Standardized key
//     const API = "http://localhost:4500"; // Backend base URL
//     const hasSyncedCart = useRef(false); // Track if cart has been synced
//     const MAX_QUANTITY = 10; // Max quantity per item

//     useEffect(() => {
//         const loadCart = async () => {
//             if (userId && !hasSyncedCart.current) {
//                 hasSyncedCart.current = true;
//                 const localCart = JSON.parse(localStorage.getItem("cart")) || [];
                

//                 if (localCart.length > 0) {
//                     try {
//                         await axios.post(`${API}/sync-cart-item`, {
//                             user_id: userId,
//                             cartItems: localCart.map(item => ({
//                                 id: item.id || item.product_id,
//                                 quantity: Math.min(item.quantity, MAX_QUANTITY),
//                             })),
//                         });
//                         localStorage.removeItem("cart"); // Clear only after successful sync
//                         setCart([]); // Clear cart in state after sync
//                     } catch (err) {
//                         console.error("Error syncing cart:", err);
//                         return; // Don't continue if sync fails
//                     }
//                 }
//                    console.log(userId)
//                 try {
//                     const { data } = await axios.get(`${API}/get-cart-item/${userId}`);
//                     setCart(data.map(item => ({
//                         ...item,
//                         id: item.id || item.product_id, // Normalize schema
//                     })));
//                 } catch (err) {
//                     console.error("Error fetching cart:", err);
//                 }
//             } else {
//                 const savedCart = localStorage.getItem("cart");
//                 setCart(savedCart ? JSON.parse(savedCart) : []);
//             }
//         };

//         loadCart();
//     }, [userId]);

//     useEffect(() => {
//         if (!userId) {
//             localStorage.setItem("cart", JSON.stringify(cart));
//         }
//     }, [cart, userId]);

//     const addToCart = async (product) => {
//         if (!userId) {
//             setCart(prevCart => {
//                 const existingItem = prevCart.find(item => item.id === product.id);
//                 if (existingItem) {
//                     const newQuantity = Math.min(existingItem.quantity + 1, MAX_QUANTITY);
//                     return prevCart.map(item =>
//                         item.id === product.id ? { ...item, quantity: newQuantity } : item
//                     );
//                 }
//                 return [...prevCart, { ...product, quantity: 1 }];
//             });
//         } else {
//             try {
//                 await axios.post(`${API}/add-cart-item`, {
//                     user_id: userId,
//                     product_id: product.id,
//                     quantity: 1,
//                 });
                
//                 const { data } = await axios.get(`${API}/get-cart-item/${userId}`);
//                 setCart(data.map(item => ({
//                     ...item,
//                     id: item.id || item.product_id,
//                 })));
//             } catch (err) {
//                 console.error("Error adding to cart:", err);
//             }
//         }
//     };

//     const updateCartQuantity = async (id, newQuantity) => {
//         newQuantity = Math.min(Math.max(1, newQuantity), MAX_QUANTITY);
//         if (!userId) {
//             setCart(prevCart =>
//                 prevCart.map(item =>
//                     item.id === id ? { ...item, quantity: newQuantity } : item
//                 )
//             );
//         } else {
//             try {
//                 await axios.put(`${API}/update-cart-item`, {
//                     user_id: userId,
//                     product_id: id,
//                     quantity: newQuantity,
//                 });
//                 const { data } = await axios.get(`${API}/get-cart-item/${userId}`);
//                 setCart(data.map(item => ({
//                     ...item,
//                     id: item.id || item.product_id,
//                 })));
//             } catch (err) {
//                 console.error("Error updating quantity:", err);
//             }
//         }
//     };

//     const increaseQty = (id) => {
//         const item = cart.find(item => item.id === id);
//         if (item && item.quantity < MAX_QUANTITY) {
//             updateCartQuantity(id, item.quantity + 1);
//         }
//     };

//     const decreaseQty = (id) => {
//         const item = cart.find(item => item.id === id);
//         if (item && item.quantity > 1) {
//             updateCartQuantity(id, item.quantity - 1);
//         }
//     };

//     const removeItem = async (id) => {
//         if (!userId) {
//             setCart(prevCart => prevCart.filter(item => item.id !== id));
//         } else {
//             try {
//                 await axios.delete(`${API}/delete-cart-item`, {
//                     data: { user_id: userId, product_id: id },
//                 });
//                 const { data } = await axios.get(`${API}/get-cart-item/${userId}`);
//                 setCart(data.map(item => ({
//                     ...item,
//                     id: item.id || item.product_id,
//                 })));
//             } catch (err) {
//                 console.error("Error deleting item:", err);
//             }
//         }
//     };

//     const totalAmount = cart.reduce(
//         (acc, item) => acc + (item.price || 0) * item.quantity,
//         0
//     );

//     const totalItems = cart.length;

//     return (
//         <CartContext.Provider
//             value={{
//                 cart,
//                 setCart,
//                 addToCart,
//                 increaseQty,
//                 decreaseQty,
//                 removeItem,
//                 totalAmount,
//                 totalItems,
//             }}
//         >
//             {children}
//         </CartContext.Provider>
//     );
// };

// export default CartProvider;


import { createContext, useContext, useState, useEffect, useRef } from "react";
import axios from "axios";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const userId = localStorage.getItem("user_Id"); // Standardized key
    const API = "http://localhost:4500"; // Backend base URL
    const hasSyncedCart = useRef(false); // Track if cart has been synced
    const MAX_QUANTITY = 10; // Max quantity per item

    useEffect(() => {
        const loadCart = async () => {
            if (userId && !hasSyncedCart.current) {
                hasSyncedCart.current = true;
                const localCart = JSON.parse(localStorage.getItem("cart")) || [];

                if (localCart.length > 0) {
                    try {
                        await axios.post(`${API}/sync-cart-item`, {
                            user_id: userId,
                            cartItems: localCart.map(item => ({
                                id: item.id || item.product_id,
                                quantity: Math.min(item.quantity, MAX_QUANTITY),
                            })),
                        });
                        localStorage.removeItem("cart"); // Clear only after successful sync
                        setCart([]); // Clear cart in state after sync
                    } catch (err) {
                        console.error("Error syncing cart:", err);
                        return; // Don't continue if sync fails
                    }
                }
                console.log("User ID:", userId);
                try {
                    const { data } = await axios.get(`${API}/get-cart-item/${userId}`);
                    const normalizedCart = Array.isArray(data)
                        ? data.map(item => ({
                              ...item,
                              id: item.id || item.product_id, // Normalize schema
                          }))
                        : [];
                    setCart(normalizedCart);
                    console.log("Fetched cart:", normalizedCart); // Debug
                } catch (err) {
                    console.error("Error fetching cart:", err);
                    setCart([]); // Fallback to empty cart on error
                }
            } else {
                const savedCart = localStorage.getItem("cart");
                setCart(savedCart ? JSON.parse(savedCart) : []);
            }
        };

        loadCart();
    }, [userId]);

    useEffect(() => {
        if (!userId) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart, userId]);

    const addToCart = async (product) => {
        if (!userId) {
            setCart(prevCart => {
                const existingItem = prevCart.find(item => item.id === product.id);
                if (existingItem) {
                    const newQuantity = Math.min(existingItem.quantity + 1, MAX_QUANTITY);
                    return prevCart.map(item =>
                        item.id === product.id ? { ...item, quantity: newQuantity } : item
                    );
                }
                return [...prevCart, { ...product, quantity: 1 }];
            });
        } else {
            try {
                await axios.post(`${API}/add-cart-item`, {
                    user_id: userId,
                    product_id: product.id,
                    quantity: 1,
                });
                const { data } = await axios.get(`${API}/get-cart-item/${userId}`);
                const normalizedCart = Array.isArray(data)
                    ? data.map(item => ({
                          ...item,
                          id: item.id || item.product_id,
                      }))
                    : [];
                setCart(normalizedCart);
                console.log("Updated cart after add:", normalizedCart); // Debug
            } catch (err) {
                console.error("Error adding to cart:", err);
            }
        }
    };

    const updateCartQuantity = async (id, newQuantity) => {
        newQuantity = Math.min(Math.max(1, newQuantity), MAX_QUANTITY);
        if (!userId) {
            setCart(prevCart =>
                prevCart.map(item =>
                    item.id === id ? { ...item, quantity: newQuantity } : item
                )
            );
        } else {
            try {
                await axios.put(`${API}/update-cart-item`, {
                    user_id: userId,
                    product_id: id,
                    quantity: newQuantity,
                });
                const { data } = await axios.get(`${API}/get-cart-item/${userId}`);
                const normalizedCart = Array.isArray(data)
                    ? data.map(item => ({
                          ...item,
                          id: item.id || item.product_id,
                      }))
                    : [];
                setCart(normalizedCart);
                console.log("Updated cart after quantity change:", normalizedCart); // Debug
            } catch (err) {
                console.error("Error updating quantity:", err);
            }
        }
    };

    const increaseQty = (id) => {
        const item = cart.find(item => item.id === id);
        if (item && item.quantity < MAX_QUANTITY) {
            updateCartQuantity(id, item.quantity + 1);
        }
    };

    const decreaseQty = (id) => {
        const item = cart.find(item => item.id === id);
        if (item && item.quantity > 1) {
            updateCartQuantity(id, item.quantity - 1);
        }
    };

    const removeItem = async (id) => {
        if (!userId) {
            setCart(prevCart => {
                const newCart = prevCart.filter(item => item.id !== id);
                console.log("Guest cart after remove:", newCart); // Debug
                return newCart;
            });
        } else {
            try {
                await axios.delete(`${API}/delete-cart-item`, {
                    data: { user_id: userId, product_id: id },
                });
                const { data } = await axios.get(`${API}/get-cart-item/${userId}`);
                const normalizedCart = Array.isArray(data)
                    ? data.map(item => ({
                          ...item,
                          id: item.id || item.product_id,
                      }))
                    : [];
                setCart(normalizedCart);
                console.log("Updated cart after remove:", normalizedCart); // Debug
            } catch (err) {
                console.error("Error deleting item:", err);
                setCart([]); // Fallback to empty cart on error
            }
        }
    };

    const totalAmount = cart.reduce(
        (acc, item) => acc + (item.price || 0) * item.quantity,
        0
    );

    const totalItems = cart.length;

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                addToCart,
                increaseQty,
                decreaseQty,
                removeItem,
                totalAmount,
                totalItems,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;