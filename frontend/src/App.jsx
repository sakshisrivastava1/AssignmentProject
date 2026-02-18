import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import AdminRoute from "./components/AdminRoute";
import getCurrentUser from "./hooks/getCurrentUser";

export const serverUrl = "http://localhost:3000";

function App() {
  const { userData } = useSelector((state) => state.user);

  getCurrentUser()

  return (
   <>
    <Toaster/>

    <Routes>
      {!userData ? (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      ) : (
        <>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/signup" element={<Navigate to="/" />} />

        
        <Route
          path="/create-product"
          element={
            <AdminRoute user={userData}>
              <CreateProduct />
            </AdminRoute>
          }
        />

        <Route
          path="/edit-product/:id"
          element={
            <AdminRoute user={userData}>
              <EditProduct />
            </AdminRoute>
          }
        />

        <Route path="*" element={<h2>Page Not Found</h2>} />
      </>
    )}
  </Routes>
</>

  );
}

export default App;
