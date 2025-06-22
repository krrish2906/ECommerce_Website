# GreenBasket - Online Grocery Selling Ecommerce Website

GreenBasket is an online grocery ecommerce platform where:
- 🛒 Sellers can list grocery items for sale
- 👥 Buyers can browse products, add to cart, and place orders
- 🛍️ Sellers have a dashboard to manage stock, view products and orders
- 💳 Buyers can choose Cash on Delivery or Razorpay online payments (with verification + order status update)

---

## 🚀 Tech Stack

**Frontend**
- ReactJS
- Tailwind CSS
- Axios
- Moment
- React Hot Toasts

**Backend**
- Node.js
- Express.js
- MongoDB
- JWT (authentication)
- Multer (file uploads)
- Cloudinary (image storage)
- Razorpay (payment gateway)

---

## 📦 Installation

### 1️⃣ Clone the repo
```bash
git clone https://github.com/krrish2906/ECommerce_Website
cd EComm_Website
```

### 2️⃣ Install dependencies
```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

### 3️⃣ Setup environment variables
Create a `.env` file in your `backend/` folder with:
```
MONGODB_URI=your_mongo_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### 4️⃣ Run the app
```bash
# Start backend server
cd backend
npm run dev

# Start frontend app
cd ../frontend
npm start
```

---

## 🌐 API Overview

### 🔑 **User Routes**
| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/v1/user/signup` | Register a new user |
| POST | `/api/v1/user/login` | User login |
| POST | `/api/v1/user/logout` | Logout user (protected) |
| GET | `/api/v1/user/auth/verify` | Verify user auth (protected) |
| PATCH | `/api/v1/user/cart` | Update user cart (protected) |

---

### 🛍️ **Seller Routes**
| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/v1/seller/signup` | Register a new seller |
| POST | `/api/v1/seller/login` | Seller login |
| POST | `/api/v1/seller/logout` | Logout seller (protected) |
| GET | `/api/v1/seller/auth/verify` | Verify seller auth (protected) |

---

### 🛒 **Product Routes**
| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/v1/product/add` | Add product (seller only) |
| GET | `/api/v1/products/seller` | Get products of logged-in seller |
| GET | `/api/v1/products` | Get all products |
| GET | `/api/v1/product/:id` | Get product by ID |
| PATCH | `/api/v1/product/:id/stock` | Update product stock (seller only) |

---

### 📦 **Order Routes**
| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/v1/orders/user/:userId` | Get user's orders (protected) |
| GET | `/api/v1/orders/seller` | Get seller's orders (protected) |
| POST | `/api/v1/order/place-cod` | Place Cash on Delivery order |
| POST | `/api/v1/order/place-online` | Place order with online payment |
| POST | `/api/v1/order/verify-payment` | Verify Razorpay payment |
| DELETE | `/api/v1/order/:id/trash` | Delete order on payment failure |

---

### 🏠 **Address Routes**
| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/v1/address/add` | Add new delivery address (protected) |
| GET | `/api/v1/address/user/:userId` | Get addresses of user (protected) |

---

## 📌 Features

✅ Search and filter grocery products  
✅ Add to cart functionality  
✅ Seller product management + stock update  
✅ Cash on Delivery + Razorpay online payment integration  
✅ Delivery address management  
✅ Razorpay payment verification with order status update  

---