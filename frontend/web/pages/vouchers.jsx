import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { checkAllCollectedCoupons, CouponRemove } from "../adapters/coupon";
import { useUser } from "../components/auth/context";
import { SuccessToast } from "../utils/Error";
import { TryCatch } from "../utils/TryCatchHandle";

export default function Coupons() {
    const router = useRouter();
    const user = useUser();
    const [vouchers, setVouchers] = useState(null)
    const fetcher = async () => {
        if (user) {
            try {
                const response = await checkAllCollectedCoupons();
                setVouchers(response?.data)
            } catch (error) {

            }
        } else {
            router.push('/auth/sign-in')
        }
    }
    const couponRemoveHandle = (voucher) => {
        if (user) {
            TryCatch(async () => {
                await CouponRemove(voucher?._id);
                SuccessToast('Coupon Removed Successful')
                fetcher();
            })
        } else {
            router.push('/auth/sign-in')
        }
    }

    useEffect(() => {
        fetcher()
    }, [])
    return (

        <div className='sm:mt-[48px] md:mt-[10px] mobile-page'>
            {
                vouchers?.length ?
                    <div className="mt-8 mb-8 grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-10">
                        {
                            vouchers?.length && vouchers?.map(voucher => {
                                return (
                                    <>
                                        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
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
                                                Time: <b>{voucher?.start_from?.slice(0, 10)} - {voucher?.end_time?.slice(0, 10)}</b>
                                            </div>
                                            <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                                Min Amount(apply): <b>BDT {voucher?.min_amount_to_apply}</b>
                                            </div>
                                            {
                                                voucher?.discount_type === 'PERCENTAGE_VALUE_VOUCHER' ?
                                                    <>
                                                        <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                                            Max Amount(apply): <b>BDT {voucher?.max_discount_amount} </b>
                                                        </div>
                                                    </> : null
                                            }
                                            <div className="flex">
                                                <div className="p-1 m-1 flex-1 items-center py-2 px-2 text-sm font-medium text-center text-black bg-yellow-500">
                                                    Code: {voucher?.code}
                                                </div>
                                                <div onClick={() => couponRemoveHandle(voucher)} className="p-1 m-1 cursor-pointer flex-1 items-center py-2 px-3 text-sm font-medium text-center text-black bg-yellow-600">
                                                    Remove
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div> : <center className="my-36 text-red-600">Empty Vouchers <i className="fa-solid fa-empty-set"></i></center>
            }
        </div>
    )
}




