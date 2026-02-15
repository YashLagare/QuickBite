// import React from 'react'
// import Nav from './Nav'
// import { useSelector } from 'react-redux'
// import axios from 'axios'
// import { serverUrl } from '../App'
// import { useEffect } from 'react'
// import { useState } from 'react'
// import DeliveryBoyTracking from './DeliveryBoyTracking'
// import { ClipLoader } from 'react-spinners'
// import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

// function DeliveryBoy() {
//   const {userData,socket}=useSelector(state=>state.user)
//   const [currentOrder,setCurrentOrder]=useState()
//   const [showOtpBox,setShowOtpBox]=useState(false)
//   const [availableAssignments,setAvailableAssignments]=useState(null)
//   const [otp,setOtp]=useState("")
//   const [todayDeliveries,setTodayDeliveries]=useState([])
// const [deliveryBoyLocation,setDeliveryBoyLocation]=useState(null)
// const [loading,setLoading]=useState(false)
// const [message,setMessage]=useState("")
//   useEffect(()=>{
// if(!socket || userData.role!=="deliveryBoy") return
// let watchId
// if(navigator.geolocation){
// watchId=navigator.geolocation.watchPosition((position)=>{
//     const latitude=position.coords.latitude
//     const longitude=position.coords.longitude
//     setDeliveryBoyLocation({lat:latitude,lon:longitude})
//     socket.emit('updateLocation',{
//       latitude,
//       longitude,
//       userId:userData._id
//     })
//   }),
//   (error)=>{
//     console.log(error)
//   },
//   {
//     enableHighAccuracy:true
//   }
// }

// return ()=>{
//   if(watchId)navigator.geolocation.clearWatch(watchId)
// }

//   },[socket,userData])


// const ratePerDelivery=50
// const totalEarning=todayDeliveries.reduce((sum,d)=>sum + d.count*ratePerDelivery,0)



//   const getAssignments=async () => {
//     try {
//       const result=await axios.get(`${serverUrl}/api/order/get-assignments`,{withCredentials:true})
      
//       setAvailableAssignments(result.data)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const getCurrentOrder=async () => {
//      try {
//       const result=await axios.get(`${serverUrl}/api/order/get-current-order`,{withCredentials:true})
//     setCurrentOrder(result.data)
//     } catch (error) {
//       console.log(error)
//     }
//   }


//   const acceptOrder=async (assignmentId) => {
//     try {
//       const result=await axios.get(`${serverUrl}/api/order/accept-order/${assignmentId}`,{withCredentials:true})
//     console.log(result.data)
//     await getCurrentOrder()
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   useEffect(()=>{
//     socket.on('newAssignment',(data)=>{
//       setAvailableAssignments(prev=>([...prev,data]))
//     })
//     return ()=>{
//       socket.off('newAssignment')
//     }
//   },[socket])
  
//   const sendOtp=async () => {
//     setLoading(true)
//     try {
//       const result=await axios.post(`${serverUrl}/api/order/send-delivery-otp`,{
//         orderId:currentOrder._id,shopOrderId:currentOrder.shopOrder._id
//       },{withCredentials:true})
//       setLoading(false)
//        setShowOtpBox(true)
//     console.log(result.data)
//     } catch (error) {
//       console.log(error)
//       setLoading(false)
//     }
//   }
//    const verifyOtp=async () => {
//     setMessage("")
//     try {
//       const result=await axios.post(`${serverUrl}/api/order/verify-delivery-otp`,{
//         orderId:currentOrder._id,shopOrderId:currentOrder.shopOrder._id,otp
//       },{withCredentials:true})
//     console.log(result.data)
//     setMessage(result.data.message)
//     location.reload()
//     } catch (error) {
//       console.log(error)
//     }
//   }


//    const handleTodayDeliveries=async () => {
    
//     try {
//       const result=await axios.get(`${serverUrl}/api/order/get-today-deliveries`,{withCredentials:true})
//     console.log(result.data)
//    setTodayDeliveries(result.data)
//     } catch (error) {
//       console.log(error)
//     }
//   }
 

//   useEffect(()=>{
// getAssignments()
// getCurrentOrder()
// handleTodayDeliveries()
//   },[userData])
//   return (
//     <div className='w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto'>
//       <Nav/>
//       <div className='w-full max-w-[800px] flex flex-col gap-5 items-center'>
//     <div className='bg-white rounded-2xl shadow-md p-5 flex flex-col justify-start items-center w-[90%] border border-orange-100 text-center gap-2'>
// <h1 className='text-xl font-bold text-[#ff4d2d]'>Welcome, {userData.fullName}</h1>
// <p className='text-[#ff4d2d] '><span className='font-semibold'>Latitude:</span> {deliveryBoyLocation?.lat}, <span className='font-semibold'>Longitude:</span> {deliveryBoyLocation?.lon}</p>
//     </div>

// <div className='bg-white rounded-2xl shadow-md p-5 w-[90%] mb-6 border border-orange-100'>
//   <h1 className='text-lg font-bold mb-3 text-[#ff4d2d] '>Today Deliveries</h1>

//   <ResponsiveContainer width="100%" height={200}>
//    <BarChart data={todayDeliveries}>
//   <CartesianGrid strokeDasharray="3 3"/>
//   <XAxis dataKey="hour" tickFormatter={(h)=>`${h}:00`}/>
//     <YAxis  allowDecimals={false}/>
//     <Tooltip formatter={(value)=>[value,"orders"]} labelFormatter={label=>`${label}:00`}/>
//       <Bar dataKey="count" fill='#ff4d2d'/>
//    </BarChart>
//   </ResponsiveContainer>

//   <div className='max-w-sm mx-auto mt-6 p-6 bg-white rounded-2xl shadow-lg text-center'>
// <h1 className='text-xl font-semibold text-gray-800 mb-2'>Today's Earning</h1>
// <span className='text-3xl font-bold text-green-600'>₹{totalEarning}</span>
//   </div>
// </div>


// {!currentOrder && <div className='bg-white rounded-2xl p-5 shadow-md w-[90%] border border-orange-100'>
// <h1 className='text-lg font-bold mb-4 flex items-center gap-2'>Available Orders</h1>

// <div className='space-y-4'>
// {availableAssignments?.length>0
// ?
// (
// availableAssignments.map((a,index)=>(
//   <div className='border rounded-lg p-4 flex justify-between items-center' key={index}>
//    <div>
//     <p className='text-sm font-semibold'>{a?.shopName}</p>
//     <p className='text-sm text-gray-500'><span className='font-semibold'>Delivery Address:</span> {a?.deliveryAddress.text}</p>
// <p className='text-xs text-gray-400'>{a.items.length} items | {a.subtotal}</p>
//    </div>
//    <button className='bg-orange-500 text-white px-4 py-1 rounded-lg text-sm hover:bg-orange-600' onClick={()=>acceptOrder(a.assignmentId)}>Accept</button>

//   </div>
// ))
// ):<p className='text-gray-400 text-sm'>No Available Orders</p>}
// </div>
// </div>}

// {currentOrder && <div className='bg-white rounded-2xl p-5 shadow-md w-[90%] border border-orange-100'>
// <h2 className='text-lg font-bold mb-3'>📦Current Order</h2>
// <div className='border rounded-lg p-4 mb-3'>
//   <p className='font-semibold text-sm'>{currentOrder?.shopOrder.shop.name}</p>
//   <p className='text-sm text-gray-500'>{currentOrder.deliveryAddress.text}</p>
//  <p className='text-xs text-gray-400'>{currentOrder.shopOrder.shopOrderItems.length} items | {currentOrder.shopOrder.subtotal}</p>
// </div>

//  <DeliveryBoyTracking data={{ 
//   deliveryBoyLocation:deliveryBoyLocation || {
//         lat: userData.location.coordinates[1],
//         lon: userData.location.coordinates[0]
//       },
//       customerLocation: {
//         lat: currentOrder.deliveryAddress.latitude,
//         lon: currentOrder.deliveryAddress.longitude
//       }}} />
// {!showOtpBox ? <button className='mt-4 w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:bg-green-600 active:scale-95 transition-all duration-200' onClick={sendOtp} disabled={loading}>
// {loading?<ClipLoader size={20} color='white'/> :"Mark As Delivered"}
//  </button>:<div className='mt-4 p-4 border rounded-xl bg-gray-50'>
// <p className='text-sm font-semibold mb-2'>Enter Otp send to <span className='text-orange-500'>{currentOrder.user.fullName}</span></p>
// <input type="text" className='w-full border px-3 py-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400' placeholder='Enter OTP' onChange={(e)=>setOtp(e.target.value)} value={otp}/>
// {message && <p className='text-center text-green-400 text-2xl mb-4'>{message}</p>}

// <button className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-all" onClick={verifyOtp}>Submit OTP</button>
//   </div>}

//   </div>}


//       </div>
//     </div>
//   )
// }

// export default DeliveryBoy


import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { serverUrl } from '../App';
import DeliveryBoyTracking from './DeliveryBoyTracking';
import Nav from './Nav';

function DeliveryBoy() {
  const { userData, socket } = useSelector(state => state.user);
  const [currentOrder, setCurrentOrder] = useState();
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [availableAssignments, setAvailableAssignments] = useState(null);
  const [otp, setOtp] = useState("");
  const [todayDeliveries, setTodayDeliveries] = useState([]);
  const [deliveryBoyLocation, setDeliveryBoyLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!socket || userData.role !== "deliveryBoy") return;
    let watchId;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setDeliveryBoyLocation({ lat: latitude, lon: longitude });
          socket.emit('updateLocation', {
            latitude,
            longitude,
            userId: userData._id
          });
        },
        (error) => {
          console.log(error);
        },
        {
          enableHighAccuracy: true
        }
      );
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [socket, userData]);

  const ratePerDelivery = 50;
  const totalEarning = todayDeliveries.reduce((sum, d) => sum + d.count * ratePerDelivery, 0);

  const getAssignments = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-assignments`, { withCredentials: true });
      setAvailableAssignments(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentOrder = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-current-order`, { withCredentials: true });
      setCurrentOrder(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptOrder = async (assignmentId) => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/accept-order/${assignmentId}`, { withCredentials: true });
      console.log(result.data);
      await getCurrentOrder();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.on('newAssignment', (data) => {
      setAvailableAssignments(prev => ([...prev, data]));
    });
    return () => {
      socket.off('newAssignment');
    };
  }, [socket]);

  const sendOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(`${serverUrl}/api/order/send-delivery-otp`, {
        orderId: currentOrder._id, shopOrderId: currentOrder.shopOrder._id
      }, { withCredentials: true });
      setLoading(false);
      setShowOtpBox(true);
      console.log(result.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setMessage("");
    try {
      const result = await axios.post(`${serverUrl}/api/order/verify-delivery-otp`, {
        orderId: currentOrder._id, shopOrderId: currentOrder.shopOrder._id, otp
      }, { withCredentials: true });
      console.log(result.data);
      setMessage(result.data.message);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleTodayDeliveries = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-today-deliveries`, { withCredentials: true });
      console.log(result.data);
      setTodayDeliveries(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAssignments();
    getCurrentOrder();
    handleTodayDeliveries();
  }, [userData]);

  return (
    <div className='w-screen min-h-screen flex flex-col items-center bg-gradient-to-br from-[#fff7f3] via-[#fffdfb] to-[#ffece6] overflow-y-auto'>
      <Nav />
      
      {/* Main Content Container */}
      <div className='w-full max-w-4xl px-4 sm:px-6 py-8 space-y-8'>
        
        {/* Status Panel */}
        <section className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6 border border-orange-50'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <h1 className='text-xl sm:text-2xl font-bold text-[#2d2d2d]'>
                  Welcome🤗, {userData.fullName}
                </h1>
              </div>
              <p className='text-sm text-gray-500'>Active and ready for deliveries</p>
            </div>
          </div>
          
          {deliveryBoyLocation && (
            <div className='mt-4 pt-4 border-t border-orange-50'>
              <p className='text-sm text-gray-600'>
                <span className='font-semibold text-gray-700'>Current Location:</span>{' '}
                <span className='font-mono text-xs bg-orange-50 px-2 py-1 rounded'>
                  {deliveryBoyLocation.lat.toFixed(6)}, {deliveryBoyLocation.lon.toFixed(6)}
                </span>
              </p>
            </div>
          )}
        </section>

        {/* Analytics Section */}
        <section className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Chart Card */}
          <div className='lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6'>
            <h2 className='text-lg font-semibold text-[#2d2d2d] mb-4'>
              Today's Deliveries
            </h2>
            
            {todayDeliveries.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={todayDeliveries}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="hour" 
                    tickFormatter={(h) => `${h}:00`}
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis allowDecimals={false} style={{ fontSize: '12px' }} />
                  <Tooltip 
                    formatter={(value) => [value, "orders"]} 
                    labelFormatter={label => `${label}:00`}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #f0f0f0' }}
                  />
                  <Bar dataKey="count" fill='#ff6b4a' radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className='h-[220px] flex items-center justify-center'>
                <div className='text-center'>
                  <div className='text-4xl mb-2'>📊</div>
                  <p className='text-gray-400 text-sm'>No deliveries yet today</p>
                </div>
              </div>
            )}
          </div>

          {/* Earnings Card */}
          <div className='bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-md p-6 flex flex-col justify-center items-center text-center'>
            <div className='text-4xl mb-3'>💰</div>
            <h3 className='text-sm font-semibold text-gray-600 mb-2'>Today's Earnings</h3>
            <p className='text-4xl font-bold text-green-600'>₹{totalEarning}</p>
            <p className='text-xs text-gray-500 mt-2'>
              {todayDeliveries.reduce((sum, d) => sum + d.count, 0)} deliveries × ₹{ratePerDelivery}
            </p>
          </div>
        </section>

        {/* Current Order Section (Active Task with Glow) */}
        {currentOrder && (
          <section className='relative'>
            {/* Ambient Glow Background */}
            <div className='absolute inset-0 bg-gradient-to-r from-orange-200/30 via-orange-100/20 to-yellow-100/30 rounded-3xl blur-2xl'></div>
            
            {/* Content Card */}
            <div className='relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-orange-100'>
              <div className='flex items-center gap-2 mb-4'>
                <span className='text-2xl'>📦</span>
                <h2 className='text-xl font-bold text-[#2d2d2d]'>Active Delivery</h2>
                <span className='ml-auto px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full'>
                  In Progress
                </span>
              </div>

              {/* Order Details */}
              <div className='bg-gradient-to-br from-orange-50/50 to-amber-50/30 rounded-xl p-4 mb-4 border border-orange-100/50'>
                <div className='space-y-2'>
                  <div>
                    <p className='text-xs text-gray-500 uppercase tracking-wide font-medium mb-1'>Restaurant</p>
                    <p className='font-semibold text-[#2d2d2d]'>{currentOrder?.shopOrder.shop.name}</p>
                  </div>
                  
                  <div>
                    <p className='text-xs text-gray-500 uppercase tracking-wide font-medium mb-1'>Delivery Address</p>
                    <p className='text-sm text-gray-700'>{currentOrder.deliveryAddress.text}</p>
                  </div>
                  
                  <div className='flex items-center gap-4 pt-2 border-t border-orange-100/50'>
                    <span className='text-xs text-gray-600'>
                      <span className='font-semibold'>{currentOrder.shopOrder.shopOrderItems.length}</span> items
                    </span>
                    <span className='text-xs text-gray-400'>•</span>
                    <span className='text-xs font-semibold text-green-600'>
                      ₹{currentOrder.shopOrder.subtotal}
                    </span>
                  </div>
                </div>
              </div>

              {/* Map Component */}
              <div className='mb-4 rounded-xl overflow-hidden border border-orange-100/50'>
                <DeliveryBoyTracking 
                  data={{ 
                    deliveryBoyLocation: deliveryBoyLocation || {
                      lat: userData.location.coordinates[1],
                      lon: userData.location.coordinates[0]
                    },
                    customerLocation: {
                      lat: currentOrder.deliveryAddress.latitude,
                      lon: currentOrder.deliveryAddress.longitude
                    }
                  }} 
                />
              </div>

              {/* OTP Section */}
              {!showOtpBox ? (
                <button 
                  className='w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:scale-[0.99] transition-all duration-300 ease-out disabled:opacity-70 disabled:cursor-not-allowed'
                  onClick={sendOtp} 
                  disabled={loading}
                >
                  {loading ? <ClipLoader size={20} color='white' /> : "Mark As Delivered"}
                </button>
              ) : (
                <div className='bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-orange-100/50'>
                  <div className='mb-4'>
                    <p className='text-sm font-semibold text-gray-700 mb-1'>
                      Enter OTP sent to{' '}
                      <span className='text-orange-600'>{currentOrder.user.fullName}</span>
                    </p>
                    <p className='text-xs text-gray-500'>Verify delivery completion</p>
                  </div>
                  
                  <input 
                    type="text" 
                    className='w-full border-2 border-gray-200 px-4 py-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-center text-lg font-semibold tracking-widest transition-all'
                    placeholder='Enter OTP' 
                    onChange={(e) => setOtp(e.target.value)} 
                    value={otp}
                    maxLength={6}
                  />
                  
                  {message && (
                    <div className='mb-4 p-3 bg-green-50 border border-green-200 rounded-lg'>
                      <p className='text-center text-green-700 font-semibold'>{message}</p>
                    </div>
                  )}

                  <button 
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:-translate-y-[1px] transition-all duration-300 ease-out"
                    onClick={verifyOtp}
                  >
                    Submit OTP
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Available Orders Section */}
        {!currentOrder && (
          <section className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6'>
            <div className='flex items-center gap-2 mb-5'>
              <span className='text-xl'>🚀</span>
              <h2 className='text-lg font-semibold text-[#2d2d2d]'>Available Orders</h2>
            </div>

            <div className='space-y-4'>
              {availableAssignments && availableAssignments.length > 0 ? (
                availableAssignments.map((a, index) => (
                  <div 
                    key={index}
                    className='bg-gradient-to-br from-orange-50/30 to-amber-50/20 border border-orange-100 rounded-xl p-4 hover:shadow-md transition-all duration-300'
                  >
                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                      <div className='flex-1 space-y-2'>
                        <p className='font-semibold text-[#2d2d2d]'>{a?.shopName}</p>
                        <p className='text-sm text-gray-600'>
                          <span className='font-medium text-gray-700'>Delivery to:</span>{' '}
                          {a?.deliveryAddress.text}
                        </p>
                        <div className='flex items-center gap-3 text-xs text-gray-500'>
                          <span className='font-medium'>{a.items.length} items</span>
                          <span>•</span>
                          <span className='font-semibold text-green-600'>₹{a.subtotal}</span>
                        </div>
                      </div>
                      
                      <button 
                        className='bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-[1px] transition-all duration-300 ease-out whitespace-nowrap'
                        onClick={() => acceptOrder(a.assignmentId)}
                      >
                        Accept Order
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className='bg-gradient-to-br from-orange-50/30 to-amber-50/20 rounded-xl p-12 text-center border border-orange-100/50'>
                  <div className='text-5xl mb-3'>📭</div>
                  <h3 className='text-lg font-semibold text-[#2d2d2d] mb-2'>
                    No available orders right now
                  </h3>
                  <p className='text-sm text-gray-500'>
                    New delivery assignments will appear here
                  </p>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default DeliveryBoy;