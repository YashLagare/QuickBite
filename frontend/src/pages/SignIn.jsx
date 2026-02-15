// import axios from "axios";
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { useState } from 'react';
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { ClipLoader } from 'react-spinners';
// import { auth } from '../../firebase';
// import { serverUrl } from '../App';
// import { setUserData } from '../redux/userSlice';
// function SignIn() {
//     const primaryColor = "#ff4d2d";
//     const hoverColor = "#e64323";
//     const bgColor = "#fff9f6";
//     const borderColor = "#ddd";
//     const [showPassword, setShowPassword] = useState(false)
//     const navigate=useNavigate()
//     const [email,setEmail]=useState("")
//     const [password,setPassword]=useState("")
//     const [err,setErr]=useState("")
//     const [loading,setLoading]=useState(false)
//     const dispatch=useDispatch()
//      const handleSignIn=async () => {
//         setLoading(true)
//         try {
//             const result=await axios.post(`${serverUrl}/api/auth/signin`,{
//                 email,password
//             },{withCredentials:true})
//            dispatch(setUserData(result.data))
//             setErr("")
//             setLoading(false)
//         } catch (error) {
//            setErr(error?.response?.data?.message)
//            setLoading(false)
//         }
//      }
//      const handleGoogleAuth=async () => {
//              const provider=new GoogleAuthProvider()
//              const result=await signInWithPopup(auth,provider)
//        try {
//          const {data}=await axios.post(`${serverUrl}/api/auth/google-auth`,{
//              email:result.user.email,
//          },{withCredentials:true})
//          dispatch(setUserData(data))
//        } catch (error) {
//          console.log(error)
//        }
//           }
//     return (
//         <div className='min-h-screen w-full flex items-center justify-center p-4' style={{ backgroundColor: bgColor }}>
//             <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px] `} style={{
//                 border: `1px solid ${borderColor}`
//             }}>
//                 <h1 className={`text-3xl font-bold mb-2 `} style={{ color: primaryColor }}>QuickBite</h1>
//                 <p className='text-gray-600 mb-8'> Sign In to your account to get started with delicious food deliveries
//                 </p>

              
//                 {/* email */}

//                 <div className='mb-4'>
//                     <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
//                     <input type="email" className='w-full border rounded-lg px-3 py-2 focus:outline-none ' placeholder='Enter your Email' style={{ border: `1px solid ${borderColor}` }} onChange={(e)=>setEmail(e.target.value)} value={email} required/>
//                 </div>
//                 {/* password*/}

//                 <div className='mb-4'>
//                     <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>Password</label>
//                     <div className='relative'>
//                         <input type={`${showPassword ? "text" : "password"}`} className='w-full border rounded-lg px-3 py-2 focus:outline-none pr-10' placeholder='Enter your password' style={{ border: `1px solid ${borderColor}` }} onChange={(e)=>setPassword(e.target.value)} value={password} required/>

//                         <button className='absolute right-3 cursor-pointer top-[14px] text-gray-500' onClick={() => setShowPassword(prev => !prev)}>{!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</button>
//                     </div>
//                 </div>
//                 <div className='text-right mb-4 cursor-pointer text-[#ff4d2d] font-medium' onClick={()=>navigate("/forgot-password")}>
//                   Forgot Password
//                 </div>
              

//             <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleSignIn} disabled={loading}>
//                 {loading?<ClipLoader size={20} color='white'/>:"Sign In"}
//             </button>
//       {err && <p className='text-red-500 text-center my-[10px]'>*{err}</p>}

//             <button className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition cursor-pointer duration-200 border-gray-400 hover:bg-gray-100' onClick={handleGoogleAuth}>
// <FcGoogle size={20}/>
// <span>Sign In with Google</span>
//             </button>
//             <p className='text-center mt-6 cursor-pointer' onClick={()=>navigate("/signup")}>Want to create a new account ?  <span className='text-[#ff4d2d]'>Sign Up</span></p>
//             </div>
//         </div>
//     )
// }

// export default SignIn


import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaEnvelope, FaLock, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { auth } from '../../firebase';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';

function SignIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Validation function
    const validateForm = () => {
        const newErrors = {};

        // Email validation
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid";
        }

        // Password validation
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignIn = async () => {
        if (!validateForm()) {
            //toast.error("Please fix the errors");
            return;
        }

        setLoading(true);
        try {
            const result = await axios.post(`${serverUrl}/api/auth/signin`, {
                email: email.trim(),
                password
            }, { withCredentials: true });
            
            dispatch(setUserData(result.data));
            toast.success("Signed in successfully!");
            setLoading(false);
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Sign in failed";
            toast.error(errorMessage);
            setLoading(false);
        }
    };

    const handleGoogleAuth = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            
            const { data } = await axios.post(`${serverUrl}/api/auth/google-auth`, {
                email: result.user.email,
            }, { withCredentials: true });
            
            dispatch(setUserData(data));
            toast.success("Signed in with Google successfully!");
        } catch (error) {
            toast.error("Google sign in failed");
        }
    };

    // Clear individual field error on change
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (errors.email) {
            setErrors(prev => ({ ...prev, email: "" }));
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (errors.password) {
            setErrors(prev => ({ ...prev, password: "" }));
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSignIn();
        }
    };

    return (
        <div className='min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-[#fff7f3] via-[#fffdfb] to-[#ffece6]'>
            {/* Decorative blur elements */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>

            <div className='relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg w-full max-w-md p-8 border border-orange-100'>
                {/* Logo/Header */}
                <div className='text-center mb-8'>
                    <h1 className='text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-2'>
                        QuickBite
                    </h1>
                    <p className='text-gray-600'>Welcome back! Sign in to continue</p>
                </div>

                {/* Email Field */}
                <div className='mb-4'>
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
                            onKeyPress={handleKeyPress}
                            value={email}
                        />
                    </div>
                    {errors.email && (
                        <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                    )}
                </div>

                {/* Password Field */}
                <div className='mb-4'>
                    <label htmlFor="password" className='block text-gray-700 font-medium mb-2'>
                        Password
                    </label>
                    <div className='relative'>
                        <FaLock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className={`w-full bg-white/70 border rounded-xl pl-10 pr-12 py-3 focus:outline-none focus:ring-2 transition-all duration-200 ${
                                errors.password 
                                    ? 'border-red-400 focus:ring-red-400' 
                                    : 'border-gray-200 focus:ring-orange-400'
                            }`}
                            placeholder='Enter your password'
                            onChange={handlePasswordChange}
                            onKeyPress={handleKeyPress}
                            value={password}
                        />
                        <button
                            type="button"
                            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
                            onClick={() => setShowPassword(prev => !prev)}
                        >
                            {showPassword ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                    )}
                </div>

                {/* Forgot Password Link */}
                <div className='text-right mb-6'>
                    <button
                        type="button"
                        className='text-orange-500 hover:text-orange-600 font-medium text-sm transition-colors'
                        onClick={() => navigate("/forgot-password")}
                    >
                        Forgot Password?
                    </button>
                </div>

                {/* Sign In Button */}
                <button
                    className='w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center'
                    onClick={handleSignIn}
                    disabled={loading}
                >
                    {loading ? <ClipLoader size={20} color='white' /> : "Sign In"}
                </button>

                {/* Divider */}
                <div className='flex items-center my-6'>
                    <div className='flex-1 border-t border-gray-300'></div>
                    <span className='px-4 text-gray-500 text-sm'>OR</span>
                    <div className='flex-1 border-t border-gray-300'></div>
                </div>

                {/* Google Sign In Button */}
                <button
                    className='w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-xl px-4 py-3 hover:bg-gray-50 hover:shadow-md transition-all duration-300'
                    onClick={handleGoogleAuth}
                >
                    <FcGoogle size={22} />
                    <span className='font-medium text-gray-700'>Continue with Google</span>
                </button>

                {/* Sign Up Link */}
                <div className='text-center mt-6'>
                    <span className='text-gray-600'>Don't have an account? </span>
                    <button
                        type="button"
                        className='text-orange-500 hover:text-orange-600 font-semibold transition-colors'
                        onClick={() => navigate("/signup")}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignIn;