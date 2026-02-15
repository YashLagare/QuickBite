import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { FaDrumstickBite, FaLeaf, FaMinus, FaPlus, FaRegStar, FaShoppingCart, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateQuantity as updateCartItemQuantity } from '../redux/userSlice';

const FoodCard = memo(({ data, isLoading = false }) => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.user);

    // Check if item exists in cart and sync quantity
    const cartItem = useMemo(() =>
        cartItems.find(item => item.id === data._id),
        [cartItems, data._id]
    );

    const [quantity, setQuantity] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    // Sync quantity with cart
    useEffect(() => {
        if (cartItem) {
            setQuantity(cartItem.quantity);
        } else {
            setQuantity(0);
        }
    }, [cartItem]);

    // Check if cart has items from different shop
    const hasItemsFromDifferentShop = useMemo(() => {
        if (cartItems.length === 0) return false;
        return cartItems.some(item => item.shop !== data.shop);
    }, [cartItems, data.shop]);

    // Memoized stars rendering with keys
    const renderStars = useMemo(() => {
        const rating = Math.floor(data.rating?.average || 0);
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            stars.push(
                i <= rating ? (
                    <FaStar key={i} className='text-yellow-500 text-base' />
                ) : (
                    <FaRegStar key={i} className='text-yellow-500 text-base' />
                )
            );
        }
        return stars;
    }, [data.rating?.average]);

    const handleIncrease = useCallback(() => {
        if (quantity >= 10) {
            toast.error('Maximum quantity is 10');
            return;
        }
        const newQty = quantity + 1;
        setQuantity(newQty);

        // Optimistically update cart
        if (cartItem) {
            dispatch(updateCartItemQuantity({ id: data._id, quantity: newQty }));
        }
    }, [quantity, cartItem, data._id, dispatch]);

    const handleDecrease = useCallback(() => {
        if (quantity > 0) {
            const newQty = quantity - 1;
            setQuantity(newQty);

            // Optimistically update cart
            if (cartItem && newQty > 0) {
                dispatch(updateCartItemQuantity({ id: data._id, quantity: newQty }));
            }
        }
    }, [quantity, cartItem, data._id, dispatch]);

    const handleAddToCart = useCallback(() => {
        // Check shop mismatch
        if (hasItemsFromDifferentShop) {
            toast.error('Please clear cart to add items from a different restaurant');
            return;
        }

        setIsAdding(true);
        setQuantity(1);

        const itemData = {
            id: data._id,
            name: data.name,
            price: data.price,
            image: data.image,
            shop: data.shop,
            quantity: 1,
            foodType: data.foodType
        };

        dispatch(addToCart(itemData));
        toast.success('Added to cart');

        // Animation feedback
        setTimeout(() => setIsAdding(false), 300);
    }, [hasItemsFromDifferentShop, data, dispatch]);

    const isInCart = !!cartItem;

    // Skeleton loading state
    if (isLoading) {
        return (
            <div className='w-[250px] rounded-2xl border-2 border-gray-200 bg-white shadow-md overflow-hidden flex flex-col animate-pulse'>
                <div className='w-full h-[170px] bg-gray-200'></div>
                <div className='flex-1 flex flex-col p-4'>
                    <div className='h-5 bg-gray-200 rounded w-3/4 mb-2'></div>
                    <div className='h-4 bg-gray-200 rounded w-1/2'></div>
                </div>
                <div className='flex items-center justify-between p-3'>
                    <div className='h-6 bg-gray-200 rounded w-16'></div>
                </div>
            </div>
        );
    }

    return (
        <div className={`w-[250px] rounded-2xl border border-gray-200 bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col ${isAdding ? 'scale-[1.02]' : ''}`}>
            {/* Image Section with Overlay Controls */}
            <div className='relative w-full h-[170px] flex justify-center items-center bg-gray-100'>
                {/* Food Type Badge */}
                <div className='absolute top-3 left-3 bg-white rounded-md p-1.5 shadow-sm z-10 border border-gray-200'>
                    {data.foodType === "veg" ? (
                        <FaLeaf className='text-green-600 text-sm' aria-label="Vegetarian" />
                    ) : (
                        <FaDrumstickBite className='text-red-600 text-sm' aria-label="Non-Vegetarian" />
                    )}
                </div>

                {/* Image with lazy loading and fallback */}
                {!imageLoaded && !imageError && (
                    <div className='w-full h-full bg-gray-200 animate-pulse'></div>
                )}

                {imageError ? (
                    <div className='w-full h-full flex items-center justify-center bg-gray-100'>
                        <div className='text-center text-gray-400'>
                            <FaShoppingCart size={40} className='mx-auto mb-2' />
                            <p className='text-xs'>Image unavailable</p>
                        </div>
                    </div>
                ) : (
                    <img
                        src={data.image}
                        alt={data.name}
                        loading="lazy"
                        className={`w-full h-full object-cover transition-all duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageError(true)}
                    />
                )}

                {/* Blinkit-Style ADD Button / Quantity Stepper */}
                <div className='absolute bottom-3 right-3 z-10'>
                    {quantity === 0 ? (
                        /* ADD Button */
                        <button
                            onClick={handleAddToCart}
                            disabled={hasItemsFromDifferentShop}
                            className='bg-white text-green-600 font-bold text-sm px-8 py-2 rounded-lg border-2 border-green-600 hover:bg-green-50 active:scale-95 transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed'
                            title={hasItemsFromDifferentShop ? 'Clear cart to add items from different restaurant' : 'Add to cart'}
                        >
                            ADD
                        </button>
                    ) : (
                        /* Quantity Stepper */
                        <div className='flex items-center bg-white rounded-lg border-2 border-green-600 shadow-md overflow-hidden'>
                            <button
                                onClick={handleDecrease}
                                className='px-3 py-2 text-green-600 hover:bg-green-50 active:bg-green-100 transition-colors'
                                aria-label="Decrease quantity"
                            >
                                <FaMinus size={12} />
                            </button>

                            <span className='px-3 font-bold text-green-600 text-base min-w-[32px] text-center'>
                                {quantity}
                            </span>

                            <button
                                onClick={handleIncrease}
                                disabled={quantity >= 10}
                                className='px-3 py-2 text-green-600 hover:bg-green-50 active:bg-green-100 transition-colors disabled:opacity-50'
                                aria-label="Increase quantity"
                            >
                                <FaPlus size={12} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col p-4">
                {/* Name */}
                <h1 className='font-semibold text-gray-900 text-base truncate mb-1' title={data.name}>
                    {data.name}
                </h1>

                {/* Rating */}
                <div className='flex items-center gap-1 mb-2'>
                    {renderStars}
                    <span className='text-xs text-gray-500 ml-0.5'>
                        ({data.rating?.count || 0})
                    </span>
                </div>

                {/* Price & Category */}
                <div className='flex items-center justify-between mt-auto'>
                    <span className='font-bold text-gray-900 text-xl'>
                        ₹{data.price}
                    </span>

                    {data.category && (
                        <span className='text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded'>
                            {data.category}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
});

FoodCard.displayName = 'FoodCard';

export default FoodCard;