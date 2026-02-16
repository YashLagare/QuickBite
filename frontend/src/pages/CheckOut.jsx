import axios from 'axios';
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCreditCard } from "react-icons/fa";
import { FaMobileScreenButton } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoLocationSharp, IoSearchOutline } from "react-icons/io5";
import { MdDeliveryDining } from "react-icons/md";
import { TbCurrentLocation } from "react-icons/tb";
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { serverUrl } from '../App';
import { setAddress, setLocation } from '../redux/mapSlice';
import { addMyOrder, clearCart } from '../redux/userSlice';

function RecenterMap({ location }) {
  if (location.lat && location.lon) {
    const map = useMap();
    map.setView([location.lat, location.lon], 16, { animate: true });
  }
  return null;
}

function CheckOut() {
  const { location, address } = useSelector(state => state.map);
  const { cartItems, totalAmount, userData } = useSelector(state => state.user);
  const [addressInput, setAddressInput] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [searchingAddress, setSearchingAddress] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiKey = import.meta.env.VITE_GEOAPIKEY;
  const deliveryFee = totalAmount > 500 ? 0 : 40;
  const AmountWithDeliveryFee = totalAmount + deliveryFee;

  const onDragEnd = (e) => {
    const { lat, lng } = e.target._latlng;
    dispatch(setLocation({ lat, lon: lng }));
    getAddressByLatLng(lat, lng);
  };

  const getCurrentLocation = () => {
    const latitude = userData.location.coordinates[1];
    const longitude = userData.location.coordinates[0];
    dispatch(setLocation({ lat: latitude, lon: longitude }));
    getAddressByLatLng(latitude, longitude);
    toast.success('Location updated to your current position');
  };

  const getAddressByLatLng = async (lat, lng) => {
    try {
      const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${apiKey}`);
      dispatch(setAddress(result?.data?.results[0].address_line2));
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch address');
    }
  };

  const getLatLngByAddress = async () => {
    if (!addressInput.trim()) {
      toast.error('Please enter an address');
      return;
    }

    setSearchingAddress(true);
    try {
      const result = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(addressInput)}&apiKey=${apiKey}`);
      const { lat, lon } = result.data.features[0].properties;
      dispatch(setLocation({ lat, lon }));
      toast.success('Location found!');
    } catch (error) {
      console.log(error);
      toast.error('Address not found. Please try again.');
    } finally {
      setSearchingAddress(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!addressInput.trim()) {
      toast.error('Please enter delivery address');
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post(`${serverUrl}/api/order/place-order`, {
        paymentMethod,
        deliveryAddress: {
          text: addressInput,
          latitude: location.lat,
          longitude: location.lon
        },
        totalAmount: AmountWithDeliveryFee,
        cartItems
      }, { withCredentials: true });

      if (paymentMethod == "cod") {
        dispatch(addMyOrder(result.data));
        dispatch(clearCart());
        toast.success('Order placed successfully!');
        navigate("/order-placed");
      } else {
        const orderId = result.data.orderId;
        const razorOrder = result.data.razorOrder;
        openRazorpayWindow(orderId, razorOrder);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to place order. Please try again.');
      setLoading(false);
    }
  };

  const openRazorpayWindow = (orderId, razorOrder) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: razorOrder.amount,
      currency: 'INR',
      name: "QuickBite",
      description: "Food Delivery Website",
      order_id: razorOrder.id,
      handler: async function (response) {
        try {
          const result = await axios.post(`${serverUrl}/api/order/verify-payment`, {
            razorpay_payment_id: response.razorpay_payment_id,
            orderId
          }, { withCredentials: true });
          dispatch(addMyOrder(result.data));
          dispatch(clearCart());
          toast.success('Payment successful!');
          navigate("/order-placed");
        } catch (error) {
          console.log(error);
          toast.error('Payment verification failed');
        } finally {
          setLoading(false);
        }
      },
      modal: {
        ondismiss: function () {
          setLoading(false);
          toast.error('Payment cancelled');
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  useEffect(() => {
    setAddressInput(address);
  }, [address]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#fff7f3] via-[#fffdfb] to-[#ffece6] flex items-center justify-center p-4 sm:p-6 relative'>

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
      <div className='w-full max-w-4xl bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 sm:p-8 space-y-6 border border-orange-50'>

        {/* Header */}
        <div className='flex items-center gap-3 pb-4 border-b border-gray-200'>
          <div className='bg-gradient-to-br from-orange-100 to-amber-100 p-3 rounded-xl'>
            <MdDeliveryDining className='text-orange-600 text-2xl' />
          </div>
          <div>
            <h1 className='text-2xl sm:text-3xl font-semibold text-[#2d2d2d]'>Checkout</h1>
            <p className='text-sm text-gray-500'>Complete your order</p>
          </div>
        </div>

        {/* Delivery Location Section */}
        <section>
          <h2 className='text-lg font-semibold mb-4 flex items-center gap-2 text-[#2d2d2d]'>
            <IoLocationSharp className='text-orange-600' />
            Delivery Location
          </h2>

          {/* Address Search */}
          <div className='flex flex-col sm:flex-row gap-2 mb-4'>
            <input
              type="text"
              className='flex-1 bg-white/70 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-transparent transition-all duration-200'
              placeholder='Enter your delivery address...'
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && getLatLngByAddress()}
            />
            <button
              className='bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70'
              onClick={getLatLngByAddress}
              disabled={searchingAddress}
            >
              {searchingAddress ? <ClipLoader size={16} color='white' /> : <IoSearchOutline size={18} />}
              <span className='hidden sm:inline text-sm font-semibold'>Search</span>
            </button>
            <button
              className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300'
              onClick={getCurrentLocation}
            >
              <TbCurrentLocation size={18} />
              <span className='hidden sm:inline text-sm font-semibold'>Current</span>
            </button>
          </div>

          {/* Map */}
          <div className='rounded-2xl border-2 border-gray-200 overflow-hidden shadow-sm'>
            <div className='h-64 sm:h-80 w-full flex items-center justify-center'>
              <MapContainer
                className={"w-full h-full"}
                center={[location?.lat, location?.lon]}
                zoom={16}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <RecenterMap location={location} />
                <Marker position={[location?.lat, location?.lon]} draggable eventHandlers={{ dragend: onDragEnd }} />
              </MapContainer>
            </div>
          </div>
          <p className='text-xs text-gray-500 mt-2 text-center'>📍 Drag the marker to adjust your delivery location</p>
        </section>

        {/* Payment Method Section */}
        <section>
          <h2 className='text-lg font-semibold mb-4 text-[#2d2d2d]'>Payment Method</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>

            {/* Cash on Delivery */}
            <button
              className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all duration-300 ${paymentMethod === "cod"
                ? "border-orange-500 bg-orange-50 shadow-md"
                : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                }`}
              onClick={() => setPaymentMethod("cod")}
            >
              <span className='inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 flex-shrink-0'>
                <MdDeliveryDining className='text-green-600 text-2xl' />
              </span>
              <div className='flex-1'>
                <p className='font-semibold text-gray-900'>Cash on Delivery</p>
                <p className='text-xs text-gray-500 mt-0.5'>Pay when food arrives</p>
              </div>
              {paymentMethod === "cod" && (
                <div className='w-5 h-5 rounded-full bg-orange-600 flex items-center justify-center flex-shrink-0'>
                  <svg className='w-3 h-3 text-white' fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>

            {/* Online Payment */}
            <button
              className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all duration-300 ${paymentMethod === "online"
                ? "border-orange-500 bg-orange-50 shadow-md"
                : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                }`}
              onClick={() => setPaymentMethod("online")}
            >
              <div className='flex gap-2 flex-shrink-0'>
                <span className='inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100'>
                  <FaMobileScreenButton className='text-purple-700 text-xl' />
                </span>
                <span className='inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100'>
                  <FaCreditCard className='text-blue-700 text-xl' />
                </span>
              </div>
              <div className='flex-1'>
                <p className='font-semibold text-gray-900'>Online Payment</p>
                <p className='text-xs text-gray-500 mt-0.5'>UPI / Card / Wallet</p>
              </div>
              {paymentMethod === "online" && (
                <div className='w-5 h-5 rounded-full bg-orange-600 flex items-center justify-center flex-shrink-0'>
                  <svg className='w-3 h-3 text-white' fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          </div>
        </section>

        {/* Order Summary Section */}
        <section>
          <h2 className='text-lg font-semibold mb-4 text-[#2d2d2d]'>Order Summary</h2>
          <div className='rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-orange-50/30 p-5 space-y-3'>

            {/* Cart Items */}
            <div className='space-y-2 pb-3 border-b border-gray-200'>
              {cartItems.map((item, index) => (
                <div key={index} className='flex justify-between text-sm text-gray-700'>
                  <span className='flex-1'>{item.name} × {item.quantity}</span>
                  <span className='font-semibold'>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className='space-y-2 pb-3 border-b border-gray-200'>
              <div className='flex justify-between text-sm text-gray-700'>
                <span>Subtotal</span>
                <span className='font-semibold'>₹{totalAmount}</span>
              </div>
              <div className='flex justify-between text-sm text-gray-700'>
                <span>Delivery Fee</span>
                <span className={`font-semibold ${deliveryFee === 0 ? 'text-green-600' : ''}`}>
                  {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                </span>
              </div>
              {deliveryFee > 0 && (
                <p className='text-xs text-gray-500'>🫣😍Add ₹{500 - totalAmount} more for free delivery</p>
              )}
            </div>

            {/* Total */}
            <div className='flex justify-between items-center pt-1'>
              <span className='text-lg font-semibold text-[#2d2d2d]'>Total Amount</span>
              <span className='text-2xl font-bold text-orange-600'>₹{AmountWithDeliveryFee}</span>
            </div>
          </div>
        </section>

        {/* Place Order Button */}
        <button
          className='w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-xl font-semibold shadow-md hover:shadow-lg hover:-translate-y-[1px] active:scale-[0.98] transition-all duration-300 ease-out disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2'
          onClick={handlePlaceOrder}
          disabled={loading}
        >
          {loading ? (
            <>
              <ClipLoader size={20} color='white' />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>{paymentMethod === "cod" ? "Place Order" : "Pay & Place Order"}</span>
              <span>→</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default CheckOut;