import { FaShoppingCart } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItemCard from '../components/CartItemCard';

function CartPage() {
    const navigate = useNavigate();
    const { cartItems, totalAmount } = useSelector(state => state.user);

    return (
        <div className='min-h-screen bg-gradient-to-br from-[#fff7f3] via-[#fffdfb] to-[#ffece6] flex justify-center relative'>
            
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

            {/* Main Content */}
            <div className='w-full max-w-4xl px-4 sm:px-6 py-8'>
                
                {/* Header */}
                <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-5 mb-8 border border-orange-50'>
                    <div className='flex items-center gap-3'>
                        <div className='bg-gradient-to-br from-orange-100 to-amber-100 p-3 rounded-xl'>
                            <FaShoppingCart className='text-orange-600 text-xl' />
                        </div>
                        <div>
                            <h1 className='text-2xl sm:text-3xl font-semibold text-[#2d2d2d]'>
                                Your Cart
                            </h1>
                            <p className='text-sm text-gray-500 mt-0.5'>
                                {cartItems?.length > 0 
                                    ? `${cartItems.length} ${cartItems.length === 1 ? 'item' : 'items'} in cart`
                                    : 'Your cart is empty'
                                }
                            </p>
                        </div>
                    </div>
                </div>

                {/* Cart Content */}
                {cartItems?.length === 0 ? (
                    /* Empty State */
                    <div className='bg-white/60 backdrop-blur-sm rounded-2xl shadow-md p-12 sm:p-16 text-center border border-orange-50'>
                        <div className='max-w-md mx-auto'>
                            <div className='text-6xl mb-4'>🛒</div>
                            <h3 className='text-2xl font-semibold text-[#2d2d2d] mb-3'>
                                Your cart is empty
                            </h3>
                            <p className='text-gray-500 text-base mb-6'>
                                Start adding delicious items to your cart and they'll appear here!
                            </p>
                            <button
                                onClick={() => navigate("/")}
                                className='bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:-translate-y-[1px] transition-all duration-300 ease-out'
                            >
                                Browse Restaurants
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Cart Items */}
                        <div className='space-y-4 mb-6'>
                            {cartItems?.map((item, index) => (
                                <CartItemCard data={item} key={index} />
                            ))}
                        </div>

                        {/* Bill Summary Card */}
                        <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6 border border-orange-50 mb-6'>
                            <h2 className='text-lg font-semibold text-[#2d2d2d] mb-4'>
                                Bill Summary
                            </h2>
                            
                            <div className='space-y-3'>
                                {/* Item Total */}
                                <div className='flex justify-between text-gray-600'>
                                    <span>Item Total</span>
                                    <span className='font-semibold'>₹{totalAmount}</span>
                                </div>

                                {/* Divider */}
                                <div className='border-t border-gray-200 pt-3'>
                                    {/* Total Amount */}
                                    <div className='flex justify-between items-center'>
                                        <span className='text-lg font-semibold text-[#2d2d2d]'>
                                            Total Amount
                                        </span>
                                        <span className='text-2xl font-bold text-orange-600'>
                                            ₹{totalAmount}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Checkout Button */}
                        <div className='flex justify-end'>
                            <button
                                className='bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3.5 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg hover:-translate-y-[1px] active:scale-[0.98] transition-all duration-300 ease-out flex items-center gap-2'
                                onClick={() => navigate("/checkout")}
                            >
                                <span>Proceed to Checkout</span>
                                <span>→</span>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default CartPage;