import { useRouter } from 'next/router'
import React from 'react'
import ProductCard from './ProductCard'

export default function ProductSection({ title = "", products = [] }) {
  const router = useRouter();
  const searchHandle = () => {
    router.push({
      pathname: '/products',
      query: { value: '' }
    })
  };
  return (
    <div className='container mx-auto mb-8 mt-2 px-4'>
      <div className='text-left p-4 border-b-2 mb-4'>
        <h1 className='text-2xl select-all'>{products?.length > 0 ? title : null}</h1>
      </div>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-x-4 gap-y-6'>
        {
          products?.length > 0 ? products?.map((product, index) => (
            <ProductCard key={index} data={product} />
          )) : null
        }
      </div>
      {
        products?.length > 20 && router?.pathname !== '/products' ?
          <center>
            <button onClick={searchHandle} className="bg-transparent hover:bg-blue-500 text-blue-700 mt-8 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Load More...
            </button>
          </center> : null
      }
    </div>
  )
}
