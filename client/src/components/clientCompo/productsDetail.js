// import React, { useEffect, useState } from "react";
// import { Truck, RotateCcw } from "lucide-react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { useCart } from "../../context/cart";

// const GetProByIdAPI =
//   process.env.REACT_APP_GET_BY_ID_API || "http://localhost:4500/getproductsbyid/";

// const ProductsDetail = () => {
//   const [product, setProduct] = useState(null);
//   const [error, setError] = useState(null);
//   const { id } = useParams();
//   const { addToCart, cart, error: cartError } = useCart();
//   const [watchList, setWatchList] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (id) {
//       fetchProduct();
//     }
//     const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
//     setWatchList(savedWatchlist);
//   }, [id]);

//   const fetchProduct = async () => {
//     try {
//       const res = await axios.get(`${GetProByIdAPI}${id}`);
//       setProduct(res.data || null);
//       setError(null);
//     } catch (error) {
//       console.error("Error fetching product:", error);
//       setError("Failed to load product. Please try again.");
//       setProduct(null);
//     }
//   };

//   const toggleWatchList = () => {
//     if (!product) return;
//     let updatedWatchList;
//     if (watchList.some((item) => item.id === product.id)) {
//       updatedWatchList = watchList.filter((item) => item.id !== product.id);
//     } else {
//       updatedWatchList = [...watchList, product];
//     }
//     setWatchList(updatedWatchList);
//     localStorage.setItem("watchlist", JSON.stringify(updatedWatchList));
//   };

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-500">
//         {error}
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   const isOutOfStock = product.status === "inactive";
//   const isInCart = cart.some((item) => item.id === Number(id));
//   const isInWatchList = watchList.some((item) => item.id === Number(id));

//   return (
//     <div className="max-w-7xl mx-auto p-8">
//       {cartError && (
//         <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
//           {cartError}
//         </div>
//       )}
//       <div className="flex flex-col md:flex-row gap-8">
//         <div className="flex md:w-1/2">
//           <div className="flex-1">
//             <img
//               src={`http://localhost:4500/uploads/productImage/${product.image}`}
//               alt={product.name || "Product"}
//               className="w-full rounded-lg"
//               onError={(e) => (e.target.src = "/fallback-image.jpg")}
//             />
//           </div>
//         </div>

//         <div className="md:w-1/3">
//           <h1 className="text-2xl font-bold mb-2">
//             {product.name || "Product Name"}
//           </h1>

//           <div className="flex items-center gap-2 mb-4">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <span key={star} className="text-yellow-400">
//                 ★
//               </span>
//             ))}
//             <span className="text-gray-500">(150 Reviews)</span>
//             <span
//               className={`ml-2 ${
//                 isOutOfStock ? "text-red-500" : "text-green-500"
//               }`}
//             >
//               {isOutOfStock ? "Out of Stock" : "In Stock"}
//             </span>
//           </div>

//           <div className="text-2xl font-bold mb-6">
//             ${product.price?.toFixed(2) || "0.00"}
//           </div>

//           <div className="flex gap-4 mb-6">
//             {isOutOfStock ? (
//               <button
//                 disabled
//                 className="px-8 py-2 bg-gray-400 text-white rounded-md flex-grow cursor-not-allowed"
//               >
//                 Add To Cart
//               </button>
//             ) : isInCart ? (
//               <button
//                 onClick={() => navigate("/cart")}
//                 className="px-8 py-2 bg-red-500 text-white rounded-md flex-grow"
//               >
//                 Go to Cart
//               </button>
//             ) : (
//               <button
//                 onClick={() => addToCart(product)}
//                 className="px-8 py-2 bg-red-500 text-white rounded-md flex-grow"
//               >
//                 Add To Cart
//               </button>
//             )}
//           </div>

//           <div className="flex gap-4 mb-6">
//             {isOutOfStock ? (
//               <button
//                 disabled
//                 className="px-8 py-2 bg-gray-400 text-white rounded-md flex-grow cursor-not-allowed"
//               >
//                 Add to Watch List
//               </button>
//             ) : isInWatchList ? (
//               <button
//                 onClick={() => navigate("/watchlist")}
//                 className="px-8 py-2 bg-yellow-500 text-white rounded-md flex-grow"
//               >
//                 Go to Watchlist
//               </button>
//             ) : (
//               <button
//                 onClick={toggleWatchList}
//                 className="px-8 py-2 bg-blue-500 text-white rounded-md flex-grow"
//               >
//                 Add to Watch List
//               </button>
//             )}
//           </div>

//           <div className="space-y-4 border rounded-lg p-4">
//             <div className="flex items-center gap-4">
//               <Truck size={24} />
//               <div>
//                 <h4 className="font-medium">Free Delivery</h4>
//                 <p className="text-sm text-gray-500">
//                   Enter your postal code for Delivery Availability
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-4">
//               <RotateCcw size={24} />
//               <div>
//                 <h4 className="font-medium">Return Delivery</h4>
//                 <p className="text-sm text-gray-500">
//                   Free 30 Days Delivery Returns. Details
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductsDetail;


import React, { useEffect, useState } from "react";
import { Truck, RotateCcw } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../context/cart";

const GetProByIdAPI = process.env.REACT_APP_GET_BY_ID_API;

const ProductsDetail = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { addToCart, cart } = useCart();
  const [watchList, setWatchList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
    // Load watchlist from localStorage
    const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchList(savedWatchlist);
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${GetProByIdAPI}${id}`);
      setProduct(res.data[0] || null);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const toggleWatchList = () => {
    let updatedWatchList;
    if (watchList.some((item) => item.id === product.id)) {
      updatedWatchList = watchList.filter((item) => item.id !== product.id);
    } else {
      updatedWatchList = [...watchList, product];
    }

    setWatchList(updatedWatchList);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchList));
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const isOutOfStock = product.status === "inactive";
  const isInCart = cart.some((item) => item.id === Number(id));
  const isInWatchList = watchList.some((item) => item.id === Number(id));

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex md:w-1/2">
          <div className="flex-1">
            <img
              src={`/uploads/productimage/${product.image}`}
              alt={product.name}
              className="w-full rounded-lg"
            />
          </div>
        </div>

        <div className="md:w-1/3">
          <h1 className="text-2xl font-bold mb-2">
            {product.name || "Product Name"}
          </h1>

          <div className="flex items-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-yellow-400">
                ★
              </span>
            ))}
            <span className="text-gray-500">(150 Reviews)</span>
            <span
              className={`ml-2 ${
                isOutOfStock ? "text-red-500" : "text-green-500"
              }`}
            >
              {isOutOfStock ? "Out of Stock" : "In Stock"}
            </span>
          </div>

          <div className="text-2xl font-bold mb-6">
            ${product.price || "192.00"}
          </div>

          <div className="flex gap-4 mb-6">
            {isOutOfStock ? (
              <button
                disabled
                className="px-8 py-2 bg-gray-400 text-white rounded-md flex-grow cursor-not-allowed"
              >
                Add To Cart
              </button>
            ) : isInCart ? (
              <button
                onClick={() => navigate("/cart")}
                className="px-8 py-2 bg-red-500 text-white rounded-md flex-grow"
              >
                Go to Cart
              </button>
            ) : (
              <button
                onClick={() => addToCart(product)}
                className="px-8 py-2 bg-red-500 text-white rounded-md flex-grow"
              >
                Add To Cart
              </button>
            )}
          </div>

          <div className="flex gap-4 mb-6">
            {isOutOfStock ? (
              // Disabled button if out of stock
              <button
                disabled
                className="px-8 py-2 bg-gray-400 text-white rounded-md flex-grow cursor-not-allowed"
              >
                Add to Watch List
              </button>
            ) : isInWatchList ? (
              // If the product is already in the watchlist, navigate to the watchlist
              <button
                onClick={() => navigate("/watchlist")}
                className="px-8 py-2 bg-yellow-500 text-white rounded-md flex-grow"
              >
                Go to Watchlist
              </button>
            ) : (
              // If the product is not in the watchlist, allow adding it
              <button
                onClick={toggleWatchList}
                className="px-8 py-2 bg-blue-500 text-white rounded-md flex-grow"
              >
                Add to Watch List
              </button>
            )}
          </div>

          <div className="space-y-4 border rounded-lg p-4">
            <div className="flex items-center gap-4">
              <Truck size={24} />
              <div>
                <h4 className="font-medium">Free Delivery</h4>
                <p className="text-sm text-gray-500">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <RotateCcw size={24} />
              <div>
                <h4 className="font-medium">Return Delivery</h4>
                <p className="text-sm text-gray-500">
                  Free 30 Days Delivery Returns. Details
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetail;