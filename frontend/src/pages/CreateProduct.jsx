import axios from "axios";
import { useNavigate } from "react-router-dom";
import upload from '../assets/uploadimage.jpg'
import toast from "react-hot-toast";
import { serverUrl } from "../App";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

const CreateProduct = () => {
  const navigate = useNavigate();
  let [image,setImage] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Men")
  const [price, setPrice] = useState("")
  const [loading,setLoading] = useState(false)


  const handleCreate = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      let formData = new FormData()
      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("image",image)

      const result = await axios.post(serverUrl + "/api/v1/product/add" , formData, {withCredentials:true} )
      setLoading(false)
      console.log(result.data)
      toast.success("Product Added!")
      navigate('/')

      if(result.data){
          setName("")
          setDescription("")     
          setImage(false)
          setPrice("")
          setCategory("Men")
      }
      
    } catch (error) {
       console.log(error.message)
       setLoading(false)
       toast.error("Add Product Failed")
    }    
  }

  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] overflow-x-hidden relative'>

    <div className='w-[82%] h-[100%] flex items-center justify-start overflow-x-hidden absolute  right-0 bottom-[5%] '>
      
      <form onSubmit={handleCreate} className='w-[100%] md:w-[90%] h-[100%]  mt-[70px] flex flex-col gap-[30px] py-[90px] px-[30px] md:px-[60px]'>
       <div className='w-[400px] h-[50px] text-[25px] md:text-[40px] text-white'>Add Product</div>

       <div className='w-[80%] h-[130px] flex items-start justify-center flex-col mt-[20px]  gap-[10px] '>
        
        <p className='text-[20px] md:text-[25px]  font-semibold'>
          Upload Image
        </p>
        <div className='w-[100%] h-[100%] flex items-center justify-start '>         
          <label htmlFor="image4" className=' w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7]'>
            <img src={!image ? upload : URL.createObjectURL(image)} alt="" className='w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px]' />
            <input type="file" id='image4' hidden onChange={(e)=>setImage(e.target.files[0])} required/>
          </label>
         
        </div>

       </div>

       <div className='w-[80%] h-[100px] flex items-start justify-center flex-col  gap-[10px]'>
        <p className='text-[20px] md:text-[25px]  font-semibold'>
          Product Name
        </p>
        <input type="text" placeholder='Type here'
        className='w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2]' onChange={(e)=>setName(e.target.value)} value={name} required/>
       </div>

        <div className='w-[80%] flex items-start justify-center flex-col  gap-[10px]'>
        <p className='text-[20px] md:text-[25px]  font-semibold'>
          Product Description
        </p>
        <textarea type="text" placeholder='Type here'
        className='w-[600px] max-w-[98%] h-[100px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] py-[10px] text-[18px] placeholder:text-[#ffffffc2]' onChange={(e)=>setDescription(e.target.value)} value={description} required />
       </div>

       <div className='w-[80%]  flex items-center  gap-[10px] flex-wrap '>
        <div className='md:w-[30%] w-[100%] flex items-start sm:justify-center flex-col  gap-[10px]'>
          <p className='text-[20px] md:text-[25px]  font-semibold w-[100%]'>Product Category</p>
          <select name="" id="" className='bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg hover:border-[#46d1f7] border-[2px] ' onChange={(e)=>setCategory(e.target.value)}>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>
        
       </div>
       <div className='w-[80%] h-[100px] flex items-start justify-center flex-col  gap-[10px]'>
        <p className='text-[20px] md:text-[25px]  font-semibold'>
          Product Price
        </p>
        <input type="number" placeholder='₹ 2000'
        className='w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2]' onChange={(e)=>setPrice(e.target.value)} value={price} required/>
       </div>


       <button type="submit" disabled={loading} className='w-[140px] px-[20px] py-[20px] rounded-xl bg-teal-800 flex items-center justify-center gap-[10px] text-white active:bg-slate-700 active:text-white active:border-[2px] border-white'>
          {loading ? <ClipLoader size={30} color='white'/> : "Add Product"}
        </button>

      </form>
    </div>
    </div>
  );
};

export default CreateProduct;