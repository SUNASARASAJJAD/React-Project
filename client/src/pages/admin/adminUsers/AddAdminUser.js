import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { UserPlus, ArrowLeft } from 'lucide-react';
import Hoc from '../../../components/dashboardCompo/Hoc';

const addAdminUserAPI = process.env.REACT_APP_ADD_ADMIN_USER_API;

const AddAdminUser = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // Validation function
    const validateForm = () => {
        const newErrors = {};
        
        // Username validation
        if (!formData.username.trim()) {
            newErrors.username = "Username is required";
        } else if (formData.username.length < 3) {
            newErrors.username = "Username must be at least 3 characters";
        }
        
        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }
        
        // Password validation
        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddAdminUser = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            const response = await axios.post(addAdminUserAPI, formData);
            
            toast.success(response.data.message || "Admin user added successfully!");
            setTimeout(() => {
                navigate("/admin/alladminusers");
            }, 1500);
        } catch (error) {
            if (error.response?.status === 400) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong. Please try again.");
                console.error("Error adding user:", error);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    return (
        <>
            <Hoc />
            <section id="content" className="bg-[#EEEEEE] w-full flex items-center justify-center px-4">
                <main className="w-full max-w-6xl">
                    <div className="w-full">
                        <button 
                            onClick={() => navigate("/admin/alladminusers")}
                            className="flex items-center text-gray-600 hover:text-blue-600 mb-3 transition-colors"
                        >
                            <ArrowLeft size={16} className="mr-1" />
                            <span>Back to All Admins</span>
                        </button>
                        
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 to-blue-400 px-4 py-3">
                                <h2 className="text-2xl font-bold text-white flex items-center justify-center">
                                    <UserPlus className="mr-2" size={24} />
                                    Create Admin Account
                                </h2>
                            </div>
                            
                            <form onSubmit={handleAddAdminUser} className="p-6 space-y-4">
                                {['username', 'email', 'password'].map((field, index) => (
                                    <div key={index} className="space-y-2">
                                        <label htmlFor={field} className="text-sm font-medium text-gray-700 capitalize">
                                            {field}
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={field === 'password' && !showPassword ? 'password' : 'text'}
                                                name={field}
                                                id={field}
                                                placeholder={field === 'email' ? 'johndoe@example.com' : field}
                                                value={formData[field]}
                                                onChange={handleInputChange}
                                                className={`w-full rounded-lg border ${errors[field] ? 'border-red-500' : 'border-gray-300'} p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-3`}
                                            />
                                        </div>
                                        {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
                                    </div>
                                ))}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 px-4 rounded-lg font-medium transition-all ${
                                        isSubmitting 
                                            ? 'opacity-70 cursor-not-allowed' 
                                            : 'hover:from-blue-700 hover:to-blue-500 hover:shadow-md'
                                    }`}
                                >
                                    {isSubmitting ? 'Processing...' : 'Create Admin Account'}
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
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
                />
            </section>
        </>
    );
};

export default AddAdminUser;
