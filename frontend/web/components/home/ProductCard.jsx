import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function ProductCard({ data }) {

  return (
    <Link passHref href={`/product/${data?.slug}`}>
      <div className='transition-all duration-150 cursor-pointer rounded-md overflow-hidden shadow-md hover:shadow-lg'>
        <div className='bg-white'>
          <div>
            <Image alt="image"
              src={data?.variant_stock_price[0]?.images[0]?.url}
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
            />
          </div>
          <div className='p-2'>
            <h4 className='text-sm h-6 whitespace-nowrap overflow-hidden text-ellipsis'>{data?.product_name}</h4>
            <div>
              <span className='text-sm'>
                <span className='text-xl font-semibold'>
                  BDT {parseInt(data?.variant_stock_price[0]?.sizes[0]?.pricing?.special_price).toLocaleString()}
                </span>
              </span>
            </div>
            <div className='mt-1 text-sm'>
              <span><b className='mr-2'>{data?.rating}</b><i className="fa-solid fa-star text-amber-500"></i></span>
              <span className='text-md ml-6'>{data?.orders || 0} orders</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
