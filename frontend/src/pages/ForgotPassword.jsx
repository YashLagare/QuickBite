// import axios from 'axios';
// import React, { useState } from 'react'
// import { IoIosArrowRoundBack } from "react-icons/io";
// import { useNavigate } from 'react-router-dom';
// import { serverUrl } from '../App';
// import { ClipLoader } from 'react-spinners';
// function ForgotPassword() {
//   const [step, setStep] = useState(1)
//   const [email,setEmail]=useState("")
//   const [otp,setOtp]=useState("")
//   const [newPassword,setNewPassword]=useState("")
//   const [confirmPassword,setConfirmPassword]=useState("")
//   const [err,setErr]=useState("")
//   const navigate=useNavigate()
// const [loading,setLoading]=useState(false)
//   const handleSendOtp=async () => {
//     setLoading(true)
//     try {
//       const result=await axios.post(`${serverUrl}/api/auth/send-otp`,{email},{withCredentials:true})
//       console.log(result)
//       setErr("")
//       setStep(2)
//       setLoading(false)
//     } catch (error) {
//        setErr(error.response.data.message)
//        setLoading(false)
//     }
//   }
//   const handleVerifyOtp=async () => {
//       setLoading(true)
//     try {
//       const result=await axios.post(`${serverUrl}/api/auth/verify-otp`,{email,otp},{withCredentials:true})
//       console.log(result)
//       setErr("")
//       setStep(3)
//         setLoading(false)
//     } catch (error) {
//         setErr(error?.response?.data?.message)
//           setLoading(false)
//     }
//   }
//   const handleResetPassword=async () => {
//     if(newPassword!=confirmPassword){
//       return null
//     }
//     setLoading(true)
//     try {
//       const result=await axios.post(`${serverUrl}/api/auth/reset-password`,{email,newPassword},{withCredentials:true})
//       setErr("")
//       console.log(result)
//         setLoading(false)
//       navigate("/signin")
//     } catch (error) {
//      setErr(error?.response?.data?.message)
//        setLoading(false)
//     }
//   }
//   return (
//     <div className='flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]'>
//       <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>
//         <div className='flex items-center  gap-4 mb-4'>
//           <IoIosArrowRoundBack size={30} className='text-[#ff4d2d] cursor-pointer' onClick={()=>navigate("/signin")}/>
//           <h1 className='text-2xl font-bold text-center text-[#ff4d2d]'>Forgot Password</h1>
//         </div>
//         {step == 1
//           &&
//           <div>
//  <div className='mb-6'>
//                     <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
//                     <input type="email" className='w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none  ' placeholder='Enter your Email' onChange={(e)=>setEmail(e.target.value)} value={email} required/>
//                 </div>
//                 <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleSendOtp} disabled={loading}>
//                 {loading?<ClipLoader size={20} color='white'/>:"Send Otp"}
//             </button>
//                  {err && <p className='text-red-500 text-center my-[10px]'>*{err}</p>}
//           </div>}

//          {step == 2
//           &&
//           <div>
//  <div className='mb-6'>
//                     <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>OTP</label>
//                     <input type="email" className='w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none  ' placeholder='Enter OTP' onChange={(e)=>setOtp(e.target.value)} value={otp} required/>
//                 </div>
//                 <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleVerifyOtp} disabled={loading}>
//                 {loading?<ClipLoader size={20} color='white'/>:"Verify"}
//             </button>
//                 {err && <p className='text-red-500 text-center my-[10px]'>*{err}</p>}
//           </div>}
//           {step == 3
//           &&
//           <div>
//  <div className='mb-6'>
//                     <label htmlFor="newPassword" className='block text-gray-700 font-medium mb-1'>New Password</label>
//                     <input type="email" className='w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none  ' placeholder='Enter New Password' onChange={(e)=>setNewPassword(e.target.value)} value={newPassword}/>
//                 </div>
//                 <div className='mb-6'>
//                     <label htmlFor="ConfirmPassword" className='block text-gray-700 font-medium mb-1'>Confirm Password</label>
//                     <input type="email" className='w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none  ' placeholder='Confirm Password' onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} required/>
//                 </div>
//                 <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleResetPassword} disabled={loading}>
//                 {loading?<ClipLoader size={20} color='white'/>:"Reset Password"}
//             </button>
//                 {err && <p className='text-red-500 text-center my-[10px]'>*{err}</p>}
//           </div>}
//       </div>
//     </div>
//   )
// }

// export default ForgotPassword


import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaCheckCircle, FaEnvelope, FaKey, FaLock } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { serverUrl } from '../App';

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validation functions
  const validateEmail = () => {
    const newErrors = {};
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOtp = () => {
    const newErrors = {};
    
    if (!otp.trim()) {
      newErrors.otp = "OTP is required";
    } else if (otp.length !== 4) {
      newErrors.otp = "OTP must be 4 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswords = () => {
    const newErrors = {};
    
    if (!newPassword) {
      newErrors.newPassword = "Password is required";
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async () => {
    if (!validateEmail()) {
      toast.error("Please enter a valid email");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${serverUrl}/api/auth/send-otp`, { email: email.trim() }, { withCredentials: true });
      toast.success("OTP sent to your email!");
      setErrors({});
      setStep(2);
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to send OTP";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!validateOtp()) {
      toast.error("Please enter a valid OTP");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${serverUrl}/api/auth/verify-otp`, { email, otp }, { withCredentials: true });
      toast.success("OTP verified successfully!");
      setErrors({});
      setStep(3);
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Invalid OTP";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!validatePasswords()) {
      toast.error("Please check your passwords");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${serverUrl}/api/auth/reset-password`, { email, newPassword }, { withCredentials: true });
      toast.success("Password reset successfully!");
      setErrors({});
      setTimeout(() => navigate("/signin"), 1000);
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to reset password";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Clear errors on input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
    if (errors.otp) setErrors(prev => ({ ...prev, otp: "" }));
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    if (errors.newPassword) setErrors(prev => ({ ...prev, newPassword: "" }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: "" }));
  };

  return (
    <div className='min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-[#fff7f3] via-[#fffdfb] to-[#ffece6]'>
      {/* Decorative blur elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>

      {/* Back button - floating */}
      <button
        className='fixed top-6 left-6 z-20 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border border-orange-100'
        onClick={() => navigate("/signin")}
        aria-label="Go back"
      >
        <IoIosArrowRoundBack size={24} className='text-orange-500' />
      </button>

      <div className='relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg w-full max-w-md p-8 border border-orange-100'>
        {/* Header */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full mb-4'>
            <FaKey className='text-orange-500 text-2xl' />
          </div>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>Forgot Password</h1>
          <p className='text-gray-600 text-sm'>
            {step === 1 && "We'll send you an OTP to reset your password"}
            {step === 2 && "Enter the 6-digit OTP sent to your email"}
            {step === 3 && "Create a new strong password"}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className='flex items-center justify-center gap-2 mb-8'>
          <div className={`h-2 w-2 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-orange-500 w-8' : 'bg-gray-300'}`}></div>
          <div className={`h-2 w-2 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-orange-500 w-8' : 'bg-gray-300'}`}></div>
          <div className={`h-2 w-2 rounded-full transition-all duration-300 ${step >= 3 ? 'bg-orange-500 w-8' : 'bg-gray-300'}`}></div>
        </div>

        {/* Step 1: Email */}
        {step === 1 && (
          <div className='space-y-6'>
            <div>
              <label htmlFor="email" className='block text-gray-700 font-medium mb-2'>
                Email Address
              </label>
              <div className='relative'>
                <FaEnvelope className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                <input
                  type="email"
                  id="email"
                  className={`w-full bg-white/70 border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.email 
                      ? 'border-red-400 focus:ring-red-400' 
                      : 'border-gray-200 focus:ring-orange-400'
                  }`}
                  placeholder='Enter your email'
                  onChange={handleEmailChange}
                  value={email}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendOtp()}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <button
              className='w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center'
              onClick={handleSendOtp}
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} color='white' /> : "Send OTP"}
            </button>
          </div>
        )}

        {/* Step 2: OTP */}
        {step === 2 && (
          <div className='space-y-6'>
            <div>
              <label htmlFor="otp" className='block text-gray-700 font-medium mb-2'>
                Enter OTP
              </label>
              <div className='relative'>
                <FaCheckCircle className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                <input
                  type="text"
                  id="otp"
                  className={`w-full bg-white/70 border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 transition-all duration-200 text-center text-2xl tracking-widest font-bold ${
                    errors.otp 
                      ? 'border-red-400 focus:ring-red-400' 
                      : 'border-gray-200 focus:ring-orange-400'
                  }`}
                  placeholder='000000'
                  onChange={handleOtpChange}
                  value={otp}
                  maxLength={6}
                  onKeyPress={(e) => e.key === 'Enter' && handleVerifyOtp()}
                />
              </div>
              {errors.otp && (
                <p className="text-xs text-red-500 mt-1">{errors.otp}</p>
              )}
              <p className='text-xs text-gray-500 mt-2 text-center'>
                Sent to {email}
              </p>
            </div>

            <div className='flex gap-3'>
              <button
                className='flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-300 transition-all duration-300'
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button
                className='flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center'
                onClick={handleVerifyOtp}
                disabled={loading}
              >
                {loading ? <ClipLoader size={20} color='white' /> : "Verify OTP"}
              </button>
            </div>

            <button
              className='w-full text-orange-500 hover:text-orange-600 font-medium text-sm transition-colors'
              onClick={handleSendOtp}
            >
              Resend OTP
            </button>
          </div>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <div className='space-y-6'>
            <div>
              <label htmlFor="newPassword" className='block text-gray-700 font-medium mb-2'>
                New Password
              </label>
              <div className='relative'>
                <FaLock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                <input
                  type="password"
                  id="newPassword"
                  className={`w-full bg-white/70 border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.newPassword 
                      ? 'border-red-400 focus:ring-red-400' 
                      : 'border-gray-200 focus:ring-orange-400'
                  }`}
                  placeholder='Enter new password'
                  onChange={handleNewPasswordChange}
                  value={newPassword}
                />
              </div>
              {errors.newPassword && (
                <p className="text-xs text-red-500 mt-1">{errors.newPassword}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className='block text-gray-700 font-medium mb-2'>
                Confirm Password
              </label>
              <div className='relative'>
                <FaLock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                <input
                  type="password"
                  id="confirmPassword"
                  className={`w-full bg-white/70 border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.confirmPassword 
                      ? 'border-red-400 focus:ring-red-400' 
                      : 'border-gray-200 focus:ring-orange-400'
                  }`}
                  placeholder='Confirm new password'
                  onChange={handleConfirmPasswordChange}
                  value={confirmPassword}
                  onKeyPress={(e) => e.key === 'Enter' && handleResetPassword()}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              className='w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center'
              onClick={handleResetPassword}
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} color='white' /> : "Reset Password"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;