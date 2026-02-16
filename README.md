================================================================================
                    QUICKBITE - FOOD DELIVERY APPLICATION
                         PROJECT DOCUMENTATION
================================================================================

================================================================================
1. PROJECT OVERVIEW
================================================================================

Project Name: QuickBite

Short Description:
QuickBite is a full-stack food delivery application that connects customers, 
restaurant owners, and delivery boys in a seamless platform. Users can browse 
restaurants by city, add items to cart, place orders, and track deliveries in 
real-time.

Main Purpose:
To provide a complete food delivery solution with role-based access for:
- Customers: Browse, order, and track food deliveries
- Restaurant Owners: Manage their shop and orders
- Delivery Boys: Accept and complete delivery assignments

Tech Stack Used:

Frontend:
- React 19.2.4 (UI Library)
- Vite 7.1.2 (Build Tool)
- Redux Toolkit 2.8.2 (State Management)
- Redux Persist 6.0.0 (State Persistence)
- React Router DOM 7.8.1 (Routing)
- Firebase 12.1.0 (Authentication)
- Socket.io Client 4.8.1 (Real-time Communication)
- Leaflet 1.9.4 (Maps)
- React Leaflet 5.0.0 (React Map Components)
- Tailwind CSS 4.1.12 (Styling)
- Axios 1.11.0 (HTTP Client)
- React Hot Toast 2.6.0 (Notifications)
- Recharts 3.2.0 (Charts/Analytics)

Backend:
- Node.js (Runtime)
- Express 5.1.0 (Web Framework)
- MongoDB with Mongoose 8.17.2 (Database)
- Socket.io 4.8.1 (Real-time Communication)
- JWT 9.0.2 (Authentication)
- Bcryptjs 3.0.2 (Password Hashing)
- Nodemailer 7.0.5 (Email Service)
- Cloudinary 2.7.0 (Image Storage)
- Multer 2.0.2 (File Upload)
- Razorpay 2.9.6 (Payment Gateway)
- Cookie Parser 1.4.7 (Cookie Handling)
- CORS 2.8.5 (Cross-Origin Resource Sharing)
- Dotenv 17.2.1 (Environment Variables)

================================================================================
2. FEATURES LIST
================================================================================

User Features:
--------------
- User Registration (Email/Password + Firebase Auth)
- User Login with Google Authentication
- JWT-based Authentication with Cookie Storage
- Forgot Password with OTP Verification
- Browse Shops by City
- Browse Food Items by Category
- Search Items Across Shops
- Add Items to Cart with Quantity Management
- Cart Management (Add, Update, Remove items)
- Place Order (COD and Online Payment)
- Order History / My Orders
- Real-time Order Tracking
- Location-based Services

Owner Features:
---------------
- Create/Edit Shop Profile
- Add Food Items with Image Upload
- Edit Existing Food Items
- Delete Food Items
- View Incoming Orders
- Update Order Status (Pending → Preparing → Out for Delivery)
- View Order Analytics/Dashboard
- Category Management

Delivery Boy Features:
----------------------
- View Delivery Assignments
- Accept Delivery Requests
- Real-time Location Tracking
- OTP Verification for Delivery Confirmation
- Update Delivery Status
- View Today's Deliveries

System Features:
----------------
- Real-time Order Status Updates (Socket.io)
- Live Delivery Tracking
- Multi-vendor Order Support (Order from multiple shops at once)
- Payment Integration (Razorpay)
- Image Upload (Cloudinary)
- Email Notifications
- Geolocation-based Shop/Item Filtering

================================================================================
3. FOLDER STRUCTURE (HIGH-LEVEL)
================================================================================

Backend Structure:
------------------
backend/
├── index.js                 # Main server entry point
├── socket.js                # Socket.io handlers for real-time features
├── config/
│   └── db.js                # MongoDB connection configuration
├── controllers/             # Request handlers for all routes
│   ├── auth.controllers.js
│   ├── user.controllers.js
│   ├── shop.controllers.js
│   ├── item.controllers.js
│   └── order.controllers.js
├── models/                  # MongoDB/Mongoose schemas
│   ├── user.model.js
│   ├── shop.model.js
│   ├── item.model.js
│   ├── order.model.js
│   └── deliveryAssignment.model.js
├── routes/                  # API route definitions
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── shop.routes.js
│   ├── item.routes.js
│   └── order.routes.js
├── middlewares/             # Express middleware functions
│   ├── isAuth.js            # JWT authentication verification
│   └── multer.js            # File upload configuration
├── utils/                   # Utility functions
│   ├── token.js             # JWT token generation
│   ├── mail.js              # Nodemailer email sending
│   └── cloudinary.js        # Cloudinary configuration
└── public/                  # Static files (uploaded images)

Frontend Structure:
-------------------
frontend/
├── src/
│   ├── main.jsx             # React entry point
│   ├── App.jsx              # Main App component with routing
│   ├── index.css            # Global styles (Tailwind)
│   ├── category.js          # Category definitions
│   ├── firebase.js          # Firebase configuration
│   ├── components/         # Reusable React components
│   │   ├── Nav.jsx
│   │   ├── FoodCard.jsx
│   │   ├── CartItemCard.jsx
│   │   ├── CategoryCard.jsx
│   │   ├── UserDashboard.jsx
│   │   ├── OwnerDashboard.jsx
│   │   ├── DeliveryBoy.jsx
│   │   ├── OwnerItemCard.jsx
│   │   ├── OwnerOrderCard.jsx
│   │   ├── UserOrderCard.jsx
│   │   ├── DeliveryBoyTracking.jsx
│   │   └── ScrollToTop.jsx
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   ├── SignIn.jsx
│   │   ├── SignUp.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── Shop.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckOut.jsx
│   │   ├── OrderPlaced.jsx
│   │   ├── MyOrders.jsx
│   │   ├── TrackOrderPage.jsx
│   │   ├── AddItem.jsx
│   │   ├── EditItem.jsx
│   │   └── CreateEditShop.jsx
│   ├── redux/               # Redux state management
│   │   ├── store.js         # Redux store configuration
│   │   ├── userSlice.js     # User state (cart, orders, etc.)
│   │   ├── ownerSlice.js    # Owner-specific state
│   │   └── mapSlice.js      # Map/location state
│   ├── hooks/               # Custom React hooks
│   │   ├── useGetCurrentUser.jsx
│   │   ├── useGetCity.jsx
│   │   ├── useGetItemsByCity.jsx
│   │   ├── useGetMyOrders.jsx
│   │   ├── useGetMyshop.jsx
│   │   ├── useGetShopByCity.jsx
│   │   └── useUpdateLocation.jsx
│   ├── context/              # React context providers
│   │   └── SocketContext.jsx
│   └── assets/              # Static assets (images, icons)
├── public/                  # Public static files
├── package.json             # Frontend dependencies
├── vite.config.js           # Vite configuration
└── index.html               # HTML entry point

================================================================================
4. APPLICATION FLOW (STEPWISE)
================================================================================

Complete Application Flow:
---------------------------

Step 1: User Opens Application
   - Frontend loads at http://localhost:5173
   - App checks for persisted user state in localStorage
   - If no user data, redirects to SignIn page

Step 2: User Registration/Login
   - User can sign up with email/password OR Google Auth
   - Firebase handles authentication on frontend
   - After Firebase auth, frontend calls backend API to create JWT token
   - JWT token is stored in cookies (httpOnly)
   - User data is stored in Redux store and persisted

Step 3: Home Page Dashboard (Role-based)
   - Based on user role (user/owner/deliveryBoy), appropriate dashboard loads:
     * User → UserDashboard
     * Owner → OwnerDashboard
     * Delivery Boy → DeliveryBoy

Step 4: Location Setup
   - App requests user location (latitude/longitude)
   - User selects their city and state
   - Location is stored in Redux and sent to backend

Step 5: Browsing Shops/Items
   - Backend returns shops and items based on user's city
   - User can browse shops, view shop details, and view items
   - User can search for specific items

Step 6: Adding to Cart
   - User clicks "Add" on food items
   - Item is added to Redux cart state (persisted in localStorage)
   - Cart icon shows item count and total amount

Step 7: Cart Management
   - User can view cart at /cart route
   - Can update quantities or remove items
   - Total amount is calculated in real-time

Step 8: Placing Order
   - User proceeds to checkout
   - Selects payment method (COD or Online)
   - If online, Razorpay payment integration
   - Order is created in database with pending status

Step 9: Order Processing (Real-time)
   - Shop owners receive order notification (via dashboard)
   - Owner updates status: pending → preparing → out for delivery
   - Status updates are pushed to user via Socket.io
   - User can track order status in real-time

Step 10: Delivery Process
   - Delivery boy accepts assignment
   - Delivery boy updates location (real-time via Socket.io)
   - User can see delivery boy location on map
   - Delivery boy enters OTP to confirm delivery
   - Order marked as delivered

================================================================================
5. BACKEND FLOW
================================================================================

Server Startup:
---------------
1. index.js is executed (via nodemon in dev mode)
2. Express app is created
3. HTTP server is created
4. Socket.io server is initialized with CORS settings
5. Middleware is configured (CORS, JSON, cookie-parser)
6. Routes are mounted:
   - /api/auth - Authentication routes
   - /api/user - User management routes
   - /api/shop - Shop management routes
   - /api/item - Item management routes
   - /api/order - Order management routes
7. Socket handler is attached
8. Server starts listening on PORT (default 5000)
9. Database connection is established

Database Connection:
--------------------
- connectDb() function connects to MongoDB using MONGODB_URL
- Connection is established when server starts

Routes → Controllers → Models Flow:
----------------------------------
Example: Creating a Shop
1. POST /api/shop/create-edit is called
2. Middleware: isAuth - verifies JWT token from cookie
3. Middleware: multer - handles image upload to ./public folder
4. Controller: createEditShop
   - Receives request with shop data and image
   - Uploads image to Cloudinary
   - Creates/updates Shop model in database
   - Returns response
5. Model: Shop - Mongoose schema defines data structure

Authentication Logic:
---------------------
- JWT token is generated on successful login/signup
- Token contains userId and expires in 7 days
- Token is stored in httpOnly cookie
- isAuth middleware verifies token on protected routes
- User ID is extracted from decoded token for operations

Error Handling Approach:
-----------------------
- All routes use try-catch blocks
- Errors return appropriate HTTP status codes (400, 401, 500)
- Error messages are sent as JSON responses

================================================================================
6. FRONTEND FLOW
================================================================================

App Entry Point:
----------------
1. main.jsx renders App component
2. Providers are set up:
   - BrowserRouter - for routing
   - Provider - Redux store
   - PersistGate - for state persistence
   - SocketProvider - for real-time communication

Routing Structure (App.jsx):
----------------------------
- Public Routes (accessible without login):
  * /signup
  * /signin
  * /forgot-password

- Protected Routes (require login):
  * / - Home (role-based dashboard)
  * /create-edit-shop - Create/edit shop (owner only)
  * /add-item - Add item (owner only)
  * /edit-item/:itemId - Edit item (owner only)
  * /cart - Shopping cart
  * /checkout - Checkout page
  * /order-placed - Order success page
  * /my-orders - Order history
  * /track-order/:orderId - Track order
  * /shop/:shopId - View shop

State Management Flow:
--------------------
Redux Store Structure:
- user slice:
  * userData - Current user information
  * currentCity, currentState, currentAddress - Location
  * shopInMyCity, itemsInMyCity - Location-based data
  * cartItems, totalAmount - Shopping cart (persisted)
  * myOrders - User's order history
  * searchItems - Search results
- owner slice: Owner-specific state
- map slice: Map/location state

API Integration:
---------------
- All API calls use Axios
- Base URL: http://localhost:8000 (serverUrl in App.jsx)
- JWT token is automatically sent via cookies

Component Interaction:
---------------------
1. Custom hooks fetch data on component mount
2. Data is stored in Redux
3. Components subscribe to Redux state
4. UI updates automatically when state changes
5. Socket.io updates state in real-time

================================================================================
7. DEPENDENCIES INSTALLATION
================================================================================

Backend Dependencies:
--------------------
Step 1: Navigate to backend directory
   cd backend

Step 2: Install all dependencies
   npm install

Important Backend Packages:
- express: ^5.1.0 - Web framework
- mongoose: ^8.17.2 - MongoDB ODM
- jsonwebtoken: ^9.0.2 - JWT authentication
- bcryptjs: ^3.0.2 - Password hashing
- cookie-parser: ^1.4.7 - Cookie parsing
- cors: ^2.8.5 - Cross-origin resource sharing
- dotenv: ^17.2.1 - Environment variables
- socket.io: ^4.8.1 - Real-time communication
- nodemailer: ^7.0.5 - Email sending
- cloudinary: ^2.7.0 - Image cloud storage
- multer: ^2.0.2 - File upload
- razorpay: ^2.9.6 - Payment gateway
- nodemon: ^3.1.10 - Development server auto-reload

Frontend Dependencies:
--------------------
Step 1: Navigate to frontend directory
   cd frontend

Step 2: Install all dependencies
   npm install

Important Frontend Packages:
- react: ^19.2.4 - UI library
- react-dom: ^19.2.4 - React DOM
- react-router-dom: ^7.8.1 - Routing
- @reduxjs/toolkit: ^2.8.2 - Redux toolkit
- react-redux: ^9.2.0 - React Redux bindings
- redux-persist: ^6.0.0 - Redux persistence
- firebase: ^12.1.0 - Firebase authentication
- socket.io-client: ^4.8.1 - Socket.io client
- axios: ^1.11.0 - HTTP client
- leaflet: ^1.9.4 - Maps
- react-leaflet: ^5.0.0 - React map components
- tailwindcss: ^4.1.12 - CSS framework
- react-hot-toast: ^2.6.0 - Notifications
- recharts: ^3.2.0 - Charts
- lucide-react: ^0.564.0 - Icons

================================================================================
8. ENVIRONMENT VARIABLES SETUP
================================================================================

Backend Environment Variables (.env):
------------------------------------
Create a .env file in the backend directory with the following variables:

# Server Configuration
PORT=5000                          # Server port number

# Database Configuration
MONGODB_URL=your_mongodb_connection_string   # MongoDB Atlas URI

# JWT Configuration
JWT_SECRET=your_jwt_secret_key    # Secret key for JWT token signing

# Email Configuration (Nodemailer)
EMAIL=your_email@gmail.com        # Email address for sending emails
PASS=your_email_app_password      # App password for email

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name       # Cloudinary cloud name
CLOUDINARY_API_KEY=your_api_key             # Cloudinary API key
CLOUDINARY_API_SECRET=your_api_secret       # Cloudinary API secret

# Razorpay Payment Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id        # Razorpay key ID
RAZORPAY_KEY_SECRET=your_razorpay_key_secret # Razorpay key secret

Frontend Environment Variables:
------------------------------
Create a .env file in the frontend directory (or use existing):

VITE_FIREBASE_APIKEY=your_firebase_api_key
# Note: Other Firebase config values are hardcoded in firebase.js

Server URL (for API calls):
--------------------------
The frontend expects the backend to run at: http://localhost:8000
(This is defined as serverUrl in App.jsx)

================================================================================
9. HOW TO RUN PROJECT (STEPWISE)
================================================================================

Start Backend:
--------------
Step 1: Open a terminal and navigate to backend directory
   cd backend

Step 2: Install dependencies (if not already installed)
   npm install

Step 3: Create .env file with all required environment variables
   (See Section 8 for all required variables)

Step 4: Start the backend server
   npm run dev

   Expected output:
   - Server starts at port 5000
   - "db connected" message appears (MongoDB connection successful)

Start Frontend:
---------------
Step 1: Open a new terminal and navigate to frontend directory
   cd frontend

Step 2: Install dependencies (if not already installed)
   npm install

Step 3: Create .env file with Firebase API key
   VITE_FIREBASE_APIKEY=your_firebase_api_key

Step 4: Start the frontend development server
   npm run dev

   Expected output:
   - Frontend starts at http://localhost:5173
   - Vite server is running with hot module replacement

Access the Application:
-----------------------
1. Open your browser and go to http://localhost:5173
2. You will be redirected to the Sign In page
3. Sign up for a new account or sign in with Google

================================================================================
10. FULL EXECUTION FLOW (BEGINNER FRIENDLY)
================================================================================

What Happens After Running Both Servers:
----------------------------------------

Step 1: Backend Initialization (Port 5000)
-----------------------------------------
- Express server starts
- MongoDB database connects
- Socket.io server initializes
- All API routes become available
- Server listens for incoming requests

Step 2: Frontend Initialization (Port 5173)
------------------------------------------
- React app loads in browser
- Redux store initializes with persisted state
- Socket.io client connects to backend
- Custom hooks fetch initial data
- Navigation renders appropriate components

Step 3: User Authentication Flow
---------------------------------
1. User visits http://localhost:5173
2. App checks for existing user session
3. If not logged in, redirects to /signin
4. User clicks "Sign Up" or "Sign In with Google"
5. Firebase handles authentication
6. Frontend calls /api/auth/signin or /api/auth/google-auth
7. Backend creates JWT token and sends in cookie
8. User data is stored in Redux
9. User is redirected to Home (/)

Step 4: Shopping Flow
---------------------
1. User selects their city on first login
2. Backend returns shops and items in that city
3. User browses shops and items on dashboard
4. User clicks on a shop to view items
5. User adds items to cart
6. Cart state is persisted to localStorage

Step 5: Checkout and Payment
----------------------------
1. User goes to /cart to review items
2. User clicks "Checkout"
3. User enters delivery address
4. User selects payment method:
   - COD: Order placed directly
   - Online: Razorpay payment integration
5. Payment verification happens
6. Order is created in database
7. User is redirected to /order-placed

Step 6: Order Processing
-----------------------
1. Order appears in owner's dashboard
2. Owner changes status: pending → preparing
3. Status update is pushed to user via Socket.io
4. User sees real-time status change on My Orders page

Step 7: Delivery Flow
---------------------
1. Delivery boy sees assignment in dashboard
2. Delivery boy accepts the delivery
3. Delivery boy's location is tracked via Socket.io
4. User can see delivery boy location on map
5. Delivery boy reaches destination
6. Delivery boy enters OTP to confirm
7. Order is marked as delivered

Authentication Lifecycle:
------------------------
1. User signs up/signs in → JWT token generated (7 days validity)
2. Token stored in httpOnly cookie
3. Every protected request includes cookie automatically
4. isAuth middleware verifies token on each request
5. Token expires → user redirected to sign in
6. User can sign out → cookie is cleared

API Request Flow:
------------------
1. Frontend makes request to http://localhost:8000/api/...
2. Request includes cookie with JWT token
3. Backend middleware (isAuth) verifies token
4. Controller processes request
5. Model interacts with MongoDB
6. Response is sent back to frontend
7. Redux state is updated
8. UI re-renders with new data

Data Flow Between Frontend and Backend:
---------------------------------------
- REST API: Standard HTTP requests (GET, POST, PUT, DELETE)
- WebSocket: Real-time updates via Socket.io
- Cookies: JWT token for authentication
- JSON: Data format for requests and responses

================================================================================
11. COMMON ERRORS & FIXES
================================================================================

Backend Errors:
---------------

Error: "token not found"
Fix: Ensure the frontend is sending cookies. Check if credentials: true is set in CORS and Axios.

Error: "db connected" not showing
Fix: Check MongoDB URL in .env file. Ensure MongoDB Atlas is accessible and IP whitelist includes your IP.

Error: "Cannot read properties of undefined"
Fix: Check if all required fields are being sent in the request body. Verify the model schema.

Error: Cloudinary upload fails
Fix: Verify CLOUDINARY_CLOUD_NAME, API_KEY, and API_SECRET are correct in .env.

Error: Nodemailer authentication fails
Fix: Use an App Password for Gmail. Enable 2-Factor Authentication and generate an App Password.

Error: Socket.io connection refused
Fix: Ensure the backend server is running. Check if port 5000 is not blocked by firewall.

Frontend Errors:
----------------

Error: "Firebase: Auth token expired"
Fix: Clear localStorage and re-authenticate. Check token expiration settings in backend.

Error: Redux state not persisting
Fix: Check if redux-persist is configured correctly. Ensure storage is available in the browser.

Error: Cart items disappear on refresh
Fix: The cart is persisted via redux-persist. Check if the whitelist config includes cartItems.

Error: Map not loading (Leaflet)
Fix: Ensure leaflet CSS is imported. Check if the map container has explicit height.

Error: CORS error in browser console
Fix: Ensure backend CORS origin matches frontend URL exactly (http://localhost:5173).

Error: Images not loading
Fix: Check if the /public folder exists in backend. Verify the image path is correct.

Error: Payment failure (Razorpay)
Fix: Verify RAZORPAY_KEY_ID and KEY_SECRET are correct. Check if order ID matches.

General Debugging Tips:
-----------------------
1. Check browser console for JavaScript errors
2. Check backend terminal for server-side errors
3. Use React DevTools to inspect Redux state
4. Use Network tab to inspect API requests/responses
5. Verify all environment variables are set correctly
6. Ensure both servers are running on correct ports
7. Restart servers after making configuration changes

================================================================================
                              END OF DOCUMENTATION
================================================================================

This documentation was generated for QuickBite - Food Delivery Application
Version: 1.0.0
Last Updated: 2026

For additional help or questions, please refer to the source code or contact
the development team.
================================================================================
