import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          serverUrl + `/api/v1/product/getById/${id}`,
          { withCredentials: true }
        );
        const product = res.data.product || res.data;

        setName(product.name);
        setDescription(product.description);
        setCategory(product.category);
        setPrice(product.price);
      } catch (error) {
        console.log(error)
        toast.error("Failed to load product");
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(
        serverUrl + `/api/v1/product/update/${id}`,
        { name, description, price, category },
        { withCredentials: true }
      );

      toast.success("Product Updated!");
      navigate("/");
    } catch (error) {
      console.log(error)
      toast.error("Failed to update product");
    }
    
    setLoading(false);
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex justify-center items-center">
      <form
        onSubmit={handleUpdate}
        className="w-[90%] max-w-[600px] bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col gap-6"
      >
        <h2 className="text-3xl font-bold text-center">
          Edit Product
        </h2>

        <div>
          <p className="mb-2 font-semibold">Product Name</p>
          <input
            type="text"
            className="w-full h-10 rounded-lg bg-slate-600 px-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <p className="mb-2 font-semibold">Product Description</p>
          <textarea
            className="w-full h-24 rounded-lg bg-slate-600 px-4 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <p className="mb-2 font-semibold">Category</p>
          <select
            className="w-full h-10 rounded-lg bg-slate-600 px-4"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>

        <div>
          <p className="mb-2 font-semibold">Price</p>
          <input
            type="number"
            className="w-full h-10 rounded-lg bg-slate-600 px-4"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-teal-700 py-3 rounded-lg font-semibold"
        >
          {loading ? (
            <ClipLoader size={20} color="white" />
          ) : (
            "Update Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
