import React, { useState } from "react";
import { useCart } from "../../context/cart";
import ShippingInformation from "./ShippingInformationForm";

const CheckoutPage = () => {
  const { cart } = useCart();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 0.0;
  const tax = subtotal * 0.0;
  const total = subtotal + shipping + tax;

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    city: "",
    zip_code: "",
    state: "",
    country: "",
    mobile: "",
    cart_number: "",
    cart_name: "",
    ex_date: "",
    cvv: "",
  });

  const [activeStep, setActiveStep] = useState("shipping");
  const [orderSummaryVisible, setOrderSummaryVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleShippingSubmit = async (e) => {
    e.preventDefault();

    const shippingData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      zip_code: formData.zip_code,
      state: formData.state,
      country: formData.country,
      mobile: formData.mobile,
    };

    try {
      const response = await fetch(
        "http://localhost:4500/add-shipping-address",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(shippingData),
        }
      );

      if (response.ok) {
        console.log("Shipping address added successfully");
        setActiveStep("payment"); 
      } else {
        console.error("Failed to add shipping address");
        alert("Error: Shipping address not saved. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error: Could not save address.");
    }
  };

  const cartItems = [
    { id: 1, name: "Premium Headphones", price: 129.99, qty: 1 },
    { id: 2, name: "Wireless Charger", price: 39.99, qty: 2 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">YourStore</h1>
            <div className="flex items-center space-x-4">
              <span className="hidden md:inline text-gray-600">
                Secure Checkout
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-green-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Order Summary Toggle */}
      <div className="md:hidden bg-white p-4 shadow-sm sticky top-0 z-10">
        <button
          className="w-full flex items-center justify-between py-2 px-4 bg-gray-100 rounded-lg"
          onClick={() => setOrderSummaryVisible(!orderSummaryVisible)}
        >
          <span className="font-medium">Order Summary</span>
          <span className="font-bold">${total.toFixed(2)}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-5 h-5 transition-transform ${
              orderSummaryVisible ? "transform rotate-180" : ""
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>

        {orderSummaryVisible && (
          <div className="mt-4 bg-white rounded-lg p-4 shadow-md">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between mb-3">
                <div className="flex">
                  <div className="w-10 h-10 bg-gray-200 rounded-md mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                  </div>
                </div>
                <p className="font-medium">
                  ${(item.price * item.qty).toFixed(2)}
                </p>
              </div>
            ))}
            <div className="border-t mt-3 pt-3">
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Checkout Form */}
          <div className="lg:w-2/3">
            {/* Checkout Steps */}
            <div className="mb-8 hidden sm:block">
              <div className="flex items-center">
                <div
                  className={`flex items-center relative ${
                    activeStep === "shipping" ||
                    activeStep === "payment" ||
                    activeStep === "review"
                      ? "text-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  <div
                    className={`rounded-full transition duration-500 ease-in-out h-8 w-8 flex items-center justify-center ${
                      activeStep === "shipping" ||
                      activeStep === "payment" ||
                      activeStep === "review"
                        ? "bg-blue-600 text-white"
                        : "border-2 border-gray-300"
                    }`}
                  >
                    1
                  </div>
                  <div className="absolute top-0 -ml-10 text-center mt-10 w-32 text-sm font-medium">
                    Shipping
                  </div>
                </div>
                <div
                  className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
                    activeStep === "payment" || activeStep === "review"
                      ? "border-blue-600"
                      : "border-gray-300"
                  }`}
                ></div>
                <div
                  className={`flex items-center relative ${
                    activeStep === "payment" || activeStep === "review"
                      ? "text-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  <div
                    className={`rounded-full transition duration-500 ease-in-out h-8 w-8 flex items-center justify-center ${
                      activeStep === "payment" || activeStep === "review"
                        ? "bg-blue-600 text-white"
                        : "border-2 border-gray-300"
                    }`}
                  >
                    2
                  </div>
                  <div className="absolute top-0 -ml-10 text-center mt-10 w-32 text-sm font-medium">
                    Payment
                  </div>
                </div>
                <div
                  className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
                    activeStep === "review"
                      ? "border-blue-600"
                      : "border-gray-300"
                  }`}
                ></div>
                <div
                  className={`flex items-center relative ${
                    activeStep === "review" ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  <div
                    className={`rounded-full transition duration-500 ease-in-out h-8 w-8 flex items-center justify-center ${
                      activeStep === "review"
                        ? "bg-blue-600 text-white"
                        : "border-2 border-gray-300"
                    }`}
                  >
                    3
                  </div>
                  <div className="absolute top-0 -ml-10 text-center mt-10 w-32 text-sm font-medium">
                    Review
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">
                {activeStep === "shipping" && "Shipping Information"}
                {activeStep === "payment" && "Payment Details"}
                {activeStep === "review" && "Review Your Order"}
              </h2>

              <form>
                {activeStep === "shipping" && (
                  <div>
                  <ShippingInformation
                    formData={formData}
                    handleChange={handleChange}
                    handleShippingSubmit={handleShippingSubmit}
                  />
                </div>
                )}

                {activeStep === "payment" && (
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="cart_number"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cart_number"
                        name="cart_number"
                        value={formData.cart_number}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cart_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name on Card
                      </label>
                      <input
                        type="text"
                        id="cart_name"
                        name="cart_name"
                        value={formData.cart_name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="ex_date"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          id="ex_date"
                          name="ex_date"
                          value={formData.ex_date}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="cvv"
                          className="block text-sm font-medium text-gray-700"
                        >
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          placeholder="123"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                          required
                        />
                      </div>
                    </div>
                    <div className="pt-4 flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-2">
                      <button
                        type="button"
                        onClick={() => setActiveStep("shipping")}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Back to Shipping
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveStep("review")}
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md"
                      >
                        Review Order
                      </button>
                    </div>
                  </div>
                )}

                {activeStep === "review" && (
                  <div className="space-y-6">
                    <div className="border-b pb-3">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Shipping Information
                      </h3>
                      <p className="text-gray-600">
                        {formData.first_name} {formData.last_name}
                      </p>
                      <p className="text-gray-600">{formData.email}</p>
                      <p className="text-gray-600">{formData.mobile}</p>
                      <p className="text-gray-600">{formData.address}</p>
                      <p className="text-gray-600">
                        {formData.city}, {formData.zip_code}
                      </p>
                      <p className="text-gray-600">
                        {formData.state}, {formData.country}
                      </p>
                    </div>
                    <div className="border-b pb-3">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Payment Method
                      </h3>
                      <p className="text-gray-600">
                        Card ending in {formData.cardNumber.slice(-4)}
                      </p>
                      <p className="text-gray-600">{formData.cardName}</p>
                      <p className="text-gray-600">
                        Expires: {formData.expiryDate}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Order Items
                      </h3>
                      {cart.length > 0 ? (
                        cart.map((item) => (
                          <div
                            key={item.id}
                            className="flex justify-between mb-3"
                          >
                            <div className="flex">
                              <div className="w-12 h-12 bg-gray-200 rounded-md mr-3 flex-shrink-0">
                                <img
                                  src={`/uploads/productImage/${item.image}`}
                                  alt={item.name}
                                  className="w-full h-full object-cover rounded-md"
                                />
                              </div>
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500">
                                  Qty: {item.quantity}
                                </p>
                              </div>
                            </div>
                            <p className="font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-gray-500">
                          Your cart is empty
                        </p>
                      )}
                    </div>
                    <div className="pt-4 flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-2">
                      <button
                        type="button"
                        onClick={() => setActiveStep("payment")}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Back to Payment
                      </button>
                      <button
                        type="submit"
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md"
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Right Column - Order Summary (Desktop) */}
          <div className="lg:w-1/3 hidden md:block">
            <div className="bg-white shadow-md rounded-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div key={item.id} className="flex justify-between mb-3">
                    <div className="flex">
                      <div className="w-12 h-12 bg-gray-200 rounded-md mr-3 flex-shrink-0">
                        <img
                          src={`/uploads/productImage/${item.image}`}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">Your cart is empty</p>
              )}

              {/* Total Summary */}
              <div className="w-full max-w-lg bg-white p-4 rounded-lg shadow mt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-green-600 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-sm">Free returns within 30 days</p>
                  </div>
                  <div className="flex mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-green-600 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-sm">Secure checkout</p>
                  </div>
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-green-600 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-sm">24/7 customer support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
