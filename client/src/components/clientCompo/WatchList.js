import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart"; // Import the useCart context

const WatchlistPage = () => {

  
  const { addToCart } = useCart(); // Use the addToCart function from the cart context
  const [watchlistItems, setWatchlistItems] = useState([]);
  

  const navigate = useNavigate();

  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlistItems(savedWatchlist);
  }, []);

  const removeFromWatchlist = (id) => {
    const updatedWatchlist = watchlistItems.filter((item) => item.id !== id);
    setWatchlistItems(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  const moveAllToCart = () => {
    watchlistItems.forEach((item) => addToCart(item));
    setWatchlistItems([]);
    localStorage.removeItem("watchlist");
  };

  const clearWatchlist = () => {
    setWatchlistItems([]);
    localStorage.removeItem("watchlist");
  };

  const Continueshopping = () => {
    navigate("/allproduct");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">My Watchlist</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Watchlist Actions */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-700">
            {watchlistItems.length} items in your watchlist
          </p>
          <div className="space-x-4">
            <button
              onClick={moveAllToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Move All to Cart
            </button>
            <button
              onClick={clearWatchlist}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
            >
              Clear Watchlist
            </button>
          </div>
        </div>

        {/* Watchlist Items */}
        {watchlistItems.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-xl font-medium text-gray-900">
              Your watchlist is empty
            </h2>
            <p className="text-gray-600 mt-2">
              Save items you're interested in by clicking the heart icon
            </p>
            <button
              onClick={Continueshopping}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {watchlistItems.map((item) => (
                <li key={item.id} className="p-4 sm:p-6 hover:bg-gray-50">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start">
                    <div className="flex-shrink-0 w-24 h-24 mb-4 sm:mb-0">
                      <img
                        src={`/uploads/productimage/${item.image}`}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>

                    <div className="flex-1 text-center sm:text-left sm:ml-6">
                      <h3 className="text-lg font-medium text-gray-900">
                        {item.name}
                      </h3>
                      <div className="text-lg font-medium text-gray-900">
                        ${item.price}
                      </div>
                      <p
                        className={`mt-1 text-sm ${
                          item.status === "inactive"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {item.status === "inactive"
                          ? "Out of Stock"
                          : "In Stock"}
                      </p>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:ml-6 flex flex-col sm:items-end">
                      {/* Add to Cart Button */}
                      <button
                        onClick={() => addToCart(item)} 
                        disabled={item.status === "inactive"} 
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => removeFromWatchlist(item.id)}
                        className="mt-2 text-sm text-gray-500 hover:text-gray-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recently Viewed */}
        <div className="mt-12">
          <h2 className="text-xl font-medium text-gray-900 mb-4">
            Recently Viewed
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                <img
                  src={require(`../../assets/images/shopping.png`)}
                  alt={`Product ${item}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    Product Name Example
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">$99.99</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default WatchlistPage;
