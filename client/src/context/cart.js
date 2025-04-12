// import { createContext, useContext, useState, useEffect } from "react";

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState(() => {
//     try {
//       const savedCart = localStorage.getItem("cart");
//       return savedCart ? JSON.parse(savedCart) : [];
//     } catch (error) {
//       console.error("Error parsing cart from localStorage:", error);
//       return [];
//     }
//   });

//   useEffect(() => {
//     try {
//       localStorage.setItem("cart", JSON.stringify(cart));
//     } catch (error) {
//       console.error("Error saving cart to localStorage:", error);
//     }
//   }, [cart]);

//   const addToCart = (product) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.id === product.id);
//       if (existingItem) {
//         return prevCart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prevCart, { ...product, quantity: 1 }];
//       }
//     });
//   };

//   const increaseQty = (id) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   const decreaseQty = (id) => {
//     setCart((prevCart) =>
//       prevCart
//         .map((item) =>
//           item.id === id ? { ...item, quantity: item.quantity - 1 } : item
//         )
//         .filter((item) => item.quantity > 0)
//     );
//   };

//   const removeItem = (id) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== id));
//   };

//   const totalAmount = cart.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   const totalItems = cart.length;

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         increaseQty,
//         decreaseQty,
//         removeItem,
//         totalAmount,
//         totalItems,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };


import { createContext, useContext, useState, useEffect, useRef } from "react";
import axios from "axios";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const user = localStorage.getItem("user_Id");
  const BASE_URL = "http://localhost:4500";

  const hasSyncedCart = useRef(false);

  // Load cart based on login status and sync with database if logged in
  useEffect(() => {
    const loadCart = async () => {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];

      if (user && !hasSyncedCart.current) {
        hasSyncedCart.current = true;

        if (localCart.length > 0) {
          try {
            await axios.post(`${BASE_URL}/cart`, {
              cart_id: user, // Assuming cart_id is user_id
              cartItems: localCart,
            });
            // After syncing, fetch the updated cart from the database
            const { data } = await axios.get(`${BASE_URL}/cart/${user}`);
            setCart(data);
            localStorage.setItem("cart", JSON.stringify(data)); // Update localStorage with synced data
          } catch (error) {
            console.error("Error syncing cart with database:", error);
          }
        } else {
          try {
            const { data } = await axios.get(`${BASE_URL}/cart/${user}`);
            setCart(data);
            localStorage.setItem("cart", JSON.stringify(data)); // Sync localStorage with DB
          } catch (error) {
            console.error("Error fetching cart from database:", error);
          }
        }
      } else {
        setCart(localCart); // Use localStorage cart if not logged in
      }
    };

    loadCart();
  }, [user]);

  // Add to cart - Save to both localStorage and database (if logged in)
  const addToCart = async (product) => {
    let updatedCart;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product_id === product.id);
      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item.product_id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, product_id: product.id, quantity: 1 }];
      }
      // Always save to localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });

    // If user is logged in, also save to database
    if (user) {
      try {
        await axios.post(`${BASE_URL}/cart`, {
          cart_id: user,
          product_id: product.id,
          quantity: 1,
        });
        // Fetch updated cart from database to ensure consistency
        const { data } = await axios.get(`${BASE_URL}/cart/${user}`);
        setCart(data);
        localStorage.setItem("cart", JSON.stringify(data)); // Sync localStorage with DB
      } catch (error) {
        console.error("Error adding to cart in database:", error);
      }
    }
  };

  // Update cart quantity
  const updateCartQuantity = async (product_id, newQuantity) => {
    let updatedCart;

    setCart((prevCart) => {
      updatedCart = prevCart.map((item) =>
        item.product_id === product_id ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });

    if (user) {
      try {
        await axios.put(`${BASE_URL}/cart/${user}/${product_id}`, {
          quantity: newQuantity,
        });
        const { data } = await axios.get(`${BASE_URL}/cart/${user}`);
        setCart(data);
        localStorage.setItem("cart", JSON.stringify(data));
      } catch (error) {
        console.error("Error updating quantity in database:", error);
      }
    }
  };

  const increaseQty = (product_id) => {
    const item = cart.find((item) => item.product_id === product_id);
    if (item) updateCartQuantity(product_id, Math.min(10, item.quantity + 1));
  };

  const decreaseQty = (product_id) => {
    const item = cart.find((item) => item.product_id === product_id);
    if (item) updateCartQuantity(product_id, Math.max(1, item.quantity - 1));
  };

  const removeItem = async (product_id) => {
    let updatedCart;

    setCart((prevCart) => {
      updatedCart = prevCart.filter((item) => item.product_id !== product_id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });

    if (user) {
      try {
        await axios.delete(`${BASE_URL}/cart/${user}/${product_id}`);
        const { data } = await axios.get(`${BASE_URL}/cart/${user}`);
        setCart(data);
        localStorage.setItem("cart", JSON.stringify(data));
      } catch (error) {
        console.error("Error deleting item from database:", error);
      }
    }
  };

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
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