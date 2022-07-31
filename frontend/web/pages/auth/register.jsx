/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getMerchantDiscount } from '../../adapters/wallet';
import RegisterForm from '../../components/auth/sign-up/RegisterForm'

export default function signUp() {
  const [discount, setDiscount] = useState(null);
  const fetcher = async () => {
    try {
      const response = await getMerchantDiscount();
      setDiscount(response?.data?.discount)
    } catch (error) {

    }
  }
  useEffect(() => {
    fetcher()
  }, [])
  return (
    <div className='container mx-auto p-8 sm:mt-[48px] md:mt-[10px] mobile-page sm:mt-0'>
      <div className='flex justify-center items-center'>
        <div className='bg-white p-4 shadow-lg w-full sm:w-[360px]'>
          <div>
            <h4 className='text-center text-xl font-semibold mb-4'><i className="fas fa-user-plus"></i> Register</h4>
          </div>
          <div>
            <div className='text-center text-sm font-semibold mb-1'>
              Merchant will get a discount of BDT 12 for any order.
            </div>
          </div>
          <RegisterForm />
          <div className='underline hover:cursor-pointer text-gray-500 mt-2 '>
            <Link href="/auth/sign-in">Already have an account?</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function getStaticProps() {

}