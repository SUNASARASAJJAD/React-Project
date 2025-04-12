import { useEffect, useState } from "react";
import axios from "axios";
import Hoc from "../../../components/dashboardCompo/Hoc";
import { NavLink } from "react-router-dom";
import DeleteModal from "../../../components/Modal/DeleteModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GET_API = process.env.REACT_APP_GET_API;
const DeleteApi = process.env.REACT_APP_DELETE_API;
const StatusUpdate = process.env.REACT_APP_UPDATE_PRODUCT_STATUS_API;

const ShowAllProducts = () => {
  const [product, setProduct] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "ascending" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${GET_API}`);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id) => {
    setSelectedProductId(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedProductId) return;

    try {
      await axios.delete(`${DeleteApi}${selectedProductId}`);
      toast.success("Product deleted successfully!");
      setModalOpen(false);
      setSelectedProductId(null);
      fetchProduct();
    } catch (error) {
      console.error("Error deleting product:", error.response?.data || error.message);
      toast.error("Failed to delete product. Please try again.");
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      await axios.put(`${StatusUpdate}${id}`, { status: newStatus });
      toast.success(`Product status updated to ${newStatus}!`);
      fetchProduct();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    }
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortedProducts = () => {
    let sortableProducts = [...product];
    sortableProducts = sortableProducts.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "all" || item.status === filterStatus;
      return matchesSearch && matchesStatus;
    });

    if (sortConfig.key) {
      sortableProducts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProducts;
  };

  const filteredProducts = getSortedProducts();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const totalProducts = product.length;
  const activeProducts = product.filter((item) => item.status === "active").length;
  const inactiveProducts = product.filter((item) => item.status === "inactive").length;

  return (
    <>
      <Hoc />
      <div className="bg-[#EEEEEE]">
        <section id="content">
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Products Table Card with Integrated Search Controls */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
              {/* Table Header Section with Controls */}
              <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-800">Product Inventory</h2>

                  {/* Controls */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
                    {/* Search Bar */}
                    <div className="relative w-full sm:w-64">
                      <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <i className="fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    </div>

                    {/* Dropdown */}
                    <select
                      className="w-full sm:w-40 bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition shadow-sm"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)} // Fixed typo here
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>

                    {/* Buttons */}
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <NavLink to="/admin/addproduct" className="flex-shrink-0">
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition flex items-center">
                          <i className="fa-solid fa-plus mr-2"></i>
                          <span>Add Product</span>
                        </button>
                      </NavLink>
                      <button
                        onClick={fetchProduct}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition shadow-sm"
                        title="Refresh"
                      >
                        <i className="fa-solid fa-arrows-rotate"></i>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-sm text-gray-500">
                  <div>
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} products
                  </div>
                  <div className="flex gap-3">
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">
                      Total: {totalProducts}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Active: {activeProducts}
                    </span>
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                      Inactive: {inactiveProducts}
                    </span>
                  </div>
                </div>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="flex flex-col items-center gap-3">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    <p className="text-indigo-600 font-medium">Loading products...</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Table with Fixed Header and Scrollable Body */}
                  <div className="relative max-h-[290px] overflow-y-auto">
  <table className="w-full text-sm text-left text-gray-700">
    <thead className="sticky top-0 z-10 text-xs font-medium uppercase bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
      <tr>
        <th className="px-6 py-3 cursor-pointer hover:bg-indigo-600 transition" onClick={() => requestSort("id")}>
          <div className="flex items-center">
            ID
            {sortConfig.key === "id" && (
              <i className={`fa-solid fa-sort-${sortConfig.direction === "ascending" ? "up" : "down"} ml-2`}></i>
            )}
          </div>
        </th>
        <th className="px-6 py-3">Categories</th>
        <th className="px-6 py-3">Image</th>
        <th className="px-6 py-3 cursor-pointer hover:bg-indigo-600 transition" onClick={() => requestSort("name")}>
          <div className="flex items-center">
            Name
            {sortConfig.key === "name" && (
              <i className={`fa-solid fa-sort-${sortConfig.direction === "ascending" ? "up" : "down"} ml-2`}></i>
            )}
          </div>
        </th>
        <th className="px-6 py-3 cursor-pointer hover:bg-indigo-600 transition" onClick={() => requestSort("price")}>
          <div className="flex items-center">
            Price
            {sortConfig.key === "price" && (
              <i className={`fa-solid fa-sort-${sortConfig.direction === "ascending" ? "up" : "down"} ml-2`}></i>
            )}
          </div>
        </th>
        <th className="px-6 py-3">Status</th>
        <th className="px-6 py-3 text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      {currentItems.length > 0 ? (
        currentItems.map((item) => (
          <tr key={item.id} className="bg-white border-b hover:bg-indigo-50 transition duration-200 ease-in-out">
            <td className="px-6 py-4 font-medium text-gray-900">{item.id}</td>
            <td className="px-6 py-4">
              <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                {item.category_id}
              </span>
            </td>
            <td className="px-6 py-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition group">
                <img
                  src={`/uploads/productimage/${item.image}`}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900">{item.name}</td>
            <td className="px-6 py-4 font-semibold text-gray-900">${parseFloat(item.price).toFixed(2)}</td>
            <td className="px-6 py-4">
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    item.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {item.status === "active" ? "Active" : "Inactive"}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={item.status === "active"}
                    onChange={() => toggleStatus(item.id, item.status)}
                  />
                  <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                </label>
              </div>
            </td>
            <td className="px-6 py-4 text-center">
              <div className="flex justify-center gap-3">
                <NavLink
                  to={`/admin/updateproduct/${item.id}`}
                  className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 rounded-full transition"
                  title="Edit Product"
                >
                  <i className="fa-solid fa-pencil text-lg"></i>
                </NavLink>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-red-600 hover:text-red-800 hover:bg-indigo-100 rounded-full transition"
                  title="Delete Product"
                >
                  <i className="fa-solid fa-trash text-lg"></i>
                </button>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="8" className="px-6 py-5 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="bg-gray-100 p-4 rounded-full">
                <i className="fa-solid fa-box-open text-4xl text-gray-400"></i>
              </div>
              <p className="text-gray-600 text-lg font-medium">No Products Found</p>
              <p className="text-gray-400 text-sm max-w-md">
                We couldn't find any products matching your search criteria. Try adjusting your filters or add a new product.
              </p>
              <NavLink to="/admin/addproduct">
                <button className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-sm transition flex items-center">
                  <i className="fa-solid fa-plus mr-2"></i>
                  <span>Add New Product</span>
                </button>
              </NavLink>
            </div>
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>


                  {/* Fixed Pagination */}
                  {filteredProducts.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between px-5 py-3 bg-[#F4F4FF] border-t border-gray-200">
                      <div className="flex items-center gap-2 mb-4 sm:mb-0">
                        <button
                          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="p-2 rounded-full bg-white text-indigo-600 disabled:opacity-50 hover:bg-indigo-200 transition"
                        >
                          <i className="fa-solid fa-chevron-left"></i>
                        </button>
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                          let pageNumber;
                          if (totalPages <= 5) {
                            pageNumber = i + 1;
                          } else if (currentPage <= 3) {
                            pageNumber = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNumber = totalPages - 4 + i;
                          } else {
                            pageNumber = currentPage - 2 + i;
                          }
                          return (
                            <button
                              key={i}
                              onClick={() => setCurrentPage(pageNumber)}
                              className={`w-8 h-8 rounded-full text-sm font-medium flex items-center justify-center ${
                                currentPage === pageNumber
                                  ? "bg-indigo-600 text-white"
                                  : "bg-white text-indigo-600 hover:bg-indigo-200"
                              } transition`}
                            >
                              {pageNumber}
                            </button>
                          );
                        })}
                        <button
                          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="p-2 rounded-full bg-white text-indigo-600 disabled:opacity-50 hover:bg-indigo-200 transition"
                        >
                          <i className="fa-solid fa-chevron-right"></i>
                        </button>
                      </div>
                      <div className="text-sm text-gray-500">
                        Page {currentPage} of {totalPages}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </main>
        </section>

        <DeleteModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={confirmDelete}
        />

        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </>
  );
};

export default ShowAllProducts;