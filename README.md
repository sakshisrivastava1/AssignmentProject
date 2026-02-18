MERN Backend Assignment – Product Management
Project Overview

This project is a backend-focused application built with Node.js, Express, and MongoDB, implementing authentication, role-based authorization, and CRUD operations for products.

The frontend was a minimal React interface used only to test API functionality. The main purpose of this project was to demonstrate backend development skills, including RESTful API design, database management, and secure user authentication.

Features:

Backend
User Authentication
Sign up and login functionality
Password hashing with bcrypt
JWT-based authentication

Role-based access: admin vs user

Product Management
Admin can create, edit, and delete products
Admin and users can get products and get product bt id too
Supports image uploads using Multer
Products stored in MongoDB

API
Fully RESTful
Middlewares for authentication and authorization
Error handling and validation for requests

Frontend (For Testing Only)
Built with React.js
Simple interface to test backend APIs

Features:
Add/edit/delete products for Admin Only
Get/getById for both admin and user
User login and signup

State management using React hooks and Redux

Tech Stack

Backend: Node.js, Express.js
Database: MongoDB (via Mongoose)
Authentication: JWT, bcrypt
File Uploads: Multer
Frontend: React.js (minimal testing interface)
Testing: Postman 

root
│
├─ backend
│   ├─ controllers      # Business logic for user/product operations
│   ├─ middleware       # Auth, role-based access, error handling
│   ├─ models           # MongoDB schemas (User, Product)
│   ├─ routes           # API endpoints
    ├─ utils            # Admin creation
│   └─ index.js        # Express server setup
│
├─ frontend
    ├─ src/pages   # Simple components to test APIs
│   └─ src/redux        # Minimal state management
└─ README.md

API Endpoints
Auth
Method	       Endpoint	            Description
POST	   /api/v1/auth/signup	   Register a new user
POST	   /api/v1/auth/login	     Login user and return JWT
GET	     /api/v1/auth/logout     Logout user (protected)

User
Method	  Endpoint	              Description
GET	    /api/v1/user/current	  Get current logged-in user(protected)

Products
Method	          Endpoint	                 Description
GET	      /api/v1/product/getAll	        Get all products
GET	      /api/v1/product/getById/:id	    Get product by ID
POST	    /api/v1/product/add             Add a new product (admin only)
PUT	      /api/v1/product/update/:id	    Update a product (admin only)
DELETE	  /api/v1/product/remove/:id	    Delete a product (admin only)

Installation & Setup

Backend :

Clone the repository:
bash
git clone <your-repo-link>

Navigate to the backend folder:
bash
cd backend

Install dependencies:
bash
npm install

Create a .env file:
PORT=3000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
CLOUDINARY_NAME=<your-cloudinary-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>

Start the server:
bash
npm run dev


Frontend (Optional Testing):

Navigate to frontend folder:
bash
cd frontend

Install dependencies:
bash
npm install

Start the React app:
bash
npm start

Frontend runs on http://localhost:5173
Backend runs on http://localhost:3000

Postman Collection
A Postman collection is included for testing all backend APIs:
Auth: Signup/Login
User: Get logged-in user
Product CRUD operations

Future Improvements
Add pagination and filtering for products
Implement unit and integration tests for backend
Add more advanced error handling

License
This project is open-source under MIT License.
