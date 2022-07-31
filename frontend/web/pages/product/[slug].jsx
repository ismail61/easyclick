import React, { useEffect, useState } from 'react'
import { GetAdminEightProducts, GetSellerEightProducts, getSingleProduct } from '../../adapters/product'
import { useRouter } from 'next/router'
import { addToCart, deleteCartItem, getCustomerCart } from '../../adapters/cart'
import Link from 'next/link'
import Image from 'next/image'
import HTMLReactParser from 'html-react-parser'
import { TryCatch } from '../../utils/TryCatchHandle'
import { useUser } from '../../components/auth/context'
import Review from '../../components/review/Review'
import QuestionsAnswers from '../../components/QA/qa'
import ProductSection from '../../components/home/ProductSection'
import { imageHover } from '../../components/image/HoverImage'
import Swal from 'sweetalert2'
import { AddQuestion } from '../../adapters/qa/questionAnswer'
import { addToWishlist, deleteWishlistItem, getCustomerWishlist } from '../../adapters/wishlist'
import { SuccessToast } from '../../utils/Error'
import Rating from 'react-rating'
import MobileProductSection from '../../components/home/mobile/MobileProductSection'

export default function ProductDetail({ product }) {
  const router = useRouter();
  const user = useUser();

  const [cart, setCart] = useState([]);
  const [onCart, setOnCart] = useState(false)
  const [onWishlist, setOnWishlist] = useState(false)
  const [currentSize, setCurrentSize] = useState(product?.variant_stock_price[0]?.sizes[0])
  const [currentVariant, setCurrentVariant] = useState(product?.variant_stock_price[0])
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const fetcher = async () => {
    try {
      if (user) {
        const cartResponse = await getCustomerCart();
        setCart(cartResponse?.data)
        checkExistOnCart(cartResponse?.data?.items);
        if (cartResponse?.data?.items?.length == 0) {
          setOnCart(false)
        }
        setOnWishlist(false)
        const wishlistResponse = await getCustomerWishlist();
        if (wishlistResponse?.data) {
          wishlistResponse?.data?.items?.forEach(item => {
            if (item.product_id?._id === product?._id) {
              setOnWishlist(true)
            }
          })
        }
      }
    } catch (error) {

    }
  }

  const checkExistOnCart = async (items) => {
    if (items.length == 0) {
      setOnCart(false)
    }
    items.map(item => {
      if (item.product_id?._id == product?._id || item.product_id == product?._id) {
        product?.variant_stock_price?.map(variant => {
          if (variant?.color_family === item.color_family) {
            setCurrentVariant(variant)
            variant?.sizes?.map(size => {
              if (size?.size === item?.size) {
                setOnCart(item)
                setCurrentSize(size)
              }
            })
          }
        })
        setQuantity(item.quantity)
      } else {
        setOnCart(false)
      }
    })
  }

  const handleAddToCart = async () => {
    if (!user) {
      router.push('/auth/sign-in')
    }
    else {
      setLoading(true)
      try {
        const cartItem = {
          product_id: product?._id,
          vendor_id: product?.vendor_id?._id,
          color_family: currentVariant?.color_family,
          size: currentSize?.size,
          price: currentSize?.pricing?.price,
          image: currentVariant?.images[0]?.url,
          special_price: currentSize?.pricing?.special_price || null,
          quantity: quantity,
          admin: product?.admin
        }
        const addToCartResponse = await addToCart(cartItem)
        await checkExistOnCart(addToCartResponse?.data?.items || [])
        setCart(addToCartResponse?.data)
        setLoading(false)
        SuccessToast('Added to Cart')
        location.reload()
      } catch (error) {
        setLoading(false)
      }
    }
  }

  const handleAddToWishlist = async () => {
    if (!user) {
      router.push('/auth/sign-in')
    }
    else {
      try {
        const wishlistItem = {
          product_id: product?._id,
          vendor_id: product?.vendor_id?._id,
          color_family: currentVariant?.color_family,
          size: currentSize?.size,
          price: currentSize?.pricing?.price,
          image: currentVariant?.images[0]?.url,
          special_price: currentSize?.pricing?.special_price || null,
          quantity: quantity,
          admin: product?.admin
        }
        await addToWishlist(wishlistItem);
        SuccessToast('Added to Wishlist.')
        refreshData();
        fetcher();
      } catch (error) {
      }
    }
  }

  const handleRemoveFromCart = async () => {
    setLoading(true)
    setQuantity(1)
    try {
      const removeFromCartResponse = await deleteCartItem(onCart)
      await checkExistOnCart(removeFromCartResponse?.data?.items)
      setCart(removeFromCartResponse?.data)
      setLoading(false)
      location.reload()
    } catch (error) {
      setLoading(false)
    }
  }

  const handleRemoveFromWishlist = async () => {
    try {
      await deleteWishlistItem(product?._id);
      refreshData();
      fetcher();
    } catch (error) {
    }
  }

  const handleIncQuantity = async () => {
    if (quantity < currentSize.quantity) {
      setQuantity(quantity + 1)
    }
  }

  const handleDecQuantity = async () => {
    setQuantity(quantity - 1)
  }

  const handleCurrentVariantChange = async (variant) => {
    setCurrentVariant(variant);
    setCurrentSize(variant?.sizes[0]);
    checkExistOnCart(cart?.items);
  }

  const categoryHandle = (cate) => {
    router.push(`/category/${cate?._id?.slug}`)
  }

  const refreshData = () => {
    router.replace(router.asPath);
  }

  const addQuestionHandle = async () => {
    if (!user) {
      router.push('/auth/sign-in')
    } else {
      const res = await Swal.fire({
        text: `Enter The Question`,
        input: 'text',
        confirmButtonText: 'Ask Question',
        inputPlaceholder: 'Enter The Text',
        allowEscapeKey: false,
        inputValidator: (value) => {
          if (!value) {
            return 'you need to input some text'
          }
        },
      })
      if (res?.isConfirmed && res?.value) {
        TryCatch(async () => {
          await AddQuestion(product?.slug, { text: res?.value });
          refreshData();
          fetcher();
        })
      }
    }
  }

  const buyNowHandle = () => {
    const item = {
      product_id: product?._id,
      slug: product?.slug,
      name: product?.product_name,
      vendor_id: {
        _id: product?.vendor_id?._id
      },
      color_family: currentVariant?.color_family,
      size: currentSize?.size,
      price: currentSize?.pricing?.price,
      image: currentVariant?.images[0]?.url,
      special_price: currentSize?.pricing?.special_price || null,
      quantity: quantity,
      admin: product?.admin
    }
    router.push({
      pathname: '/checkout',
      query: { item: JSON.stringify(item) }
    }, '/checkout')
  }

  useEffect(() => {
    fetcher()
  }, [])

  return (
    <div className='sm:mt-[10px] md:mt-[10px] mobile-page'>
      {/* Topbar */}
      <div className='bg-[#FAFAFA] py-4 px-4'>
        <div className='container mx-auto'>
          <div>
            <ul className='flex px-2 sm:px-0 justify-between sm:justify-start items-center'>

              <li className='sm:mr-8'>
                <Link passHref href="/admin">
                  <h4 className='sm:text-xl font-semibold text-gray-500 hover:cursor-pointer'>
                    EsyClick
                  </h4>
                </Link>
              </li>
              <div className='h-16 w-16 border p-1 rounded mr-4 hover:cursor-pointer'>
                <Link passHref href="/admin">
                  <Image alt="image"
                    src="/images/logo.png"
                    width="100%"
                    height="100%"
                    layout="responsive"
                    objectFit="contain"
                  />
                </Link>
              </div>
            </ul>
          </div>
        </div>
      </div>
      {/* Categories */}
      <div className='bg-[#FAFAFA] py-1 px-4'>
        <div className='container mx-auto mb-1'>
          {
            product?.category?.map((cate, index) => {
              return (
                <span key={index} onClick={() => categoryHandle(cate)}>
                  <b className="hover:cursor-pointer text-red-600 hover:text-red-800">{cate?.value} </b>{
                    index !== (product?.category?.length - 1) ? <span> <i className="fas fa-fast-forward text-pink-300 px-1"></i> </span> : null
                  }
                </span>
              )
            })
          }
        </div>
      </div>
      {/* Main Section */}
      <div className='bg-white px-4'>
        <div className='container mx-auto'>
          <div className='grid grid-cols-10'>
            {/* Image Container */}
            <div className='col-span-10 sm:col-span-4 mt-6'>
              <div>
                <Image alt="image"
                  src={currentVariant?.images[0]?.url}
                  width="100%"
                  height="100%"
                  layout="responsive"
                  objectFit="contain"
                  style={{ cursor: 'pointer' }}
                  onClick={() => imageHover(currentVariant?.images[0]?.url, 'image')}
                />
              </div>
            </div>
            <div className='col-span-10 sm:col-span-5 px-2 sm:px-0 mt-6'>
              <div className='ml-6'>
                <h1>
                  <b>
                    {product?.product_name}
                  </b>
                </h1>
                <div className='flex justify-between sm:justify-start items-center mt-4 text-sm'>
                  <div className='mr-2'>
                    {product?.rating != 0 && product?.rating}
                  </div>
                  <div className='mb-2 sm:mb-0 sm:mr-3'>
                    <Rating
                      emptySymbol="fa-duotone fa-star"
                      fullSymbol="fa-solid fa-star text-[#FFD700]"
                      initialRating={product?.rating}
                      readonly
                    />
                  </div>
                  <b className='mr-3'>
                    {product?.reviews?.length != 0 ? product?.reviews?.length + ' Reviews' : '0 Reviews'}
                  </b>
                </div>
                <div className='flex items-center mt-4'>
                  Brand:<p className='font-semibold ml-1'> {product?.brand}</p>
                </div>
                <div className='border-y my-8 py-4'>
                  <div className='flex items-center'>
                    <span className='text-2xl font-semibold mr-4'>BDT {parseInt(currentSize.pricing.special_price).toLocaleString()}</span>
                    <span className='line-through'>{parseInt(currentSize.pricing.price).toLocaleString()}</span>
                    <span className='ml-4 bg-red-100 text-red-800 px-2'>-{Math.round(((parseInt(currentVariant.sizes[0].pricing.price) - parseInt(currentVariant.sizes[0].pricing.special_price)) * 100) / parseInt(currentVariant.sizes[0].pricing.price))}%</span>
                  </div>
                </div>
                {/* Colors */}
                <div className='mb-4 flex'>
                  {product?.variant_stock_price?.map((variant, index) => (
                    <div key={index}>
                      {
                        currentVariant?.color_family == variant.color_family
                          ? <div onClick={() => handleCurrentVariantChange(variant)} key={index} className='mr-2 bg-[yellow] text-black rounded-full hover:cursor-pointer inline-block px-3 py-1'>
                            <h4>{variant.color_family}</h4>
                          </div>
                          : <div onClick={() => handleCurrentVariantChange(variant)} key={index} className='mr-2 bg-gray-100 rounded-full hover:cursor-pointer inline-block px-3 py-1 '>
                            <h4>{variant.color_family}</h4>
                          </div>
                      }
                    </div>
                  ))}
                </div>
                {/* Sizes */}
                <div className='mb-6'>
                  {currentVariant?.sizes.map((size, index) => (
                    currentSize?.size === size?.size
                      ? <div onClick={() => setCurrentSize(size)} key={index} className='bg-[yellow] text-black font-semibold mr-3 hover:cursor-pointer inline-block px-2 py-1 rounded-full '>
                        <h4>{size.size}</h4>
                      </div>
                      : <div onClick={() => setCurrentSize(size)} key={index} className='bg-gray-100 font-semibold mr-3 hover:cursor-pointer inline-block px-2 py-1 rounded-full '>
                        <h4>{size.size}</h4>
                      </div>
                  ))}
                </div>
                <div className='mb-6'>
                    <div className='text-black font-sm mr-1 inline-block px-1 rounded-full '>
                      <h4>Others: {currentVariant.others}</h4>
                    </div>
                </div>
                {/* Add Quantity */}
                <div>
                  {
                    currentSize?.quantity === 0 ? null : <><div className='mb-3'>Quantity: </div>
                      <div className='flex items-center'>
                        <div className='mr-4'>
                          {quantity > 1 && <i onClick={handleDecQuantity} className="fa-light fa-circle-minus text-xl hover:cursor-pointer"></i>}
                          <span className='text-xl mx-2'>{quantity}</span>
                          {(quantity < 5 || quantity < parseInt(currentSize?.quantity)) && <i onClick={handleIncQuantity} className="fa-light fa-circle-plus text-xl hover:cursor-pointer"></i>}
                        </div>
                        <span>Stock Left: {currentSize?.quantity || 0}</span>
                      </div></>
                  }
                </div>
                {/* Varient's Images */}
                <div className='mb-8 mt-4'>
                  <div className='flex'>
                    {
                      currentVariant?.images.map((image, index) => (
                        <div key={index} className='h-16 w-16 border p-1 rounded mr-4 hover:cursor-pointer'>
                          {
                            image?.url &&
                            <Image alt="image"
                              src={image?.url}
                              width="100%"
                              height="100%"
                              layout="responsive"
                              objectFit="contain"
                              onClick={() => imageHover(image?.url, 'image')}
                            />
                          }
                        </div>
                      ))
                    }
                  </div>
                </div>
                {/* Action area */}
                <div className='mt-4'>
                  <div className='grid grid-cols-2 sm:block'>
                    {
                      currentSize.quantity === 0 ? <span className='text-red-700'>Stock Out</span> :
                        <div className='flex'>
                          <div>
                            <button onClick={buyNowHandle}
                              className=' flex-1 w-28 bg-[#F74958] hover:bg-[white] hover:text-[#F74958] hover:border-2 hover:border-red-600 p-3 sm:w-auto hover:shadow-md text-white mr-4 font-semibold rounded md:my-2 sm:my-2'>
                              Buy Now
                            </button>
                          </div>
                          <div>
                            {!onCart
                              ? <button onClick={handleAddToCart} className='w-32 bg-[#F74958] hover:bg-[white] hover:text-[#F74958] hover:border-2 hover:border-red-600 p-3 hover:shadow-md text-white font-semibold rounded-md focus:shadow-md transition-all duration-200 md:my-2 sm:my-2'>
                                {loading ? <i className="fa-solid fa-loader animate-spin"></i> : 'Add To Cart'}
                              </button>
                              : <button onClick={handleRemoveFromCart} className='w-32 bg-[#F74958] p-3 hover:bg-[white] hover:text-[#F74958] hover:border-2 hover:border-red-600 hover:shadow-md text-white font-semibold rounded-md focus:shadow-md transition-all duration-200 md:my-2 sm:my-2'>
                                {loading ? <i className="fa-solid fa-loader animate-spin"></i> : 'Remove'}
                              </button>
                            }
                          </div>
                          <div className='p-1 px-2 py-1'>
                            {
                              !onWishlist ? <button onClick={handleAddToWishlist} className='pb-1 mb-1 px-2 rounded-full md:my-2 sm:my-2' title='Wishlist'>
                                <i className="fa-light fa-heart fa-2x mr-1 text-red-700" ></i>
                              </button> : <button onClick={handleRemoveFromWishlist} className='pb-1 mb-1 px-2 rounded-full md:my-2 sm:my-2' title='Wishlist'>
                                <i className="fa-solid fa-heart fa-2x mr-1" ></i>
                              </button>
                            }
                          </div>
                        </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Varients by images */}
          <div className='mt-4 flex mx-2 sm:mx-0'>
            {
              product?.variant_stock_price?.map((varient, index) => (
                <div onClick={() => setCurrentVariant(varient)} key={index} className='h-20 w-20 border p-1 rounded mr-4 hover:cursor-pointer mb-2'>
                  {
                    varient?.images[0]?.url &&
                    <Image alt="image"
                      src={varient?.images[0]?.url}
                      width="100%"
                      height="100%"
                      layout="responsive"
                      objectFit="contain"
                    />
                  }
                </div>
              ))
            }
          </div>
        </div>
      </div>
      {/* Description */}
      <div className='px-4'>
        <div className='container mx-auto my-8 rounded-lg shadow-md'>
          <div className='px-3 text-xl border-b py-4'>
            Short Description
          </div>
          <div className='p-4'>
            {product?.short_description}
          </div>
          <div className='px-3 text-xl border-b py-4'>
            Long Description
          </div>
          <div className='p-4'>
            {HTMLReactParser(product?.long_description)}
          </div>
        </div>
        {/* Table */}
        <div className='container mx-auto my-8  p-4 rounded-lg shadow-md'>
          <div className='grid grid-cols-6 border-x border-t'>
            <div className='col-span-2 sm:col-span-1 border-r p-2'>
              Dangerous Goods
            </div>
            <div className='col-span-4 sm:col-span-5 pl-4 p-2'>
              {product?.dangerous_goods}
            </div>
          </div>
          <div className='grid grid-cols-6 border-x border-t'>
            <div className='col-span-2 sm:col-span-1 border-r p-2'>
              Warranty
            </div>
            <div className='col-span-4 sm:col-span-5 pl-4 p-2'>
              {product?.warranty_type} <br></br>
              {product?.warranty_period}
            </div>
          </div>
          <div className='grid grid-cols-6 border-x border-y '>
            <div className='col-span-2 sm:col-span-1 border-r p-2'>
              Box
            </div>
            <div className='col-span-4 sm:col-span-5 pl-4 p-2'>
              {product?.whats_in_the_box}
            </div>
          </div>
        </div>
        {/* Rating */}
        {
          product?.rating ?
            <Review product={product} itemsPerPage={5} rating={product?.rating} reviews={product?.reviews} />
            : null
        }
        {/* Questions & Answers */}
        <QuestionsAnswers itemsPerPage={5} qas={product?.questions_and_answers} addQuestionHandle={addQuestionHandle} />
        {/* Recommendations Products */}
      </div>
    </div>
  )
}


export async function getServerSideProps(context) {
  try {
    const response = await getSingleProduct(context.query?.slug);
    return {
      props: {
        product: response.data
      },
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    };
  }

}



