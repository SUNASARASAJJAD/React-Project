import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Hoc from "../../../components/dashboardCompo/Hoc";
import axios from "axios";
import DeleteModal from "../../../components/Modal/DeleteModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GetCategoryApi = process.env.REACT_APP_CATEGORY_API;
const DeleteCategoryApi = process.env.REACT_APP_DELETE_CATEGORY_API;

const ShowCategory = () => {
  const [product, setProduct] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const res = await axios.get(GetCategoryApi);
      setProduct(res.data);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  const handleDelete = (id) => {
    setSelectedProductId(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedProductId) return;

    try {
      await axios.delete(`${DeleteCategoryApi}/${selectedProductId}`);
      toast.success("Deleted successfully!");
      setModalOpen(false);
      setSelectedProductId(null);
      fetchAllData();
    } catch (error) {
      console.error(
        "Error deleting category:",
        error.response?.data || error.message
      );
      toast.error("Failed to delete category. Please try again.");
    }
  };

  return (
    <>
      <Hoc />
      <section id="content" className="flex justify-center">
        <main className="w-full max-w-5xl">
          <div className="flex flex-col sm:flex-row items-center justify-between pb-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 text-center sm:text-left">
              Categories
            </h2>
            <NavLink to="/admin/addcategory" className="mt-2 sm:mt-0">
              <button className="bg-blue-500 text-white px-4 py-2 text-sm rounded-lg shadow-md hover:bg-blue-600 transition">
                + Add
              </button>
            </NavLink>
          </div>

         
          <div className="rounded-xl shadow-md">
            <div className="max-h-[423px] overflow-y-auto scrollbar-hide">
              <table className="w-full table-auto">
                <thead className="bg-gray-200 z-50 text-gray-700 uppercase text-sm sticky top-0">
                  <tr>
                    <th className="px-4 py-3">Id</th>
                    <th className="px-4 py-3">Image</th>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {product.map((item) => (
                    <tr
                      key={item.id}
                      className="border border-b-gray-300 bg-white hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 text-center">{item.id}</td>
                      <td className="px-4 py-3 flex justify-center">
                        <img
                          src={`/uploads/categoryimage/${item.image}`}
                          alt="product"
                          className="w-[60px] h-[60px] object-cover rounded-full border border-gray-300"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">{item.title}</td>
                      <td className="px-4 py-3 text-center">
                        <label className="relative inline-block w-10 h-5">
                          <input type="checkbox" className="peer sr-only" />
                          <span className="block w-full h-full bg-gray-300 rounded-full peer-checked:bg-blue-500 transition-colors duration-300"></span>
                          <span className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-md transform peer-checked:translate-x-5 transition-transform duration-300"></span>
                        </label>
                      </td>
                      <td className="px-4 py-3 text-center space-x-2">
                        <NavLink to={`/admin/updatecategory/${item.id}`}>
                          <button className="px-2 py-1 border text-blue-600 rounded-md hover:bg-gray-100 transition duration-300">
                            <i className="fa-solid fa-pencil text-sm"></i>
                          </button>
                        </NavLink>
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

export default ShowCategory;
