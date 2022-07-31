import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SelectOption from '../components/common/SelectOption'
import { useRouter } from 'next/router'
import { deleteCartItem, getCustomerCart, updateCartItem } from '../adapters/cart'
import { useUser } from "../components/auth/context";
import { ErrorToast, SuccessToast } from '../utils/Error'
import { getUserData } from '../adapters/user'
import { applyVoucher, getAdminFreeShippingList, getShippingFee } from '../adapters/promotion'
import { TryCatch } from '../utils/TryCatchHandle'
import Swal from 'sweetalert2'
import { payment_method } from '../constants'
import { createOrder } from '../adapters/order'
import { getMerchantDiscount } from '../adapters/wallet'

export default function Cart() {
  const router = useRouter();
  const user = useUser();

  const [totalAmount, setTotalAmount] = useState(0)
  const [loader, setLoader] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [merchant, setMerchant] = useState(false)
  const [appliedVoucher, setAppliedVoucher] = useState(null)
  const [shippingFreeDiscount, setShippingFreeDiscount] = useState(false)
  const [selectedShipmentFee, setSelectedShippingFee] = useState(0)
  const [discountAmount, setDiscountAmount] = useState(0)
  const [merchantDiscountAmount, setMerchantDiscountAmount] = useState(0)
  const [email, setEmail] = useState(null)
  const [city, setCity] = useState(null)
  const [totalShippingFee, setTotalShippingFee] = useState(0)
  const [userData, setUserData] = useState(null)
  const [coupon, setCoupon] = useState('')
  const [selectedProducts, setSelectedProducts] = useState([])
  const [cart, setCart] = useState(null)

  useEffect(() => {
    fetcher()
  }, [])

  const fetcher = async () => {
    try {
      if (user) {
        setLoader(true);
        const cartResponse = await getCustomerCart();
        setCart(cartResponse?.data)

        const userResponse = await getUserData();
        setEmail(userResponse?.data?.email)
        userResponse?.data?.merchant && userResponse?.data?.active && setMerchant(true);
        userResponse?.data?.address?.map(address => {
          if (address?.default_shipping_address) {
            setCity(address?.city)
            setSelectedAddress(address);
          }
        })
        setUserData(userResponse?.data)

        const discountResponse = await getMerchantDiscount();
        discountResponse?.data && discountResponse?.data?.discount && setMerchantDiscountAmount(Number(discountResponse?.data?.discount))
      } else {
        router.push('/auth/sign-in')
      }
    } catch (error) {

    } finally {
      setLoader(false);
    }
  }

  const quantityOptions = [
    { key: 1, value: 1 },
    { key: 2, value: 2 },
    { key: 3, value: 3 },
    { key: 4, value: 4 },
    { key: 5, value: 5 }
  ]

  const couponInputHandle = (e) => {
    setCoupon(e.target.value);
  }

  const couponHandle = async (e) => {
    if (!coupon) {
      ErrorToast('Enter Coupon Code');
    } else if (!selectedProducts.length) {
      ErrorToast('Please select a product to apply voucher');
    } else {
      try {
        setLoader(true)
        const res = await applyVoucher({
          code: coupon,
          products: selectedProducts,
          total_price: totalAmount
        });
        const { discount_amount_percentage, discount_amount, max_discount_amount } = res?.data;
        setAppliedVoucher(res?.data)
        if (discount_amount_percentage) {
          const discount = ((Number(totalAmount - Number(totalShippingFee)) * Number(discount_amount_percentage)) / 100)
          if (Number(discount) > Number(max_discount_amount)) {
            setDiscountAmount(max_discount_amount)
            setTotalAmount(totalAmount - (Number(max_discount_amount)));
          } else {
            setDiscountAmount(discount)
            setTotalAmount(totalAmount - (Number(discount)));
          }
        } else {
          setDiscountAmount(discount_amount)
          setTotalAmount(totalAmount - (Number(discount_amount)));
        }
        SuccessToast('Happy Shopping')
      } catch (error) {
        ErrorToast(error?.response?.data?.err)
      } finally {
        setLoader(false)
      }
    }
  }

  const handleRemoveItem = async (item) => {
    try {
      await deleteCartItem(item)
      location.href = '/cart'
    } catch (error) {

    }
  }

  const selectedHandle = async (e, product) => {

    if (!selectedAddress) {
      ErrorToast('Please Add Shipping Address');
      router.push('/account')
    } else {
      setLoader(true)
      let tempProducts = [...selectedProducts];
      setSelectedProducts([])
      if (e.target.checked) {
        tempProducts.push(product);
      } else {
        tempProducts = tempProducts?.filter(nestedProduct => nestedProduct?.product_id?._id !== product?.product_id?._id)
      }
      setSelectedProducts(tempProducts);
      let tempShippingFee = selectedShipmentFee;
      if (tempProducts?.length === 1) {
        await TryCatch(async () => {
          const shippingFeeResponse = await getShippingFee(city);
          setSelectedShippingFee(shippingFeeResponse?.data?.fee || 100);
          tempShippingFee = shippingFeeResponse?.data?.fee || 100;
          setTotalShippingFee((shippingFeeResponse?.data?.fee || 100) * tempProducts?.length)
        })
      } else {
        setTotalShippingFee(selectedShipmentFee * tempProducts?.length)
      }

      setDiscountAmount(0)
      setAppliedVoucher(null)
      let temp_price = 0;
      tempProducts?.map(product => {
        temp_price += ((product?.special_price || product?.price) * product?.quantity)
      })

      if (tempProducts?.length > 0) {
        try {
          setShippingFreeDiscount(false)
          const shippingFreeResponse = await getAdminFreeShippingList({
            total_amount: temp_price,
            quantity: tempProducts?.length
          });
          if (shippingFreeResponse?.data) {
            setShippingFreeDiscount(true)
            tempShippingFee = 0;
          }
        } catch (error) {
          ErrorToast(error?.response?.data?.err)
        }
        finally {
          setTotalAmount(((temp_price) + ((tempShippingFee * tempProducts?.length) || 0)));
          setLoader(false)
        }
      }
    }
  }

  const checkoutHandle = async () => {
    const body = {
      products: selectedProducts?.map(product => {
        return {
          ...product,
          product_id: product?.product_id?._id,
          price: product?.discount_price || product?.special_price || product?.price,
          name: product?.product_id?.product_name,
          image: product?.image,
          color: product?.color_family,
          shipment_fee: shippingFreeDiscount ? 0 : selectedShipmentFee
        }
      }),
      shipping_address: selectedAddress?._id,
      billing_address: selectedAddress?._id,
      total_amount: totalAmount,
      code: appliedVoucher?.code,
      discount_amount: discountAmount,
      merchant_discount: merchantDiscountAmount ? Number(merchantDiscountAmount) : 0,
      total_shipping_fee: shippingFreeDiscount ? 0 : totalShippingFee,
    }
    try {
      setLoader(true)
      await createOrder(body);
      await Swal.fire(
        'Order Placed!',
        'Your order has been placed.',
        'success'
      )
      setLoader(false)
      location.href = '/orders'
    } catch (error) {
      ErrorToast(error?.response?.data?.err)
    } finally {
      setLoader(false)
    }
  }

  const updateCartItemQuantity = (product, quantity) => {
    const id = product.product_id?._id;
    TryCatch(async () => {
      await updateCartItem({
        ...product,
        quantity: Number(quantity),
        product_id: id
      });
      fetcher();
      if (selectedProducts) {
        setTotalShippingFee(selectedShipmentFee * selectedProducts?.length)
        let temp_price = 0;
        selectedProducts?.map(product => {
          if (id === product?.product_id?._id) {
            product.quantity = Number(quantity);
            temp_price += (product?.special_price * quantity)
          } else {
            temp_price += (product?.special_price * product?.quantity)
          }
        })
        setSelectedProducts(selectedProducts);
        let tempShippingFee = selectedShipmentFee;
        if (selectedProducts?.length > 0) {
          try {
            const shippingFreeResponse = await getAdminFreeShippingList({
              total_amount: temp_price,
              quantity: selectedProducts?.length
            });
            if (shippingFreeResponse?.data) {
              setShippingFreeDiscount(true)
              tempShippingFee = 0;
            }
          } catch (error) {
            setShippingFreeDiscount(false)
          }
        }
        setTotalAmount(temp_price + ((tempShippingFee * selectedProducts?.length) || 0));
      }
    })
  }
  const searchHandle = () => {
    router.push({
      pathname: '/products',
      query: { value: '' }
    })
  };

  if (cart) {
    return (
      <div className='container mx-auto p-2 sm:p-4 mb-8 mt-[84px] sm:mt-0'>
        <div className='border-b mb-4 sm:mt-4 pb-4'>
          <p className='text-center text-xl sm:text-2xl font-bold'>
            <i className="fa-solid fa-cart-shopping px-1"></i>
            MY CART
          </p>
        </div>
        {
          !cart && <div className='bg-white text-center p-16 rounded'>Sorry! Empty Cart</div>
        }
        {cart && <div className='grid grid-cols-10 gap-8'>
          {/* Cart Details */}
          <div className='col-span-10 xl:col-span-6'>
            <div className='p-4 rounded'>
              {
                cart?.items?.map((product, index) => (
                  <div key={index} className='py-4'>
                    <div className='grid grid-cols-10 gap-3'>
                      <div className='flex col-span-10 sm:col-span-4'>
                        <div className="form-check p-2 my-14 mx-1">
                          <input onClick={(e) => selectedHandle(e, product)} className="form-check-input appearance-none h-6 w-6 border border-gray-500 rounded-full bg-white checked:bg-yellow-500 checked:border-blue-600 focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" type="checkbox" value="" id="flexCheckDefault3" />
                        </div>
                        <div className='h-40 w-40 mr-4'>
                          {
                            product?.image ?
                              <Image alt="image"
                                src={product.image}
                                width="84"
                                height="84"
                                layout="responsive"
                                objectFit="contain"
                              /> : null
                          }
                        </div>
                        <div>
                          <h4 className='font-medium text-sm text-gray-800 mt-5'>
                            <Link passHref href={`/product/${product?.product_id?.slug}`}>
                              <b>{product?.product_id?.product_name}</b>
                            </Link></h4>
                          <div className='text-sm mt-2 text-gray-500'>
                            <div>Color: {product?.color_family}</div>
                            <div>Size: {product?.size}</div>
                            <span onClick={() => handleRemoveItem(product)} className='text-red-700 sm:mt-2 hover:cursor-pointer'>Remove</span>
                          </div>
                        </div>
                      </div>
                      <div className='col-span-3 sm:col-span-2 mt-5'>
                        <div className='text-gray-500 text-sm font-medium text-center'>Price</div>
                        <div className='text-center mt-2 font-semibold text-sm'>BDT {parseInt(product?.special_price)?.toLocaleString()}</div>
                      </div>
                      <div className='col-span-4 sm:col-span-3 flex flex-col mt-5'>
                        <div className='text-gray-500 text-sm font-medium sm:mb-2 text-center pr-10'>Quantity</div>
                        <SelectOption onChange={(e) => updateCartItemQuantity(product, e.target.value)} options={quantityOptions} selected={product.quantity} />
                      </div>
                      <div className='col-span-3 sm:col-span-1 flex flex-col items-center mt-5'>
                        <div className='text-gray-500 text-sm font-medium'>Total</div>
                        <div className='text-md font-semibold whitespace-nowrap mt-2 text-gray-600'>BDT {parseInt(parseInt(product?.quantity) * parseInt(product?.special_price))?.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                ))
              }
              <div className='border-t pt-2 flex justify-between font-semibold'>
                <div>{cart?.items?.length} items</div>
                <div className='text-xl'>BDT  {(totalAmount)}</div>
              </div>
              <div className='border-t pt-2 flex justify-between font-semibold'>
                <div onClick={searchHandle}>
                  <b className='cursor-pointer text-xl'> <i className="fa fa-arrow-circle-left"></i> Continue Shopping</b>
                </div>
              </div>
            </div>
          </div>
          {/* Checkout Details */}
          {
            cart?.items?.length > 0 ? <>

              <div className='col-span-10 xl:col-span-4 rounded p-4'>
                <strong>
                  {
                    selectedAddress ? <>
                      <span className='text-yellow-600'><Link href={'/account'}>Change this Address?</Link></span><br></br>
                      <>Name: </>{selectedAddress?.full_name}<br></br>
                      <>Email: </>{email}<br></br>
                      <>Phone: </>{selectedAddress?.phone}<br></br>
                      <>Region: </>{selectedAddress?.region}<br></br>
                      <>City: </>{selectedAddress?.city}<br></br>
                      <>Area: </>{selectedAddress?.area}<br></br>
                      <>Address: </>{selectedAddress?.address}<br></br>
                    </> : <>Please <span className='text-lime-600'><Link href={'/account'}>Add</Link></span> Address<br></br></>
                  }
                </strong>
                <br></br>
                <hr />
                <br></br>
                <div className='flex'>
                  <input className='border p-2 flex-grow' type="text" placeholder='Enter Promo Code' onChange={couponInputHandle} />
                  {
                    appliedVoucher ? null :
                      <button className='bg-[#FFC335] text-black p-2 sm:px-16' onClick={couponHandle}><b>APPLY</b></button>
                  }
                </div>
                <div className='mt-8 text-gray-400'>
                  <div className='flex justify-between mt-4'>
                    <span>Shipping Cost</span>
                    <strong>BDT {totalShippingFee || 0}</strong>
                  </div>
                  {
                    <div className='flex justify-between mt-4'>
                      <span>Shipping Discount</span>
                      <strong>BDT {shippingFreeDiscount ? totalShippingFee : 0}</strong>
                    </div>
                  }
                  <div className='flex justify-between mt-4'>
                    <span>Voucher Discount</span>
                    <strong>BDT {discountAmount || 0}</strong>
                  </div>
                  {
                    merchant ?
                      <div className='flex justify-between mt-4'>
                        <span>Merchant Discount(added in wallet)</span>
                        <strong>BDT {totalAmount && (merchantDiscountAmount) || 0}</strong>
                      </div> : null
                  }
                  {
                    merchant ?
                      <div className='flex justify-between mt-4 text-gray-700 font-semibold'>
                        <span>Sub Total</span>
                        <span>BDT {totalAmount}</span>
                      </div> :
                      <div className='flex justify-between mt-4 text-gray-700 font-semibold'>
                        <span>Sub Total</span>
                        <span>BDT {totalAmount}</span>
                      </div>
                  }

                </div>
                {cart?.items?.length !== 0 && selectedProducts?.length !== 0 &&
                  <center>
                    <button onClick={checkoutHandle} className='bg-[#F74958] p-3 hover:bg-[white] hover:text-[#F74958] hover:border-2 hover:border-red-600 hover:shadow-md text-white font-semibold rounded-md focus:shadow-md transition-all duration-200 mt-8 px-4 py-3 text-center hover:cursor-pointer'>
                      {
                        loader ? <i className="fas fa-spinner fa-pulse"></i> : <><i className="fad fa-shopping-cart"></i> Checkout</>
                      }
                    </button>
                  </center>
                }
              </div>
            </> : null
          }
        </div>}
      </div>
    )
  } else {
    return <div className='border container mx-auto m-4 flex justify-center items-center p-32 bg-white'>Empty Cart</div>
  }
}


