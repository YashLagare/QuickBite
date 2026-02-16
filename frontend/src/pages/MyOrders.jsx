// import { useEffect, useState } from 'react';
// import { IoIosArrowRoundBack } from "react-icons/io";
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import OwnerOrderCard from '../components/OwnerOrderCard';
// import UserOrderCard from '../components/UserOrderCard';
// import { setMyOrders, updateRealtimeOrderStatus } from '../redux/userSlice';

// function MyOrders() {
//   const { userData, myOrders, socket } = useSelector(state => state.user);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [newOrderIds, setNewOrderIds] = useState([]);

//   useEffect(() => {
//     socket?.on('newOrder', (data) => {
//       if (data.shopOrders?.owner._id == userData._id) {
//         dispatch(setMyOrders([data, ...myOrders]));

//         // Add new order ID to trigger highlight animation
//         setNewOrderIds(prev => [...prev, data._id]);

//         // Remove highlight after animation completes
//         setTimeout(() => {
//           setNewOrderIds(prev => prev.filter(id => id !== data._id));
//         }, 3000);
//       }
//     });

//     socket?.on('update-status', ({ orderId, shopId, status, userId }) => {
//       if (userId == userData._id) {
//         dispatch(updateRealtimeOrderStatus({ orderId, shopId, status }));
//       }
//     });

//     return () => {
//       socket?.off('newOrder');
//       socket?.off('update-status');
//     };
//   }, [socket, myOrders, userData]);

//   return (
//     <div className='w-full min-h-screen bg-gradient-to-br from-[#fff7f3] via-[#fffdfb] to-[#ffece6] flex justify-center relative'>

//       {/* Back Button */}
//       <button
//         className='absolute top-6 left-6 z-20 bg-white/80 backdrop-blur-sm p-2.5 rounded-full shadow-md hover:shadow-lg hover:-translate-y-[1px] transition-all duration-300 ease-out group'
//         onClick={() => navigate("/")}
//       >
//         <IoIosArrowRoundBack
//           size={28}
//           className='text-orange-600 group-hover:text-orange-700 transition-colors'
//         />
//       </button>

//       <div className='w-full max-w-4xl px-4 sm:px-6 py-8'>

//         {/* Header Section */}
//         <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-4 sm:p-5 mb-8 border border-orange-50'>
//           <div>
//             <h1 className='text-2xl sm:text-3xl font-semibold text-[#2d2d2d]'>
//               {userData.role === "owner" ? "Order Management" : "My Orders"}
//             </h1>
//             <p className='text-sm text-gray-500 mt-1'>
//               {userData.role === "owner"
//                 ? "Track and manage incoming orders"
//                 : "View your order history and track deliveries"
//               }
//             </p>
//           </div>
//         </div>

//         {/* Orders Container */}
//         {myOrders && myOrders.length > 0 ? (
//           <div className='space-y-6'>
//             {myOrders?.map((order, index) => {
//               const isNewOrder = newOrderIds.includes(order._id);

//               return (
//                 <div
//                   key={index}
//                   className={`
//                     transition-all duration-500 ease-out
//                     ${isNewOrder ? 'animate-highlight-pulse' : ''}
//                   `}
//                 >
//                   {userData.role === "user" ? (
//                     <UserOrderCard data={order} />
//                   ) : userData.role === "owner" ? (
//                     <OwnerOrderCard data={order} />
//                   ) : null}
//                 </div>
//               );
//             })}
//           </div>
//         ) : (
//           // Empty State
//           <div className='bg-white/60 backdrop-blur-sm rounded-2xl shadow-md p-12 sm:p-16 text-center border border-orange-50'>
//             <div className='max-w-md mx-auto'>
//               <div className='text-6xl mb-4'>
//                 {userData.role === "owner" ? "📋" : "🛍️"}
//               </div>
//               <h3 className='text-2xl font-semibold text-[#2d2d2d] mb-3'>
//                 No orders yet
//               </h3>
//               <p className='text-gray-500 text-base'>
//                 {userData.role === "owner"
//                   ? "Incoming orders will appear here. Make sure your restaurant is online and ready to accept orders."
//                   : "Once you place an order, it will appear here. Start exploring restaurants and add items to your cart!"
//                 }
//               </p>

//               {userData.role === "user" && (
//                 <button
//                   onClick={() => navigate("/")}
//                   className='mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:-translate-y-[1px] transition-all duration-300 ease-out'
//                 >
//                   Browse Restaurants
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Custom Keyframe Animation */}
//       <style jsx>{`
//         @keyframes highlight-pulse {
//           0% {
//             transform: scale(1);
//             box-shadow: 0 0 0 0 rgba(255, 107, 74, 0.7);
//           }
//           50% {
//             transform: scale(1.02);
//             box-shadow: 0 0 0 10px rgba(255, 107, 74, 0);
//           }
//           100% {
//             transform: scale(1);
//             box-shadow: 0 0 0 0 rgba(255, 107, 74, 0);
//           }
//         }

//         .animate-highlight-pulse {
//           animation: highlight-pulse 1.5s ease-out;
//           position: relative;
//         }

//         .animate-highlight-pulse::before {
//           content: '';
//           position: absolute;
//           inset: -2px;
//           background: linear-gradient(135deg, rgba(255, 107, 74, 0.3), rgba(255, 143, 107, 0.2));
//           border-radius: 1rem;
//           z-index: -1;
//           animation: fade-out 3s ease-out forwards;
//         }

//         @keyframes fade-out {
//           0% {
//             opacity: 1;
//           }
//           100% {
//             opacity: 0;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default MyOrders;

// import { useEffect, useState } from 'react';
// import { IoIosArrowRoundBack } from "react-icons/io";
// import { MdDeliveryDining, MdRestaurantMenu } from "react-icons/md";
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import OwnerOrderCard from '../components/OwnerOrderCard';
// import UserOrderCard from '../components/UserOrderCard';
// import { setMyOrders, updateRealtimeOrderStatus } from '../redux/userSlice';

// import { useSocket } from '../context/SocketContext';

// function MyOrders() {
//   const { userData, myOrders } = useSelector(state => state.user);
//   const { socket } = useSocket();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [newOrderIds, setNewOrderIds] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Simulate initial loading
//     const timer = setTimeout(() => setIsLoading(false), 500);

//     socket?.on('newOrder', (data) => {
//       if (data.shopOrders?.owner._id == userData._id) {
//         dispatch(setMyOrders([data, ...myOrders]));

//         // Add new order ID to trigger highlight animation
//         setNewOrderIds(prev => [...prev, data._id]);

//         // Remove highlight after animation completes
//         setTimeout(() => {
//           setNewOrderIds(prev => prev.filter(id => id !== data._id));
//         }, 3000);
//       }
//     });

//     socket?.on('update-status', ({ orderId, shopId, status, userId }) => {
//       if (userId == userData._id) {
//         dispatch(updateRealtimeOrderStatus({ orderId, shopId, status }));
//       }
//     });

//     return () => {
//       clearTimeout(timer);
//       socket?.off('newOrder');
//       socket?.off('update-status');
//     };
//   }, [socket, myOrders, userData]);

//   return (
//     <div className='w-full min-h-screen bg-gradient-to-br from-[#fff7f3] via-[#fffdfb] to-[#ffece6] flex justify-center relative'>

//       {/* Back Button */}
//       <button
//         className='absolute top-6 left-6 z-20 bg-white/80 backdrop-blur-sm p-2.5 rounded-full shadow-md hover:shadow-lg hover:-translate-y-[1px] transition-all duration-300 ease-out group'
//         onClick={() => navigate("/")}
//         aria-label="Go back"
//       >
//         <IoIosArrowRoundBack
//           size={28}
//           className='text-orange-600 group-hover:text-orange-700 transition-colors'
//         />
//       </button>

//       <div className='w-full max-w-4xl px-4 sm:px-6 py-8'>

//         {/* Header Section */}
//         <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-5 sm:p-6 mb-8 border border-orange-50'>
//           <div className='flex items-center gap-3'>
//             {/* Icon */}
//             <div className='bg-gradient-to-br from-orange-100 to-amber-100 p-3 rounded-xl shadow-sm'>
//               {userData.role === "owner" ? (
//                 <MdRestaurantMenu className='text-orange-600 text-2xl' />
//               ) : (
//                 <MdDeliveryDining className='text-orange-600 text-2xl' />
//               )}
//             </div>

//             {/* Title and Description */}
//             <div className='flex-1'>
//               <h1 className='text-2xl sm:text-3xl font-semibold text-[#2d2d2d]'>
//                 {userData.role === "owner" ? "Order Management" : "My Orders"}
//               </h1>
//               <p className='text-sm text-gray-500 mt-1'>
//                 {userData.role === "owner"
//                   ? "Track and manage incoming orders"
//                   : "View your order history and track deliveries"
//                 }
//               </p>
//             </div>

//             {/* Order Count Badge */}
//             {myOrders && myOrders.length > 0 && (
//               <div className='bg-orange-100 text-orange-600 px-3 py-1.5 rounded-full text-sm font-semibold'>
//                 {myOrders.length} {myOrders.length === 1 ? 'Order' : 'Orders'}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Loading State */}
//         {isLoading ? (
//           <div className='space-y-6'>
//             {[1, 2, 3].map((i) => (
//               <div key={i} className='bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm p-6 border border-orange-50 animate-pulse'>
//                 <div className='h-6 bg-gray-200 rounded w-1/3 mb-4'></div>
//                 <div className='h-4 bg-gray-200 rounded w-2/3 mb-3'></div>
//                 <div className='h-4 bg-gray-200 rounded w-1/2'></div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <>
//             {/* Orders Container */}
//             {myOrders && myOrders.length > 0 ? (
//               <div className='space-y-6'>
//                 {myOrders?.map((order, index) => {
//                   const isNewOrder = newOrderIds.includes(order._id);

//                   return (
//                     <div
//                       key={order._id || index}
//                       className={`
//                         transition-all duration-500 ease-out
//                         ${isNewOrder ? 'animate-highlight-pulse' : ''}
//                       `}
//                     >
//                       {userData.role === "user" ? (
//                         <UserOrderCard data={order} />
//                       ) : userData.role === "owner" ? (
//                         <OwnerOrderCard data={order} />
//                       ) : null}
//                     </div>
//                   );
//                 })}
//               </div>
//             ) : (
//               // Empty State
//               <div className='bg-white/60 backdrop-blur-sm rounded-2xl shadow-md p-12 sm:p-16 text-center border border-orange-50'>
//                 <div className='max-w-md mx-auto'>
//                   <div className='text-6xl mb-4'>
//                     {userData.role === "owner" ? "📋" : "🛍️"}
//                   </div>
//                   <h3 className='text-2xl font-semibold text-[#2d2d2d] mb-3'>
//                     No orders yet
//                   </h3>
//                   <p className='text-gray-500 text-base mb-6'>
//                     {userData.role === "owner"
//                       ? "Incoming orders will appear here. Make sure your restaurant is online and ready to accept orders."
//                       : "Once you place an order, it will appear here. Start exploring restaurants and add items to your cart!"
//                     }
//                   </p>

//                   {userData.role === "user" && (
//                     <button
//                       onClick={() => navigate("/")}
//                       className='bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:-translate-y-[1px] transition-all duration-300 ease-out inline-flex items-center gap-2'
//                     >
//                       <span>Browse Restaurants</span>
//                       <span>→</span>
//                     </button>
//                   )}
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Custom Keyframe Animation */}
//       <style jsx>{`
//         @keyframes highlight-pulse {
//           0% {
//             transform: scale(1);
//             box-shadow: 0 0 0 0 rgba(255, 107, 74, 0.7);
//           }
//           50% {
//             transform: scale(1.02);
//             box-shadow: 0 0 0 10px rgba(255, 107, 74, 0);
//           }
//           100% {
//             transform: scale(1);
//             box-shadow: 0 0 0 0 rgba(255, 107, 74, 0);
//           }
//         }

//         .animate-highlight-pulse {
//           animation: highlight-pulse 1.5s ease-out;
//           position: relative;
//         }

//         .animate-highlight-pulse::before {
//           content: '';
//           position: absolute;
//           inset: -2px;
//           background: linear-gradient(135deg, rgba(255, 107, 74, 0.3), rgba(255, 143, 107, 0.2));
//           border-radius: 1rem;
//           z-index: -1;
//           animation: fade-out 3s ease-out forwards;
//         }

//         @keyframes fade-out {
//           0% {
//             opacity: 1;
//           }
//           100% {
//             opacity: 0;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default MyOrders;

import { useEffect, useState } from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdDeliveryDining, MdRestaurantMenu } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OwnerOrderCard from '../components/OwnerOrderCard';
import UserOrderCard from '../components/UserOrderCard';
import useGetMyOrders from '../hooks/useGetMyOrders';
import { setMyOrders, updateRealtimeOrderStatus } from '../redux/userSlice';

function MyOrders() {
  const { userData, myOrders, socket } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newOrderIds, setNewOrderIds] = useState([]);
  
  // Fetch orders using the hook
  const { loading: isLoading } = useGetMyOrders();

  // Socket event listeners
  useEffect(() => {
    socket?.on('newOrder', (data) => {
      if (data.shopOrders?.owner._id == userData._id) {
        dispatch(setMyOrders([data, ...myOrders]));

        // Add new order ID to trigger highlight animation
        setNewOrderIds(prev => [...prev, data._id]);

        // Remove highlight after animation completes
        setTimeout(() => {
          setNewOrderIds(prev => prev.filter(id => id !== data._id));
        }, 3000);
      }
    });

    socket?.on('update-status', ({ orderId, shopId, status, userId }) => {
      if (userId == userData._id) {
        dispatch(updateRealtimeOrderStatus({ orderId, shopId, status }));
      }
    });

    return () => {
      socket?.off('newOrder');
      socket?.off('update-status');
    };
  }, [socket, myOrders, userData, dispatch]);

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-[#fff7f3] via-[#fffdfb] to-[#ffece6] flex justify-center relative'>

      {/* Back Button */}
      <button
        className='absolute top-6 left-6 z-20 bg-white/80 backdrop-blur-sm p-2.5 rounded-full shadow-md hover:shadow-lg hover:-translate-y-[1px] transition-all duration-300 ease-out group'
        onClick={() => navigate("/")}
        aria-label="Go back"
      >
        <IoIosArrowRoundBack
          size={28}
          className='text-orange-600 group-hover:text-orange-700 transition-colors'
        />
      </button>

      <div className='w-full max-w-4xl px-4 sm:px-6 py-8'>

        {/* Header Section */}
        <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-5 sm:p-6 mb-8 border border-orange-50'>
          <div className='flex items-center gap-3'>
            {/* Icon */}
            <div className='bg-gradient-to-br from-orange-100 to-amber-100 p-3 rounded-xl shadow-sm'>
              {userData.role === "owner" ? (
                <MdRestaurantMenu className='text-orange-600 text-2xl' />
              ) : (
                <MdDeliveryDining className='text-orange-600 text-2xl' />
              )}
            </div>

            {/* Title and Description */}
            <div className='flex-1'>
              <h1 className='text-2xl sm:text-3xl font-semibold text-[#2d2d2d]'>
                {userData.role === "owner" ? "Order Management" : "My Orders"}
              </h1>
              <p className='text-sm text-gray-500 mt-1'>
                {userData.role === "owner"
                  ? "Track and manage incoming orders"
                  : "View your order history and track deliveries"
                }
              </p>
            </div>

            {/* Order Count Badge */}
            {myOrders && myOrders.length > 0 && !isLoading && (
              <div className='bg-orange-100 text-orange-600 px-3 py-1.5 rounded-full text-sm font-semibold'>
                {myOrders.length} {myOrders.length === 1 ? 'Order' : 'Orders'}
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className='space-y-6'>
            {[1, 2, 3].map((i) => (
              <div key={i} className='bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm p-6 border border-orange-50 animate-pulse'>
                <div className='h-6 bg-gray-200 rounded w-1/3 mb-4'></div>
                <div className='h-4 bg-gray-200 rounded w-2/3 mb-3'></div>
                <div className='h-4 bg-gray-200 rounded w-1/2'></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Orders Container */}
            {myOrders && myOrders.length > 0 ? (
              <div className='space-y-6'>
                {myOrders?.map((order, index) => {
                  const isNewOrder = newOrderIds.includes(order._id);

                  return (
                    <div
                      key={order._id || index}
                      className={`
                        transition-all duration-500 ease-out
                        ${isNewOrder ? 'animate-highlight-pulse' : ''}
                      `}
                    >
                      {userData.role === "user" ? (
                        <UserOrderCard data={order} />
                      ) : userData.role === "owner" ? (
                        <OwnerOrderCard data={order} />
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : (
              // Empty State
              <div className='bg-white/60 backdrop-blur-sm rounded-2xl shadow-md p-12 sm:p-16 text-center border border-orange-50'>
                <div className='max-w-md mx-auto'>
                  <div className='text-6xl mb-4'>
                    {userData.role === "owner" ? "📋" : "🛍️"}
                  </div>
                  <h3 className='text-2xl font-semibold text-[#2d2d2d] mb-3'>
                    No orders yet
                  </h3>
                  <p className='text-gray-500 text-base mb-6'>
                    {userData.role === "owner"
                      ? "Incoming orders will appear here. Make sure your restaurant is online and ready to accept orders."
                      : "Once you place an order, it will appear here. Start exploring restaurants and add items to your cart!"
                    }
                  </p>

                  {userData.role === "user" && (
                    <button
                      onClick={() => navigate("/")}
                      className='bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:-translate-y-[1px] transition-all duration-300 ease-out inline-flex items-center gap-2'
                    >
                      <span>Browse Restaurants</span>
                      <span>→</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Custom Keyframe Animation */}
      <style jsx>{`
        @keyframes highlight-pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 107, 74, 0.7);
          }
          50% {
            transform: scale(1.02);
            box-shadow: 0 0 0 10px rgba(255, 107, 74, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 107, 74, 0);
          }
        }

        .animate-highlight-pulse {
          animation: highlight-pulse 1.5s ease-out;
          position: relative;
        }

        .animate-highlight-pulse::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, rgba(255, 107, 74, 0.3), rgba(255, 143, 107, 0.2));
          border-radius: 1rem;
          z-index: -1;
          animation: fade-out 3s ease-out forwards;
        }

        @keyframes fade-out {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default MyOrders;