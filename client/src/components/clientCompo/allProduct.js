import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchbarSmall from "../../pages/client/home/SearchbarSmall";
import Adverties from "./Adverties.js";
import ProductCard from "./productCard.js";

const getProductAPI = process.env.REACT_APP_GET_API;

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
      fetchProduct();
  }, []);

  const fetchProduct = async () => {
      try {
          const res = await axios.get(`${getProductAPI}`);
          setProducts(res.data);
      } catch (error) {
          console.log(error);
      }
  };

  return (
    <>
      <Adverties />
      <SearchbarSmall />
      <div className="p-4 py-10 max-md:p-1 max-md:mb-4">
        <div className="flex justify-center items-center mb-6 border-b-2 pb-2 border-gray-300">
          <h2 className="text-3xl font-semibold max-md:text-xl">Products</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-md:gap-2">
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


      
    </>
  );
};

export default AllProducts;
