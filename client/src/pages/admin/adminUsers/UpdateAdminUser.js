import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Hoc from "../../../components/dashboardCompo/Hoc";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ArrowRight } from "lucide-react";

const updateAdminUserAPI = process.env.REACT_APP_UPDATE_ADMIN_USER_API;
const getAdminUserByIdAPI = process.env.REACT_APP_ADMIN_USER_BY_ID_API;

const UpdateAdminUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [adminUser, setAdminUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Fetch admin user data
  const fetchAdminUser = async () => {
    setIsFetching(true);
    try {
      const res = await axios.get(`${getAdminUserByIdAPI}/${id}`);
      if (res.data && res.data.length > 0) {
        // Set password to empty to avoid showing any password in the form
        const userData = { ...res.data[0], password: "" };
        setAdminUser(userData);
      } else {
        toast.error("Admin user not found");
        setTimeout(() => navigate("/admin/alladminusers"), 2000);
      }
    } catch (error) {
      console.error("Error fetching admin user details", error);
      toast.error("Failed to fetch admin user details");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchAdminUser();
  }, [id]);

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!adminUser.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!adminUser.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(adminUser.email)) {
      newErrors.email = "Email is invalid";
    }

    // Only validate password if it's provided (allow empty passwords for updates)
    if (adminUser.password && adminUser.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminUser((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for the field being edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Only send password if it was changed
      const dataToUpdate = {
        ...adminUser,
        password: adminUser.password.trim() ? adminUser.password : undefined,
      };

      await axios.put(`${updateAdminUserAPI}/${id}`, dataToUpdate, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success("Admin user updated successfully!");
      setTimeout(() => {
        navigate("/admin/alladminusers");
      }, 1500);
    } catch (error) {
      console.error(
        "Error updating admin user:",
        error.response?.data || error.message
      );
      const errorMessage =
        error.response?.data?.message ||
        "Failed to update admin user. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Hoc />
        </div>
        <section id="content" className="bg-[#EEEEEE] w-full mt-[20px]">
          <div className="px-8 py-8 pt-16">
            {/* Page Header */}
            <div className="flex justify-between items-center">
              <div className="mb-5">
                <h1 className="text-2xl font-bold text-gray-800">
                  Update Admin User
                </h1>
                <p className="text-gray-600">
                  Update account information for the selected admin user
                </p>
              </div>
              <button
                onClick={() => navigate("/admin/alladminusers")}
                className="flex items-center text-gray-600 hover:text-blue-600 mb-3 transition-colors"
              >
                <span>Back to All Admins</span>
                <ArrowRight size={16} className="ml-1" />
              </button>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Section */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                    <h2 className="text-xl font-bold text-white">
                      Account Information
                    </h2>
                    <p className="text-blue-100 text-sm">
                      Fields marked with * are required
                    </p>
                  </div>

                  {isFetching ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                        <p className="text-gray-500">Loading user data...</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 md:col-span-2">
                          <label
                            htmlFor="username"
                            className="text-gray-700 font-medium block"
                          >
                            Username <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Enter username"
                            value={adminUser.username}
                            onChange={handleChange}
                            className={`border ${
                              errors.username
                                ? "border-red-500"
                                : "border-gray-300"
                            } p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                          />
                          {errors.username && (
                            <p className="text-red-500 text-sm">
                              {errors.username}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <label
                            htmlFor="email"
                            className="text-gray-700 font-medium block"
                          >
                            Email Address{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter email address"
                            value={adminUser.email}
                            onChange={handleChange}
                            className={`border ${
                              errors.email
                                ? "border-red-500"
                                : "border-gray-300"
                            } p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm">
                              {errors.email}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <label
                            htmlFor="password"
                            className="text-gray-700 font-medium block"
                          >
                            Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              id="password"
                              placeholder="Leave empty to keep current password"
                              value={adminUser.password}
                              onChange={handleChange}
                              className={`border ${
                                errors.password
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 transition-all`}
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                                    clipRule="evenodd"
                                  />
                                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                  <path
                                    fillRule="evenodd"
                                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </button>
                          </div>
                          {errors.password && (
                            <p className="text-red-500 text-sm">
                              {errors.password}
                            </p>
                          )}
                          <p className="text-gray-500 text-sm">
                            Leave empty to keep the current password
                          </p>
                        </div>
                      </div>

                      <div className="mt-8 pt-5 border-t border-gray-200">
                        <div className="flex justify-end space-x-4">
                          <button
                            type="button"
                            onClick={() => navigate("/admin/alladminusers")}
                            className="px-6 py-3 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                            disabled={isLoading}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium flex justify-center items-center min-w-[120px]"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <>
                                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                                Updating...
                              </>
                            ) : (
                              "Save Changes"
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              {/* Info Panel */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
                  <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-4">
                    <h3 className="text-lg font-bold text-white">
                      Information
                    </h3>
                  </div>
                  <div className="p-6 space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        About Admin Users
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Admin users have access to the dashboard and can manage
                        various aspects of the system based on their
                        permissions.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Password Requirements
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-start">
                          <svg
                            className="h-5 w-5 text-green-500 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          At least 6 characters long
                        </li>
                        <li className="flex items-start">
                          <svg
                            className="h-5 w-5 text-green-500 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Combination of letters, numbers, and symbols
                          recommended
                        </li>
                        <li className="flex items-start">
                          <svg
                            className="h-5 w-5 text-green-500 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Avoid using easily guessable information
                        </li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-blue-800">
                            If you don't want to change the password, simply
                            leave the password field empty.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default UpdateAdminUser;
