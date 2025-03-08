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

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${GET_API}`);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
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
      toast.success("Deleted successfully!");

      setModalOpen(false);
      setSelectedProductId(null);
      fetchProduct();
    } catch (error) {
      console.error(
        "Error deleting product:",
        error.response?.data || error.message
      );
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

  return (
    <>
      <Hoc />
      <section id="content" className="flex justify-center">
        <main className="w-full max-w-5xl">
          {/* Add Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between pb-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 text-center sm:text-left">
              Products
            </h2>
            <NavLink to="/admin/addproduct" className="mt-2 sm:mt-0">
              <button className="bg-blue-500 text-white px-4 py-2 text-sm rounded-lg shadow-md hover:bg-blue-600 transition">
                + Add
              </button>
            </NavLink>
          </div>
          {/* Product Table */}
          <div className="rounded-xl shadow-md">
            <div className="max-h-[423px] overflow-y-auto scrollbar-hide">
              <table className="w-full table-auto">
                <thead className="bg-gray-200 z-50 text-gray-700 uppercase text-sm sticky top-0">
                  <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
                    <th className="px-4 py-3 w-16">Id</th>
                    <th className="px-4 py-3 w-24">Categories</th>
                    <th className="px-4 py-3 w-24">Image</th>
                    <th className="px-4 py-3 w-32">Name</th>
                    <th className="px-4 py-3 w-44">Description</th>
                    <th className="px-4 py-3 w-24">Price</th>
                    <th className="px-4 py-3 w-24">Status</th>
                    <th className="px-4 py-3 w-24">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {product.map((item) => (
                    <tr
                      key={item.id}
                      className="border border-b-gray-300 bg-white hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 text-center">{item.id}</td>
                      <td className="px-4 py-3 text-center">
                        {item.category_id}
                      </td>
                      <td className="px-4 py-3 flex justify-center">
                        <img
                          src={`/uploads/productimage/${item.image}`}
                          alt="product"
                          className="w-10 h-10 rounded-full border border-gray-300"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">{item.name}</td>
                      <td
                        className="px-4 py-3 text-center truncate overflow-hidden whitespace-nowrap max-w-[200px]"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />

                      <td className="px-4 py-3 text-center">{item.price}</td>
                      <td className="px-4 py-3 text-center">
                        <label className="relative inline-block w-8 h-4">
                          <input
                            type="checkbox"
                            checked={item.status === "active"}
                            onChange={() => toggleStatus(item.id, item.status)}
                            className="peer sr-only"
                          />
                          <span className="block w-full h-full bg-gray-300 rounded-full peer-focus:ring-2 peer-focus:ring-blue-500 peer-checked:bg-blue-500 transition-colors duration-300"></span>
                          <span className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-md transform peer-checked:translate-x-4 transition-transform duration-300"></span>
                        </label>
                      </td>

                      <td className="text-center space-x-1">
                        {/* Edit Button */}
                        <NavLink to={`/admin/updateproduct/${item.id}`}>
                          <button className="px-2 py-1 border text-blue-600 rounded-md hover:bg-gray-100 transition duration-300">
                            <i className="fa-solid fa-pencil text-sm"></i>
                          </button>
                        </NavLink>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="px-2 py-1 text-red-600 rounded-md border hover:bg-gray-100 transition duration-300"
                        >
                          <i className="fa-solid fa-trash text-sm"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </section>

      <DeleteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
      />

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
};

export default ShowAllProducts;


