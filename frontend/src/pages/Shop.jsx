// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { serverUrl } from '../App'
// import { useNavigate, useParams } from 'react-router-dom'
// import { FaStore } from "react-icons/fa6";
// import { FaLocationDot } from "react-icons/fa6";
// import { FaUtensils } from "react-icons/fa";
// import FoodCard from '../components/FoodCard';
// import { FaArrowLeft } from "react-icons/fa";
// function Shop() {
//     const {shopId}=useParams()
//     const [items,setItems]=useState([])
//     const [shop,setShop]=useState([])
//     const navigate=useNavigate()
//     const handleShop=async () => {
//         try {
//            const result=await axios.get(`${serverUrl}/api/item/get-by-shop/${shopId}`,{withCredentials:true}) 
//            setShop(result.data.shop)
//            setItems(result.data.items)
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     useEffect(()=>{
// handleShop()
//     },[shopId])
//   return (
//     <div className='min-h-screen bg-gray-50'>
//         <button className='absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/50 hover:bg-black/70 text-white px-3 py-2 rounded-full shadow-md transition' onClick={()=>navigate("/")}>
//         <FaArrowLeft />
// <span>Back</span>
//         </button>
//       {shop && <div className='relative w-full h-64 md:h-80 lg:h-96'>
//           <img src={shop.image} alt="" className='w-full h-full object-cover'/>
//           <div className='absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 flex flex-col justify-center items-center text-center px-4'>
//           <FaStore className='text-white text-4xl mb-3 drop-shadow-md'/>
//           <h1 className='text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg'>{shop.name}</h1>
//           <div className='flex items-center  gap-[10px]'>
//           <FaLocationDot size={22} color='red'/>
//              <p className='text-lg font-medium text-gray-200 mt-[10px]'>{shop.address}</p>
//              </div>
//           </div>

//         </div>}

// <div className='max-w-7xl mx-auto px-6 py-10'>
// <h2 className='flex items-center justify-center gap-3 text-3xl font-bold mb-10 text-gray-800'><FaUtensils color='red'/> Our Menu</h2>

// {items.length>0?(
//     <div className='flex flex-wrap justify-center gap-8'>
//         {items.map((item)=>(
//             <FoodCard data={item}/>
//         ))}
//     </div>
// ):<p className='text-center text-gray-500 text-lg'>No Items Available</p>}
// </div>



//     </div>
//   )
// }

// export default Shop


import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaLocationDot, FaStore, FaUtensils } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdStarRate } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import { serverUrl } from '../App';
import FoodCard from '../components/FoodCard';

function Shop() {
    const { shopId } = useParams();
    const [items, setItems] = useState([]);
    const [shop, setShop] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleShop = async () => {
        setLoading(true);
        try {
            const result = await axios.get(`${serverUrl}/api/item/get-by-shop/${shopId}`, { withCredentials: true });
            setShop(result.data.shop);
            setItems(result.data.items);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleShop();
    }, [shopId]);

    // Loading state
    if (loading) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-[#fff7f3] via-[#fffdfb] to-[#ffece6]'>
                <div className='w-full h-64 md:h-80 bg-gray-300 animate-pulse'></div>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 py-10'>
                    <div className='h-8 bg-gray-300 rounded w-48 mx-auto mb-8 animate-pulse'></div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className='bg-white rounded-2xl h-80 animate-pulse'></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-[#fff7f3] via-[#fffdfb] to-[#ffece6]'>

            {/* Back Button */}
            <button
                className='fixed top-6 left-6 z-30 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-[1px] transition-all duration-300 ease-out group'
                onClick={() => navigate("/")}
            >
                <IoIosArrowRoundBack
                    size={28}
                    className='text-orange-600 group-hover:text-orange-700 transition-colors'
                />
            </button>

            {/* Hero Section */}
            {shop && (
                <div className='relative w-full h-72 md:h-80 lg:h-96 overflow-hidden'>
                    {/* Background Image */}
                    <img
                        src={shop.image}
                        alt={shop.name}
                        className='w-full h-full object-cover'
                    />

                    {/* Gradient Overlay */}
                    <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent'></div>

                    {/* Content */}
                    <div className='absolute inset-0 flex flex-col justify-center items-center text-center px-4'>
                        {/* Store Icon */}
                        <div className='bg-white/20 backdrop-blur-sm p-4 rounded-2xl mb-4 shadow-lg'>
                            <FaStore className='text-white text-4xl md:text-5xl' />
                        </div>

                        {/* Restaurant Name */}
                        <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-2xl mb-3'>
                            {shop.name}
                        </h1>

                        {/* Location */}
                        <div className='flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg'>
                            <FaLocationDot className='text-red-400 text-lg' />
                            <p className='text-white font-medium'>{shop.address}</p>
                        </div>

                        {/* Optional: Rating or Info */}
                        {shop.rating && (
                            <div className='flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mt-3'>
                                <MdStarRate className='text-yellow-400 text-xl' />
                                <span className='text-white font-semibold'>{shop.rating}</span>
                            </div>
                        )}
                    </div>

                    {/* Bottom Fade */}
                    <div className='absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#fff7f3] to-transparent'></div>
                </div>
            )}

            {/* Menu Section */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 py-10'>

                {/* Section Header */}
                <div className='text-center mb-10'>
                    <div className='inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md border border-orange-50'>
                        <FaUtensils className='text-orange-600 text-2xl' />
                        <h2 className='text-2xl sm:text-3xl font-bold text-[#2d2d2d]'>
                            Our Menu
                        </h2>
                    </div>
                    {items.length > 0 && (
                        <p className='text-gray-500 mt-3'>
                            {items.length} {items.length === 1 ? 'item' : 'items'} available
                        </p>
                    )}
                </div>

                {/* Menu Items Grid */}
                {items.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'>
                        {items.map((item) => (
                            <FoodCard key={item._id} data={item} />
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className='bg-white/60 backdrop-blur-sm rounded-2xl shadow-md p-12 sm:p-16 text-center border border-orange-50 max-w-md mx-auto'>
                        <div className='text-6xl mb-4'>🍽️</div>
                        <h3 className='text-2xl font-semibold text-[#2d2d2d] mb-3'>
                            No items yet
                        </h3>
                        <p className='text-gray-500 text-base mb-6'>
                            This restaurant hasn't added any menu items yet. Check back soon!
                        </p>
                        <button
                            onClick={() => navigate("/")}
                            className='bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:-translate-y-[1px] transition-all duration-300 ease-out inline-flex items-center gap-2'
                        >
                            <span>Browse Other Restaurants</span>
                            <span>→</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Shop;