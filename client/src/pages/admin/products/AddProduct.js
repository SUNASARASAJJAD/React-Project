// import React from "react";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { NavLink, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Hoc from "../../../components/dashboardCompo/Hoc";

// const AddApi = process.env.REACT_APP_ADD_API;
// const CategoryApi = process.env.REACT_APP_CATEGORY_API;

// const AddProduct = () => {

//     const [products, setProducts] = useState({
//         name: "",
//         price: "",
//         image: "",
//         category_id: "",
//         description: "",
//     });

//     const [data, setData] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchAllData = async () => {
//             try {
//                 const res = await axios.get(CategoryApi);
//                 setData(res.data);
//             } catch (error) {
//                 console.log("Error fetching categories:", error);
//             }
//         };
//         fetchAllData();
//     }, []);

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         if (name === "image") {
//             setProducts({
//                 ...products,
//                 image: files[0],
//             });
//         } else {
//             setProducts({ ...products, [name]: value });
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log(products);
//         const formData = new FormData();
//         formData.append("name", products.name);
//         formData.append("price", products.price);
//         formData.append("image", products.image);
//         formData.append("category_id", products.category_id);
//         formData.append("description", products.description);

//         try {
//             const response = await axios.post(`${AddApi}`, formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             });

//             console.log("Server Response:", response.data);
//             setTimeout(() => {

//                 toast.success("Product added successfully!")
//             }, 100)

//             navigate("/admin/allproducts");

//         } catch (error) {
//             if (error.response) {
//                 console.error("Server Error:", error.response.data);
//             } else {
//                 console.error("Request Error:", error.message);
//             }
//         }
//     };

//     return (
//         <>
//             <Hoc />
//             <section id="content">
//                 <main>
//                     <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
//                         <h3 className="text-2xl font-semibold text-gray-800 mb-6">Add Product</h3>
//                         <form
//                             onSubmit={handleSubmit}
//                             className="space-y-6">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">Name</label>
//                                     <input
//                                         type="text"
//                                         name="name"
//                                         value={products.name}
//                                         onChange={handleChange}
//                                         placeholder="Enter Product Name"
//                                         className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">Price</label>
//                                     <input
//                                         type="number"
//                                         name="price"
//                                         value={products.price}
//                                         onChange={handleChange}
//                                         placeholder="Enter Price"
//                                         className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                                         onWheel={(e) => e.target.blur()}
//                                         required
//                                     />
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">Category</label>

//                                     <select
//                                         name="category_id"
//                                         value={products.category_id}
//                                         onChange={handleChange}
//                                         className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                                         required

//                                     >
//                                         <option value="">Select a category</option>
//                                         {data.map((category) => (
//                                             <option key={category.id} value={category.id}>
//                                                 {category.title}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">Image</label>
//                                     <input
//                                         type="file"
//                                         name="image"
//                                         onChange={handleChange}
//                                         className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-blue-500 focus:border-blue-500"
//                                         required
//                                     />
//                                 </div>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700">Description</label>
//                                 <CKEditor
//                                     editor={ClassicEditor}
//                                     data={products.description}
//                                     onChange={(event, editor) => setProducts({ ...products, description: editor.getData() })}
//                                     required
//                                 />
//                             </div>

//                             <div className="flex sm:justify-end justify-center space-x-3">
//                                 <NavLink to="/admin/allproducts">
//                                     <button
//                                         type="button"
//                                         className="bg-gray-400 text-white px-3 py-1 sm:px-5 sm:py-2 rounded-lg hover:bg-gray-500 transition font-medium"
//                                     >
//                                         Cancel
//                                     </button>
//                                 </NavLink>
//                                 <button
//                                     type="submit"
//                                     className="bg-blue-600 text-white px-3 py-1 sm:px-5 sm:py-2 rounded-lg hover:bg-blue-700 transition font-medium shadow-lg"
//                                 >
//                                     Submit
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                     <ToastContainer />
//                 </main>

//             </section>
//         </>
//     );
// };

// export default AddProduct;

import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hoc from "../../../components/dashboardCompo/Hoc";
import { ArrowLeft } from "lucide-react";

const AddApi = process.env.REACT_APP_ADD_API;
const CategoryApi = process.env.REACT_APP_CATEGORY_API;

const AddProduct = () => {
  const [products, setProducts] = useState({
    name: "",
    price: "",
    image: "",
    category_id: "",
    description: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const res = await axios.get(CategoryApi);
        setData(res.data);
      } catch (error) {
        console.log("Error fetching categories:", error);
        toast.error("Failed to load categories");
      }
    };
    fetchAllData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      if (files[0]) {
        setPreviewImage(URL.createObjectURL(files[0]));
        setProducts({
          ...products,
          image: files[0],
        });
      }
    } else {
      setProducts({ ...products, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", products.name);
    formData.append("price", products.price);
    formData.append("image", products.image);
    formData.append("category_id", products.category_id);
    formData.append("description", products.description);

    try {
      await axios.post(`${AddApi}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product added successfully!");
      setTimeout(() => {
        navigate("/admin/allproducts");
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        toast.error(
          `Error: ${error.response.data.message || "Failed to add product"}`
        );
      } else {
        toast.error("Request failed. Please try again.");
      }
    }
  };

  return (
    <>
      <Hoc />
      <section id="content" className="bg-[#eeeeee]">
        <main className="p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            <button
              onClick={() => navigate("/admin/allproducts")}
              className="flex items-center text-gray-600 hover:text-blue-600 mb-4 transition-colors"
            >
              <ArrowLeft size={16} className="mr-1" />
              <span>Back to All Product</span>
            </button>
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-blue-600 rounded-full mr-3"></div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Add New Product
                  </h3>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={products.name}
                        onChange={handleChange}
                        placeholder="Enter a descriptive name"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">$</span>
                        </div>
                        <input
                          type="number"
                          name="price"
                          value={products.price}
                          onChange={handleChange}
                          placeholder="0.00"
                          className="w-full p-3 pl-7 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                          onWheel={(e) => e.target.blur()}
                          required
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        name="category_id"
                        value={products.category_id}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-white"
                        required
                      >
                        <option value="">Select a category</option>
                        {data.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image
                      </label>
                      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg py-8 px-4">
                        {previewImage ? (
                          <div className="relative">
                            <img
                              src={previewImage}
                              alt="Product preview"
                              className="w-64 h-64 object-contain rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setPreviewImage(null);
                                setProducts({ ...products, image: "" });
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <>
                            <svg
                              className="w-12 h-12 text-gray-400 mb-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              ></path>
                            </svg>
                            <div className="text-center space-y-2">
                              <h4 className="text-gray-700 font-medium">
                                Drag and drop your product image here
                              </h4>
                              <p className="text-gray-500 text-sm">or</p>
                            </div>
                            <label className="mt-2 cursor-pointer">
                              <span className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                Browse Files
                              </span>
                              <input
                                type="file"
                                name="image"
                                onChange={handleChange}
                                className="sr-only"
                                accept="image/*"
                                required
                              />
                            </label>
                            <p className="text-xs text-gray-500 mt-2">
                              Supported formats: JPG, PNG, GIF (Max 5MB)
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <p className="text-sm text-gray-500 mb-2">
                      Provide a comprehensive description of your product
                      including key features, benefits, and specifications.
                    </p>
                    <div className="border rounded-lg overflow-hidden">
                      <CKEditor
                        editor={ClassicEditor}
                        data={products.description}
                        onChange={(event, editor) =>
                          setProducts({
                            ...products,
                            description: editor.getData(),
                          })
                        }
                        config={{
                          toolbar: [
                            "heading",
                            "|",
                            "bold",
                            "italic",
                            "link",
                            "|",
                            "bulletedList",
                            "numberedList",
                            "|",
                            "blockQuote",
                            "insertTable",
                            "|",
                            "undo",
                            "redo",
                          ],
                        }}
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between mt-8">
                    <NavLink to="/admin/allproducts">
                      <button
                        type="button"
                        className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Cancel
                      </button>
                    </NavLink>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`px-5 py-2 ${
                        isLoading
                          ? "bg-blue-400"
                          : "bg-green-600 hover:bg-green-700"
                      } text-white rounded-lg transition-colors flex items-center`}
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Adding...
                        </>
                      ) : (
                        <>
                          Add Product
                          <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <ToastContainer position="top-right" autoClose={3000} />
        </main>
      </section>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default AddProduct;
