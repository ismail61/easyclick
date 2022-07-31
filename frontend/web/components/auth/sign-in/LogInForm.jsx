import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { signIn } from '../../../adapters/auth/signin'
import Link from 'next/link'

export default function LogInForm({ prev = '' }) {
  const [loginData, setLoginData] = useState({})
  const [errMsg, setErrMsg] = useState(null)
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const newData = loginData
    newData[event.target.name] = event.target.value;
    setLoginData(newData)
  }

  const handleSignIn = async (data) => {
    try {
      const response = await signIn('customer/sign-in', data)
      Cookies.set('token', response?.data?.token, {
        expires: 10,
        path: '/'
      })
      location.href = prev || '/'
    } catch (error) {
      setErrMsg(error?.response?.data?.err)
    }
    setIsLoading(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setErrMsg(null)
    await handleSignIn(loginData)
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col'>
      <div>
        <div className={`${errMsg ? 'block' : 'hidden'} flex justify-between items-start bg-red-200 py-2 px-8 rounded-md text-red-900 transition-all duration-300 shadow mb-2`}>
          <span>{errMsg} </span>
          <div onClick={() => setErrMsg(null)} className=' ml-2 hover:cursor-pointer transition-all duration-300'>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
      </div>
      <input onChange={handleChange} name='email' type='text' placeholder='Email or Phone' className='border p-3 rounded-lg my-2' required />
      <input onChange={handleChange} name='password' type='password' placeholder='Password' className='border p-3 rounded-lg my-2' required />
      <center>
        <button className='bg-[yellow] text-black p-2 w-28 my-1'>
          {
            isLoading ? <i className="fa-solid fa-loader animate-spin"></i>
              : <b>Sign in</b>
          }
        </button>
      </center>
    </form>
  )
}

