import axios from "axios";
import { getRedirectResult, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaEnvelope, FaLock, FaPhone, FaRegEye, FaRegEyeSlash, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdDeliveryDining, MdPerson, MdRestaurant } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from "react-spinners";
import { auth } from '../../firebase';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';

function SignUp() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState("user");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    // Validation function
    const validateForm = () => {
        const newErrors = {};

        // Full Name validation
        if (!fullName.trim()) {
            newErrors.fullName = "Full name is required";
        } else if (fullName.trim().length < 3) {
            newErrors.fullName = "Name must be at least 3 characters";
        }

        // Email validation
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email";
        }

        // Mobile validation
        if (!mobile.trim()) {
            newErrors.mobile = "Mobile number is required";
        } else if (!/^[0-9]{10}$/.test(mobile.trim())) {
            newErrors.mobile = "Please enter a valid 10-digit mobile number";
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

    const handleSignUp = async () => {
        if (!validateForm()) {
            //toast.error("Please fix the errors before submitting");
            return;
        }

        setLoading(true);
        try {
            const result = await axios.post(`${serverUrl}/api/auth/signup`, {
                fullName: fullName.trim(),
                email: email.trim(),
                password,
                mobile: mobile.trim(),
                role
            }, { withCredentials: true });

            dispatch(setUserData(result.data));
            toast.success("Account created successfully!");
            setErrors({});
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Sign up failed. Please try again.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleAuth = async () => {
        if (!mobile.trim()) {
            setErrors(prev => ({ ...prev, mobile: "Mobile number is required" }));
            toast.error("Please enter your mobile number");
            return;
        }

        if (!/^[0-9]{10}$/.test(mobile.trim())) {
            setErrors(prev => ({ ...prev, mobile: "Please enter a valid 10-digit mobile number" }));
            toast.error("Invalid mobile number");
            return;
        }

        try {
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({ prompt: 'select_account' });
            await signInWithRedirect(auth, provider);
            const result = await getRedirectResult(auth);
            if (!result) return;

            const { data } = await axios.post(`${serverUrl}/api/auth/google-auth`, {
                fullName: result.user.displayName,
                email: result.user.email,
                role,
                mobile: mobile.trim()
            }, { withCredentials: true });

            dispatch(setUserData(data));
            toast.success("Signed in successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Google sign in failed. Please try again.");
        }
    };

    // Clear individual field errors
    const clearError = (field) => {
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const roleConfig = {
        user: { icon: MdPerson, label: "Customer", color: "from-blue-500 to-blue-600" },
        owner: { icon: MdRestaurant, label: "Restaurant", color: "from-purple-500 to-purple-600" },
        deliveryBoy: { icon: MdDeliveryDining, label: "Delivery", color: "from-green-500 to-green-600" }
    };

    return (
        <div className='min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-[#fff7f3] via-[#fffdfb] to-[#ffece6]'>
            <div className='bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl w-full max-w-md p-8 border border-orange-50'>

                {/* Header */}
                <div className='text-center mb-8'>
                    <h1 className='text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-2'>
                        QuickBite
                    </h1>
                    <p className='text-gray-600'>
                        Create your account to get started
                    </p>
                </div>

                {/* Form */}
                <div className='space-y-4'>

                    {/* Full Name */}
                    <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                            Full Name
                        </label>
                        <div className='relative'>
                            <FaUser className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                            <input
                                type="text"
                                className={`w-full pl-10 pr-4 py-3 bg-white/70 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${errors.fullName
                                    ? 'border-red-400 focus:ring-red-400'
                                    : 'border-gray-200 focus:ring-orange-400/50 focus:border-transparent'
                                    }`}
                                placeholder='Enter your full name'
                                onChange={(e) => {
                                    setFullName(e.target.value);
                                    clearError('fullName');
                                }}
                                value={fullName}
                            />
                        </div>
                        {errors.fullName && (
                            <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                            Email
                        </label>
                        <div className='relative'>
                            <FaEnvelope className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                            <input
                                type="email"
                                className={`w-full pl-10 pr-4 py-3 bg-white/70 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${errors.email
                                    ? 'border-red-400 focus:ring-red-400'
                                    : 'border-gray-200 focus:ring-orange-400/50 focus:border-transparent'
                                    }`}
                                placeholder='Enter your email'
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    clearError('email');
                                }}
                                value={email}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Mobile */}
                    <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                            Mobile Number
                        </label>
                        <div className='relative'>
                            <FaPhone className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                            <input
                                type="tel"
                                className={`w-full pl-10 pr-4 py-3 bg-white/70 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${errors.mobile
                                    ? 'border-red-400 focus:ring-red-400'
                                    : 'border-gray-200 focus:ring-orange-400/50 focus:border-transparent'
                                    }`}
                                placeholder='Enter 10-digit mobile number'
                                onChange={(e) => {
                                    setMobile(e.target.value.replace(/\D/g, '').slice(0, 10));
                                    clearError('mobile');
                                }}
                                value={mobile}
                                maxLength={10}
                            />
                        </div>
                        {errors.mobile && (
                            <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                            Password
                        </label>
                        <div className='relative'>
                            <FaLock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`w-full pl-10 pr-12 py-3 bg-white/70 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${errors.password
                                    ? 'border-red-400 focus:ring-red-400'
                                    : 'border-gray-200 focus:ring-orange-400/50 focus:border-transparent'
                                    }`}
                                placeholder='Enter your password'
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    clearError('password');
                                }}
                                value={password}
                            />
                            <button
                                type='button'
                                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                        )}
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                            I am a
                        </label>
                        <div className='grid grid-cols-3 gap-2'>
                            {Object.entries(roleConfig).map(([key, config]) => {
                                const Icon = config.icon;
                                const isSelected = role === key;
                                return (
                                    <button
                                        key={key}
                                        type='button'
                                        onClick={() => setRole(key)}
                                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-300 ${isSelected
                                            ? 'border-orange-500 bg-orange-50 shadow-sm'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-gradient-to-r ' + config.color : 'bg-gray-100'}`}>
                                            <Icon className={`text-xl ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                                        </div>
                                        <span className={`text-xs font-semibold ${isSelected ? 'text-orange-600' : 'text-gray-600'}`}>
                                            {config.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Sign Up Button */}
                    <button
                        type='button'
                        className='w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3.5 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:scale-[0.98] transition-all duration-300 ease-out disabled:opacity-70 disabled:cursor-not-allowed'
                        onClick={handleSignUp}
                        disabled={loading}
                    >
                        {loading ? <ClipLoader size={20} color='white' /> : "Create Account"}
                    </button>

                    {/* Divider */}
                    <div className='flex items-center gap-3 my-4'>
                        <div className='flex-1 h-px bg-gray-200'></div>
                        <span className='text-sm text-gray-400'>OR</span>
                        <div className='flex-1 h-px bg-gray-200'></div>
                    </div>

                    {/* Google Sign In */}
                    <button
                        type='button'
                        className='w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl px-4 py-3 transition-all duration-300 font-semibold text-gray-700'
                        onClick={handleGoogleAuth}
                    >
                        <FcGoogle size={22} />
                        <span>Sign up with Google</span>
                    </button>

                    {/* Sign In Link */}
                    <p className='text-center text-gray-600 mt-6'>
                        Already have an account?{' '}
                        <button
                            type='button'
                            onClick={() => navigate("/signin")}
                            className='text-orange-600 hover:text-orange-700 font-semibold transition-colors'
                        >
                            Sign In
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;