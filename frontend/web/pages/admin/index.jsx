import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { TryCatch } from '../../utils/TryCatchHandle'
import { useUser } from '../../components/auth/context'
import ProductSection from '../../components/home/ProductSection'
import { checkAllCollectedCoupons, CouponAdd, getAdminVouchers } from '../../adapters/coupon'
import { SuccessToast } from '../../utils/Error'
import MobileProductSection from '../../components/home/mobile/MobileProductSection'
import { getAdminProducts } from '../../adapters/product'

export default function AdminShopDetail({ products, vouchers }) {
    const router = useRouter();
    const user = useUser();
    const [collectedVouchers, setCollectedVouchers] = useState([])

    const fetcher = async () => {
        TryCatch(async () => {
            if (user) {
                const response = await checkAllCollectedCoupons();
                setCollectedVouchers(response?.data)
            }
        })
    }

    const couponAddHandle = (voucher) => {
        if (user) {
            TryCatch(async () => {
                await CouponAdd(voucher?._id);
                SuccessToast('Voucher Added Successful')
                refreshData();
                fetcher();
            })
        } else {
            router.push('/auth/sign-in')
        }
    }
    const refreshData = () => {
        router.replace(router.asPath);
    }
    useEffect(() => {
        fetcher()
    }, [])

    return (
        <div className='sm:mt-[48px] md:mt-[10px] mobile-page'>
            {/* Topbar */}
            <div className='pt-4 px-8 mt-6'>
                <div className='container mx-auto'>
                    <div>
                        <ul className='flex px-2 sm:px-0 justify-between sm:justify-start items-center'>
                            <li className='sm:mr-8'>
                                <h4 className='sm:text-xl font-semibold text-gray-500 hover:cursor-pointer'>
                                    EsyClick
                                </h4>
                            </li>
                            <div className='h-16 w-16 border p-1 rounded mr-4 hover:cursor-pointer'>
                                <Image alt="image"
                                    src="/images/logo.png"
                                    width="100%"
                                    height="100%"
                                    layout="responsive"
                                    objectFit="contain"
                                />
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
            <span className='hidden sm:block'>
                <ProductSection products={products} title="" />
            </span>
            <span className='sm:hidden'>
                <MobileProductSection products={products} title="" />
            </span>
            {/* VOuchers */}
            <div className='hidden sm:block'>
                <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-16 mb-8">
                    {
                        vouchers && vouchers?.length > 0 ? <>
                            {
                                vouchers?.map((voucher, index) => {
                                    const match = collectedVouchers?.filter(customerVoucher => String(customerVoucher?._id) === String(voucher?._id))
                                    return (
                                        <>
                                            <div key={index} className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                                                <div>
                                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                        Discount: {
                                                            voucher?.discount_type === 'MONEY_VALUE_VOUCHER' ? <>
                                                                BDT {voucher?.discount_amount}
                                                            </> : <>
                                                                {voucher?.discount_amount_percentage} %
                                                            </>
                                                        }
                                                    </h5>
                                                </div>
                                                <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                                    Time : <b>{voucher?.start_from?.slice(0, 10)} - {voucher?.end_time?.slice(0, 10)}</b>
                                                </div>
                                                <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                                    Min Amount : <b>BDT {voucher?.min_amount_to_apply}</b>
                                                </div>
                                                {
                                                    voucher?.discount_type === 'PERCENTAGE_VALUE_VOUCHER' ?
                                                        <>
                                                            <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                                                MaxAmount : <b>BDT {voucher?.max_discount_amount}</b>
                                                            </div>
                                                        </> : null
                                                }
                                                <div className="flex">
                                                    {
                                                        match?.length ? null : <div onClick={() => couponAddHandle(voucher)} className="p-1 m-1 cursor-pointer inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                            Collect
                                                        </div>
                                                    }
                                                    <div className="p-1 m-1 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                        Code: {voucher?.code}
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </> : null
                    }
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2 px-2 sm:hidden mb-8">
                {
                    vouchers && vouchers?.length > 0 ? <>
                        {
                            vouchers?.map((voucher, index) => {
                                const match = collectedVouchers?.filter(customerVoucher => String(customerVoucher?._id) === String(voucher?._id))
                                return (
                                    <>
                                        <div key={index} className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                                            <div>
                                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                    Discount: {
                                                        voucher?.discount_type === 'MONEY_VALUE_VOUCHER' ? <>
                                                            {voucher?.discount_amount} BDT
                                                        </> : <>
                                                            {voucher?.discount_amount_percentage} %
                                                        </>
                                                    }
                                                </h5>
                                            </div>
                                            <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                                period : <b>{voucher?.start_from?.slice(0, 10)} to {voucher?.end_time?.slice(0, 10)}</b>
                                            </div>
                                            <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                                Minimum Amount : <b>{voucher?.min_amount_to_apply} BDT</b>(apply)
                                            </div>
                                            {
                                                voucher?.discount_type === 'PERCENTAGE_VALUE_VOUCHER' ?
                                                    <>
                                                        <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                                            Maximum Amount : <b>{voucher?.max_discount_amount} BDT</b>(apply)
                                                        </div>
                                                    </> : null
                                            }
                                            <div className="flex">
                                                <div className="p-1 m-1 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                    {voucher?.code}
                                                </div>
                                                {
                                                    match?.length ? <div className="p-1 m-1 cursor-not-allowed inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                        Collected
                                                    </div> : <div onClick={() => couponAddHandle(voucher)} className="p-1 m-1 cursor-pointer inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                        Collect
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </> : null
                }
            </div>
        </div>
    )
}


export async function getServerSideProps() {
    try {
        const response = await getAdminProducts();
        const voucherResponse = await getAdminVouchers();
        return {
            props: {
                products: response?.data,
                vouchers: voucherResponse?.data
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