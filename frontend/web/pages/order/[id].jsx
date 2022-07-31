import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cancelOrder, getCustomerSingleOrder, returnOrderedProduct } from '../../adapters/order';
import { TryCatch } from '../../utils/TryCatchHandle';
import { useUser } from "../../components/auth/context";
import { cancel_reasons, return_reasons } from '../../constants';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router'
import { AddReview } from '../../adapters/review';
import Link from 'next/link';
import { ProductImageUpload } from '../../adapters/image';
import { ErrorToast } from '../../utils';
const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;

export default function OrderDetails({ id }) {
    const [order, setOrder] = useState(null)
    const [loader, setLoader] = useState(false)
    const user = useUser();
    const router = useRouter();
    const feather = async () => {
        if (user) {
            try {
                const response = await getCustomerSingleOrder(id);
                setOrder(response.data);
            } catch (error) {

            }
        } else {
            router.push('/auth/sign-in')
        }
    }
    const handleCancelOrder = async (order_id, product_id) => {
        if (user) {
            const res = await Swal.fire({
                title: 'Select Cancel Reason',
                input: 'select',
                inputOptions: cancel_reasons,
                confirmButtonText: 'Submit',
                inputPlaceholder: 'Select a reason',
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to select a reason!'
                    }
                }
            })
            if (res?.isConfirmed && res?.value) {
                try {
                    setLoader(true)
                    await cancelOrder(order_id, product_id, { cancellation_reasons: res?.value })
                    await Swal.fire(
                        'Cancelled!',
                        'Your order has been cancelled.',
                        'success'
                    )
                    setLoader(false)
                    feather()
                } catch (error) {
                    ErrorToast(error?.response?.data?.err)
                } finally {
                    setLoader(false)
                }
            }

        }
    }

    const handleReturnOrder = async (order_id, product_id) => {
        if (user) {
            const res = await Swal.fire({
                title: 'Select Return Reason',
                input: 'select',
                inputOptions: return_reasons,
                confirmButtonText: 'Return',
                inputPlaceholder: 'Select a reason',
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to select a reason!'
                    }
                }
            })
            if (res?.isConfirmed && res?.value) {
                try {
                    setLoader(true)
                    await returnOrderedProduct(order_id, product_id, { return_on_reasons: res?.value })
                    await Swal.fire(
                        'Return Request!',
                        'Return Request Send to Admin sSuccessful.',
                        'success'
                    )
                    setLoader(false)
                    feather()
                } catch (error) {
                    ErrorToast(error?.response?.data?.err)
                } finally {
                    setLoader(false)
                }
            }

        }
    }

    const reviewHandle = async (order_id, product_id, vendor_id) => {
        if (user) {
            const { value: formValues } = await Swal.fire({
                title: 'Reviews',
                html:
                    `<input id="steps-range" type="range" min="1" max="5" value="5" step="1" oninput="this.nextElementSibling.value = this.value"> <output>5</output>` +
                    '<textarea id="message" cols="22"  rows="20" class="swal2-input" placeholder="Message"></textarea>',
                focusConfirm: false,
                preConfirm: () => {
                    const rating = Swal.getPopup().querySelector('#steps-range').value
                    const message = Swal.getPopup().querySelector('#message').value
                    if (!rating || !message) {
                        Swal.showValidationMessage(`Review message`)
                    }
                    return { rating, message }
                }
            })

            if (formValues) {
                const result = await Swal.fire({
                    title: 'Images/Photos',
                    input: 'file',
                    inputAttributes: {
                        'accept': 'image/*',
                        'multiple': 'multiple',
                        'aria-label': 'Upload'
                    },
                    preConfirm: (e) => {
                        if (!e) {
                            Swal.showValidationMessage(`Select Images/Photos`)
                        }
                    },
                    confirmButtonText: 'Review',
                    showDenyButton: true,
                    denyButtonText: `Skip This`,
                })
                try {
                    setLoader(true)
                    if (result.isConfirmed) {
                        if (result?.value?.length) {
                            let image = [];
                            for (let i = 0, len = result?.value?.length; i < len; i++) {
                                const formData = new FormData();
                                formData.append("image", result?.value[i]);
                                const imageResponse = await ProductImageUpload(formData);
                                image.push({
                                    url: imageResponse?.data?.url
                                })
                            }
                            await AddReview({
                                ...formValues, rating: Number(formValues?.rating), product_id, order_id,
                                image
                            });

                            await Swal.fire(
                                'Review!',
                                'Review Added Successful.',
                                'success'
                            )
                            feather();
                        }
                    } else if (result.isDenied) {
                        await AddReview({
                            ...formValues, rating: Number(formValues?.rating), product_id, order_id
                        });

                        await Swal.fire(
                            'Review!',
                            'Your review has been added.',
                            'success'
                        )
                        feather()
                    }
                    setLoader(false)
                } catch (error) {
                    ErrorToast(error?.response?.data?.err)
                } finally {
                    setLoader(false)
                }
            }
        }
    }
    useEffect(() => {
        feather();
    }, [])

    return (
        <div className='sm:mt-[48px] md:mt-[10px] mobile-page px-5 sm:px-12'>
            <div className='transition-all duration-150 bg-white p-4 my-4 hover:shadow-md border border-transparent'>
                <div className='flex justify-between border-b pb-1'>
                    <div>
                        <span className='font-bold'>{order?._id}</span>

                    </div>
                    <br />
                    <div>
                        <b className='text-gray-500 px-2'>Order Date : </b>
                        <span className='font-bold'>{new Date(order?.createdAt).toDateString()}</span>
                    </div>
                </div>
                {/* Items Mapping */}
                {order?.products?.map((product, index) => (
                    <>
                        <div key={index} className='py-4'>
                            <div className='grid grid-cols-12'>
                                <div className='flex col-span-full'>
                                    <div className='grid grid-cols-3'>

                                        <div className='mt-1 px-3 sm:px-28'>
                                            <Link passHref href={`/product/${product?.product_id?.slug}`}>
                                                <h4 className='hover:cursor-pointer font-medium text-sm text-gray-600'><b>{product?.name}</b></h4>
                                            </Link>
                                            <div className='flex text-sm mt-2 text-gray-400'>
                                                <div>Color: {product?.color}</div>
                                                <div className='mx-5'>Size: {product?.size}</div>
                                            </div>
                                        </div>

                                        <div className='flex flex-col items-center'>
                                            <div className='text-gray-500 text-sm font-medium sm:mb-2 text-center'>Quantity</div>
                                            <div className='text-center mt-1 font-semibold text-sm'>{parseInt(product?.quantity)?.toLocaleString()}</div>
                                        </div>

                                        <div className='h-40 w-36 mr-4'>
                                            {
                                                product?.image &&
                                                <Image alt="image"
                                                    src={product?.image}
                                                    width="100%"
                                                    height="100%"
                                                    layout="responsive"
                                                    objectFit="contain"
                                                />
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='col-span-2'>
                                    <div className='text-gray-500 text-sm font-medium text-center'>Price</div>
                                    <div className='text-center mt-1 font-semibold text-sm'>BDT {parseInt(product?.price)?.toLocaleString()}</div>
                                </div>
                                <div className='col-span-3 flex flex-col items-center'>
                                    <div className='text-gray-500 text-sm font-medium '>Total</div>
                                    <div className='text-md font-semibold mt-1 text-gray-600'>BDT {parseInt(parseInt(product?.quantity) * parseInt(product?.price))?.toLocaleString()}</div>
                                </div>
                                <div className='col-span-4 flex flex-col items-center'>
                                    <div className='text-gray-500 text-sm font-medium '>Delivery</div>
                                    <div className='text-center text-sm font-semibold'>Estimate Date:  {product?.estimate_delivery_time?.slice(0, 10)}</div>
                                    {
                                        product?.status === 'DELIVERED' ? <>
                                            <div className='text-center mt-1 font-semibold text-sm'>Delivered Date: {product?.delivered_time?.slice(0, 10)}</div>
                                        </> : null
                                    }
                                </div>
                                <div className='col-span-3 flex flex-col items-center'>
                                    {
                                        product?.status === 'PENDING' ?
                                            <div className='bg-[#F74958] hover:bg-[white] hover:text-[#F74958] hover:border-2 hover:border-red-600 hover:shadow-md text-white font-semibold rounded-md focus:shadow-md transition-all duration-200 px-3 py-2 text-center hover:cursor-pointer' onClick={() => handleCancelOrder(order?._id, product?.product_id?._id)}>Cancel</div> :
                                            product?.status === 'DELIVERED' ?
                                                <>
                                                    {
                                                        (new Date() <= new Date(new Date(product?.delivered_time).getTime() + THREE_DAYS)) && !product?.return_request ? <>
                                                            <div onClick={() => handleReturnOrder(order?._id, product?.product_id?._id, product?.vendor_id)}
                                                                className='bg-[#F74958] hover:bg-[white] hover:text-[#F74958] hover:border-2 hover:border-red-600 hover:shadow-md text-white font-semibold rounded-md focus:shadow-md transition-all duration-200 px-3 py-2 text-center hover:cursor-pointer' type="button" data-modal-toggle="authentication-modal" >Return</div>
                                                        </> : null
                                                    }
                                                    {
                                                        product?.reviewed ?
                                                            <span className='text-green-600 mt-1' >Already Reviewed</span> :
                                                            <div onClick={() => reviewHandle(order?._id, product?.product_id?._id, product?.vendor_id)}
                                                                className='bg-[#F74958] hover:bg-[white] mt-1 hover:text-[#F74958] hover:border-2 hover:border-red-600 hover:shadow-md text-white font-semibold rounded-md focus:shadow-md transition-all duration-200 px-3 py-2 text-center hover:cursor-pointer' type="button" data-modal-toggle="authentication-modal" >Review</div>
                                                    }
                                                </>
                                                : product?.status === 'CANCELLED' ?
                                                    <div className='hover:cursor-pointer text-red-600' title={product?.cancellation_reasons}>Cancelled</div>
                                                    : product?.status === 'DELIVERY_FAILED' ?
                                                        <div className='hover:cursor-pointer text-red-600'>Delivery Failed</div>
                                                        : product?.status === 'RETURNED' ?
                                                            <div className='hover:cursor-pointer text-green-600' title={product?.return_on_reasons}>Returned</div>
                                                            : <></>
                                    }
                                </div>
                            </div>
                            <br />
                        </div>
                        {
                            loader ? <center><i className="fas fa-2xl fa-spinner fa-pulse"></i></center> : <div className="progressbar-track px-2">
                                <ul className="progressbar">
                                    <li id="step-1" className="text-muted green" style={
                                        product?.status === 'PENDING' ? { backgroundColor: '#1CAEF0' } :
                                            product?.status === 'CANCELLED' ? { backgroundColor: '#C74052' } : null
                                    }>
                                        <span className="fas fa-gift"></span>
                                    </li>
                                    <li id="step-3" className="text-muted green" style={
                                        product?.status === 'READY_TO_SHIP' ? { backgroundColor: '#1CAEF0' } :
                                            product?.status === 'CANCELLED' ? { backgroundColor: '#C74052' } : null
                                    }>
                                        <span className="fas fa-box"></span>
                                    </li>
                                    <li id="step-4" className="text-muted green" style={
                                        product?.status === 'SHIPPED' ? { backgroundColor: '#1CAEF0' } :
                                            product?.status === 'CANCELLED' ? { backgroundColor: '#C74052' } : null
                                    }>
                                        <span className="fas fa-truck"></span>
                                    </li>
                                    <li id="step-5" className="text-muted green" style={
                                        product?.status === 'DELIVERED' ? { backgroundColor: '#1CAEF0' } :
                                            product?.status === 'CANCELLED' ? { backgroundColor: '#C74052' } : null
                                    }>
                                        <span className="fas fa-box-open"></span>
                                    </li>
                                </ul>
                                <div id="tracker"></div>
                            </div>
                        }
                    </>

                ))
                }
                <div className='flex justify-between border-t mt-1'>
                    <span></span>
                    <span className='float-right mt-1'>
                        <div className='mt-1'>
                            <b className='text-gray-600 mr-1'>Shipping Fee :</b>
                            <span className='font-bold'>BDT {parseInt(order?.total_shipment_fee).toLocaleString()}</span>
                        </div>
                        <div className='mt-1'>
                            <b className='text-gray-600 mr-1'>Voucher Discount:</b>
                            <span className='font-bold'>BDT {parseInt(order?.discount_amount).toLocaleString()}</span>
                        </div>
                        <div className='mt-1'>
                            <b className='text-gray-600 mr-1'>Grand Price:</b>
                            <span className='font-bold'>BDT {parseInt(order?.grand_total).toLocaleString()}</span>
                        </div>
                    </span>
                </div>
            </div>

        </div >
    )
}


export async function getServerSideProps(context) {
    return {
        props: {
            id: context.query?.id
        }
    }

}



