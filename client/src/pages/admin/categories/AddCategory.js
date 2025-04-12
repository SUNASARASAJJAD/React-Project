// import { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Hoc from "../../../components/dashboardCompo/Hoc";
// import { Eye, EyeOff, UserPlus, AtSign, Lock, ArrowLeft } from "lucide-react";

// const AddCategoryAPI = process.env.REACT_APP_ADD_CATEGORY_API;

// const AddCategory = () => {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [imagePreview, setImagePreview] = useState(null);
//   const [category, setCategory] = useState({ image: null, title: "" });

//   const validateForm = () => {
//     const newErrors = {};
//     if (!category.image) newErrors.image = "Please select an image";
//     if (!category.title.trim()) newErrors.title = "Title is required";
//     else if (category.title.length > 50)
//       newErrors.title = "Title must be less than 50 characters";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "image" && files && files[0]) {
//       const file = files[0];
//       const fileType = file.type.split("/")[0];
//       if (fileType !== "image")
//         return setErrors({
//           ...errors,
//           image: "Please select a valid image file",
//         });
//       if (file.size > 2 * 1024 * 1024)
//         return setErrors({
//           ...errors,
//           image: "Image size should not exceed 2MB",
//         });
//       setImagePreview(URL.createObjectURL(file));
//       setCategory({ ...category, image: file });
//     } else {
//       setCategory({ ...category, [name]: value });
//     }

//     if (errors[name]) setErrors({ ...errors, [name]: undefined });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     setIsLoading(true);

//     const formData = new FormData();
//     formData.append("image", category.image);
//     formData.append("title", category.title);

//     try {
//       await axios.post(AddCategoryAPI, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       toast.success("Category added successfully!");
//       setTimeout(() => navigate("/admin/allcategories"), 1500);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to add category");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <Hoc />
//       <section id="content">
//         <main className="flex-1 flex justify-center items-center bg-[#EEEEEE] py-8">
//           <div className="w-full max-w-lg px-4">
//             <button
//               onClick={() => navigate("/admin/allcategories")}
//               className="flex items-center text-gray-600 hover:text-blue-600 mb-3 transition-colors"
//             >
//               <ArrowLeft size={16} className="mr-1" />
//               <span>Back to All Categories</span>
//             </button>
//             <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//               <div className="bg-blue-600 px-6 py-4">
//                 <h2 className="text-xl font-bold text-white">
//                   Add New Category
//                 </h2>
//                 <p className="text-blue-100 text-sm">
//                   Create a new product category
//                 </p>
//               </div>
//               <form onSubmit={handleSubmit} className="p-6 space-y-6">
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="title"
//                     className="text-gray-700 font-medium block"
//                   >
//                     Category Title
//                   </label>
//                   <input
//                     type="text"
//                     name="title"
//                     id="title"
//                     placeholder="Enter category title"
//                     value={category.title}
//                     onChange={handleChange}
//                     className={`border ${
//                       errors.title ? "border-red-500" : "border-gray-300"
//                     } p-3 rounded-md w-full`}
//                   />
//                   {errors.title && (
//                     <p className="text-red-500 text-sm">{errors.title}</p>
//                   )}
//                 </div>
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="image"
//                     className="text-gray-700 font-medium block"
//                   >
//                     Category Image
//                   </label>
//                   <input
//                     type="file"
//                     name="image"
//                     id="image"
//                     accept="image/*"
//                     onChange={handleChange}
//                     className={`border ${
//                       errors.image ? "border-red-500" : "border-gray-300"
//                     } p-3 rounded-md w-full`}
//                   />
//                   {imagePreview && (
//                     <img
//                       src={imagePreview}
//                       alt="Preview"
//                       className="h-40 mt-2 rounded-md"
//                     />
//                   )}
//                   {errors.image && (
//                     <p className="text-red-500 text-sm">{errors.image}</p>
//                   )}
//                 </div>
//                 <div className="flex space-x-4 pt-4">
//                   <Link
//                     to="/admin/allcategories"
//                     className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-md hover:bg-gray-300 text-center"
//                   >
//                     Cancel
//                   </Link>
//                   <button
//                     type="submit"
//                     className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 flex justify-center items-center"
//                     disabled={isLoading}
//                   >
//                     {isLoading ? "Saving..." : "Add Category"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </main>
//       </section>
//       <ToastContainer position="top-right" autoClose={3000} />
//     </>
//   );
// };

// export default AddCategory;
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hoc from "../../../components/dashboardCompo/Hoc";
import { Eye, EyeOff, UserPlus, AtSign, Lock, ArrowLeft } from "lucide-react";

const AddCategoryAPI = process.env.REACT_APP_ADD_CATEGORY_API;

const AddCategory = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [category, setCategory] = useState({ image: null, title: "" });

  const validateForm = () => {
    const newErrors = {};
    if (!category.image) newErrors.image = "Please select an image";
    if (!category.title.trim()) newErrors.title = "Title is required";
    else if (category.title.length > 50)
      newErrors.title = "Title must be less than 50 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      const file = files[0];
      const fileType = file.type.split("/")[0];
      if (fileType !== "image")
        return setErrors({
          ...errors,
          image: "Please select a valid image file",
        });
      if (file.size > 2 * 1024 * 1024)
        return setErrors({
          ...errors,
          image: "Image size should not exceed 2MB",
        });
      setImagePreview(URL.createObjectURL(file));
      setCategory({ ...category, image: file });
    } else {
      setCategory({ ...category, [name]: value });
    }

    if (errors[name]) setErrors({ ...errors, [name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append("image", category.image);
    formData.append("title", category.title);

    try {
      await axios.post(AddCategoryAPI, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Category added successfully!");
      setTimeout(() => navigate("/admin/allcategories"), 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add category");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Hoc />
      <section id="content">
        <main className="flex-1 flex justify-center items-center bg-[#EEEEEE] py-8">
          <div className="w-full max-w-7xl px-4">
            <button
              onClick={() => navigate("/admin/allcategories")}
              className="flex items-center text-gray-600 hover:text-blue-600 mb-3 transition-colors"
            >
              <ArrowLeft size={16} className="mr-1" />
              <span>Back to All Categories</span>
            </button>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-blue-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Add New Category</h2>
                <p className="text-blue-100 text-sm">Create a new product category</p>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-gray-700 font-medium block">
                    Category Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter category title"
                    value={category.title}
                    onChange={handleChange}
                    className={`border ${errors.title ? "border-red-500" : "border-gray-300"} p-3 rounded-md w-full`}
                  />
                  {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="image" className="text-gray-700 font-medium block">
                    Category Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    onChange={handleChange}
                    className={`border ${errors.image ? "border-red-500" : "border-gray-300"} p-3 rounded-md w-full`}
                  />
                  {imagePreview && <img src={imagePreview} alt="Preview" className="h-40 mt-2 rounded-md" />}
                  {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                </div>
                <div className="flex space-x-4 pt-4">
                  <Link
                    to="/admin/allcategories"
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-md hover:bg-gray-300 text-center"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 flex justify-center items-center"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Add Category"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </section>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default AddCategory;