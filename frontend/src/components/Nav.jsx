// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { FaLocationDot, FaPlus } from "react-icons/fa6";
// import { FiShoppingCart } from "react-icons/fi";
// import { IoIosSearch } from "react-icons/io";
// import { RxCross2 } from "react-icons/rx";
// import { TbReceipt2 } from "react-icons/tb";
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { serverUrl } from '../App';
// import { setSearchItems, setUserData } from '../redux/userSlice';

// function Nav() {
//     const { userData, currentCity, cartItems } = useSelector(state => state.user)
//     const { myShopData } = useSelector(state => state.owner)
//     const [showInfo, setShowInfo] = useState(false)
//     const [showSearch, setShowSearch] = useState(false)
//     const [query, setQuery] = useState("")
//     const dispatch = useDispatch()
//     const navigate = useNavigate()

//     const handleLogOut = async () => {
//         try {
//             const result = await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true })
//             dispatch(setUserData(null))
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     const handleSearchItems = async () => {
//         try {
//             const result = await axios.get(`${serverUrl}/api/item/search-items?query=${query}&city=${currentCity}`, { withCredentials: true })
//             dispatch(setSearchItems(result.data))
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     useEffect(() => {
//         if (query) {
//             handleSearchItems()
//         } else {
//             dispatch(setSearchItems(null))
//         }
//     }, [query])

//     return (
//         <>
//             {/* Main Navigation Bar */}
//             <nav 
//                 className='fixed top-0 left-0 right-0 z-50 h-16 md:h-20 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm'
//                 role="navigation"
//                 aria-label="Main navigation"
//             >
//                 <div className='max-w-7xl mx-auto h-full flex items-center justify-between gap-3 md:gap-4'>
                    
//                     {/* Logo */}
//                     <button
//                         onClick={() => navigate("/")}
//                         className='flex-shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 rounded-lg transition-transform duration-200 hover:scale-105 active:scale-100'
//                         aria-label="QuickBite home"
//                     >
//                         <h1 className='text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#ff4d2d] to-[#ff6b4a] bg-clip-text text-transparent'>
//                             QuickBite
//                         </h1>
//                     </button>

//                     {/* Desktop Search Bar */}
//                     {userData.role === "user" && (
//                         <div className='hidden md:flex items-center flex-1 max-w-2xl h-12 bg-gray-50 rounded-xl border border-gray-200 transition-all duration-200 hover:border-orange-300 hover:shadow-sm focus-within:border-orange-400 focus-within:shadow-md focus-within:bg-white'>
                            
//                             {/* Location Selector */}
//                             <div className='flex items-center gap-2 px-4 border-r border-gray-200 min-w-[160px]'>
//                                 <FaLocationDot className="w-4 h-4 text-orange-500 flex-shrink-0" aria-hidden="true" />
//                                 <span className='text-sm font-medium text-gray-700 truncate'>
//                                     {currentCity || 'Select Location'}
//                                 </span>
//                             </div>
                            
//                             {/* Search Input */}
//                             <div className='flex items-center gap-3 px-4 flex-1'>
//                                 <IoIosSearch className='w-5 h-5 text-gray-400 flex-shrink-0' aria-hidden="true" />
//                                 <input 
//                                     type="search" 
//                                     placeholder='Search for dishes, restaurants...' 
//                                     className='w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none'
//                                     onChange={(e) => setQuery(e.target.value)} 
//                                     value={query}
//                                     aria-label="Search for food"
//                                 />
//                             </div>
//                         </div>
//                     )}

//                     {/* Action Buttons */}
//                     <div className='flex items-center gap-2 md:gap-3'>
                        
//                         {/* Mobile Search Toggle */}
//                         {userData.role === "user" && (
//                             <button 
//                                 className='md:hidden p-2 rounded-lg bg-gray-100 text-orange-500 transition-colors duration-200 hover:bg-orange-50 active:bg-orange-100 outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
//                                 onClick={() => setShowSearch(!showSearch)}
//                                 aria-label={showSearch ? "Close search" : "Open search"}
//                                 aria-expanded={showSearch}
//                             >
//                                 {showSearch ? <RxCross2 className="w-5 h-5" /> : <IoIosSearch className="w-5 h-5" />}
//                             </button>
//                         )}

//                         {/* Owner Actions */}
//                         {userData.role === "owner" && myShopData && (
//                             <>
//                                 {/* Add Item Button - Desktop */}
//                                 <button 
//                                     className='hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ff4d2d] to-[#ff6b4a] text-white text-sm font-medium rounded-lg shadow-sm transition-all duration-200 hover:shadow-md active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2'
//                                     onClick={() => navigate("/add-item")}
//                                     aria-label="Add new item"
//                                 >
//                                     <FaPlus className="w-4 h-4" aria-hidden="true" />
//                                     <span>Add Item</span>
//                                 </button>
                                
//                                 {/* Add Item Button - Mobile */}
//                                 <button 
//                                     className='sm:hidden p-2 bg-gradient-to-r from-[#ff4d2d] to-[#ff6b4a] text-white rounded-lg shadow-sm transition-all duration-200 hover:shadow-md active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-orange-500 cursor-pointer'
//                                     onClick={() => navigate("/add-item")}
//                                     aria-label="Add new item"
//                                 >
//                                     <FaPlus className="w-5 h-5" />
//                                 </button>

//                                 {/* My Orders Button - Desktop */}
//                                 <button 
//                                     className='hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-100 text-orange-600 text-sm font-medium rounded-lg transition-colors duration-200 hover:bg-orange-50 active:bg-orange-100 outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2'
//                                     onClick={() => navigate("/my-orders")}
//                                     aria-label="View my orders"
//                                 >
//                                     <TbReceipt2 className="w-5 h-5" aria-hidden="true" />
//                                     <span>My Orders</span>
//                                 </button>

//                                 {/* My Orders Button - Mobile */}
//                                 <button 
//                                     className='sm:hidden p-2 bg-gray-100 text-orange-600 rounded-lg transition-colors duration-200 hover:bg-orange-50 active:bg-orange-100 outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
//                                     onClick={() => navigate("/my-orders")}
//                                     aria-label="View my orders"
//                                 >
//                                     <TbReceipt2 className="w-5 h-5" />
//                                 </button>
//                             </>
//                         )}

//                         {/* User Cart & Orders */}
//                         {userData.role === "user" && (
//                             <>
//                                 {/* Cart Button */}
//                                 <button 
//                                     className='relative p-2 bg-gray-100 text-orange-600 rounded-lg transition-colors duration-200 hover:bg-orange-50 active:bg-orange-100 outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
//                                     onClick={() => navigate("/cart")}
//                                     aria-label={`Shopping cart with ${cartItems.length} items`}
//                                 >
//                                     <FiShoppingCart className="w-5 h-5" aria-hidden="true" />
//                                     {cartItems.length > 0 && (
//                                         <span 
//                                             className='absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-gradient-to-br from-[#ff4d2d] to-[#ff6b4a] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm'
//                                             aria-hidden="true"
//                                         >
//                                             {cartItems.length > 9 ? '9+' : cartItems.length}
//                                         </span>
//                                     )}
//                                 </button>

//                                 {/* My Orders Button - Desktop */}
//                                 <button 
//                                     className='hidden sm:block px-4 py-2 bg-gray-100 text-orange-600 text-sm font-medium rounded-lg transition-colors duration-200 hover:bg-orange-50 active:bg-orange-100 outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2'
//                                     onClick={() => navigate("/my-orders")}
//                                     aria-label="View my orders"
//                                 >
//                                     My Orders
//                                 </button>
//                             </>
//                         )}

//                         {/* User Profile Avatar */}
//                         <button 
//                             className='relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[#ff4d2d] to-[#ff6b4a] text-white font-bold text-sm sm:text-base shadow-sm transition-all duration-200 hover:shadow-md active:scale-95 flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2'
//                             onClick={() => setShowInfo(prev => !prev)}
//                             aria-label="User menu"
//                             aria-expanded={showInfo}
//                             aria-haspopup="true"
//                         >
//                             {userData?.fullName.slice(0, 1).toUpperCase()}
//                         </button>

//                     </div>
//                 </div>
//             </nav>

//             {/* Mobile Search Dropdown */}
//             {showSearch && userData.role === "user" && (
//                 <div 
//                     className='nav-dropdown fixed top-16 left-0 right-0 z-40 px-4 py-3 md:hidden bg-white border-b border-gray-100 shadow-sm'
//                     role="search"
//                 >
//                     <div className='flex items-center h-12 bg-gray-50 rounded-lg border border-gray-200 transition-colors duration-200 focus-within:border-orange-400 focus-within:bg-white'>
//                         <div className='flex items-center gap-2 px-3 border-r border-gray-200 min-w-[100px]'>
//                             <FaLocationDot className="w-4 h-4 text-orange-500 flex-shrink-0" aria-hidden="true" />
//                             <span className='text-xs text-gray-600 truncate font-medium'>{currentCity}</span>
//                         </div>
//                         <div className='flex items-center gap-2 px-3 flex-1'>
//                             <IoIosSearch className='w-5 h-5 text-gray-400 flex-shrink-0' aria-hidden="true" />
//                             <input 
//                                 type="search" 
//                                 placeholder='Search food...' 
//                                 className='w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none'
//                                 onChange={(e) => setQuery(e.target.value)} 
//                                 value={query}
//                                 aria-label="Search for food"
//                                 autoFocus
//                             />
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Backdrop Overlay */}
//             {showInfo && (
//                 <div 
//                     className='nav-backdrop fixed inset-0 z-30 bg-black/5 backdrop-blur-[2px]'
//                     onClick={() => setShowInfo(false)}
//                     aria-hidden="true"
//                 />
//             )}

//             {/* Profile Dropdown Menu */}
//             {showInfo && (
//                 <div 
//                     className='nav-dropdown fixed top-[4.5rem] md:top-24 right-4 sm:right-6 lg:right-8 z-40 w-64 bg-white rounded-xl shadow-lg border border-gray-100'
//                     role="menu"
//                     aria-label="User menu"
//                 >
                    
//                     {/* User Info Header */}
//                     <div className='p-4 border-b border-gray-100'>
//                         <div className='flex items-center gap-3'>
//                             <div className='w-11 h-11 rounded-lg bg-gradient-to-br from-[#ff4d2d] to-[#ff6b4a] text-white font-bold text-base flex items-center justify-center shadow-sm flex-shrink-0'>
//                                 {userData?.fullName.slice(0, 1).toUpperCase()}
//                             </div>
//                             <div className='min-w-0 flex-1'>
//                                 <p className='font-semibold text-gray-900 text-sm truncate'>{userData?.fullName}</p>
//                                 <span className='inline-block text-xs text-orange-600 font-medium bg-orange-50 px-2 py-0.5 rounded-md mt-1 capitalize'>
//                                     {userData?.role}
//                                 </span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Menu Actions */}
//                     <div className='p-2'>
//                         {userData.role === "user" && (
//                             <button 
//                                 className='w-full sm:hidden flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 rounded-lg transition-colors duration-200 hover:bg-gray-50 active:bg-gray-100 outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
//                                 onClick={() => {
//                                     navigate("/my-orders")
//                                     setShowInfo(false)
//                                 }}
//                                 role="menuitem"
//                             >
//                                 <TbReceipt2 className="w-5 h-5 text-orange-500" aria-hidden="true" />
//                                 <span>My Orders</span>
//                             </button>
//                         )}
                        
//                         <button 
//                             className='w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 rounded-lg transition-colors duration-200 hover:bg-red-50 active:bg-red-100 outline-none focus-visible:ring-2 focus-visible:ring-red-500'
//                             onClick={handleLogOut}
//                             role="menuitem"
//                         >
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                             </svg>
//                             <span>Log Out</span>
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </>
//     )
// }

// export default Nav


import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaLocationDot, FaPlus } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { TbReceipt2 } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { setSearchItems, setUserData } from '../redux/userSlice';

function Nav() {
    const { userData, currentCity, cartItems } = useSelector(state => state.user)
    const { myShopData } = useSelector(state => state.owner)
    const [showInfo, setShowInfo] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [query, setQuery] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogOut = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true })
            dispatch(setUserData(null))
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearchItems = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/item/search-items?query=${query}&city=${currentCity}`, { withCredentials: true })
            dispatch(setSearchItems(result.data))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (query) {
            handleSearchItems()
        } else {
            dispatch(setSearchItems(null))
        }
    }, [query])

    return (
        <>
            {/* Main Navigation Bar */}
            <nav 
                className='fixed top-0 left-0 right-0 z-50 h-16 md:h-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white/70 to-white/40 backdrop-blur-xl border-b border-orange-100/30 shadow-[0_8px_32px_rgba(255,77,45,0.08)]'
                role="navigation"
                aria-label="Main navigation"
            >
                {/* Ambient Glow Effect */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-orange-50/40 via-transparent to-transparent" />
                
                <div className='max-w-7xl mx-auto h-full flex items-center justify-between gap-3 md:gap-4 relative'>
                    
                    {/* Logo */}
                    <button
                        onClick={() => navigate("/")}
                        className='flex-shrink-0 group outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-4 focus-visible:ring-offset-orange-50/50 rounded-xl transition-all duration-300 hover:translate-y-[-1px]'
                        aria-label="QuickBite home"
                    >
                        <h1 className='text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#ff4d2d] via-[#ff6b4a] to-[#ff8a6a] bg-clip-text text-transparent drop-shadow-sm'>
                            QuickBite
                        </h1>
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#ff4d2d] to-[#ff6b4a] group-hover:w-full transition-all duration-300 rounded-full" />
                    </button>

                    {/* Desktop Search Bar */}
                    {userData.role === "user" && (
                        <div className='hidden md:flex items-center flex-1 max-w-2xl h-12 bg-gradient-to-b from-orange-50/80 to-white rounded-2xl border border-orange-100/60 shadow-sm transition-all duration-200 hover:shadow-md hover:border-orange-200 focus-within:shadow-lg focus-within:border-orange-300 focus-within:from-white focus-within:to-white'>
                            
                            {/* Location Selector */}
                            <div className='flex items-center gap-2 px-4 border-r border-orange-100/80 min-w-[160px] hover:bg-orange-50/30 rounded-l-2xl transition-colors duration-200'>
                                <FaLocationDot className="w-4 h-4 text-orange-500 flex-shrink-0 drop-shadow-sm" aria-hidden="true" />
                                <span className='text-sm font-medium text-gray-800 truncate'>
                                    {currentCity || 'Select Location'}
                                </span>
                            </div>
                            
                            {/* Search Input */}
                            <div className='flex items-center gap-3 px-4 flex-1 group'>
                                <IoIosSearch className='w-5 h-5 text-orange-300 group-focus-within:text-orange-500 transition-colors duration-200' aria-hidden="true" />
                                <input 
                                    type="search" 
                                    placeholder='Search for dishes, restaurants...' 
                                    className='w-full bg-transparent text-sm text-gray-800 placeholder:text-gray-400/80 outline-none'
                                    onChange={(e) => setQuery(e.target.value)} 
                                    value={query}
                                    aria-label="Search for food"
                                />
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className='flex items-center gap-2 md:gap-3'>
                        
                        {/* Mobile Search Toggle */}
                        {userData.role === "user" && (
                            <button 
                                className='md:hidden p-2.5 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 text-orange-600 shadow-sm transition-all duration-200 hover:shadow-md hover:translate-y-[-1px] active:translate-y-0 active:shadow-sm border border-orange-200/50 outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-50'
                                onClick={() => setShowSearch(!showSearch)}
                                aria-label={showSearch ? "Close search" : "Open search"}
                                aria-expanded={showSearch}
                            >
                                {showSearch ? <RxCross2 className="w-5 h-5" /> : <IoIosSearch className="w-5 h-5" />}
                            </button>
                        )}

                        {/* Owner Actions */}
                        {userData.role === "owner" && myShopData && (
                            <>
                                {/* Add Item Button - Desktop */}
                                <button 
                                    className='hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#ff4d2d] via-[#ff6b4a] to-[#ff8a6a] text-white text-sm font-semibold rounded-xl shadow-md shadow-orange-500/20 transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30 hover:translate-y-[-1px] active:translate-y-0 active:shadow-sm border border-orange-400/20 outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-50'
                                    onClick={() => navigate("/add-item")}
                                    aria-label="Add new item"
                                >
                                    <FaPlus className="w-4 h-4" aria-hidden="true" />
                                    <span>Add Item</span>
                                </button>
                                
                                {/* Add Item Button - Mobile */}
                                <button 
                                    className='sm:hidden p-2.5 bg-gradient-to-r from-[#ff4d2d] to-[#ff6b4a] text-white rounded-xl shadow-md shadow-orange-500/20 transition-all duration-200 hover:shadow-lg hover:translate-y-[-1px] active:translate-y-0 active:shadow-sm border border-orange-400/20 outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-50'
                                    onClick={() => navigate("/add-item")}
                                    aria-label="Add new item"
                                >
                                    <FaPlus className="w-5 h-5" />
                                </button>

                                {/* My Orders Button - Desktop */}
                                <button 
                                    className='hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-orange-50 to-white text-orange-600 text-sm font-semibold rounded-xl border border-orange-200/60 shadow-sm transition-all duration-200 hover:shadow-md hover:border-orange-300 hover:translate-y-[-1px] active:translate-y-0 active:shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-50'
                                    onClick={() => navigate("/my-orders")}
                                    aria-label="View my orders"
                                >
                                    <TbReceipt2 className="w-5 h-5" aria-hidden="true" />
                                    <span>My Orders</span>
                                </button>

                                {/* My Orders Button - Mobile */}
                                <button 
                                    className='sm:hidden p-2.5 bg-gradient-to-br from-orange-50 to-white text-orange-600 rounded-xl border border-orange-200/60 shadow-sm transition-all duration-200 hover:shadow-md hover:border-orange-300 hover:translate-y-[-1px] active:translate-y-0 active:shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
                                    onClick={() => navigate("/my-orders")}
                                    aria-label="View my orders"
                                >
                                    <TbReceipt2 className="w-5 h-5" />
                                </button>
                            </>
                        )}

                        {/* User Cart & Orders */}
                        {userData.role === "user" && (
                            <>
                                {/* Cart Button */}
                                <button 
                                    className='relative p-2.5 bg-gradient-to-br from-orange-50 to-white text-orange-600 rounded-xl border border-orange-200/60 shadow-sm transition-all duration-200 hover:shadow-md hover:border-orange-300 hover:translate-y-[-1px] active:translate-y-0 active:shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-50'
                                    onClick={() => navigate("/cart")}
                                    aria-label={`Shopping cart with ${cartItems.length} items`}
                                >
                                    <FiShoppingCart className="w-5 h-5" aria-hidden="true" />
                                    {cartItems.length > 0 && (
                                        <span 
                                            className='absolute -top-1.5 -right-1.5 min-w-[22px] h-[22px] px-1 bg-gradient-to-br from-[#ff4d2d] via-[#ff6b4a] to-[#ff8a6a] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30 ring-2 ring-white/50 animate-in zoom-in duration-200'
                                            aria-hidden="true"
                                        >
                                            {cartItems.length > 9 ? '9+' : cartItems.length}
                                        </span>
                                    )}
                                </button>

                                {/* My Orders Button - Desktop */}
                                <button 
                                    className='hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-orange-50 to-white text-orange-600 text-sm font-semibold rounded-xl border border-orange-200/60 shadow-sm transition-all duration-200 hover:shadow-md hover:border-orange-300 hover:translate-y-[-1px] active:translate-y-0 active:shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-50'
                                    onClick={() => navigate("/my-orders")}
                                    aria-label="View my orders"
                                >
                                    <TbReceipt2 className="w-5 h-5 mr-1.5" aria-hidden="true" />
                                    <span>My Orders</span>
                                </button>
                            </>
                        )}

                        {/* User Profile Avatar */}
                        <button 
                            className='relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#ff4d2d] via-[#ff6b4a] to-[#ff8a6a] text-white font-bold text-base shadow-md shadow-orange-500/30 transition-all duration-200 hover:shadow-xl hover:shadow-orange-500/40 hover:translate-y-[-1px] active:translate-y-0 active:shadow-sm flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-50 border border-white/20'
                            onClick={() => setShowInfo(prev => !prev)}
                            aria-label="User menu"
                            aria-expanded={showInfo}
                            aria-haspopup="true"
                        >
                            {userData?.fullName.slice(0, 1).toUpperCase()}
                        </button>

                    </div>
                </div>
            </nav>

            {/* Mobile Search Dropdown */}
            {showSearch && userData.role === "user" && (
                <div 
                    className='nav-dropdown fixed top-16 left-0 right-0 z-40 px-4 py-4 md:hidden bg-gradient-to-b from-white/95 to-orange-50/95 backdrop-blur-xl border-b border-orange-100/60 shadow-lg animate-in slide-in-from-top duration-300'
                    role="search"
                >
                    <div className='max-w-7xl mx-auto'>
                        <div className='flex items-center h-14 bg-gradient-to-br from-white to-orange-50/80 rounded-2xl border border-orange-200/60 shadow-sm transition-all duration-200 focus-within:shadow-md focus-within:border-orange-300 focus-within:from-white focus-within:to-white'>
                            <div className='flex items-center gap-2 px-4 border-r border-orange-200/60 min-w-[100px] h-full hover:bg-orange-50/30 rounded-l-2xl transition-colors duration-200'>
                                <FaLocationDot className="w-4 h-4 text-orange-500 flex-shrink-0" aria-hidden="true" />
                                <span className='text-sm text-gray-800 truncate font-medium'>{currentCity}</span>
                            </div>
                            <div className='flex items-center gap-2 px-4 flex-1'>
                                <IoIosSearch className='w-5 h-5 text-orange-400' aria-hidden="true" />
                                <input 
                                    type="search" 
                                    placeholder='Search dishes, restaurants...' 
                                    className='w-full bg-transparent text-sm text-gray-800 placeholder:text-gray-400/70 outline-none'
                                    onChange={(e) => setQuery(e.target.value)} 
                                    value={query}
                                    aria-label="Search for food"
                                    autoFocus
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Backdrop Overlay */}
            {showInfo && (
                <div 
                    className='nav-backdrop fixed inset-0 z-30 bg-gradient-to-b from-black/5 via-transparent to-transparent backdrop-blur-[2px] animate-in fade-in duration-200'
                    onClick={() => setShowInfo(false)}
                    aria-hidden="true"
                />
            )}

            {/* Profile Dropdown Menu */}
            {showInfo && (
                <div 
                    className='nav-dropdown fixed top-[4.5rem] md:top-24 right-4 sm:right-6 lg:right-8 z-40 w-72 bg-gradient-to-b from-white/95 via-white to-orange-50/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-orange-100/80 animate-in slide-in-from-top-2 fade-in duration-200'
                    role="menu"
                    aria-label="User menu"
                >
                    
                    {/* User Info Header */}
                    <div className='p-5 border-b border-orange-100/80'>
                        <div className='flex items-center gap-4'>
                            <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff4d2d] via-[#ff6b4a] to-[#ff8a6a] text-white font-bold text-lg flex items-center justify-center shadow-md shadow-orange-500/30 flex-shrink-0 border border-white/30'>
                                {userData?.fullName.slice(0, 1).toUpperCase()}
                            </div>
                            <div className='min-w-0 flex-1'>
                                <p className='font-semibold text-gray-900 text-base truncate'>{userData?.fullName}</p>
                                <span className='inline-block text-xs text-orange-700 font-medium bg-gradient-to-r from-orange-50 to-orange-100/80 px-2.5 py-1 rounded-full mt-1.5 capitalize border border-orange-200/50 shadow-sm'>
                                    {userData?.role}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Menu Actions */}
                    <div className='p-2'>
                        {userData.role === "user" && (
                            <button 
                                className='w-full sm:hidden flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-800 rounded-xl transition-all duration-200 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100/50 active:from-orange-100 active:to-orange-200/50 outline-none focus-visible:ring-2 focus-visible:ring-orange-500 group'
                                onClick={() => {
                                    navigate("/my-orders")
                                    setShowInfo(false)
                                }}
                                role="menuitem"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100/80 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                                    <TbReceipt2 className="w-4 h-4 text-orange-600" aria-hidden="true" />
                                </div>
                                <span>My Orders</span>
                            </button>
                        )}
                        
                        <button 
                            className='w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-600 rounded-xl transition-all duration-200 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100/50 active:from-red-100 active:to-red-200/50 outline-none focus-visible:ring-2 focus-visible:ring-red-500 group'
                            onClick={handleLogOut}
                            role="menuitem"
                        >
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-50 to-red-100/80 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </div>
                            <span>Log Out</span>
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Nav