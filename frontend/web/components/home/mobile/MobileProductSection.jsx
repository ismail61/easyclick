import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function MobileProductSection({ title = "", products = [] }) {
  const router = useRouter();
  const searchHandle = () => {
    router.push({
      pathname: '/products',
      query: { value: '' }
    })
  };
  return (
    <div className='my-4'>
      <div className='text-center p-1 border-b-2 mb-4'>
        <h1 className='text-xl select-all'>{products?.length > 0 ? title : null}</h1>
      </div>
      <div className='grid grid-cols-2 gap-2 px-2'>
        {
          products?.length > 0 ? products?.map((product, index) => {
            return (
              <div key={index} className='col-span-1 p-2 bg-white'>
                <Link passHref href={`/product/${product?.slug}`} >
                  <span>
                    <div>
                      <Image alt="image"
                        src={product?.variant_stock_price[0]?.images[0]?.url}
                        width="100%"
                        height="100%"
                        layout="responsive"
                        objectFit="contain"
                      />
                    </div>
                    <div className='p-2'>
                      <h4 className='text-sm h-6 whitespace-nowrap overflow-hidden text-ellipsis'>{product?.product_name}</h4>
                      <div>
                        <span className='text-sm'>
                          <span className='text-xl font-semibold'>
                            BDT {parseInt(product?.variant_stock_price[0]?.sizes[0]?.pricing?.special_price).toLocaleString()}
                          </span>
                        </span>
                      </div>
                      <div className='mt-1 text-sm'>
                        <span className='text-md'>{product?.orders || 0} orders</span>
                        <span><i className="fa-solid fa-star text-amber-500 mx-2"></i>{product?.rating}</span>
                      </div>
                    </div>
                  </span>
                </Link>
              </div>
            )
          }) : null
        }
      </div>
      {
        products?.length > 20 && router?.pathname !== '/products' ?
          <center>
            <button onClick={searchHandle} className="bg-transparent hover:bg-blue-500 text-blue-700 mt-8 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Show More...
            </button>
          </center> : null
      }
    </div>
  )
}
