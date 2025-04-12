import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hoc from "../../../components/dashboardCompo/Hoc";
import { ArrowLeft } from "lucide-react";

const UpdateCategoryAPI = process.env.REACT_APP_UPDATE_CATEGORY_API;
const GetCategoryByIdAPI = process.env.REACT_APP_GET_CATEGORY_BY_ID_API;

const UpdateCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [category, setCategory] = useState({
    image: "",
    title: "",
  });

  useEffect(() => {
    const fetchCategory = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${GetCategoryByIdAPI}${id}`);
        setCategory(res.data[0]);
        if (res.data[0].image && typeof res.data[0].image === "string") {
          setPreviewUrl(res.data[0].image);
        }
      } catch (error) {
        console.log("Error fetching category:", error);
        toast.error("Failed to load category data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      const file = files[0];
      setCategory({
        ...category,
        image: file,
      });

      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    } else {
      setCategory({ ...category, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("image", category.image);
    formData.append("title", category.title);

    try {
      await axios.put(`${UpdateCategoryAPI}/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Category updated successfully!");
      setTimeout(() => {
        navigate("/admin/allcategories");
      }, 2000);
    } catch (error) {
      if (error.response) {
        toast.error(
          `Error: ${error.response.data.message || "Failed to update category"}`
        );
      } else {
        toast.error("Network error. Please check your connection.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/allcategories");
  };

  return (
    <>
      <Hoc />
      <section id="content" className="bg-[#EEEEEE] ">
        <main className="w-full py-8 px-4">
          <div className="w-full mx-auto">
            <button
              onClick={() => navigate("/admin/allcategories")}
              className="flex items-center text-gray-600 hover:text-blue-600 mb-4 transition-colors"
            >
              <ArrowLeft size={16} className="mr-1" />
              <span>Back to All Categories</span>
            </button>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-full">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-3 px-6">
                <h2 className="text-xl font-bold text-white">
                  Update Category
                </h2>
                <p className="text-blue-100 text-sm">
                  Modify category details and save changes
                </p>
              </div>

              {isLoading && !category.title ? (
                <div className="p-8 flex justify-center">
                  <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-4 py-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 space-y-6 w-full">
                  <div className="space-y-2">
                    <label
                      htmlFor="title"
                      className="text-gray-700 font-medium block"
                    >
                      Category Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={category.title}
                      onChange={handleChange}
                      placeholder="Enter category title"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="image"
                      className="text-gray-700 font-medium block"
                    >
                      Category Image
                    </label>
                    <div className="flex items-center space-x-4">
                      {previewUrl && (
                        <div className="relative w-24 h-24 border rounded-md overflow-hidden">
                          <img
                            src={previewUrl}
                            alt="Category preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <input
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        className="w-full border-2 border-dashed border-gray-300 rounded-md px-4 py-4 text-center hover:border-blue-500 transition-all"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </main>
      </section>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default UpdateCategory;
