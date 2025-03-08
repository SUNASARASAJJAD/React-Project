import CategoryMenu from "./CategoryMenu";
import SearchbarSmall from "../../pages/client/home/SearchbarSmall";
import ProductCard from "./productCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const getProductsByCategoryAPI = process.env.REACT_APP_GET_PRO_BY_CATEGORY_API;

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const { category_id } = useParams();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get(
          `${getProductsByCategoryAPI}${category_id}`
        );
        console.log(res.data);
        setCategories(res.data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchAllProducts();
  }, [category_id]);

  return (
    <>
      {" "}
      <SearchbarSmall />
      <div className=" flex flex-col md:flex-row lg:mb-4">
        {/* Sidebar */}
        <CategoryMenu />

        {/* Product Section */}
        <div className="p-4 py-10 max-md:p-1 max-md:mb-4">
          <div className="flex justify-center items-center mb-6 border-b-2 pb-2 border-gray-300">
            <h2 className="text-3xl font-semibold max-md:text-xl">Products</h2>
          </div>
          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-md:gap-2">
            {categories.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
                status={product.status}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryList;
