// import axios from "axios";
// import { useEffect, useState } from "react";
// import { NavLink, useNavigate, useParams } from "react-router-dom";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Hoc from "../../../components/dashboardCompo/Hoc";

// const updateAPI = process.env.REACT_APP_UPDATE_API;
// const CategoryAPI = process.env.REACT_APP_CATEGORY_API;
// const GetProByIdAPI = process.env.REACT_APP_GET_BY_ID_API;

// function UpdateProducts() {
//     const [products, setProducts] = useState({
//         id: "",
//         name: "",
//         price: "",
//         image: "",
//         category_id: "",
//         description: "",
//     });

//     const [data, setData] = useState([]);
//     const navigate = useNavigate();
//     const { id } = useParams();
//     console.log(id);

//     useEffect(() => {
//         const fetchAllProducts = async () => {
//             try {
//                 const res = await axios.get(`${GetProByIdAPI}${id}`);
//                 setProducts(res.data[0]);
//             } catch (error) {
//                 console.log("Error fetching products:", error);
//             }
//         };
//         fetchAllProducts();
//     }, [id]);

//     useEffect(() => {
//         const fetchAllData = async () => {
//             try {
//                 const res = await axios.get(CategoryAPI);
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

//     const handleEditorChange = (name) => (event, editor) => {
//         const data = editor.getData();
//         setProducts((prevData) => ({
//             ...prevData,
//             [name]: data,
//         }));
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
//             const response = await axios.put(`${updateAPI}${id}`, formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             });

//             console.log("Server Response:", response.data);
//             setTimeout(() => {
//                 toast.success("Product updated successfully.");

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
//                         <h3 className="text-2xl font-semibold text-gray-800 mb-6">
//                             Update Product
//                         </h3>
//                         <form onSubmit={handleSubmit} className="space-y-6">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">
//                                         Name
//                                     </label>
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
//                                     <label className="block text-sm font-medium text-gray-700">
//                                         Price
//                                     </label>
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
//                                     <label className="block text-sm font-medium text-gray-700">
//                                         Category
//                                     </label>

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
//                                     <label className="block text-sm font-medium text-gray-700">
//                                         Image
//                                     </label>
//                                     <input
//                                         type="file"
//                                         name="image"
//                                         onChange={handleChange}
//                                         className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-blue-500 focus:border-blue-500"
//                                     />
//                                 </div>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700">
//                                     Description
//                                 </label>
//                                 <CKEditor
//                                     editor={ClassicEditor}
//                                     data={products.description}
//                                     onChange={handleEditorChange("description")}
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
// }

// export default UpdateProducts;

import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hoc from "../../../components/dashboardCompo/Hoc";
import { ArrowLeft } from "lucide-react";

const updateAPI = process.env.REACT_APP_UPDATE_API;
const CategoryAPI = process.env.REACT_APP_CATEGORY_API;
const GetProByIdAPI = process.env.REACT_APP_GET_BY_ID_API;

function UpdateProducts() {
  const [products, setProducts] = useState({
    id: "",
    name: "",
    price: "",
    image: "",
    category_id: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${GetProByIdAPI}${id}`);
        setProducts(res.data[0]);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching products:", error);
        toast.error("Failed to load product data");
        setIsLoading(false);
      }
    };
    fetchAllProducts();
  }, [id]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const res = await axios.get(CategoryAPI);
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
      // Create preview URL for the selected image
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

  const handleEditorChange = (name) => (event, editor) => {
    const data = editor.getData();
    setProducts((prevData) => ({
      ...prevData,
      [name]: data,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", products.name);
    formData.append("price", products.price);
    if (products.image) {
      formData.append("image", products.image);
    }
    formData.append("category_id", products.category_id);
    formData.append("description", products.description);

    try {
      await axios.put(`${updateAPI}${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product updated successfully.");
      setTimeout(() => {
        navigate("/admin/allproducts");
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        toast.error(
          `Error: ${error.response.data.message || "Failed to update product"}`
        );
      } else {
        toast.error("Request failed. Please try again.");
      }
    }
  };

  if (isLoading && !products.name) {
    return (
      <>
        <Hoc />
        <section id="content" className="bg-gray-50 min-h-screen">
          <main className="p-4 md:p-8">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading product data...</p>
              </div>
            </div>
          </main>
        </section>
      </>
    );
  }

  return (
    <>
      <Hoc />
      <section id="content" className="bg-[#eeeeee]">
        <main className="p-4 md:p-8">
          <button
            onClick={() => navigate("/admin/allproducts")}
            className="flex items-center text-gray-600 hover:text-blue-600 mb-4 transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span>Back to All Product</span>
          </button>
          <div className="max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-1 h-8 bg-blue-600 rounded-full mr-3"></div>
              <h3 className="text-2xl font-bold text-gray-800">
                Update Product
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={products.name}
                    onChange={handleChange}
                    placeholder="Enter Product Name"
                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
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
                      className="w-full mt-1 p-3 pl-7 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
                      onWheel={(e) => e.target.blur()}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    name="category_id"
                    value={products.category_id}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition bg-white"
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

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Product Image
                  </label>
                  <div className="mt-1 flex items-center">
                    <div className="flex-shrink-0 h-20 w-20 border rounded-md overflow-hidden bg-gray-100">
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      ) : products.image &&
                        typeof products.image === "string" ? (
                        <img
                          src={products.image}
                          alt="Current"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-gray-400">
                          No image
                        </div>
                      )}
                    </div>
                    <label className="ml-5 cursor-pointer">
                      <span className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                        Change
                      </span>
                      <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        className="sr-only"
                        accept="image/*"
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    JPG, PNG or GIF up to 5MB
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <div className="mt-1 border rounded-lg overflow-hidden">
                  <CKEditor
                    editor={ClassicEditor}
                    data={products.description}
                    onChange={handleEditorChange("description")}
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
                <p className="text-xs text-gray-500 mt-1">
                  Add a detailed description of your product
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200 flex sm:justify-end justify-center space-x-3 mt-8">
                <NavLink to="/admin/allproducts">
                  <button
                    type="button"
                    className="bg-white text-gray-700 border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 transition font-medium"
                  >
                    Cancel
                  </button>
                </NavLink>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`${
                    isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                  } text-white px-5 py-2 rounded-lg transition font-medium shadow-sm flex items-center`}
                >
                  {isLoading && (
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
                  )}
                  {isLoading ? "Updating..." : "Update Product"}
                </button>
              </div>
            </form>
          </div>
          <ToastContainer position="top-right" autoClose={3000} />
        </main>
      </section>
    </>
  );
}

export default UpdateProducts;
