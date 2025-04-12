// import { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";

// // Replace with your actual API endpoints
// const SendOtpApi = process.env.REACT_APP_SEND_OTP_API;
// const VerifyOtpApi = process.env.REACT_APP_VERIFY_OTP_API;
// const ResetPasswordApi = process.env.REACT_APP_RESET_PASSWORD_API;

// const ForgotPassword = () => {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpExpiry, setOtpExpiry] = useState(null);
//   const [countdown, setCountdown] = useState(0);
//   const [passwords, setPasswords] = useState({
//     newPassword: "",
//     confirmPassword: "",
//   });

//   // Handle countdown timer for OTP expiry
//   useState(() => {
//     let timer;
//     if (countdown > 0) {
//       timer = setInterval(() => {
//         setCountdown((prev) => prev - 1);
//       }, 1000);
//     }
//     return () => clearInterval(timer);
//   }, [countdown]);

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");
//     setSuccessMessage("");
    
//     if (!email) {
//       setErrorMessage("Email is required");
//       return;
//     }
    
//     setIsLoading(true);
    
//     try {
//       const response = await axios.post(SendOtpApi, { email });
//       setSuccessMessage("OTP has been sent to your email");
//       setStep(2);
      
//       // Set countdown for OTP expiry (5 minutes)
//       setCountdown(300);
//       setOtpExpiry(new Date(Date.now() + 5 * 60 * 1000));
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       setErrorMessage(
//         error.response?.data?.message || 
//         "Failed to send OTP. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");
//     setSuccessMessage("");
    
//     if (!otp) {
//       setErrorMessage("OTP is required");
//       return;
//     }
    
//     setIsLoading(true);
    
//     try {
//       const response = await axios.post(VerifyOtpApi, { email, otp });
//       setSuccessMessage("OTP verified successfully");
//       setStep(3);
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//       setErrorMessage(
//         error.response?.data?.message || 
//         "Invalid OTP. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");
//     setSuccessMessage("");
    
//     if (!passwords.newPassword || !passwords.confirmPassword) {
//       setErrorMessage("Both password fields are required");
//       return;
//     }
    
//     if (passwords.newPassword !== passwords.confirmPassword) {
//       setErrorMessage("Passwords do not match");
//       return;
//     }
    
//     if (passwords.newPassword.length < 8) {
//       setErrorMessage("Password must be at least 8 characters long");
//       return;
//     }
    
//     setIsLoading(true);
    
//     try {
//       const response = await axios.post(ResetPasswordApi, {
//         email,
//         otp,
//         newPassword: passwords.newPassword
//       });
//       setSuccessMessage("Password reset successfully");
      
//       // Redirect to login page after 2 seconds
//       setTimeout(() => {
//         navigate("/admin/login");
//       }, 2000);
//     } catch (error) {
//       console.error("Error resetting password:", error);
//       setErrorMessage(
//         error.response?.data?.message || 
//         "Failed to reset password. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleResendOtp = async () => {
//     setErrorMessage("");
//     setSuccessMessage("");
//     setIsLoading(true);
    
//     try {
//       const response = await axios.post(SendOtpApi, { email });
//       setSuccessMessage("New OTP has been sent to your email");
      
//       // Reset countdown
//       setCountdown(300);
//       setOtpExpiry(new Date(Date.now() + 5 * 60 * 1000));
//     } catch (error) {
//       console.error("Error resending OTP:", error);
//       setErrorMessage(
//         error.response?.data?.message || 
//         "Failed to resend OTP. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs < 10 ? '0' + secs : secs}`;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-4">
//       <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl max-w-md w-full">
//         <div className="flex justify-center mb-6">
//           <div className="w-32 h-16 relative">
//             <img
//               src={require("../../../assets/images/e-cartLogo.png")}
//               alt="E-Cart Admin"
//               className="w-full h-full object-contain"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = "https://via.placeholder.com/128x64?text=E-Cart";
//               }}
//             />
//           </div>
//         </div>
        
//         <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">
//           {step === 1 && "Forgot Password"}
//           {step === 2 && "Verify OTP"}
//           {step === 3 && "Reset Password"}
//         </h2>
        
//         {/* Step indicators */}
//         <div className="flex justify-center mb-6">
//           <div className="flex items-center">
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>1</div>
//             <div className={`w-16 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>2</div>
//             <div className={`w-16 h-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>3</div>
//           </div>
//         </div>
        
//         {successMessage && (
//           <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-4 rounded">
//             <p className="text-green-700 text-sm">{successMessage}</p>
//           </div>
//         )}
        
//         {errorMessage && (
//           <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
//             <p className="text-red-600 text-sm">{errorMessage}</p>
//           </div>
//         )}
        
//         {/* Step 1: Email Input */}
//         {step === 1 && (
//           <form onSubmit={handleSendOtp} className="space-y-5">
//             <div>
//               <label className="block text-gray-700 font-medium mb-1.5">Email Address</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 placeholder="Enter your registered email"
//                 disabled={isLoading}
//                 required
//               />
//               <p className="mt-2 text-sm text-gray-600">
//                 We'll send a verification code to this email
//               </p>
//             </div>
            
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium disabled:opacity-70"
//             >
//               {isLoading ? (
//                 <span className="flex items-center justify-center">
//                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Sending...
//                 </span>
//               ) : (
//                 "Send Verification Code"
//               )}
//             </button>
//           </form>
//         )}
        
//         {/* Step 2: OTP Verification */}
//         {step === 2 && (
//           <form onSubmit={handleVerifyOtp} className="space-y-5">
//             <div>
//               <label className="block text-gray-700 font-medium mb-1.5">Verification Code</label>
//               <input
//                 type="text"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
//                 className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-center tracking-widest text-xl"
//                 placeholder="••••••"
//                 maxLength="6"
//                 disabled={isLoading}
//                 required
//               />
              
//               {countdown > 0 ? (
//                 <p className="mt-2 text-sm text-gray-600 text-center">
//                   Code expires in: <span className="font-medium">{formatTime(countdown)}</span>
//                 </p>
//               ) : (
//                 <p className="mt-2 text-sm text-red-600 text-center">Code expired</p>
//               )}
              
//               <div className="mt-2 text-center">
//                 <button
//                   type="button"
//                   onClick={handleResendOtp}
//                   disabled={isLoading || countdown > 0}
//                   className="text-blue-600 hover:text-blue-800 text-sm font-medium disabled:text-gray-400"
//                 >
//                   Resend Code
//                 </button>
//               </div>
//             </div>
            
//             <button
//               type="submit"
//               disabled={isLoading || countdown === 0}
//               className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium disabled:opacity-70"
//             >
//               {isLoading ? (
//                 <span className="flex items-center justify-center">
//                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Verifying...
//                 </span>
//               ) : (
//                 "Verify Code"
//               )}
//             </button>
//           </form>
//         )}
        
//         {/* Step 3: Reset Password */}
//         {step === 3 && (
//           <form onSubmit={handleResetPassword} className="space-y-5">
//             <div>
//               <label className="block text-gray-700 font-medium mb-1.5">New Password</label>
//               <input
//                 type="password"
//                 value={passwords.newPassword}
//                 onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
//                 className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 placeholder="Enter new password"
//                 disabled={isLoading}
//                 required
//               />
//               <p className="mt-1 text-xs text-gray-500">
//                 Password must be at least 8 characters long
//               </p>
//             </div>
            
//             <div>
//               <label className="block text-gray-700 font-medium mb-1.5">Confirm Password</label>
//               <input
//                 type="password"
//                 value={passwords.confirmPassword}
//                 onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
//                 className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 placeholder="Confirm new password"
//                 disabled={isLoading}
//                 required
//               />
//             </div>
            
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium disabled:opacity-70"
//             >
//               {isLoading ? (
//                 <span className="flex items-center justify-center">
//                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Resetting...
//                 </span>
//               ) : (
//                 "Reset Password"
//               )}
//             </button>
//           </form>
//         )}
        
//         <div className="mt-6 text-center text-sm text-gray-600">
//           <Link to="/admin/login" className="text-blue-600 hover:text-blue-800 font-medium">
//             Back to Login
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;