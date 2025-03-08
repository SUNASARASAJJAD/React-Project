// import React from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { FaCartPlus } from "react-icons/fa";
// import { useCart } from "../../context/cart";
// import { FaBookmark } from "react-icons/fa6";

// const ProductCard = ({ id, image, name, price, status }) => {
//   const { cart, addToCart } = useCart();
//   const navigate = useNavigate();

//   const product = { id, name, price, image };

//   const isInCart = cart.some((item) => item.id === id);

//   const isOutOfStock = status === "inactive"
//   return (
//     <div
//       className="bg-white shadow-md relative group hover:shadow-lg transition-shadow cursor-pointer"
//       //   onClick={() => ProductDetail(product.id)}
//     >
//       <div className="relative">
//         <NavLink to={`/productsdetail/${id}`}>
//           <img
//             src={`/uploads/productimage/${image}`}
//             alt={name}
//             className="w-full h-32 max-md:h-24 object-cover cursor-pointer"
//           />
//         </NavLink>
//         {isOutOfStock ? (
//                     <button
//                         className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 transition-colors"
//                         disabled
//                     >
//                        <FaCartPlus className="w-5 h-5 text-gray-400 cursor-not-allowed" />
//                     </button>
//         ):isInCart ? (
//           <button
//             onClick={() => navigate("/cart")}
//             className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 hover:bg-white transition-colors"
//           >
//             <FaBookmark className="w-5 h-5 text-gray-800 hover:text-blue-600" />
//           </button>
//         ) : (
//           <button
//             onClick={() => addToCart(product)}
//             className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 hover:bg-white transition-colors"
//             aria-label="Add to cart"
//           >
//             <FaCartPlus className="w-5 h-5 text-gray-800 hover:text-blue-600" />
//           </button>
//         )}
//       </div>

//       <div className="flex flex-col items-center p-1 justify-center mb-1">
//         <h4 className="text-sm truncate max-md:text-[10px] max-md:font-normal text-center">
//           {name}
//         </h4>
//         <span className="text-xs font-bold max-md:text-sm">${price}</span>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { useCart } from "../../context/cart";
import { FaBookmark } from "react-icons/fa6";

const ProductCard = ({ id, image, name, price, status }) => {
  const { cart, addToCart } = useCart();
  const navigate = useNavigate();

  const product = { id, name, price, image };
  const isInCart = cart.some((item) => item.id === id);
  const isOutOfStock = status === "inactive";

  const prodetail = () =>{
    navigate(`/productsdetail/${id}`);
  }

  return (
    <div className="bg-white shadow-md relative group hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
      <div className="relative">
        <NavLink to={`/productsdetail/${id}`}>
          <img
            src={`/uploads/productimage/${image}`}
            alt={name}
            className={`w-48 max-md:w-40 h-32 max-md:h-24 object-cover cursor-pointer transition-opacity ${
              isOutOfStock ? "opacity-50 blur-sm" : ""
            }`}
          />
        </NavLink>

        {isOutOfStock && (
          <div onClick={prodetail} className="absolute inset-0 flex items-center justify-center bg-gray-100/5 backdrop-blur-md text-white text-sm font-bold z-10">
            Out of Stock
          </div>
        )}

        {!isOutOfStock && (
          <>
            {isInCart ? (
              <button
                onClick={() => navigate("/cart")}
                className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 hover:bg-white transition-colors"
              >
                <FaBookmark className="w-5 h-5 text-gray-800 hover:text-blue-600" />
              </button>
            ) : (
              <button
                onClick={() => addToCart(product)}
                className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 hover:bg-white transition-colors"
                aria-label="Add to cart"
              >
                <FaCartPlus className="w-5 h-5 text-gray-800 hover:text-blue-600" />
              </button>
            )}
          </>
        )}
      </div>

      <div className="flex flex-col items-center p-1 justify-center mb-1">
        <h4 className="text-sm truncate max-md:text-[10px] max-md:font-normal text-center">
          {name}
        </h4>
        <span className="text-xs font-bold max-md:text-sm">${price}</span>
      </div>
    </div>
  );
};

export default ProductCard;

