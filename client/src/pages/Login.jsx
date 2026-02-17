import React from 'react'
import { useState } from "react";
import { useDispatch } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { FiEye,FiEyeOff } from 'react-icons/fi'
import axios from 'axios'
import { serverUrl } from '../App';
import { ClipLoader } from 'react-spinners';
import { setUserData } from '../redux/userSlice';
import toast from 'react-hot-toast';

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async(e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post(serverUrl + '/api/v1/auth/login' , {email,password}, {withCredentials:true}) 
      setLoading(false)
      dispatch(setUserData(response.data.user))
      navigate('/')
      toast.success("Logged in successfully")
      console.log(response.data)

    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message || "Something went wrong")
      console.log(error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form
        onSubmit={handleLogin}
        className="bg-[#27292D] shadow-lg rounded-xl p-8 md:w-full md:max-w-md w-[80%]" >
        <h2 className="text-md text-gray-400 text-center mb-2">WELCOME BACK</h2>
        <p className="text-white text-xl text-center font-semibold mb-6">Log into your account</p>

        <label className="block text-sm text-white mb-2">
          Email
        </label>
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 text-gray-100 border border-gray-500 rounded-md mb-4"
        />
        
        <label className="block text-sm text-white mb-2">
            Password
        </label>   
        <input
          type= {showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 text-gray-100 border-[1px] border-gray-500 rounded-md mb-4"
        /> 
        
        {!showPassword && <FiEye onClick={()=>setShowPassword(prev=>!prev)} className='text-white h-[18px] m-1 w-[18px] cursor-pointer absolute md:bottom-[41%] md:right-[39%] bottom-[40%] right-[21%]'/> }
        {showPassword && <FiEyeOff onClick={()=>setShowPassword(prev=>!prev)} className='text-white h-[18px] m-1 w-[18px] cursor-pointer absolute md:bottom-[41%] md:right-[39%] bottom-[40%] right-[21%]'/> }     

        <button type="submit" disabled={loading} className="w-full bg-blue-400 text-white py-2 rounded-xl">
          {loading ? <ClipLoader size={25} color='white'/> :'Login now'}
        </button>

        <p className="text-sm text-gray-300 mt-4">
          Not registered yet?
          <Link to='/signup' className="text-gray-100">
            Register →
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login