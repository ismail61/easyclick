import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { cancelOrder, getCustomerAllOrders } from '../adapters/order'
import { getUserData } from '../adapters/user'

export default function Order() {
  const router = useRouter()
  const [allOrders, setAllOrders] = useState([])
  const [userData, setUserData] = useState(null)
  const fetcher = async () => {
    try {
      const response = await getCustomerAllOrders()
      const userResponse = await getUserData()
      setAllOrders(response.data[0].orders)
      setUserData(userResponse?.data)
    } catch (error) {
      router.push('/auth/sign-in')
    }
  }
  useEffect(() => {
    fetcher()
  }, [])

  if (!allOrders?.length) {
    return <center className='py-36 mb-3 text-red-400'>Orders Not Found...</center>
  }
  return (
    <div className='container mx-auto sm:mt-[48px] md:mt-[10px] mobile-page'>
      <div className=' p-4 rounded'>
        {/* Order Mapping */}
        <div>
          {allOrders?.map((order, index) => (
            <Link passHref key={index} href={`order/${order?._id}`}>
              <div className='transition-all duration-150 bg-white p-4 my-4 hover:shadow-md hover:cursor-pointer border border-transparent'>
                <div className='flex justify-between border-b pb-1'>
                  <div>
                    <b className='text-gray-500'>#</b>
                    <span className='font-bold'>{order?._id}</span>
                  </div>
                  <div>
                    <b className='text-gray-500'>Date: </b>
                    <span className='font-bold'>{new Date(order?.createdAt).toDateString()}</span>
                  </div>
                </div>
                {/* Items Mapping */}
                {order?.products?.map((product, index) => (
                  <div key={index} className='py-4'>
                    <div className='grid grid-cols-10 gap-3'>
                      <div className='flex col-span-10 sm:col-span-4'>
                        <div className='px-6 mt-1'>
                          <h4 className='font-medium text-sm text-gray-600'><b>{product?.name}</b></h4>
                          <div className='flex text-sm mt-2 text-gray-500'>
                            <div className='pr-3'>Color: {product?.color}</div>
                            <div className='mx-8 sm:mx-0'>Size: {product?.size}</div>
                          </div>
                        </div>
                        <div className='h-20 w-32 mr-4 mb-2'>
                          {
                            product?.image &&
                            <Image alt="image"
                              src={product?.image}
                              width="100%"
                              height="84"
                              layout="responsive"
                              objectFit="contain"
                            />
                          }
                        </div>
                      </div>
                      <div className='col-span-4 sm:col-span-3 flex flex-col mt-2'>
                        <div className='text-gray-500 text-sm font-medium sm:mb-2 text-center'>Quantity</div>
                        <div className='text-center mt-1 font-semibold text-sm'>{parseInt(product?.quantity)}</div>
                      </div>
                      <div className='col-span-3 sm:col-span-2 mt-2'>
                        <div className='text-gray-500 text-sm font-medium text-center'>Price</div>
                        <div className='text-center mt-1 font-semibold text-sm'>BDT {parseInt(product?.price)}</div>
                      </div>
                      <div className='col-span-3 sm:col-span-1 flex flex-col items-center mt-2'>
                        <div className='text-gray-500 text-sm font-medium '>Sub Total</div>
                        <div className='text-md font-semibold mt-1 text-gray-600'>BDT {parseInt(parseInt(product?.quantity) * parseInt(product?.price))?.toLocaleString()}</div>
                      </div>
                    </div>
                    <br />
                    <hr className='mt-1' />
                    <div className='flex mt-2 px-2'>
                      <div className='text-gray-500 font-medium '>Status: </div>
                      <div className='text-sm font-semibold text-gray-600 px-2'>{product.status}</div>
                    </div>
                    <hr className='mt-2' />
                  </div>
                ))
                }
                <div className='flex justify-between'>
                  <span></span>
                  <div>
                    <b className='text-gray-700 mr-1'>Total :</b>
                    <span className='font-bold'>BDT {parseInt(order?.grand_total)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))
          }
        </div>
      </div>
    </div>
  )
}