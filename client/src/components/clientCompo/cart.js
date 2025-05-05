import React from "react";
import { useCart } from "../../context/cart";
import { NavLink, useNavigate } from "react-router-dom";
import { useCategories } from "../../context/Category";

const IMAGE_BASE_URL =
  process.env.REACT_APP_IMAGE_BASE_URL || "/Uploads/productImage";

const Cart = () => {
  const {
    cart,
    totalAmount,
    increaseQty,
    decreaseQty,
    removeItem,
    totalItems,
  } = useCart();
  const { categories } = useCategories();
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_Id"); // Match CartProvider key

  return (
    <div className="min-h-screen bg-[#EEEEEE] py-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-5 text-center">
          Your Cart
        </h1>

        {cart.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items Section */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white shadow-sm overflow-hidden">
                <div className="border-b bg-gray-200 border-gray-100 p-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Shopping Cart
                  </h2>
                </div>

                <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row gap-6">
                        {/* Product Image */}
                        <NavLink
                          to={`/productsdetail/${item.id}`}
                          className="shrink-0"
                        >
                          <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-50 shadow-sm">
                            <img
                              src={`uploads/productImage/${item.image}`}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) =>
                                (e.target.src = "/fallback-image.jpg")
                              }
                            />
                          </div>
                        </NavLink>

                        {/* Product Details */}
                        <div className="flex-1 flex flex-col sm:flex-row justify-between">
                          <div className="mb-4 sm:mb-0">
                            <NavLink to={`/productsdetail/${item.id}`}>
                              <h3 className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors">
                                {item.name}
                              </h3>
                            </NavLink>
                            <div className="text-sm text-gray-500 mt-1">
                              Unit price: ${item.price.toFixed(2)}
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center mt-4">
                              <button
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                onClick={() => decreaseQty(item.id)}
                                aria-label="Decrease quantity"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20 12H4"
                                  />
                                </svg>
                              </button>
                              <span className="mx-3 w-8 text-center font-medium">
                                {item.quantity}
                              </span>
                              <button
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                onClick={() => increaseQty(item.id)}
                                aria-label="Increase quantity"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>

                          {/* Price and Actions */}
                          <div className="flex flex-col items-end justify-between">
                            <span className="text-lg font-semibold text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>

                            <button
                              className="flex items-center text-sm text-red-500 hover:text-red-700 mt-4 sm:mt-0"
                              onClick={() => removeItem(item.id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() =>
                        navigate(
                          categories.length > 0
                            ? `/categoryproduct/${categories[0].id}`
                            : "/"
                        )
                      }
                      className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                      </svg>
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white shadow-sm sticky top-6">
                <div className="p-6 border-b bg-gray-200 border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Order Summary
                  </h2>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-medium text-gray-900">
                      $
                      {cart
                        .reduce(
                          (acc, item) => acc + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span className="font-medium text-gray-900">$0.00</span>
                  </div>

                  <div className="h-px bg-gray-200 my-4"></div>

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-gray-900">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>

                  <button
  className="w-full mt-6 py-3.5 px-6 bg-gradient-to-r from-blue-800 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 "
  onClick={() => navigate(userId ? "/checkout" : "/login")}
>
  {userId ? (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
      Proceed to Checkout
    </>
  ) : (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
        />
      </svg>
      Sign in to Checkout
    </>
  )}
</button>

                  <div className="mt-6">
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                        Secure checkout
                      </div>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                        Multiple payment options
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center max-w-md mx-auto">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-500 mb-8">
              Looks like you haven't added anything to your cart yet
            </p>
            <button
              onClick={() =>
                navigate(
                  categories.length > 0
                    ? `/categoryproduct/${categories[0].id}`
                    : "/"
                )
              }
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow-sm hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
