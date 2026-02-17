# ============================================================================
# QUICKBITE - PROJECT DOCUMENTATION
# ============================================================================

## TABLE OF CONTENTS

1. Project Overview
2. Technology Stack
3. Features List (FULL)
4. Folder Structure Explanation
5. System Architecture
6. DFD (Data Flow Diagram) Explanation
7. ERD (Entity Relationship Diagram) Explanation
8. Security Architecture
9. JWT Auth Flow (Diagram Explanation)
10. Application Flow (Stepwise)
11. Backend Internal Flow
12. Frontend Internal Flow
13. Auto API Documentation
14. Dependencies Installation
15. Environment Variables
16. How To Run Project
17. Runtime Flow (After Startup)
18. Common Errors & Fixes
19. Developer Notes

---

# ============================================================================
# 1. PROJECT OVERVIEW
# ============================================================================

## Project Name
QuickBite

## Purpose
A full-stack food ordering and delivery platform connecting customers with local shops and delivery personnel. It enables users to browse menus, place orders, make payments, and track deliveries in real-time. It also provides tools for shop owners to manage their inventory and for delivery boys to accept and fulfill orders.

## High-Level System Summary
This is a MERN (MongoDB, Express, React, Node.js) application featuring:
- Role-based authentication (User, Shop Owner, Delivery Boy).
- Real-time communication using Socket.io (Order updates, Delivery tracking).
- Secure payments via Razorpay.
- Media management with Cloudinary.
- State management with Redux Toolkit & Persistence.
- Geolocation services for address and delivery tracking.

## Business Problem Solved
- Streamlines the entire food ordering process from selection to delivery.
- Provides a platform for small business owners to manage their digital presence.
- create a delivery network with real-time assignment broadcasting.

---

# 2. TECHNOLOGY STACK
# ============================================================================

## Frontend

| Category | Technology |
|----------|------------|
| Framework | React 19 |
| Language | JavaScript (ES6+) |
| State Management | Redux Toolkit (with Redux Persist) |
| Routing | React Router DOM v7 |
| UI Framework | Tailwind CSS v4 |
| HTTP Client | Axios |
| Real-time | Socket.io Client |
| Notifications | React Hot Toast |
| Deployment/Build | Vite |

### Frontend Dependencies
```json
{
  "@reduxjs/toolkit": "^2.8.2",
  "@tailwindcss/vite": "^4.1.12",
  "axios": "^1.11.0",
  "firebase": "^12.1.0",
  "leaflet": "^1.9.4",
  "lucide-react": "^0.564.0",
  "react": "19.2.4",
  "react-dom": "19.2.4",
  "react-hot-toast": "^2.6.0",
  "react-icons": "^5.5.0",
  "react-leaflet": "^5.0.0",
  "react-redux": "^9.2.0",
  "react-router-dom": "^7.8.1",
  "react-spinners": "^0.17.0",
  "recharts": "^3.2.0",
  "redux-persist": "^6.0.0",
  "socket.io-client": "^4.8.1",
  "tailwindcss": "^4.1.12"
}
```

## Backend

| Category | Technology |
|----------|------------|
| Runtime | Node.js |
| Framework | Express.js v5 |
| Database | MongoDB (Mongoose ODM) |
| Authentication | JWT (JSON Web Tokens) |
| Payment Gateway | Razorpay |
| Image Storage | Cloudinary (via Multer) |
| Real-time | Socket.io |
| Security | BcryptJS, Cookie Parser, CORS |

### Backend Dependencies
```json
{
  "bcryptjs": "^3.0.2",
  "cloudinary": "^2.7.0",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.5",
  "dotenv": "^17.2.1",
  "express": "^5.1.0",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.17.2",
  "multer": "^2.0.2",
  "nodemailer": "^7.0.5",
  "nodemon": "^3.1.10",
  "razorpay": "^2.9.6",
  "socket.io": "^4.8.1"
}
```

---

# 3. FEATURES LIST (FULL)
# ============================================================================

## Authentication & User Management
- [x] Sign up/Sign in with Email & Password
- [x] Google Authentication
- [x] OTP Verification for account activation
- [x] Password Reset via OTP
- [x] Role-based access (User, Owner, DeliveryBoy)
- [x] Location management (City/State/Address detection)

## Shop Management (Owner)
- [x] Create and Edit Shop profile
- [x] Upload Shop images
- [x] Manage Shop items (Add, Edit, Delete)
- [x] View Shop Orders

## Food & Items
- [x] Browse items by Category (Snacks, Main Course, etc.)
- [x] Search items
- [x] View items by City or Specific Shop
- [x] Item Rating system

## Order & Cart
- [x] Add/Remove items to/from Cart
- [x] Update item quantities
- [x] Real-time total calculation
- [x] Place Order (Cash on Delivery or Online)
- [x] Online Payment integration with Razorpay

## Delivery System
- [x] Real-time Order Broadcasting to nearby Delivery Boys
- [x] Delivery Assignment acceptance
- [x] Delivery OTP verification
- [x] Real-time Order Status tracking (Pending -> Preparing -> Out for Delivery -> Delivered)

---

# 4. FOLDER STRUCTURE EXPLANATION
# ============================================================================

## Backend Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection logic (Mongoose.connect)
├── controllers/
│   ├── auth.controllers.js   # Auth (Signup, Signin, OTP, GoogleAuth) logic
│   ├── item.controllers.js   # Item CRUD (Add, Edit, Delete, Get) operations
│   ├── order.controllers.js  # Order placement, Payment verify, Delivery assignment
│   ├── shop.controllers.js   # Shop CRUD and Search logic
│   └── user.controllers.js   # User profile fetch & location update
├── middlewares/
│   ├── isAuth.js             # JWT verification middleware (Extracts userId from cookie)
│   └── multer.js             # Image upload configuration (DiskStorage/Cloudinary)
├── models/
│   ├── user.model.js         # User schema (roles: user/owner/admin, location: 2dsphere)
│   ├── shop.model.js         # Shop schema (owner ref, items array, address)
│   ├── item.model.js         # Item schema (price, category, rating)
│   ├── order.model.js        # Order schema (payment info, status, shopOrders)
│   └── deliveryAssignment.model.js # Delivery task schema (status: assigned/completed)
├── routes/
│   ├── auth.routes.js        # Auth API endpoints
│   ├── item.routes.js        # Item API endpoints
│   ├── order.routes.js       # Order API endpoints
│   ├── shop.routes.js        # Shop API endpoints
│   └── user.routes.js        # User API endpoints
├── utils/
│   ├── mail.js               # Email sending utility (Nodemailer)
│   └── token.js              # JWT generation utility
├── index.js                  # App entry point (Express app, Routes, CORS, Socket.io)
└── socket.js                 # Socket.io event listners (Order updates, Broadcasting)
```

## Frontend Structure

```
frontend/src/
├── components/               # Reusable UI components
│   ├── Navbar.jsx            # Top navigation bar
│   ├── Footer.jsx            # Application footer
│   ├── ItemCard.jsx          # Display card for food items
│   └── ...
├── context/                  # Context providers (if any)
├── hooks/                    # Custom React hooks
│   ├── useGetCity.jsx        # Hook to fetch user city from coords
│   └── useGetCurrentUser.jsx # Hook to fetch session data
├── pages/                    # Main route pages
│   ├── Home.jsx              # Landing page with categories & shops
│   ├── CartPage.jsx          # Shopping cart & checkout summary
│   ├── CheckOut.jsx          # Payment page (Razorpay integration)
│   ├── TrackOrderPage.jsx    # Live order tracking map
│   ├── Shop.jsx              # Shop details and menu
│   ├── SignIn.jsx            # Login page
│   ├── SignUp.jsx            # Registration page
│   └── Profile.jsx           # User profile settings
├── redux/                    # Redux State Management
│   ├── store.js              # Store configuration (Redux Persist)
│   ├── userSlice.js          # User auth, Cart, & Order history state
│   ├── mapSlice.js           # User Location (Lat/Long) state
│   └── ownerSlice.js         # Shop Owner specific state
├── App.jsx                   # Main Routing configuration (Routes, Route, ProtectedRoute)
└── main.jsx                  # React entry point, Providers wrapping
```

---

# 5. SYSTEM ARCHITECTURE
# ============================================================================

## Client-Server Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           CLIENT (FRONTEND)                             │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  React Application (Vite)                                       │   │
│  │  ├── Redux Stores (State Management)                            │   │
│  │  ├── React Router (Navigation)                                  │   │
│  │  ├── Components & Pages                                         │   │
│  │  └── Axios (HTTP Client)                                        │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           SERVER (BACKEND)                              │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  Express.js Server                                              │   │
│  │  ├── Routes (API Endpoints)                                     │   │
│  │  ├── Middleware (Auth, Security)                                │   │
│  │  └── Controllers (Business Logic)                               │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│   MongoDB       │   │   Socket.io     │   │   Cloudinary    │
│   (Database)    │   │   (Real-time)   │   │   (Images)      │
└─────────────────┘   └─────────────────┘   └─────────────────┘
```

## Data Communication Model
1.  **REST API**: Used for standard CRUD operations (User auth, fetching products, placing orders).
2.  **Socket.io**: Used for bidirectional real-time events (Order status updates, Delivery requests).
3.  **Redux Persist**: Caches user session and cart data in LocalStorage to persist across refreshes.

---

# 6. DFD (DATA FLOW DIAGRAM) EXPLANATION
# ============================================================================

## Level 0 - Context Diagram

```
                    ┌─────────────────┐
                    │                 │
    ┌───────────────┤   USER         ├───────────────┐
    │               │                 │               │
    │               └─────────────────┘               │
    │                       │                         │
    │                       ▼                         │
    │               ┌─────────────────┐              │
    │               │                 │              │
    │   ┌──────────►│  QUICKBITE     │◄──────────┐   │
    │   │           │    SYSTEM      │           │   │
    │   │           │                 │           │   │
    │   │           └─────────────────┘           │   │
    │   │                   │                     │   │
    │   │                   ▼                     │   │
    │   │           ┌─────────────────┐           │   │
    │   │           │                 │           │   │
    │   └───────────│   DATABASE     │◄──────────┘   │
    │               │   (MongoDB)    │               │
    │               └─────────────────┘               │
    │                       │                         │
    │                       │                         │
    └───────────────────────┴─────────────────────────┘
```

## Level 1 - Order Process

1.  **User** adds items to Cart → Redux Store updates.
2.  **User** initiates Checkout → API `/place-order`.
3.  **System** creates Order Record → Status: "Pending".
4.  **System** (if Online Payment) → Initiates Razorpay Order.
5.  **User** completes Payment → API `/verify-payment`.
6.  **System** Broadcasts local order via Socket.io.
7.  **Delivery Boy** accepts order → Assignment Created.
8.  **Shop Owner** sees new order → Prepares food.

---

# 7. ERD (ENTITY RELATIONSHIP DIAGRAM) EXPLANATION
# ============================================================================

## Entities

### 1. User Entity
| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | Unique identifier |
| fullName | String | User's full name |
| email | String | User's email (unique) |
| role | Enum | "user", "owner", "deliveryBoy" |
| location | GeoJSON | Point coordinates (lat/lng) |

### 2. Shop Entity
| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | Unique identifier |
| name | String | Shop Name |
| owner | ObjectId | Reference to User |
| items | Array | Reference to Items |
| city | String | Shop City |

### 3. Order Entity
| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | Unique identifier |
| user | ObjectId | Reference to User |
| shopOrders | Array | Embedded shop sub-orders |
| status | String | Order status |
| totalAmount | Number | Total cost |

---

# 8. SECURITY ARCHITECTURE
# ============================================================================

## Authentication Mechanism

The application uses **JWT (JSON Web Token)** based authentication.

### Token Strategy
- **Token**: Signed including `userId`.
- **Storage**: HTTP-only Cookie `token`.
- **Expiration**: 7 days.

## Authorization Middleware

```javascript
// backend/middlewares/isAuth.js

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) return res.status(400).json({message: "token not found"})
        
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        if (!decodeToken) return res.status(400).json({message: "token not verify"})
            
        req.userId = decodeToken.userId
        next()
    } catch (error) {
         return res.status(500).json({message: "isAuth error"})
    }
}
```

## Security Measures
1.  **BcryptJS**: Hashing passwords before storage.
2.  **CORS**: Restricted to frontend origin with credentials.
3.  **Cookies**: `httpOnly`, `sameSite: "strict"`.

---

# 9. JWT AUTH FLOW (DIAGRAM EXPLANATION)
# ============================================================================

## Step-by-Step Authentication Flow

```
┌─────────┐     ┌──────────────┐     ┌─────────────┐     ┌──────────┐
│  USER   │────►│  LOGIN API   │────►│    USER     │────►│  GENERATE│
│         │     │  POST /signin│     │    CHECK    │     │   JWT    │
└─────────┘     └──────────────┘     └─────────────┘     └──────────┘
                                                            │
                                                            ▼
                                                    ┌──────────────┐
                                                    │   SET COOKIE │
                                                    │  (HTTPONLY)  │
                                                    └──────────────┘
                                                            │
                                                            ▼
                                                    ┌──────────────┐
                                                    │   RESPONSE   │
                                                    │   200 OK     │
                                                    └──────────────┘
```

## Token Verification Flow

```
┌─────────┐     ┌──────────────┐     ┌─────────────┐     ┌──────────┐
│  USER   │────►│  PROTECTED   │────►│  MIDDLEWARE │────►│  DECODE  │
│ Request │     │  ROUTE       │     │   isAuth    │     │   JWT    │
└─────────┘     └──────────────┘     └─────────────┘     └──────────┘
                                                            │
                                          ┌───────────────┴───────────────┐
                                          ▼                               ▼
                                  ┌──────────────┐               ┌──────────────┐
                                  │    VALID     │               │   INVALID    │
                                  │   Add User   │               │    400       │
                                  │   to Req     │               │   Error      │
                                  └──────────────┘               └──────────────┘
                                          │
                                          ▼
                                  ┌──────────────┐
                                  │  CONTROLLER  │
                                  └──────────────┘
```

---

# 10. APPLICATION FLOW (STEPWISE)
# ============================================================================

## Full Lifecycle from App Start

### 1. Backend Startup
```
index.js
  ↓
Load .env variables
  ↓
Connect to MongoDB (connectDb)
  ↓
Init Socket.io Server
  ↓
Apply Middleware (CORS, CookieParser)
  ↓
Register Routes (/api/*)
  ↓
Start Server on PORT
```

### 2. Frontend Startup
```
main.jsx
  ↓
Redux Store (Persist Rehydrate)
  ↓
App.jsx Mount
  ↓
useGetCurrentUser() Hook
  ↓
Check Auth API
```

### 3. API Request Cycle
```
Component calls Axios
  ↓
Request sent with Cookie
  ↓
Backend processes request
  ↓
Response returned
  ↓
Redux Store updates
  ↓
UI Re-renders
```

---

# 11. BACKEND INTERNAL FLOW
# ============================================================================

## Request Processing Pipeline

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        INCOMING HTTP REQUEST                            │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ 1. ROUTE MATCHING                                                       │
│    Express router matches URL (e.g., POST /api/auth/signin)             │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ 2. MIDDLEWARE CHAIN                                                     │
│    ├── cors()                                                           │
│    ├── express.json()                                                   │
│    └── isAuth() (if protected)                                          │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ 3. CONTROLLER                                                           │
│    Business Logic (e.g., signIn in auth.controllers.js)                 │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ 4. MODEL / DATABASE                                                     │
│    Mongoose Schema -> MongoDB                                           │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ 5. RESPONSE                                                             │
│    res.status(200).json(...)                                            │
└─────────────────────────────────────────────────────────────────────────┘
```

---

# 12. FRONTEND INTERNAL FLOW
# ============================================================================

## Application Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          FRONTEND ENTRY                                 │
│                    frontend/src/main.jsx                                │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       App Component                                     │
│              frontend/src/App.jsx                                       │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  1. Init Global Hooks (useGetCurrent_User, etc.)                 │   │
│  │                                                                  │   │
│  │  2. Render Routes (React Router)                                 │   │
│  │     └── <Routes>                                                 │   │
│  │         ├── Public: /signin, /signup                             │   │
│  │         └── Private: /, /cart, /shop/:id                         │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      STATE MANAGEMENT                                   │
│                      (Redux Toolkit)                                    │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐             │
│  │ userSlice      │  │ mapSlice       │  │ ownerSlice     │             │
│  │ - userData     │  │ - location     │  │ - myShopData   │             │
│  │ - cartItems    │  │ - address      │  │                │             │
│  └────────────────┘  └────────────────┘  └────────────────┘             │
```

---

# 13. AUTO API DOCUMENTATION
# ============================================================================

## API Endpoints Overview

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/auth/signup | Register new user | No |
| POST | /api/auth/signin | User login | No |
| GET | /api/user/current | Get user profile | Yes |
| POST | /api/shop/create-edit | Create/Edit Shop | Yes |
| POST | /api/item/add-item | Add Item to Shop | Yes |
| POST | /api/order/place-order | Place new Order | Yes |

### API Endpoint Details

#### Authentication Endpoints

##### POST /api/auth/signup
- **Purpose**: Register a new user
- **HTTP Method**: POST
- **Route Path**: `/api/auth/signup`
- **Authentication Required**: No

**Request**:
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "mobile": "1234567890",
  "role": "user"
}
```

**Response** (201 Created):
```json
{
  "_id": "67b2d...",
  "fullName": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "createdAt": "2025-02-17T..."
}
```

**Flow**: Router → Controller → Bcrypt Hash → User.create() → Gen Token → Set Cookie → Response

---

##### POST /api/auth/signin
- **Purpose**: Authenticate user
- **HTTP Method**: POST
- **Route Path**: `/api/auth/signin`
- **Authentication Required**: No

**Request**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response** (200 OK):
```json
{
  "_id": "67b2d...",
  "fullName": "John Doe",
  "email": "john@example.com"
}
```

**Flow**: Router → Controller → Find User → Bcrypt Compare → Gen Token → Set Cookie → Response

---

#### User Endpoints

##### GET /api/user/current
- **Purpose**: Get current logged-in user data
- **HTTP Method**: GET
- **Route Path**: `/api/user/current`
- **Authentication Required**: Yes (Middleware `isAuth`)

**Response** (200 OK):
```json
{
  "_id": "67b2d...",
  "fullName": "John Doe",
  "email": "john@example.com",
  "location": { "type": "Point", "coordinates": [...] }
}
```

---

##### POST /api/user/update-location
- **Purpose**: Update user's geolocation
- **HTTP Method**: POST
- **Route Path**: `/api/user/update-location`
- **Authentication Required**: Yes

**Request**:
```json
{
  "lat": 19.0760,
  "lon": 72.8777
}
```

**Response** (200 OK):
```json
{
  "message": "location updated successfully"
}
```

---

#### Shop Endpoints

##### POST /api/shop/create-edit
- **Purpose**: Create or Update Shop details
- **HTTP Method**: POST
- **Route Path**: `/api/shop/create-edit`
- **Authentication Required**: Yes
- **Middleware**: `isAuth`, `upload.single("image")`

**Request** (Multipart/Form-Data):
- `name`: "Tasty Bites"
- `city`: "Mumbai"
- `state`: "Maharashtra"
- `address`: "123 Street"
- `image`: [File Object]

**Response** (200 OK):
```json
{
  "_id": "shop_id_123",
  "name": "Tasty Bites",
  "owner": "user_id_123",
  "image": "image.jpg"
}
```

---

##### GET /api/shop/get-my
- **Purpose**: Get the current user's shop
- **HTTP Method**: GET
- **Route Path**: `/api/shop/get-my`
- **Authentication Required**: Yes

**Response** (200 OK):
```json
{
  "_id": "shop_id_123",
  "name": "Tasty Bites",
  "owner": "user_id_123",
  "rating": 4.5
}
```
---

##### GET /api/shop/get-by-city/:city
- **Purpose**: Get all shops in a specific city
- **HTTP Method**: GET
- **Route Path**: `/api/shop/get-by-city/:city`
- **Authentication Required**: Yes

**Response** (200 OK):
```json
[
  {
    "_id": "shop_id_123",
    "name": "Tasty Bites",
    "rating": 4.5
  }
]
```

---

#### Item Endpoints

##### POST /api/item/add-item
- **Purpose**: Add a new item to the shop
- **HTTP Method**: POST
- **Route Path**: `/api/item/add-item`
- **Authentication Required**: Yes
- **Middleware**: `isAuth`, `upload.single("image")`

**Request** (Multipart/Form-Data):
- `name`: "Burger"
- `price`: 150
- `category`: "Fast Food"
- `foodType`: "non veg"
- `image`: [File Object]

**Response** (200 OK):
```json
{
  "_id": "item_id_123",
  "name": "Burger",
  "price": 150,
  "shop": "shop_id_123"
}
```
---

##### GET /api/item/get-by-id/:itemId
- **Purpose**: Get item details by ID
- **HTTP Method**: GET
- **Route Path**: `/api/item/get-by-id/:itemId`
- **Authentication Required**: Yes

**Response** (200 OK):
```json
{
  "_id": "item_id_123",
  "name": "Burger",
  "price": 150,
  "description": "Tasty burger"
}
```
---

##### GET /api/item/get-by-shop/:shopId
- **Purpose**: Get all items for a specific shop
- **HTTP Method**: GET
- **Route Path**: `/api/item/get-by-shop/:shopId`
- **Authentication Required**: Yes

**Response** (200 OK):
```json
[
  {
    "_id": "item_id_123",
    "name": "Burger",
    "price": 150
  },
  {
    "_id": "item_id_124",
    "name": "Fries",
    "price": 80
  }
]
```

---

#### Order Endpoints

##### POST /api/order/place-order
- **Purpose**: Place a new order
- **HTTP Method**: POST
- **Route Path**: `/api/order/place-order`
- **Authentication Required**: Yes

**Request**:
```json
{
  "cartItems": [
    { "id": "item_id", "quantity": 2, "price": 100 }
  ],
  "paymentMethod": "cod",
  "deliveryAddress": { "text": "Home", "latitude": 19.0, "longitude": 72.8 }
}
```

**Response** (200 OK):
```json
{
  "_id": "order_id_123",
  "status": "pending",
  "totalAmount": 200
}
```
---

##### POST /api/order/verify-payment
- **Purpose**: Verify Razorpay payment
- **HTTP Method**: POST
- **Route Path**: `/api/order/verify-payment`
- **Authentication Required**: Yes

**Request**:
```json
{
  "orderId": "order_id_123",
  "paymentId": "pay_12345",
  "signature": "sig_12345"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Payment verified"
}
```
---

##### GET /api/order/my-orders
- **Purpose**: Get all orders for the current user
- **HTTP Method**: GET
- **Route Path**: `/api/order/my-orders`
- **Authentication Required**: Yes

**Response** (200 OK):
```json
[
  {
    "_id": "order_id_123",
    "status": "pending",
    "totalAmount": 200,
    "shopOrders": [...]
  }
]
```
---

##### POST /api/order/update-status/:id/:sid
- **Purpose**: Update order status (Shop or Delivery Boy)
- **HTTP Method**: POST
- **Route Path**: `/api/order/update-status/:id/:sid`
- **Authentication Required**: Yes

**Request**:
```json
{
  "status": "cooking"
}
```

**Response** (200 OK):
```json
{
  "message": "Order status updated",
  "status": "cooking"
}
```

---

# 14. DEPENDENCIES INSTALLATION
# ============================================================================

## Backend Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB

### Installation Steps

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Setup environment variables
# (See Section 15)

# Start development server
npm run dev
```

## Frontend Setup

### Installation Steps

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

---

# 15. ENVIRONMENT VARIABLES
# ============================================================================

## Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server Port | 5000 |
| MONGODB_URL | MongoDB Connection URI | mongodb://localhost:27017/quickbite |
| JWT_SECRET | Secret for JWT Signing | mysecretkey123 |
| CLIENT_URL | Frontend URL for CORS | http://localhost:5173 |
| EMAIL_USER | Specific Email for OTP | test@gmail.com |
| EMAIL_PASS | Email App Password | xxxx xxxx xxxx |
| CLOUDINARY_CLOUD_NAME | Cloudinary Cloud Name | myapp |
| CLOUDINARY_API_KEY | Cloudinary API Key | 123456 |
| CLOUDINARY_API_SECRET | Cloudinary API Secret | xxx-xxx |
| RAZORPAY_KEY_ID | Razorpay Key ID | rzp_test_xxx |
| RAZORPAY_KEY_SECRET | Razorpay Secret | xxx_secret |

---

# 16. HOW TO RUN PROJECT
# ============================================================================

## Step-by-Step Guide

### Step 1: Clone and Navigate
```bash
git clone <repository-url>
cd QuickBite
```

### Step 2: Backend Setup
```bash
cd backend
npm install
npm run dev
```
Server should start on `http://localhost:5000`

### Step 3: Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend should start on `http://localhost:5173`

---

# 17. RUNTIME FLOW (AFTER STARTUP)
# ============================================================================

## Backend Runtime Flow
1.  **Initialization**: Express App created, Db Connected, Socket Server Started.
2.  **Listening**: Waits for HTTP requests & Socket connections.
3.  **Processing**: Routes -> Controllers -> Services.

## Frontend Runtime Flow
1.  **Bootstrap**: React mounts to DOM.
2.  **Auth Check**: `useGetCurrentUser` verifies session.
3.  **Data Fetch**: Home page fetches shops/items.
4.  **Interaction**: User clicks -> Redux Updates -> API Calls.

---

# 18. COMMON ERRORS & FIXES
# ============================================================================

## Backend Errors

### Error: MongoDB Connection Failed
**Symptom**: `db error` in console.
**Solution**: Check `MONGODB_URL`. Ensure MongoDB service is running.

### Error: JWT Token Issues
**Symptom**: `token not found` on protected routes.
**Solution**: Ensure `withCredentials: true` is set in Axios.

## Frontend Errors

### Error: CORS Policy
**Symptom**: Blocked by CORS policy in browser console.
**Solution**: Verify `CLIENT_URL` in backend `.env` matches frontend host.

---

# 19. DEVELOPER NOTES
# ============================================================================

## Scalability Improvements
1.  **Redis**: Implement Redis for Socket.io adapter to scale multiple instances.
2.  **CDN**: Serve static assets via CDN.

## Security Improvements
1.  **Rate Limiting**: Add `express-rate-limit` middleware.
2.  **Input Validation**: Use `Joi` or `Zod` for request validation.

## Future Enhancements
- [ ] Multi-language support.
- [ ] Push Notifications (FCM).
- [ ] Advanced Analytics Dashboard.

---

# ============================================================================
# END OF DOCUMENTATION
# ============================================================================
