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

function AddItem() {
    const navigate = useNavigate();
    const { myShopData } = useSelector(state => state.owner);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [frontendImage, setFrontendImage] = useState(null);
    const [backendImage, setBackendImage] = useState(null);
    const [category, setCategory] = useState("");
    const [foodType, setFoodType] = useState("");
    const [errors, setErrors] = useState({});

    const categories = [
        "Snacks",
        "Main Course",
        "Desserts",
        "Pizza",
        "Burgers",
        "Sandwiches",
        "South Indian",
        "North Indian",
        "Chinese",
        "Fast Food",
        "Others"
    ];

    const dispatch = useDispatch();

    // Validation function
    const validateForm = () => {
        const newErrors = {};

        // Validate name
        if (!name.trim()) {
            newErrors.name = "Food name is required";
        } else if (name.trim().length < 3) {
            newErrors.name = "Food name must be at least 3 characters";
        }

        // Validate price
        if (!price) {
            newErrors.price = "Price is required";
        } else if (isNaN(price) || Number(price) <= 0) {
            newErrors.price = "Price must be greater than 0";
        }

        // Validate category
        if (!category) {
            newErrors.category = "Please select a category";
        }

        // Validate food type
        if (!foodType) {
            newErrors.foodType = "Please select food type";
        }

        // Validate image
        if (!backendImage) {
            newErrors.image = "Food image is required";
        } else {
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
            toast.error("Please fix the errors before submitting");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", name.trim());
            formData.append("category", category);
            formData.append("foodType", foodType);
            formData.append("price", price);
            if (backendImage) {
                formData.append("image", backendImage);
            }
            
            const result = await axios.post(`${serverUrl}/api/item/add-item`, formData, { withCredentials: true });
            dispatch(setMyShopData(result.data));
            
            // Show success toast
            toast.success("Food item added successfully!");
            
            // Reset form
            setName("");
            setPrice("");
            setCategory("");
            setFoodType("");
            setFrontendImage(null);
            setBackendImage(null);
            setErrors({});
            
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
                    
                    // Extract field-specific errors from the message
                    if (errorMessage.includes('foodType')) {
                        backendErrors.foodType = "Please select food type";
                    }
                    if (errorMessage.includes('name')) {
                        backendErrors.name = "Food name is required";
                    }
                    if (errorMessage.includes('price')) {
                        backendErrors.price = "Price is required";
                    }
                    if (errorMessage.includes('category')) {
                        backendErrors.category = "Category is required";
                    }
                    if (errorMessage.includes('image')) {
                        backendErrors.image = "Image is required";
                    }
                    
                    // Set inline errors instead of toast
                    if (Object.keys(backendErrors).length > 0) {
                        setErrors(backendErrors);
                        return;
                    }
                }
                
                // For non-validation errors, show toast
                toast.error(errorMessage);
            } else {
                toast.error("Failed to add item. Please try again.");
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

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
        if (errors.price) {
            setErrors(prev => ({ ...prev, price: '' }));
        }
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        if (errors.category) {
            setErrors(prev => ({ ...prev, category: '' }));
        }
    };

    const handleFoodTypeChange = (e) => {
        setFoodType(e.target.value);
        if (errors.foodType) {
            setErrors(prev => ({ ...prev, foodType: '' }));
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
                            Add Food Item
                        </h1>
                        <p className='text-sm text-gray-500'>
                            Add a new item to your restaurant menu
                        </p>
                    </div>

                    {/* Form */}
                    <form className='space-y-6' onSubmit={handleSubmit}>

                        {/* Name Field */}
                        <div>
                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                Food Name
                            </label>
                            <input
                                type="text"
                                placeholder='Enter food name'
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
                                Food Image
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
                                        alt="Food preview"
                                        className='w-full h-64 object-cover rounded-xl border border-gray-200 shadow-sm'
                                    />
                                    <button
                                        type='button'
                                        className='absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md hover:bg-white transition-all'
                                        onClick={() => {
                                            setFrontendImage(null);
                                            setBackendImage(null);
                                            setErrors(prev => ({ ...prev, image: '' }));
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

                        {/* Price Field */}
                        <div>
                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                Price
                            </label>
                            <div className='relative'>
                                <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium'>
                                    ₹
                                </span>
                                <input
                                    type="number"
                                    placeholder='0'
                                    className={`w-full pl-8 pr-4 py-3 bg-white/70 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                                        errors.price 
                                            ? 'border-red-400 focus:ring-red-400' 
                                            : 'border-gray-200 focus:ring-orange-400/50 focus:border-transparent'
                                    }`}
                                    onChange={handlePriceChange}
                                    value={price}
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                            {errors.price && (
                                <p className="text-xs text-red-500 mt-1">{errors.price}</p>
                            )}
                        </div>

                        {/* Category Field */}
                        <div>
                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                Category
                            </label>
                            <select
                                className={`w-full px-4 py-3 bg-white/70 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 appearance-none cursor-pointer ${
                                    errors.category 
                                        ? 'border-red-400 focus:ring-red-400' 
                                        : 'border-gray-200 focus:ring-orange-400/50 focus:border-transparent'
                                }`}
                                onChange={handleCategoryChange}
                                value={category}
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                    backgroundPosition: 'right 0.5rem center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '1.5em 1.5em',
                                    paddingRight: '2.5rem'
                                }}
                            >
                                <option value="">Select a category</option>
                                {categories.map((cate, index) => (
                                    <option value={cate} key={index}>{cate}</option>
                                ))}
                            </select>
                            {errors.category && (
                                <p className="text-xs text-red-500 mt-1">{errors.category}</p>
                            )}
                        </div>

                        {/* Food Type Field */}
                        <div>
                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                Food Type
                            </label>
                            <select
                                className={`w-full px-4 py-3 bg-white/70 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 appearance-none cursor-pointer ${errors.foodType
                                    ? 'border-red-400 focus:ring-red-400'
                                    : 'border-gray-200 focus:ring-orange-400/50 focus:border-transparent'
                                    }`}
                                onChange={handleFoodTypeChange}
                                value={foodType}
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                    backgroundPosition: 'right 0.5rem center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '1.5em 1.5em',
                                    paddingRight: '2.5rem'
                                }}
                            >
                                <option value="">Select food type</option>
                                <option value="veg">🟢 Vegetarian</option>
                                <option value="non veg">🔴 Non-Vegetarian</option>
                            </select>
                            {errors.foodType && (
                                <p className="text-xs text-red-500 mt-1">{errors.foodType}</p>
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
                                    <span>Saving...</span>
                                </>
                            ) : (
                                "Save Food Item"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddItem;