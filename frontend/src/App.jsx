// import { useEffect } from 'react'
// import { Toaster } from 'react-hot-toast'
// import { useDispatch, useSelector } from 'react-redux'
// import { Navigate, Route, Routes } from 'react-router-dom'
// import { io } from 'socket.io-client'
// import useGetCity from './hooks/useGetCity'
// import useGetCurrentUser from './hooks/useGetCurrentUser'
// import useGetItemsByCity from './hooks/useGetItemsByCity'
// import useGetMyOrders from './hooks/useGetMyOrders'
// import useGetMyshop from './hooks/useGetMyShop'
// import useGetShopByCity from './hooks/useGetShopByCity'
// import useUpdateLocation from './hooks/useUpdateLocation'
// import AddItem from './pages/AddItem'
// import CartPage from './pages/CartPage'
// import CheckOut from './pages/CheckOut'
// import CreateEditShop from './pages/CreateEditShop'
// import EditItem from './pages/EditItem'
// import ForgotPassword from './pages/ForgotPassword'
// import Home from './pages/Home'
// import MyOrders from './pages/MyOrders'
// import OrderPlaced from './pages/OrderPlaced'
// import Shop from './pages/Shop'
// import SignIn from './pages/SignIn'
// import SignUp from './pages/SignUp'
// import TrackOrderPage from './pages/TrackOrderPage'
// import TrackOrderPage from './pages/TrackOrderPage'

// export const serverUrl = "http://localhost:8000"
// function App() {
//   const { userData } = useSelector(state => state.user)
//   const dispatch = useDispatch()
//   useGetCurrentUser()
//   useUpdateLocation()
//   useGetCity()
//   useGetMyshop()
//   useGetShopByCity()
//   useGetItemsByCity()
//   useGetMyOrders()

//   useEffect(() => {
//     const socketInstance = io(serverUrl, { withCredentials: true })
//     dispatch(setSocket(socketInstance))
//     socketInstance.on('connect', () => {
//       if (userData) {
//         socketInstance.emit('identity', { userId: userData._id })
//       }
//     })
//     return () => {
//       socketInstance.disconnect()
//     }
//   }, [userData?._id])

//   return (
//     <>
//       <Toaster position="top-right" />
//       <Routes>
//         <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to={"/"} />} />
//         <Route path='/signin' element={!userData ? <SignIn /> : <Navigate to={"/"} />} />
//         <Route path='/forgot-password' element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />} />
//         <Route path='/' element={userData ? <Home /> : <Navigate to={"/signin"} />} />
//         <Route path='/create-edit-shop' element={userData ? <CreateEditShop /> : <Navigate to={"/signin"} />} />
//         <Route path='/add-item' element={userData ? <AddItem /> : <Navigate to={"/signin"} />} />
//         <Route path='/edit-item/:itemId' element={userData ? <EditItem /> : <Navigate to={"/signin"} />} />
//         <Route path='/cart' element={userData ? <CartPage /> : <Navigate to={"/signin"} />} />
//         <Route path='/checkout' element={userData ? <CheckOut /> : <Navigate to={"/signin"} />} />
//         <Route path='/order-placed' element={userData ? <OrderPlaced /> : <Navigate to={"/signin"} />} />
//         <Route path='/my-orders' element={userData ? <MyOrders /> : <Navigate to={"/signin"} />} />
//         <Route path='/track-order/:orderId' element={userData ? <TrackOrderPage /> : <Navigate to={"/signin"} />} />
//         <Route path='/shop/:shopId' element={userData ? <Shop /> : <Navigate to={"/signin"} />} />
//       </Routes>
//     </>
//   )
// }

// export default App


import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import useGetCity from './hooks/useGetCity'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import useGetItemsByCity from './hooks/useGetItemsByCity'
import useGetMyOrders from './hooks/useGetMyOrders'
import useGetMyshop from './hooks/useGetMyShop'
import useGetShopByCity from './hooks/useGetShopByCity'
import useUpdateLocation from './hooks/useUpdateLocation'
import AddItem from './pages/AddItem'
import CartPage from './pages/CartPage'
import CheckOut from './pages/CheckOut'
import CreateEditShop from './pages/CreateEditShop'
import EditItem from './pages/EditItem'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import MyOrders from './pages/MyOrders'
import OrderPlaced from './pages/OrderPlaced'
import Shop from './pages/Shop'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import TrackOrderPage from './pages/TrackOrderPage'

export const serverUrl = "http://localhost:8000"

function App() {
  const { userData } = useSelector(state => state.user)
  const dispatch = useDispatch()
  useGetCurrentUser()
  useUpdateLocation()
  useGetCity()
  useGetMyshop()
  useGetShopByCity()
  useGetItemsByCity()
  useGetMyOrders()



  return (
    <>
      <ScrollToTop />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#2d2d2d',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Routes>
        <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to={"/"} />} />
        <Route path='/signin' element={!userData ? <SignIn /> : <Navigate to={"/"} />} />
        <Route path='/forgot-password' element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />} />

        <Route path='/' element={userData ? <Home /> : <Navigate to={"/signin"} />} />
        <Route path='/create-edit-shop' element={userData ? <CreateEditShop /> : <Navigate to={"/signin"} />} />
        <Route path='/add-item' element={userData ? <AddItem /> : <Navigate to={"/signin"} />} />
        <Route path='/edit-item/:itemId' element={userData ? <EditItem /> : <Navigate to={"/signin"} />} />
        <Route path='/cart' element={userData ? <CartPage /> : <Navigate to={"/signin"} />} />
        <Route path='/checkout' element={userData ? <CheckOut /> : <Navigate to={"/signin"} />} />
        <Route path='/order-placed' element={userData ? <OrderPlaced /> : <Navigate to={"/signin"} />} />
        <Route path='/my-orders' element={userData ? <MyOrders /> : <Navigate to={"/signin"} />} />
        <Route path='/track-order/:orderId' element={userData ? <TrackOrderPage /> : <Navigate to={"/signin"} />} />
        <Route path='/shop/:shopId' element={userData ? <Shop /> : <Navigate to={"/signin"} />} />
      </Routes>
    </>
  )
}

export default App