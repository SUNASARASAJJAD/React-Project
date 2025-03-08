import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    paymentMethod: "credit_card",
  });

  const [userPicture, setUserPicture] = useState("");

  useEffect(() => {
    // Check if user data is available in localStorage and pre-fill the form
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setFormData({
        ...formData,
        name: userInfo.username || "",
        email: userInfo.email || "",
      });
      setUserPicture(userInfo.picture || "https://i.pravatar.cc/100"); // Default to a placeholder picture
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order Placed Successfully! 🎉");
    console.log("User Details:", formData);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center p-6 min-h-screen">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        {/* Display Profile Picture */}
        <div className="text-center mb-6">
          <img
            src={userPicture}
            alt="User Profile"
            className="w-24 h-24 rounded-full mx-auto"
          />
        </div>
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">🛒 Checkout</h2>

        

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="space-y-2">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={formData.name}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Street Address"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          {/* Payment Method */}
          <select
            name="paymentMethod"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          >
            <option value="credit_card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="cod">Cash on Delivery</option>
          </select>

          {/* Submit Button */}
          <Link to="/ordertrack">
            <button
              type="submit"
              className="w-full py-3 mt-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              Place Order
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
