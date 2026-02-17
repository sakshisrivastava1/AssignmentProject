# 🛒 Product Management Application (MERN Stack)

A full-stack Product Management application built using the MERN stack.  
This application implements authentication, role-based authorization, and CRUD operations for products.

---

## 📌 Project Overview

This project allows users and admins to interact with products based on their roles.

- Users can:
  - Sign up / Login
  - View all products
  - Logout

- Admins can:
  - Login
  - View all products
  - Add new products
  - Edit existing products
  - Delete products
  - Logout

The application uses JWT authentication and role-based access control to manage permissions.

---

## 🚀 Tech Stack

### Frontend
- React.js (Vite)
- React Router DOM
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (Authentication)
- Cloudinary (Image Upload)

---

## 📂 Folder Structure

### Frontend (Client)

client/
├── src/
│ ├── pages/
│ │ ├── Login.jsx
│ │ ├── Signup.jsx
│ │ ├── Products.jsx
│ │ ├── CreateProduct.jsx
│ │ ├── EditProduct.jsx
│ │
│ ├── components/
│ │ ├── Navbar.jsx
│ │ ├── ProductCard.jsx
│ │
│ ├── context/
│ │ ├── AuthContext.jsx
│ │
│ ├── App.jsx
│ └── main.jsx

### Backend 
backend/
├── controllers/
│ ├── productController.js
│ ├── userController.js
│
├── models/
│ ├── productModel.js
│ ├── userModel.js
│
├── routes/
│ ├── productRoutes.js
│ ├── userRoutes.js
│
├── middleware/
│ ├── authMiddleware.js
│
└── index.js


---

## Features

### User Role
- Register and login
- View all products
- Logout functionality

### Admin Role
- Add new product
- Edit product
- Delete product
- View all products
- Logout functionality

---

## ⚙️ Installation & Setup Guide

### 1️⃣ Clone the Repository

```bash
git clone <your-repository-link>
cd project-folder

2️⃣ Backend Setup

Navigate to the backend folder:

cd backend
npm install


Create a .env file inside the server directory and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key


Start the backend server:

npm start

Frontend Setup:

Navigate to the client folder:

cd client
npm install
npm run dev


Frontend will run at:

http://localhost:5173


Backend will run at:

http://localhost:3000

🔐 Authentication Flow

User logs in with email and password

JWT token is generated

Token is stored in localStorage

Protected routes verify the token

Admin access is granted based on user role

Product Image Upload

Images are uploaded using Cloudinary

Image URL is stored in MongoDB

Products are displayed with their uploaded image

API Endpoints (Sample)
User Routes

GET /api/v1/user/current

Auth Routes

POST /api/v1/user/signup

POST /api/v1/user/login

Product Routes

GET /api/v1/product/getAll

POST /api/v1/product/add (Admin only)

PUT /api/v1/product/update/:id (Admin only)

DELETE /api/v1/product/remove/:id (Admin only)



