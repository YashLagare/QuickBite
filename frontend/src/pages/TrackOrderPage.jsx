// import axios from 'axios'
// import React from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { serverUrl } from '../App'
// import { useEffect } from 'react'
// import { useState } from 'react'
// import { IoIosArrowRoundBack } from "react-icons/io";
// import DeliveryBoyTracking from '../components/DeliveryBoyTracking'
// import { useSelector } from 'react-redux'
// function TrackOrderPage() {
//     const { orderId } = useParams()
//     const [currentOrder, setCurrentOrder] = useState() 
//     const navigate = useNavigate()
//     const {socket}=useSelector(state=>state.user)
//     const [liveLocations,setLiveLocations]=useState({})
//     const handleGetOrder = async () => {
//         try {
//             const result = await axios.get(`${serverUrl}/api/order/get-order-by-id/${orderId}`, { withCredentials: true })
//             setCurrentOrder(result.data)
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     useEffect(()=>{
// socket.on('updateDeliveryLocation',({deliveryBoyId,latitude,longitude})=>{
// setLiveLocations(prev=>({
//   ...prev,
//   [deliveryBoyId]:{lat:latitude,lon:longitude}
// }))
// })
//     },[socket])

//     useEffect(() => {
//         handleGetOrder()
//     }, [orderId])
//     return (
//         <div className='max-w-4xl mx-auto p-4 flex flex-col gap-6'>
//             <div className='relative flex items-center gap-4 top-[20px] left-[20px] z-[10] mb-[10px]' onClick={() => navigate("/")}>
//                 <IoIosArrowRoundBack size={35} className='text-[#ff4d2d]' />
//                 <h1 className='text-2xl font-bold md:text-center'>Track Order</h1>
//             </div>
//       {currentOrder?.shopOrders?.map((shopOrder,index)=>(
//         <div className='bg-white p-4 rounded-2xl shadow-md border border-orange-100 space-y-4' key={index}>
//          <div>
//             <p className='text-lg font-bold mb-2 text-[#ff4d2d]'>{shopOrder.shop.name}</p>
//             <p className='font-semibold'><span>Items:</span> {shopOrder.shopOrderItems?.map(i=>i.name).join(",")}</p>
//             <p><span className='font-semibold'>Subtotal:</span> {shopOrder.subtotal}</p>
//             <p className='mt-6'><span className='font-semibold'>Delivery address:</span> {currentOrder.deliveryAddress?.text}</p>
//          </div>
//          {shopOrder.status!="delivered"?<>
// {shopOrder.assignedDeliveryBoy?
// <div className='text-sm text-gray-700'>
// <p className='font-semibold'><span>Delivery Boy Name:</span> {shopOrder.assignedDeliveryBoy.fullName}</p>
// <p className='font-semibold'><span>Delivery Boy contact No.:</span> {shopOrder.assignedDeliveryBoy.mobile}</p>
// </div>:<p className='font-semibold'>Delivery Boy is not assigned yet.</p>}
//          </>:<p className='text-green-600 font-semibold text-lg'>Delivered</p>}

// {(shopOrder.assignedDeliveryBoy && shopOrder.status !== "delivered") && (
//   <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-md">
//     <DeliveryBoyTracking data={{
//       deliveryBoyLocation:liveLocations[shopOrder.assignedDeliveryBoy._id] || {
//         lat: shopOrder.assignedDeliveryBoy.location.coordinates[1],
//         lon: shopOrder.assignedDeliveryBoy.location.coordinates[0]
//       },
//       customerLocation: {
//         lat: currentOrder.deliveryAddress.latitude,
//         lon: currentOrder.deliveryAddress.longitude
//       }
//     }} />
//   </div>
// )}



//         </div>
//       ))}



//         </div>
//     )
// }

// export default TrackOrderPage


import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaPhone, FaUser } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdCheckCircle, MdDeliveryDining, MdLocationOn, MdRestaurant } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import { serverUrl } from '../App';
import DeliveryBoyTracking from '../components/DeliveryBoyTracking';

import { useSocket } from '../context/SocketContext';

function TrackOrderPage() {
  const { orderId } = useParams();
  const [currentOrder, setCurrentOrder] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { socket } = useSocket();
  const [liveLocations, setLiveLocations] = useState({});

  const handleGetOrder = async () => {
    setLoading(true);
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-order-by-id/${orderId}`, { withCredentials: true });
      setCurrentOrder(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    socket?.on('updateDeliveryLocation', ({ deliveryBoyId, latitude, longitude }) => {
      setLiveLocations(prev => ({
        ...prev,
        [deliveryBoyId]: { lat: latitude, lon: longitude }
      }));
    });

    return () => {
      socket?.off('updateDeliveryLocation');
    };
  }, [socket]);

  useEffect(() => {
    handleGetOrder();
  }, [orderId]);

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-700', text: '⏳ Pending' },
      preparing: { color: 'bg-blue-100 text-blue-700', text: '👨‍🍳 Preparing' },
      ready: { color: 'bg-purple-100 text-purple-700', text: '✅ Ready' },
      'on-the-way': { color: 'bg-orange-100 text-orange-700', text: '🚚 On the Way' },
      delivered: { color: 'bg-green-100 text-green-700', text: '✓ Delivered' }
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span className={`${config.color} px-3 py-1.5 rounded-full text-sm font-semibold`}>
        {config.text}
      </span>
    );
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-[#fff7f3] via-[#fffdfb] to-[#ffece6] flex justify-center p-4'>
        <div className='w-full max-w-4xl'>
          <div className='bg-white/60 backdrop-blur-sm rounded-2xl shadow-md p-6 animate-pulse'>
            <div className='h-8 bg-gray-200 rounded w-1/3 mb-4'></div>
            <div className='h-4 bg-gray-200 rounded w-2/3 mb-6'></div>
            <div className='h-64 bg-gray-200 rounded'></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#fff7f3] via-[#fffdfb] to-[#ffece6] relative'>

      {/* Back Button */}
      <button
        className='absolute top-6 left-6 z-20 bg-white/80 backdrop-blur-sm p-2.5 rounded-full shadow-md hover:shadow-lg hover:-translate-y-[1px] transition-all duration-300 ease-out group'
        onClick={() => navigate("/my-orders")}
      >
        <IoIosArrowRoundBack
          size={28}
          className='text-orange-600 group-hover:text-orange-700 transition-colors'
        />
      </button>

      <div className='max-w-4xl mx-auto px-4 sm:px-6 py-8'>

        {/* Header */}
        <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-5 sm:p-6 mb-8 border border-orange-50'>
          <div className='flex items-center gap-3'>
            <div className='bg-gradient-to-br from-orange-100 to-amber-100 p-3 rounded-xl'>
              <MdDeliveryDining className='text-orange-600 text-2xl' />
            </div>
            <div className='flex-1'>
              <h1 className='text-2xl sm:text-3xl font-semibold text-[#2d2d2d]'>
                Track Your Order
              </h1>
              <p className='text-sm text-gray-500 mt-1'>
                Real-time delivery tracking
              </p>
            </div>
          </div>
        </div>

        {/* Delivery Address Card */}
        <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-5 mb-6 border border-orange-50'>
          <div className='flex items-start gap-3'>
            <div className='bg-orange-100 p-2.5 rounded-lg'>
              <MdLocationOn className='text-orange-600 text-xl' />
            </div>
            <div className='flex-1'>
              <p className='text-sm font-semibold text-gray-700 mb-1'>Delivery Address</p>
              <p className='text-gray-600'>{currentOrder?.deliveryAddress?.text}</p>
            </div>
          </div>
        </div>

        {/* Shop Orders */}
        <div className='space-y-6'>
          {currentOrder?.shopOrders?.map((shopOrder, index) => (
            <div
              key={index}
              className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-orange-50 overflow-hidden'
            >
              {/* Shop Header */}
              <div className='bg-gradient-to-r from-orange-50 to-amber-50 p-5 border-b border-orange-100'>
                <div className='flex items-start justify-between gap-4'>
                  <div className='flex items-center gap-3 flex-1'>
                    <div className='bg-white p-2.5 rounded-lg shadow-sm'>
                      <MdRestaurant className='text-orange-600 text-xl' />
                    </div>
                    <div>
                      <h2 className='text-lg font-bold text-[#2d2d2d]'>
                        {shopOrder.shop.name}
                      </h2>
                      <p className='text-sm text-gray-600'>
                        Order #{orderId.slice(-8).toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={shopOrder.status} />
                </div>
              </div>

              {/* Order Details */}
              <div className='p-5 space-y-4'>
                {/* Items */}
                <div>
                  <p className='text-sm font-semibold text-gray-700 mb-2'>Order Items</p>
                  <div className='bg-gray-50 rounded-xl p-3'>
                    <p className='text-gray-700'>
                      {shopOrder.shopOrderItems?.map(i => i.name).join(", ")}
                    </p>
                  </div>
                </div>

                {/* Subtotal */}
                <div className='flex justify-between items-center py-3 border-t border-gray-100'>
                  <span className='text-gray-700 font-medium'>Subtotal</span>
                  <span className='text-lg font-bold text-orange-600'>₹{shopOrder.subtotal}</span>
                </div>

                {/* Delivery Boy Info or Status */}
                {shopOrder.status !== "delivered" ? (
                  <>
                    {shopOrder.assignedDeliveryBoy ? (
                      <div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100'>
                        <p className='text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2'>
                          <MdDeliveryDining className='text-blue-600 text-xl' />
                          Delivery Partner
                        </p>
                        <div className='space-y-2'>
                          <div className='flex items-center gap-2 text-sm'>
                            <FaUser className='text-blue-600' />
                            <span className='text-gray-700'>
                              {shopOrder.assignedDeliveryBoy.fullName}
                            </span>
                          </div>
                          <div className='flex items-center gap-2 text-sm'>
                            <FaPhone className='text-blue-600' />
                            <a
                              href={`tel:${shopOrder.assignedDeliveryBoy.mobile}`}
                              className='text-blue-600 hover:text-blue-700 font-medium'
                            >
                              {shopOrder.assignedDeliveryBoy.mobile}
                            </a>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className='bg-yellow-50 rounded-xl p-4 border border-yellow-200'>
                        <p className='text-yellow-800 font-medium flex items-center gap-2'>
                          ⏳ Delivery partner will be assigned shortly
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className='bg-green-50 rounded-xl p-4 border border-green-200'>
                    <p className='text-green-700 font-semibold text-lg flex items-center gap-2'>
                      <MdCheckCircle className='text-2xl' />
                      Order Delivered Successfully!
                    </p>
                  </div>
                )}

                {/* Live Map Tracking */}
                {(shopOrder.assignedDeliveryBoy && shopOrder.status !== "delivered") && (
                  <div className='pt-4'>
                    <p className='text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2'>
                      <MdLocationOn className='text-orange-600 text-xl' />
                      Live Tracking
                    </p>
                    <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200">
                      <DeliveryBoyTracking
                        data={{
                          deliveryBoyLocation: liveLocations[shopOrder.assignedDeliveryBoy._id] || {
                            lat: shopOrder.assignedDeliveryBoy.location.coordinates[1],
                            lon: shopOrder.assignedDeliveryBoy.location.coordinates[0]
                          },
                          customerLocation: {
                            lat: currentOrder.deliveryAddress.latitude,
                            lon: currentOrder.deliveryAddress.longitude
                          }
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrackOrderPage;