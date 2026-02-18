import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { ClipLoader } from "react-spinners";

const Home = () => {
  const { userData } = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        serverUrl + "/api/v1/product/getAll",
        { withCredentials: true }
      );
      setProducts(response.data.products);
    } catch (error) {
      console.log(error)
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const handleRemove = async (id) => {
    setLoading(true)
    try {
      await axios.delete(
        serverUrl + `/api/v1/product/remove/${id}`,
        { withCredentials: true }
      );
      setLoading(false)
      toast.success("Product removed");
      fetchProducts();
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error("Failed to remove product");
    }
  };

  const handleLogout = async () => {
    setLoading(true)
    try {
     await axios.get(serverUrl + "/api/v1/auth/logout",{ withCredentials: true });
     dispatch(setUserData(null));
     setLoading(false)
     toast.success("Logged out");
     navigate("/login");

    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error("Failed to logout");  
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>

        <div className="flex gap-4">
          {userData?.role === "admin" && (
            <button
              onClick={() => navigate("/create-product")}
              className="bg-green-600 px-4 py-2 rounded"
            >
              Add Product
            </button>
          )}

          <button
            onClick={handleLogout}
            disabled={loading}
            className="bg-red-600 px-4 py-2 rounded" >
             {loading ? <ClipLoader size={15} color="white" /> : 'Logout'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg"
          >
            <img
              src={product.image}
              alt=""
              className="w-full h-80 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-2">
              {product.name}
            </h2>
            <p className="text-gray-400">
              {product.description}
            </p>
            <p className="text-lg font-bold mt-2">
              ₹ {product.price}
            </p>

            {userData?.role === "admin" && (
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() =>
                    navigate(`/edit-product/${product._id}`)
                  }
                  className="bg-blue-600 px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button 
                  onClick={() => handleRemove(product._id)}
                  disabled={loading}
                  className="bg-red-700 px-3 py-1 rounded"
                >
                  {loading ? <ClipLoader size={15} color="white" /> : 'Remove'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;