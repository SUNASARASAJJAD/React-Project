import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Hoc from "../../../components/dashboardCompo/Hoc";
import axios from "axios";
import DeleteModal from "../../../components/Modal/DeleteModal";
import { toast, ToastContainer } from "react-toastify";
import { Pencil, Trash2 } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const GetCategoryApi = process.env.REACT_APP_CATEGORY_API;
const DeleteCategoryApi = process.env.REACT_APP_DELETE_CATEGORY_API;
const UpdateCategoryStatusApi =
  process.env.REACT_APP_UPDATE_CATEGORY_STATUS_API;

const ShowCategory = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ascending",
  });

  useEffect(() => {
    fetchAllCategories();
  }, []);

  useEffect(() => {
    // Filter categories based on search term
    if (searchTerm.trim() === "") {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter(
        (category) =>
          category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.id.toString().includes(searchTerm)
      );
      setFilteredCategories(filtered);
    }
  }, [searchTerm, categories]);

  const fetchAllCategories = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(GetCategoryApi);
      setCategories(res.data);
      setFilteredCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id) => {
    setSelectedCategoryId(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedCategoryId) return;

    try {
      await axios.delete(`${DeleteCategoryApi}/${selectedCategoryId}`);
      toast.success("Category deleted successfully!");
      setModalOpen(false);
      setSelectedCategoryId(null);
      fetchAllCategories();
    } catch (error) {
      console.error(
        "Error deleting category:",
        error.response?.data || error.message
      );
      toast.error("Failed to delete category. Please try again.");
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await axios.patch(`${UpdateCategoryStatusApi}/${id}`, {
        status: newStatus,
      });

      // Update local state to reflect the change
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === id ? { ...category, status: newStatus } : category
        )
      );

      toast.success("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status. Please try again.");
    }
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key, direction });

    const sortedData = [...filteredCategories].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setFilteredCategories(sortedData);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <span className="text-gray-400">↕</span>;
    }
    return sortConfig.direction === "ascending" ? "↑" : "↓";
  };

  const NoDataFound = () => (
    <tr className="border border-b-gray-300 bg-white">
      <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <svg
              className="w-16 h-16 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
              ></path>
            </svg>
            <p className="mt-2">No categories found</p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-3 text-blue-500 hover:text-blue-700 underline"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </td>
    </tr>
  );

  return (
    <>
      <Hoc />
      <section id="content" className="flex justify-center h-[99%]">
        <main className="w-full">
          <div className="bg-[#F1F3FF] rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Categories Management
                </h2>

                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search categories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <svg
                      className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>

                  <NavLink to="/admin/addcategory" className="block">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out w-full sm:w-auto">
                      <span className="flex items-center justify-center">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          ></path>
                        </svg>
                        Add Category
                      </span>
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="align-middle inline-block min-w-full">
                <div className="max-h-[calc(100vh-280px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#7163F2] sticky top-0 z-10 text-white">
                      <tr>
                        <th
                          className="px-8 py-3 text-center text-xs font-medium hover:bg-indigo-600 transition uppercase tracking-wider cursor-pointer hover:bg-gray-200 w-16"
                          onClick={() => handleSort("id")}
                        >
                          <div className="flex items-center">
                            ID {getSortIcon("id")}
                          </div>
                        </th>
                        <th className="px-8 py-3 text-center text-xs font-medium hover:bg-indigo-600 transition uppercase tracking-wider w-24">
                          Image
                        </th>
                        <th
                          className="px-8 py-3 text-center text-xs font-medium hover:bg-indigo-600 transition uppercase tracking-wider cursor-pointer "
                          onClick={() => handleSort("title")}
                        >
                          <div className="flex items-center">
                            Title {getSortIcon("title")}
                          </div>
                        </th>
                        <th className="px-8 py-3 text-center text-xs font-medium hover:bg-indigo-600 transition uppercase tracking-wider w-24">
                          Create At
                        </th>
                        <th className="px-8 py-3 text-center text-xs font-medium hover:bg-indigo-600 transition uppercase tracking-wider w-24">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredCategories.length === 0 ? (
                        <NoDataFound />
                      ) : (
                        filteredCategories.map((category) => (
                          <tr
                            key={category.id}
                            className="hover:bg-blue-50 transition-colors duration-300 group border-b border-gray-200"
                          >
                            <td className="px-8 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                              <span className="bg-gray-100 text-gray-700 rounded-md">
                                #{category.id}
                              </span>
                            </td>
                            <td className="px-8 py-4 whitespace-nowrap">
                              <div className="h-14 w-14 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                                <img
                                  src={`/uploads/categoryimage/${category.image}`}
                                  alt={category.title}
                                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                      "https://via.placeholder.com/60?text=No+Image";
                                  }}
                                />
                              </div>
                            </td>
                            <td className="px-8 py-4 whitespace-nowrap">
                              <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-900">
                                  {category.title}
                                </span>
                                <span className="text-xs text-gray-500 mt-1">
                                  Added on {new Date().toLocaleDateString()}
                                </span>
                              </div>
                            </td>
                            <td className="px-8 py-4 whitespace-nowrap">
                              <label className="relative inline-flex items-center cursor-pointer">
                              
                               {category.created_at}
                              </label>
                            </td>

                            <td className="px-6 py-4 w-1/6">
                              <div className="flex justify-center space-x-2">
                                <NavLink
                                  to={`/admin/updatecategory/${category.id}`}
                                >
                                  <button
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    aria-label="Edit"
                                  >
                                    <Pencil size={18} />
                                  </button>
                                </NavLink>
                                <button
                                  onClick={() => handleDelete(category.id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  aria-label="Delete"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>

                            {/* 
                            <td className="px-8 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                                <NavLink
                                  to={`/admin/updatecategory/${category.id}`}
                                >
                                  <button className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-2 rounded-lg transition-colors duration-200 hover:shadow-md">
                                    <svg
                                      className="w-5 h-5"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                      ></path>
                                    </svg>
                                  </button>
                                </NavLink>
                                <button
                                  onClick={() => handleDelete(category.id)}
                                  className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2 rounded-lg transition-colors duration-200 hover:shadow-md"
                                >
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    ></path>
                                  </svg>
                                </button>
                              </div>
                            </td> */}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className=" px-6 py-3 border-t bg-[#F4F4FF] border-gray-200">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Showing {filteredCategories.length} of {categories.length}{" "}
                  categories
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={fetchAllCategories}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      ></path>
                    </svg>
                    Refresh
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>

      <DeleteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone."
      />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default ShowCategory;
