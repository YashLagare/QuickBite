import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaUtensils } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { serverUrl } from '../App';
import { setMyShopData } from '../redux/ownerSlice';

function CreateEditShop() {
    const navigate = useNavigate();
    const { myShopData } = useSelector(state => state.owner);
    const { currentCity, currentState, currentAddress } = useSelector(state => state.user);
    const [name, setName] = useState(myShopData?.name || "");
    const [address, setAddress] = useState(myShopData?.address || currentAddress);
    const [city, setCity] = useState(myShopData?.city || currentCity);
    const [state, setState] = useState(myShopData?.state || currentState);
    const [frontendImage, setFrontendImage] = useState(myShopData?.image || null);
    const [backendImage, setBackendImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const isEditMode = !!myShopData;

    // Validation function
    const validateForm = () => {
        const newErrors = {};

        // Validate name
        if (!name.trim()) {
            newErrors.name = "Shop name is required";
        } else if (name.trim().length < 3) {
            newErrors.name = "Shop name must be at least 3 characters";
        }

        // Validate city
        if (!city.trim()) {
            newErrors.city = "City is required";
        }

        // Validate state
        if (!state.trim()) {
            newErrors.state = "State is required";
        }

        // Validate address
        if (!address.trim()) {
            newErrors.address = "Address is required";
        } else if (address.trim().length < 10) {
            newErrors.address = "Address must be at least 10 characters";
        }

        // Validate image - always required (either existing or new)
        if (!frontendImage && !backendImage) {
            newErrors.image = "Restaurant image is required";
        } else if (backendImage) {
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            const maxSize = 2 * 1024 * 1024; // 2MB

            if (!validTypes.includes(backendImage.type)) {
                newErrors.image = "Only JPG, JPEG, PNG, and WEBP formats are allowed";
            } else if (backendImage.size > maxSize) {
                newErrors.image = "Image size must be less than 2MB";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleImage = (e) => {
        const file = e.target.files[0];

        if (file) {
            // Clear image error when user selects a new file
            setErrors(prev => ({ ...prev, image: '' }));

            // Validate file immediately
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            const maxSize = 2 * 1024 * 1024; // 2MB

            if (!validTypes.includes(file.type)) {
                setErrors(prev => ({ ...prev, image: "Only JPG, JPEG, PNG, and WEBP formats are allowed" }));
                return;
            }

            if (file.size > maxSize) {
                setErrors(prev => ({ ...prev, image: "Image size must be less than 2MB" }));
                return;
            }

            setBackendImage(file);
            setFrontendImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", name.trim());
            formData.append("city", city.trim());
            formData.append("state", state.trim());
            formData.append("address", address.trim());
            if (backendImage) {
                formData.append("image", backendImage);
            }
            const result = await axios.post(`${serverUrl}/api/shop/create-edit`, formData, { withCredentials: true });
            dispatch(setMyShopData(result.data));
            
            // Show success toast
            toast.success(isEditMode ? "Shop updated successfully!" : "Shop created successfully!");
            
            setLoading(false);
            
            // Navigate after a brief delay to show toast
            setTimeout(() => {
                navigate("/");
            }, 500);
        } catch (error) {
            console.log(error);
            setLoading(false);
            
            // Handle backend validation errors
            if (error.response?.data?.message) {
                const errorMessage = error.response.data.message;
                
                // Parse mongoose validation errors
                if (errorMessage.includes('ValidationError')) {
                    const backendErrors = {};
                    
                    if (errorMessage.includes('name')) {
                        backendErrors.name = "Shop name is required";
                    }
                    if (errorMessage.includes('city')) {
                        backendErrors.city = "City is required";
                    }
                    if (errorMessage.includes('state')) {
                        backendErrors.state = "State is required";
                    }
                    if (errorMessage.includes('address')) {
                        backendErrors.address = "Address is required";
                    }
                    if (errorMessage.includes('image')) {
                        backendErrors.image = "Image is required";
                    }
                    
                    if (Object.keys(backendErrors).length > 0) {
                        setErrors(backendErrors);
                        return;
                    }
                }
                
                toast.error(errorMessage);
            } else {
                toast.error(`Failed to ${isEditMode ? 'update' : 'create'} shop. Please try again.`);
            }
        }
    };

    // Clear individual field errors on change
    const handleNameChange = (e) => {
        setName(e.target.value);
        if (errors.name) {
            setErrors(prev => ({ ...prev, name: '' }));
        }
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
        if (errors.city) {
            setErrors(prev => ({ ...prev, city: '' }));
        }
    };

    const handleStateChange = (e) => {
        setState(e.target.value);
        if (errors.state) {
            setErrors(prev => ({ ...prev, state: '' }));
        }
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
        if (errors.address) {
            setErrors(prev => ({ ...prev, address: '' }));
        }
    };

    return (
        <div className='min-h-screen flex justify-center items-center p-4 sm:p-6 bg-gradient-to-br from-[#fff7f3] via-[#fffdfb] to-[#ffece6] relative'>

            {/* Back Button */}
            <button
                className='absolute top-6 left-6 z-20 bg-white/80 backdrop-blur-sm p-2.5 rounded-full shadow-md hover:shadow-lg hover:-translate-y-[1px] transition-all duration-300 ease-out group'
                onClick={() => navigate("/")}
            >
                <IoIosArrowRoundBack
                    size={28}
                    className='text-orange-600 group-hover:text-orange-700 transition-colors'
                />
            </button>

            {/* Form Container with Ambient Glow */}
            <div className='relative w-full max-w-2xl'>
                {/* Ambient Warm Glow */}
                <div className='absolute inset-0 bg-gradient-to-br from-orange-200/40 via-amber-100/30 to-yellow-100/40 rounded-3xl blur-3xl scale-105'></div>

                {/* Form Card */}
                <div className='relative bg-white/80 backdrop-blur-sm shadow-lg rounded-3xl p-6 sm:p-10 border border-orange-50'>

                    {/* Header Section */}
                    <div className='flex flex-col items-center mb-8'>
                        <div className='bg-gradient-to-br from-orange-100 to-amber-100 p-5 rounded-2xl mb-4 shadow-sm'>
                            <FaUtensils className='text-orange-600 w-12 h-12' />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-semibold text-[#2d2d2d] mb-2">
                            {isEditMode ? "Edit Restaurant" : "Create Restaurant"}
                        </h1>
                        <p className='text-sm text-gray-500'>
                            {isEditMode ? "Update your restaurant details" : "Set up your restaurant on QuickBite"}
                        </p>
                    </div>

                    {/* Form */}
                    <form className='space-y-6' onSubmit={handleSubmit}>

                        {/* Name Field */}
                        <div>
                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                Restaurant Name
                            </label>
                            <input
                                type="text"
                                placeholder='Enter restaurant name'
                                className={`w-full px-4 py-3 bg-white/70 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                                    errors.name
                                        ? 'border-red-400 focus:ring-red-400'
                                        : 'border-gray-200 focus:ring-orange-400/50 focus:border-transparent'
                                }`}
                                onChange={handleNameChange}
                                value={name}
                            />
                            {errors.name && (
                                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                            )}
                        </div>

                        {/* Image Upload Section */}
                        <div>
                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                Restaurant Image
                            </label>

                            {!frontendImage ? (
                                <label className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer bg-white/50 hover:bg-white/70 transition-all duration-200 group ${
                                    errors.image ? 'border-red-400' : 'border-gray-300'
                                }`}>
                                    <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                                        <svg
                                            className={`w-10 h-10 mb-3 transition-colors ${
                                                errors.image ? 'text-red-400' : 'text-gray-400 group-hover:text-orange-500'
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                            />
                                        </svg>
                                        <p className='mb-2 text-sm text-gray-500'>
                                            <span className='font-semibold'>Click to upload</span> or drag and drop
                                        </p>
                                        <p className='text-xs text-gray-400'>PNG, JPG, JPEG, WEBP (MAX. 2MB)</p>
                                    </div>
                                    <input
                                        type="file"
                                        accept='image/jpeg,image/jpg,image/png,image/webp'
                                        className='hidden'
                                        onChange={handleImage}
                                    />
                                </label>
                            ) : (
                                <div className='relative'>
                                    <img
                                        src={frontendImage}
                                        alt="Restaurant preview"
                                        className='w-full h-64 object-cover rounded-xl border border-gray-200 shadow-sm'
                                    />
                                    <button
                                        type='button'
                                        className='absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md hover:bg-white transition-all'
                                        onClick={() => {
                                            setFrontendImage(null);
                                            setBackendImage(null);
                                            // Show error immediately when image is removed
                                            setErrors(prev => ({ ...prev, image: 'Restaurant image is required' }));
                                        }}
                                    >
                                        <svg
                                            className='w-5 h-5 text-gray-600'
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            )}
                            {errors.image && (
                                <p className="text-xs text-red-500 mt-1">{errors.image}</p>
                            )}
                        </div>

                        {/* City and State Grid */}
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            {/* City Field */}
                            <div>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                    City
                                </label>
                                <input
                                    type="text"
                                    placeholder='Enter city'
                                    className={`w-full px-4 py-3 bg-white/70 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                                        errors.city
                                            ? 'border-red-400 focus:ring-red-400'
                                            : 'border-gray-200 focus:ring-orange-400/50 focus:border-transparent'
                                    }`}
                                    onChange={handleCityChange}
                                    value={city}
                                />
                                {errors.city && (
                                    <p className="text-xs text-red-500 mt-1">{errors.city}</p>
                                )}
                            </div>

                            {/* State Field */}
                            <div>
                                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                    State
                                </label>
                                <input
                                    type="text"
                                    placeholder='Enter state'
                                    className={`w-full px-4 py-3 bg-white/70 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                                        errors.state
                                            ? 'border-red-400 focus:ring-red-400'
                                            : 'border-gray-200 focus:ring-orange-400/50 focus:border-transparent'
                                    }`}
                                    onChange={handleStateChange}
                                    value={state}
                                />
                                {errors.state && (
                                    <p className="text-xs text-red-500 mt-1">{errors.state}</p>
                                )}
                            </div>
                        </div>

                        {/* Address Field */}
                        <div>
                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                Full Address
                            </label>
                            <input
                                type="text"
                                placeholder='Enter complete address'
                                className={`w-full px-4 py-3 bg-white/70 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                                    errors.address
                                        ? 'border-red-400 focus:ring-red-400'
                                        : 'border-gray-200 focus:ring-orange-400/50 focus:border-transparent'
                                }`}
                                onChange={handleAddressChange}
                                value={address}
                            />
                            {errors.address && (
                                <p className="text-xs text-red-500 mt-1">{errors.address}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type='submit'
                            className='w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg hover:-translate-y-[1px] active:scale-[0.98] transition-all duration-300 ease-out disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <ClipLoader size={20} color='white' />
                                    <span>{isEditMode ? 'Updating...' : 'Creating...'}</span>
                                </>
                            ) : (
                                isEditMode ? 'Update Restaurant' : 'Create Restaurant'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateEditShop;