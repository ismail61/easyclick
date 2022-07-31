import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { signUp } from '../../../adapters/auth/signup';
import { ErrorToast, TryCatch } from '../../../utils';

export default function RegisterForm() {
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    merchant: false
  });
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (event) => {
    const newData = registerData
    newData[event.target.name] = event.target.value;
    setRegisterData(newData)
  }

  const handleSignUp = async (data) => {
    await TryCatch(async () => {
      if (data.confirmPassword !== data.password) {
        return ErrorToast('Confirm password is not match!')
      }
      else {
        const response = await signUp('customer/register', data);
        if (response.data) {
          setTimeout(() => {
            router.push('/auth/sign-in', { shallow: true })
          }, 2000);
          setIsSuccess(true)
        } else {
          setIsSuccess(false)
        }
      }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSuccess(false)
    setIsLoading(true)
    await handleSignUp(registerData)
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col'>
      <div>
        <div className={`${isSuccess ? 'block' : 'hidden'} flex justify-between bg-green-100 py-4 border-l-8 border-green-400 px-4 rounded-md text-green-600 transition-all duration-300 shadow mb-2`}>
          <span>
            Registration Successful
            <Link passHref href='/auth/sign-in'><span className='ml-4 underline font-bold hover:cursor-pointer'>Sign In</span></Link>
          </span>
          <span onClick={() => setIsSuccess(false)} className='hover:cursor-pointer hover:rotate-180 transition-all duration-200'>
            <i className="fa-solid fa-xmark ml-2"></i>
          </span>
        </div>
      </div>

      <div className="tabs">
        <input type="radio" onClick={() => registerData['merchant'] = false} name="tab" id="tab1" />
        <label htmlFor="tab1" className='px-16'>Customer</label>
        <input type="radio" onClick={() => registerData['merchant'] = true} name="tab" id="tab2" />
        <label htmlFor="tab2" className='px-16'>Merchant</label>
        <div className="tab-content-wrapper">
        </div>
      </div>
      <input onChange={handleChange} name='name' type='text' placeholder='Full Name' className='border p-3 rounded-lg my-2' required />
      <input onChange={handleChange} name='email' type='email' placeholder='Email' className='border p-3 rounded-lg my-2' required />
      <input onChange={handleChange} name='phone' type='tel' placeholder='Phone' className='border p-3 rounded-lg my-2' required />
      <input onChange={handleChange} name='password' type='password' placeholder='Password' className='border p-3 rounded-lg my-2' required />
      <input onChange={handleChange} name='confirmPassword' type='password' placeholder='Confirm Password' className='border p-3 rounded-lg my-2' required />
      <center>
        <button className='bg-[yellow] text-black p-2 w-32 my-1'>
          {
            isLoading ? <i className="fa-solid fa-loader animate-spin"></i>
              : <b>Register</b>
          }
        </button>
      </center>
    </form>
  )
}
