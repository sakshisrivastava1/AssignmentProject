import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

export const getCurrentUser = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        serverUrl + '/api/v1/user/current',
        { withCredentials: true }
      )

      dispatch(setUserData(response.data))
      console.log(response.data.user)
    }

    fetchUser()
  }, [])
}


export default getCurrentUser