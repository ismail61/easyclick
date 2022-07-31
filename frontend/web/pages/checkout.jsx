import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SelectOption from '../components/common/SelectOption'
import { useRouter, withRouter } from 'next/router'
import { deleteCartItem, getCustomerCart, updateCartItem } from '../adapters/cart'
import { useUser } from "../components/auth/context";
import { ErrorToast, SuccessToast } from '../utils/Error'
import { getUserData } from '../adapters/user'
import { applyVoucher, getShippingFee } from '../adapters/promotion'
import { TryCatch } from '../utils/TryCatchHandle'
import Swal from 'sweetalert2'
import { payment_method } from '../constants'
import { createOrder } from '../adapters/order'

const Checkout = () => {
    const router = useRouter();
    const user = useUser();

    const [totalAmount, setTotalAmount] = useState(0)
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [appliedVoucher, setAppliedVoucher] = useState(null)
    const [selectedShipmentFee, setSelectedShippingFee] = useState(100)
    const [discountAmount, setDiscountAmount] = useState(0)
    const [totalShippingFee, setTotalShippingFee] = useState(100)
    const [userData, setUserData] = useState(null)
    const [coupon, setCoupon] = useState('')
    const [selectedProducts, setSelectedProducts] = useState([])
    const [cart, setCart] = useState(null)

    useEffect(() => {
        fetcher()
    }, [])

    const fetcher = async () => {
        if (!user) {
            router.push('/auth/sign-in')
        } else if (!router?.query?.item) {
            router.push('/')
        } else {
            try {
                setCart([JSON.parse(router?.query?.item)]);
                const userResponse = await getUserData();
                const temCity = null;
                await userResponse?.data?.address?.map(address => {
                    if (address?.default_shipping_address) {
                        temCity = address?.city
                        setSelectedAddress(address);
                    }
                })
                setUserData(userResponse?.data);
                const { discount_price, special_price, price, quantity } = JSON.parse(router?.query?.item);
                let tmp = 0;
                setTotalAmount(((parseInt(discount_price) || parseInt(special_price) || parseInt(price)) * parseInt(quantity)) + (Number(tmp) || 100))
                const shippingFeeResponse = await getShippingFee(temCity);
                tmp = shippingFeeResponse?.data?.fee;
                setSelectedShippingFee(tmp);
                setTotalShippingFee(tmp * 1)
                setTotalAmount((parseInt(discount_price) || (parseInt(special_price) || parseInt(price)) * parseInt(quantity)) + (Number(tmp) || 100))
            } catch (error) {
            }
        }
    }


    const couponInputHandle = (e) => {
        setCoupon(e.target.value);
    }

    const couponHandle = (e) => {
        if (!coupon) {
            ErrorToast('Please Enter the Coupon Code');
        } else if (!cart?.length) {
            ErrorToast('You must have a product');
        } else {
            TryCatch(async () => {
                const res = await applyVoucher({
                    code: coupon,
                    products: cart,
                    total_price: totalAmount
                });
                const { discount_amount_percentage, discount_amount, max_discount_amount } = res?.data;
                setAppliedVoucher(res?.data)
                if (discount_amount_percentage) {
                    const discount = ((Number(totalAmount - Number(totalShippingFee)) * Number(discount_amount_percentage)) / 100)
                    if (Number(discount) > Number(max_discount_amount)) {
                        setDiscountAmount(max_discount_amount)
                        setTotalAmount(totalAmount - Number(max_discount_amount));
                    } else {
                        setDiscountAmount(discount)
                        setTotalAmount(totalAmount - Number(discount));
                    }
                } else {
                    setDiscountAmount(discount_amount)
                    setTotalAmount(totalAmount - Number(discount_amount));
                }
                SuccessToast('Coupon Applied! Happy Shopping')
            })
        }
    }

    const checkoutHandle = async () => {
        const res = await Swal.fire({
            title: 'Payment Method',
            input: 'select',
            inputOptions: payment_method,
            inputPlaceholder: 'Select Payment Method',
            confirmButtonText: 'Submit',
            allowOutsideClick: false,
            allowEscapeKey: false,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to select a option!'
                }
            }
        })
        if (res?.isConfirmed && res?.value) {
            const body = {
                products: cart?.map(product => {
                    return {
                        ...product,
                        product_id: product?.product_id,
                        vendor_id: product?.vendor_id?._id,
                        price: product?.discount_price || product?.special_price || product?.price,
                        name: product?.name,
                        image: product?.image,
                        color: product?.color_family,
                        shipment_fee: selectedShipmentFee || 0
                    }
                }),
                payment_information: {
                    method: res?.value,
                    status: res?.value !== 'COD' ? 'PAID' : 'UNPAID'
                },
                shipping_address: selectedAddress?._id,
                billing_address: selectedAddress?._id,
                total_amount: totalAmount,
                code: appliedVoucher?.code,
                discount_amount: discountAmount,
                total_shipping_fee: totalShippingFee,
            }
            TryCatch(async () => {
                Swal.fire({
                    title: '<span style="color: white">Loading for Order...</span>',
                    html: 'Please wait...',
                    background: '#19191a',
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    timer: 2000,
                    didOpen: () => {
                        Swal.showLoading()
                    }
                });
                await createOrder(body);
                await Swal.fire(
                    'Order Confirmed!',
                    'Your order has been completed.',
                    'success'
                )
                location.href = '/orders'
            })
        }
    }


    if (cart) {
        return (
            <div className='container mx-auto p-2 sm:p-4 mb-8 mt-[52px] sm:mt-0'>

                {
                    !cart && <div className='bg-white text-center p-16 rounded'>Empty</div>
                }
                {cart && <div className='grid grid-cols-10 gap-8'>
                    {/* Cart Details */}
                    <div className='col-span-10 xl:col-span-6'>
                        <div className='bg-white p-4 rounded'>
                            {
                                cart?.map((product, index) => (
                                    <div key={index} className='py-4'>
                                        <div className='grid grid-cols-10 gap-3'>
                                            <div className='flex col-span-10 sm:col-span-4'>

                                                <div className='h-40 w-40 mr-4'>
                                                    {
                                                        product?.image ?
                                                            <Image alt="image"
                                                                src={product?.image}
                                                                width="84"
                                                                height="84"
                                                                layout="responsive"
                                                                objectFit="contain"
                                                            /> : null
                                                    }
                                                </div>
                                                <div>
                                                    <h4 className='font-medium text-sm text-gray-600 mt-5'><Link href={`/product/${product?.slug}`}>{product?.name}</Link></h4>
                                                    <div className='flex sm:flex-col text-sm mt-2 text-gray-400'>
                                                        <div>Color: {product?.color_family}</div>
                                                        <div className='mx-8 sm:mx-0'>Size: {product?.size}</div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-span-3 sm:col-span-2 mt-5'>
                                                <div className='text-gray-500 text-sm font-medium text-center'>Each</div>
                                                <div className='text-center mt-2 font-semibold text-sm'>৳ {parseInt(product?.discount_price || product?.special_price)?.toLocaleString()}</div>
                                            </div>
                                            <div className='col-span-4 sm:col-span-3 flex flex-col mt-2'>
                                                <div className='text-gray-500 text-sm font-medium sm:mb-2 text-center sm:text-left px-6 mt-2'>Quantity</div>
                                                <span className='px-12'>{product.quantity}</span>
                                            </div>
                                            <div className='col-span-3 sm:col-span-1 flex flex-col items-center mt-5'>
                                                <div className='text-gray-500 text-sm font-medium '>Total</div>
                                                <div className='text-md font-semibold mt-2 text-gray-600'>৳ {parseInt(parseInt(product?.quantity) * parseInt(product?.discount_price || product?.special_price || product?.price))?.toLocaleString()}</div>

                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            <div className='border-t pt-2 flex justify-between font-semibold'>
                                <div>{cart?.items?.length} items</div>
                                <div className='text-xl'>৳  {parseInt(totalAmount)?.toLocaleString()}</div>
                            </div>
                        </div>
                    </div>
                    {/* Checkout Details */}
                    {
                        cart?.length > 0 ? <>

                            <div className='col-span-10 xl:col-span-4  bg-white rounded p-4'>
                                <p className='text-gray-500 mb-1'>Default Address</p>
                                <strong>
                                    {
                                        selectedAddress ? <>
                                            <span className='text-lime-600'><Link href={'/account'}>Change</Link></span><br></br>
                                            <>Name: </>{selectedAddress?.full_name}<br></br>
                                            <>Email: </>{selectedAddress?.email}<br></br>
                                            <>Phone: </>{selectedAddress?.phone}<br></br>
                                            <>Address: </>{selectedAddress?.address}<br></br>
                                            <>Area: </>{selectedAddress?.area}<br></br>
                                            <>City: </>{selectedAddress?.city}<br></br>
                                            <>Region: </>{selectedAddress?.region}<br></br>
                                        </> : <>please <span className='text-lime-600'><Link href={'/account'}>add</Link></span> default address first <br></br></>
                                    }

                                </strong>
                                <br></br>
                                <hr />
                                <br></br>
                                <p className='text-gray-500 mb-1'>ENTER PROMO CODE</p>
                                <div className='flex'>
                                    <input className='border p-2 flex-grow' type="text" onChange={couponInputHandle} />
                                    {
                                        appliedVoucher ? null :
                                            <button className='bg-[#D23E41] text-white p-2 sm:px-16' onClick={couponHandle}>SUBMIT</button>
                                    }
                                </div>
                                <div className='mt-8 text-gray-400'>
                                    <div className='flex justify-between mt-4'>
                                        <span>Shipping cost</span>
                                        <strong>৳ {totalShippingFee || 100}</strong>
                                    </div>
                                    <div className='flex justify-between mt-4'>
                                        <span>Discount</span>
                                        <strong>৳ {discountAmount || 0}</strong>
                                    </div>
                                    <div className='flex justify-between mt-4 text-gray-700 font-semibold'>
                                        <span>Estimated Total</span>
                                        <span>৳ {totalAmount?.toLocaleString()}</span>
                                    </div>
                                </div>
                                {cart?.length !== 0 ?
                                    <center>
                                        <button onClick={checkoutHandle} className='bg-[#D23E41] mt-8 px-4 text-white py-3 hover:shadow-lg text-center hover:cursor-pointer transition-all duration-150 rounded'>
                                            <i className="fa-solid fa-lock"></i> CheckOut
                                        </button>
                                    </center> : null
                                }
                            </div>
                        </> : null
                    }
                </div>}
            </div>
        )
    } else {
        return <div className='border container mx-auto m-4 flex justify-center items-center p-32 bg-white'>Empty Product</div>
    }
}


export default withRouter(Checkout)