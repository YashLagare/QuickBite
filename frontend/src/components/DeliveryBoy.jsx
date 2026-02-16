import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { serverUrl } from '../App';
import DeliveryBoyTracking from './DeliveryBoyTracking';
import Nav from './Nav';

function DeliveryBoy() {
  const { userData, socket } = useSelector(state => state.user);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [availableAssignments, setAvailableAssignments] = useState([]);
  const [otp, setOtp] = useState("");
  const [todayDeliveries, setTodayDeliveries] = useState([]);
  const [deliveryBoyLocation, setDeliveryBoyLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [assignmentsLoading, setAssignmentsLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Geolocation tracking
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
          console.log('Geolocation error:', error);
          toast.error('Unable to access location');
        },
        {
          enableHighAccuracy: true
        }
      );
    } else {
      toast.error('Geolocation not supported');
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [socket, userData]);

  const ratePerDelivery = 50;
  const totalEarning = todayDeliveries.reduce((sum, d) => sum + d.count * ratePerDelivery, 0);

  const getAssignments = async () => {
    setAssignmentsLoading(true);
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-assignments`, {
        withCredentials: true
      });
      console.log('Assignments:', result.data);
      setAvailableAssignments(result.data || []);
    } catch (error) {
      console.log('Get assignments error:', error);
      toast.error('Failed to fetch available orders');
      setAvailableAssignments([]);
    } finally {
      setAssignmentsLoading(false);
    }
  };

  const getCurrentOrder = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-current-order`, {
        withCredentials: true
      });
      console.log('Current order:', result.data);
      setCurrentOrder(result.data);
    } catch (error) {
      console.log('Get current order error:', error);
      // Don't show error toast if just no order (404 is expected)
      if (error.response?.status !== 404) {
        toast.error('Click on Refresh button in "Available Orders" to fetch current order');
      }
      setCurrentOrder(null);
    }
  };

  const acceptOrder = async (assignmentId) => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/accept-order/${assignmentId}`, {
        withCredentials: true
      });
      console.log('Order accepted:', result.data);
      toast.success('Order accepted successfully!');

      // Remove from available assignments
      setAvailableAssignments(prev => prev.filter(a => a.assignmentId !== assignmentId));

      // Fetch current order
      await getCurrentOrder();
    } catch (error) {
      console.log('Accept order error:', error);
      toast.error(error.response?.data?.message || 'Failed to accept order');
    }
  };

  const sendOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(`${serverUrl}/api/order/send-delivery-otp`, {
        orderId: currentOrder._id,
        shopOrderId: currentOrder.shopOrder._id
      }, { withCredentials: true });

      console.log('OTP sent:', result.data);
      toast.success('OTP sent to customer');
      setShowOtpBox(true);
    } catch (error) {
      console.log('Send OTP error:', error);
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp || otp.length < 4) {
      toast.error('Please enter a valid OTP');
      return;
    }

    setMessage("");
    setLoading(true);
    try {
      const result = await axios.post(`${serverUrl}/api/order/verify-delivery-otp`, {
        orderId: currentOrder._id,
        shopOrderId: currentOrder.shopOrder._id,
        otp
      }, { withCredentials: true });

      console.log('OTP verified:', result.data);
      setMessage(result.data.message);
      toast.success('Delivery completed successfully!');

      // Reload after showing success message
      setTimeout(() => {
        location.reload();
      }, 1500);
    } catch (error) {
      console.log('Verify OTP error:', error);
      toast.error(error.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleTodayDeliveries = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-today-deliveries`, {
        withCredentials: true
      });
      console.log('Today deliveries:', result.data);
      setTodayDeliveries(result.data || []);
    } catch (error) {
      console.log('Get today deliveries error:', error);
      setTodayDeliveries([]);
    }
  };

  // Socket listener for new assignments
  useEffect(() => {
    if (!socket) return;

    socket.on('newAssignment', (data) => {
      console.log('New assignment received:', data);
      setAvailableAssignments(prev => [data, ...prev]);
      toast.success('New delivery order available!');
    });

    return () => {
      socket.off('newAssignment');
    };
  }, [socket]);

  // Initial data fetch
  useEffect(() => {
    if (userData) {
      getAssignments();
      getCurrentOrder();
      handleTodayDeliveries();
    }
  }, [userData]);

  return (
    <div className='w-screen min-h-screen flex flex-col items-center bg-gradient-to-br from-[#fff7f3] via-[#fffdfb] to-[#ffece6] overflow-y-auto'>
      <Nav />

      {/* Main Content Container */}
      <div className='w-full max-w-4xl px-4 sm:px-6 py-8 space-y-8'>

        {/* Status Panel */}
        <section className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6 border border-orange-50'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div className='flex-1'>
              <div className='flex items-center gap-2 mb-2'>
                <span className='w-3 h-3 bg-green-500 rounded-full animate-pulse'></span>
                <h1 className='text-xl sm:text-2xl font-bold text-[#2d2d2d]'>
                  Welcome, {userData.fullName}
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
          <div className='lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6 border border-orange-50'>
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
          <div className='bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-md p-6 border border-green-100 flex flex-col justify-center items-center text-center'>
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
              <div className='mb-4 rounded-xl overflow-hidden border border-orange-100/50 h-[300px]'>
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
                  className='w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[1px] active:scale-[0.99] transition-all duration-300 ease-out disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                  onClick={sendOtp}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <ClipLoader size={20} color='white' />
                      <span>Sending OTP...</span>
                    </>
                  ) : (
                    "Mark As Delivered"
                  )}
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
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    value={otp}
                    maxLength={6}
                  />

                  {message && (
                    <div className='mb-4 p-3 bg-green-50 border border-green-200 rounded-lg'>
                      <p className='text-center text-green-700 font-semibold'>{message}</p>
                    </div>
                  )}

                  <button
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:-translate-y-[1px] transition-all duration-300 ease-out disabled:opacity-70 flex items-center justify-center gap-2"
                    onClick={verifyOtp}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <ClipLoader size={20} color='white' />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      "Submit OTP"
                    )}
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Available Orders Section */}
        {!currentOrder && (
          <section className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6 border border-orange-50'>
            <div className='flex items-center justify-between mb-5'>
              <div className='flex items-center gap-2'>
                <span className='text-xl'>🚀</span>
                <h2 className='text-lg font-semibold text-[#2d2d2d]'>Available Orders</h2>
              </div>
              <button
                onClick={getAssignments}
                className='text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1'
              >
                <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>

            {assignmentsLoading ? (
              <div className='space-y-4'>
                {[1, 2].map((i) => (
                  <div key={i} className='bg-gray-100 rounded-xl p-4 animate-pulse'>
                    <div className='h-5 bg-gray-200 rounded w-1/3 mb-3'></div>
                    <div className='h-4 bg-gray-200 rounded w-2/3 mb-2'></div>
                    <div className='h-3 bg-gray-200 rounded w-1/4'></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='space-y-4'>
                {availableAssignments && availableAssignments.length > 0 ? (
                  availableAssignments.map((a, index) => (
                    <div
                      key={a.assignmentId || index}
                      className='bg-gradient-to-br from-orange-50/30 to-amber-50/20 border border-orange-100 rounded-xl p-4 hover:shadow-md transition-all duration-300'
                    >
                      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                        <div className='flex-1 space-y-2'>
                          <p className='font-semibold text-[#2d2d2d]'>{a?.shopName}</p>
                          <p className='text-sm text-gray-600'>
                            <span className='font-medium text-gray-700'>Delivery to:</span>{' '}
                            {a?.deliveryAddress?.text}
                          </p>
                          <div className='flex items-center gap-3 text-xs text-gray-500'>
                            <span className='font-medium'>{a.items?.length || 0} items</span>
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
            )}
          </section>
        )}
      </div>
    </div>
  );
}

export default DeliveryBoy;