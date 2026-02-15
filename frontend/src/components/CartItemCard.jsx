// import React from 'react'
// import { FaMinus } from "react-icons/fa";
// import { FaPlus } from "react-icons/fa";
// import { CiTrash } from "react-icons/ci";
// import { useDispatch } from 'react-redux';
// import { removeCartItem, updateQuantity } from '../redux/userSlice';
// function CartItemCard({data}) {
//     const dispatch=useDispatch()
//     const handleIncrease=(id,currentQty)=>{
//        dispatch(updateQuantity({id,quantity:currentQty+1}))
//     }
//       const handleDecrease=(id,currentQty)=>{
//         if(currentQty>1){
//   dispatch(updateQuantity({id,quantity:currentQty-1}))
//         }
        
//     }
//   return (
//     <div className='flex items-center justify-between bg-white p-4 rounded-xl shadow border'>
//       <div className='flex items-center gap-4'>
//         <img src={data.image} alt="" className='w-20 h-20 object-cover rounded-lg border'/>
//         <div>
//             <h1 className='font-medium text-gray-800'>{data.name}</h1>
//             <p className='text-sm text-gray-500'>₹{data.price} x {data.quantity}</p>
//             <p className="font-bold text-gray-900">₹{data.price*data.quantity}</p>
//         </div>
//       </div>
//       <div className='flex items-center gap-3'>
//         <button className='p-2 cursor-pointer bg-gray-100 rounded-full hover:bg-gray-200' onClick={()=>handleDecrease(data.id,data.quantity)}>
//         <FaMinus size={12}/>
//         </button>
//         <span>{data.quantity}</span>
//         <button className='p-2 cursor-pointer bg-gray-100 rounded-full hover:bg-gray-200'  onClick={()=>handleIncrease(data.id,data.quantity)}>
//         <FaPlus size={12}/>
//         </button>
//         <button className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
//  onClick={()=>dispatch(removeCartItem(data.id))}>
// <CiTrash size={18}/>
//         </button>
//       </div>
//     </div>
//   )
// }

// export default CartItemCard


import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { FaDrumstickBite, FaLeaf, FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { removeCartItem, updateQuantity } from '../redux/userSlice';

function CartItemCard({ data }) {
    const dispatch = useDispatch();

    const handleIncrease = (id, currentQty) => {
        if (currentQty >= 10) {
            toast.error('Maximum quantity is 10');
            return;
        }
        dispatch(updateQuantity({ id, quantity: currentQty + 1 }));
    };

    const handleDecrease = (id, currentQty) => {
        if (currentQty > 1) {
            dispatch(updateQuantity({ id, quantity: currentQty - 1 }));
        }
    };

    const handleRemove = (id, name) => {
        dispatch(removeCartItem(id));
        toast.success(`${name} removed from cart`);
    };

    return (
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 gap-4'>
            {/* Left Section: Image & Details */}
            <div className='flex items-center gap-4 flex-1'>
                {/* Image */}
                <div className='relative flex-shrink-0'>
                    <img 
                        src={data.image} 
                        alt={data.name} 
                        className='w-24 h-24 object-cover rounded-xl border border-gray-200'
                    />
                    {/* Veg/Non-veg Badge on Image */}
                    <div className='absolute -top-2 -left-2 bg-white rounded-full p-1 shadow-sm border border-gray-200'>
                        {data.foodType === "veg" ? (
                            <FaLeaf className='text-green-600 text-xs' />
                        ) : (
                            <FaDrumstickBite className='text-red-600 text-xs' />
                        )}
                    </div>
                </div>

                {/* Details */}
                <div className='flex-1'>
                    <h1 className='font-semibold text-gray-900 text-base mb-1'>
                        {data.name}
                    </h1>
                    <div className='flex items-center gap-2 text-sm text-gray-500 mb-2'>
                        <span>₹{data.price}</span>
                        <span>×</span>
                        <span>{data.quantity}</span>
                    </div>
                    <p className="font-bold text-orange-600 text-lg">
                        ₹{data.price * data.quantity}
                    </p>
                </div>
            </div>

            {/* Right Section: Quantity Controls & Delete */}
            <div className='flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end'>
                {/* Quantity Stepper */}
                <div className='flex items-center bg-white border-2 border-orange-500 rounded-lg overflow-hidden shadow-sm'>
                    {/* Decrease Button */}
                    <button
                        className='px-3 py-2 hover:bg-orange-50 transition-colors active:bg-orange-100'
                        onClick={() => handleDecrease(data.id, data.quantity)}
                        aria-label="Decrease quantity"
                    >
                        <FaMinus size={12} className='text-orange-600' />
                    </button>

                    {/* Quantity Display */}
                    <span className='px-4 font-bold text-base text-orange-600 min-w-[40px] text-center'>
                        {data.quantity}
                    </span>

                    {/* Increase Button */}
                    <button
                        className='px-3 py-2 hover:bg-orange-50 transition-colors active:bg-orange-100 disabled:opacity-50'
                        onClick={() => handleIncrease(data.id, data.quantity)}
                        disabled={data.quantity >= 10}
                        aria-label="Increase quantity"
                    >
                        <FaPlus size={12} className='text-orange-600' />
                    </button>
                </div>

                {/* Delete Button */}
                <button
                    className="p-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 active:scale-95 transition-all border border-red-200"
                    onClick={() => handleRemove(data.id, data.name)}
                    aria-label="Remove item"
                >
                    <Trash2 size={20} />
                </button>
            </div>
        </div>
    );
}

export default CartItemCard;