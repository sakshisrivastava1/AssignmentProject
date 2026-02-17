import React from 'react'
import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import { FiEye,FiEyeOff } from 'react-icons/fi'
import axios from 'axios';
import { serverUrl } from '../App';
import {ClipLoader} from 'react-spinners'
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import toast from 'react-hot-toast';

function Signup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const handleSignup = async(e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const response = await axios.post(serverUrl + '/api/v1/auth/signup' , {name,email,password}, {withCredentials:true}) 
      setLoading(false)
      dispatch(setUserData(response.data.user))
      navigate('/')
      toast.success('Signup successful!')
      console.log(response.data)

    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message || "Something went wrong")
      console.log(error)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form onSubmit={handleSignup} className="bg-[#27292D] shadow-lg rounded-xl p-8 md:w-full md:max-w-md w-[80%]" >
        
        <h2 className="text-md text-gray-400 text-center mb-2">
           SIGNUP
        </h2>
        <p className="text-white text-xl text-center font-semibold mb-6">
           Create an account to continue
        </p>
        
        <label className="block text-sm text-white mb-2">
          Name
        </label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 text-gray-100 border border-gray-500 rounded-md mb-4"
        />

        <label className="block text-sm text-white mb-2">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your email "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 text-gray-100 border border-gray-500 rounded-md mb-4"
        />
        
        <label className="block text-sm text-white mb-2">
          Password
        </label>     
        <input
          type= {showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 text-gray-100 border-[1px] border-gray-500 rounded-md mb-4"
        /> 
        
        {!showPassword && <FiEye onClick={()=>setShowPassword(prev=>!prev)} className='text-white h-[18px] md:m-1 m-1 w-[18px] cursor-pointer absolute md:bottom-[35%] md:right-[39%] bottom-[32%] right-[20%]'/> }
        {showPassword && <FiEyeOff onClick={()=>setShowPassword(prev=>!prev)} className='text-white h-[18px] md:m-1 m-1 w-[18px] cursor-pointer absolute md:bottom-[35%] md:right-[39%] bottom-[32%] right-[20%]'/> }     

        <button type="submit" disabled={loading} className="w-full bg-blue-400 text-white py-2 rounded-xl">
           {loading ? <ClipLoader size={25} color='white'/>  : 'Continue'}
        </button>

        <p className="text-sm text-gray-300 mt-4">
          Already have an account?
          <Link to='/login' className="text-gray-100">
            Login →
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup