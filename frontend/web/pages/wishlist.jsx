import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { deleteWishlistItem, getCustomerWishlist } from '../adapters/wishlist'
import { useUser } from "../components/auth/context";
import { ErrorToast, SuccessToast } from '../utils/Error'
import { TryCatch } from '../utils/TryCatchHandle'
import { addToCart } from '../adapters/cart'

export default function Wishlist() {
  const router = useRouter()
  const user = useUser();

  const [wishlist, setWishlist] = useState(null);
  const fetcher = async () => {
    try {
      if (user) {
        const wishlistResponse = await getCustomerWishlist();
        setWishlist(wishlistResponse?.data)
      } else {
        router.push('/auth/sign-in')
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    fetcher()
  }, [])

  const handleRemoveItem = async (id) => {
    TryCatch(async () => {
      await deleteWishlistItem(id)
      fetcher()
    })
  }
  const handleAddToCart = async (product) => {
    const data = {
      ...product,
      product_id: product?.product_id?._id
    }

    await addToCart(data)
    SuccessToast('Added to Cart');
    await deleteWishlistItem(data?.product_id)
    fetcher()
    location.reload()
  }

  if (wishlist) {
    return (
      <div className='container mx-auto p-2 sm:p-4 mb-8 mt-[52px] sm:mt-0'>
        <div className='border-b mb-4 sm:mt-4 pb-4'>
          <p className='text-center text-xl sm:text-2xl font-bold text-red-400'><span><i className="fa fa-heart"></i></span> Wishlist</p>
        </div>
        {
          !wishlist && <div className='bg-white text-center p-16 rounded'>Sorry! <i className="fa text-red-400 fa-heart px-1"></i> Empty Wishlist</div>
        }

        {wishlist && <div className='px-8'>
          {/* Wishlist Details */}
          <div className='col-span-10 xl:col-span-6'>
            <div className='bg-white p-4 rounded'>
              {
                wishlist?.items?.map((product, index) => (
                  <div key={index} className='py-4'>
                    <div className='grid grid-cols-10 gap-3'>
                      <div className='flex col-span-10 sm:col-span-4'>
                        <div className='h-16 w-24 mr-4'>
                          <Image alt="image"
                            src={product.image}
                            width="84"
                            height="84"
                            layout="responsive"
                            objectFit="contain"
                          />
                        </div>
                        <div className='px-5 mt-5'>
                          <h4 className='font-medium text-sm text-gray-800'><Link href={`/product/${product?.product_id?.slug}`}>{product?.product_id?.product_name}</Link></h4>
                          <div className='text-sm mt-2 text-gray-600'>
                            <div>Color: {product?.color_family}</div>
                            <div>Size: {product?.size}</div>
                            <span onClick={() => handleRemoveItem(product?.product_id?._id)} className='text-[#d23e41] sm:mt-2 hover:cursor-pointer'>Remove</span>
                          </div>
                        </div>
                      </div>
                      <div className='col-span-3 sm:col-span-2 mt-5'>
                        <div className='text-center mt-2 font-semibold text-sm'>BDT {parseInt(product?.special_price)?.toLocaleString()}</div>
                        <div className='text-gray-500 text-sm font-medium text-center'><del>BDT {parseInt(product?.price)?.toLocaleString()}</del></div>
                      </div>
                      <div className='col-span-3 sm:col-span-1 flex ml-32 flex-col items-center mt-3'>
                        <div className='text-gray-500 text-sm font-medium ' title='Add To Cart' onClick={() => handleAddToCart(product)}>
                          <i className="fa-light fa-cart-plus fa-2x my-6 text-green-700 hover:cursor-pointer" ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
              {
                wishlist?.items?.length == 0
                && <div className='my-24 flex justify-center items-center'>Sorry! <i className="fa text-red-400 fa-heart px-1"></i> Empty wishlist</div>
              }
            </div>
          </div>
        </div>}
      </div>
    )
  } else {
    return <div className='border container mx-auto m-4 flex justify-center items-center p-32 bg-white'>Sorry! <i className="fa text-red-400 fa-heart px-1"></i> Empty wishlist</div>
  }
}


