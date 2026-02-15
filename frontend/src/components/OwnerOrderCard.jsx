
import axios from 'axios';
import { Bike, CreditCard, MapPin, Phone, User, Wallet } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { serverUrl } from '../App';
import { updateOrderStatus } from '../redux/userSlice';

function OwnerOrderCard({ data }) {
    const [availableBoys, setAvailableBoys] = useState([])
    const dispatch = useDispatch()
    
    const handleUpdateStatus = async (orderId, shopId, status) => {
        try {
            const result = await axios.post(`${serverUrl}/api/order/update-status/${orderId}/${shopId}`, { status }, { withCredentials: true })
            dispatch(updateOrderStatus({ orderId, shopId, status }))
            setAvailableBoys(result.data.availableBoys)
            console.log(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='bg-white/80 backdrop-blur-md rounded-xl shadow-lg shadow-orange-200/30 border border-orange-100/50 p-4 space-y-3 hover:shadow-xl hover:shadow-orange-200/50 transition-all duration-300'>
            
            {/* Customer Info - Compact */}
            <div className='flex items-start justify-between'>
                <div className='flex items-start gap-3'>
                    <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff4d2d] to-[#ff6b4a] flex items-center justify-center shadow-md flex-shrink-0'>
                        <User className='text-white w-5 h-5' />
                    </div>
                    <div className='min-w-0'>
                        <h2 className='text-base font-bold text-gray-800 truncate'>{data.user.fullName}</h2>
                        <p className='text-xs text-gray-500 truncate'>{data.user.email}</p>
                        <div className='flex items-center gap-1.5 text-xs text-gray-600 mt-1'>
                            <Phone className='w-3.5 h-3.5 text-[#ff4d2d]' />
                            <span>{data.user.mobile}</span>
                        </div>
                    </div>
                </div>

                {/* Payment Badge */}
                <div className='flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200/50 flex-shrink-0'>
                    {data.paymentMethod === "online" ? (
                        <>
                            <CreditCard className='w-3.5 h-3.5 text-[#ff4d2d]' />
                            <span className='text-xs font-medium text-[#ff4d2d]'>
                                {data.payment ? "Paid" : "Pending"}
                            </span>
                        </>
                    ) : (
                        <>
                            <Wallet className='w-3.5 h-3.5 text-[#ff4d2d]' />
                            <span className='text-xs font-medium text-[#ff4d2d]'>COD</span>
                        </>
                    )}
                </div>
            </div>

            {/* Delivery Address - Compact */}
            <div className='flex items-start gap-2 p-2.5 bg-orange-50/50 rounded-lg border border-orange-100/50'>
                <MapPin className='w-4 h-4 text-[#ff4d2d] flex-shrink-0 mt-0.5' />
                <div className='min-w-0'>
                    <p className='text-xs text-gray-700 leading-relaxed'>{data?.deliveryAddress?.text}</p>
                    <p className='text-[10px] text-gray-400 mt-0.5'>
                        {data?.deliveryAddress.latitude.toFixed(4)}, {data?.deliveryAddress.longitude.toFixed(4)}
                    </p>
                </div>
            </div>

            {/* Order Items - Horizontal Scroll */}
            <div className='flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-transparent'>
                {data.shopOrders.shopOrderItems.map((item, index) => (
                    item?.item && (
                        <div key={index} className='flex-shrink-0 w-32 border border-orange-100 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200'>
                            <img 
                                src={item.item.image} 
                                alt={item.name} 
                                className='w-full h-20 object-cover'
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/128x80?text=No+Image'
                                }}
                            />
                            <div className='p-2'>
                                <p className='text-xs font-semibold text-gray-800 truncate'>{item.name}</p>
                                <p className='text-[10px] text-gray-500 mt-0.5'>
                                    {item.quantity} × ₹{item.price}
                                </p>
                            </div>
                        </div>
                    )
                ))}
            </div>

            {/* Status and Action */}
            <div className='flex items-center justify-between gap-3 pt-2 border-t border-orange-100'>
                <div className='flex items-center gap-2'>
                    <span className='text-xs text-gray-600'>Status:</span>
                    <span className='px-2.5 py-1 rounded-full bg-orange-100 text-[#ff4d2d] text-xs font-semibold capitalize'>
                        {data.shopOrders.status}
                    </span>
                </div>

                <select 
                    className='px-3 py-1.5 rounded-lg border border-orange-200 bg-white text-[#ff4d2d] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]/30 focus:border-[#ff4d2d] cursor-pointer transition-all hover:bg-orange-50' 
                    onChange={(e) => handleUpdateStatus(data._id, data.shopOrders.shop._id, e.target.value)}
                >
                    <option value="">Update Status</option>
                    <option value="pending">Pending</option>
                    <option value="preparing">Preparing</option>
                    <option value="out of delivery">Out Of Delivery</option>
                </select>
            </div>

            {/* Delivery Boy Info */}
            {data.shopOrders.status === "out of delivery" && (
                <div className='p-3 border border-orange-200/50 rounded-lg bg-gradient-to-br from-orange-50/50 to-transparent'>
                    <div className='flex items-center gap-2 mb-2'>
                        <Bike className='w-4 h-4 text-[#ff4d2d]' />
                        <p className='text-xs font-semibold text-gray-700'>
                            {data.shopOrders.assignedDeliveryBoy ? 'Assigned Delivery Boy' : 'Available Delivery Boys'}
                        </p>
                    </div>
                    
                    {availableBoys?.length > 0 ? (
                        <div className='space-y-1.5'>
                            {availableBoys.map((b, index) => (
                                <div key={index} className='flex items-center justify-between text-xs bg-white px-2.5 py-1.5 rounded-lg border border-orange-100'>
                                    <span className='font-medium text-gray-800'>{b.fullName}</span>
                                    <span className='text-gray-500'>{b.mobile}</span>
                                </div>
                            ))}
                        </div>
                    ) : data.shopOrders.assignedDeliveryBoy ? (
                        <div className='flex items-center justify-between text-xs bg-white px-2.5 py-1.5 rounded-lg border border-orange-100'>
                            <span className='font-medium text-gray-800'>{data.shopOrders.assignedDeliveryBoy.fullName}</span>
                            <span className='text-gray-500'>{data.shopOrders.assignedDeliveryBoy.mobile}</span>
                        </div>
                    ) : (
                        <p className='text-xs text-gray-500 italic'>Waiting for delivery boy to accept...</p>
                    )}
                </div>
            )}

            {/* Total */}
            <div className='flex items-center justify-between pt-2 border-t border-orange-100'>
                <span className='text-sm font-semibold text-gray-700'>Total Amount</span>
                <span className='text-xl font-bold bg-gradient-to-r from-[#ff4d2d] to-[#ff6b4a] bg-clip-text text-transparent'>
                    ₹{data.shopOrders.subtotal}
                </span>
            </div>
        </div>
    )
}

export default OwnerOrderCard