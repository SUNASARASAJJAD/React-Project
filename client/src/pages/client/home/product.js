import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../../components/clientCompo/productCard";

const getProductsAPI = process.env.REACT_APP_GET_API;

const Product = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${getProductsAPI}`);
      const randomProducts = getRandomItems(res.data, 12);
      setProducts(randomProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const getRandomItems = (array, count) => {
    return [...array].sort(() => 0.5 - Math.random()).slice(0, count);
  };

  const allProduct = () => {
    navigate("/allproduct");
  };

  return (
    <div className="p-4 max-md:p-1 max-md:mb-2">
      <div className="flex justify-between items-center pt-4 pb-2 border-b-2 mb-4 border-gray-300">
        <h2 className="text-3xl font-semibold max-md:text-xl ">Products</h2>
        <button
          onClick={allProduct}
          className="flex items-center gap-2 text-blue-600 hover:underline"
        >
          View all Products <FaArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-6 max-md:gap-2">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              status={product.status}
            />
          ))
        ) : (
          <p className="text-center text-red-500 w-full">No products found</p>
        )}
      </div>
    </div>
  );
};

export default Product;
