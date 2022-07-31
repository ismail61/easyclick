import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useUser } from "../components/auth/context";
import Swal from 'sweetalert2';
import { getCustomerWallet, requestCustomerWallet } from '../adapters/wallet';
import Link from 'next/link';
import { getUserData } from '../adapters/user';

export default function Wallet() {
    const router = useRouter()
    const user = useUser();
    const [wallet, setWallet] = useState(null)
    const [merchant, setMerchant] = useState(null)
    const [loading, setLoading] = useState(false)

    const withdrawMoneyHandle = async () => {
        const res = await Swal.fire({
            title: 'Enter Withdraw Amount',
            input: 'number',
            confirmButtonText: 'Withdraw',
            inputPlaceholder: `BDT 100`,
            inputValidator: (value) => {
                if (!value) {
                    return 'Enter the amount'
                }
            }
        })
        if (res?.isConfirmed && res?.value) {
            try {
                setLoading(true)
                await requestCustomerWallet(wallet?._id, { amount: res?.value })
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Withdraw Request Successful',
                    showConfirmButton: false,
                    timer: 2000
                })
            } catch (error) {
            } finally {
                setLoading(false)
            }
        }
    }

    const fetcher = async () => {
        try {
            if (user) {
                const userResponse1 = await getUserData();
                setMerchant(userResponse1?.data)
                if (userResponse1?.data && !userResponse1?.data?.merchant) {
                    router.push('/account')
                }

                const userResponse = await getCustomerWallet();
                userResponse?.data?.transactions?.sort(function (a, b) {
                    var dateA = new Date(a.updatedAt).getTime();
                    var dateB = new Date(b.updatedAt).getTime();
                    return dateA > dateB ? 1 : -1;
                })
                setWallet(userResponse?.data);
            } else {
                router.push('/auth/sign-in')
            }
        } catch (error) {
        }
    }

    useEffect(() => {
        fetcher()
    }, [])

    return (
        merchant?.merchant ? <>
            <div className='container mx-auto p-2 sm:p-4 mb-8 mt-[84px] sm:mt-0'>
                {
                    wallet?.total_amount > 0 ?
                        <button onClick={withdrawMoneyHandle} className="float-right mb-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded">
                            {
                                loading ? <i className="fas fa-spinner fa-pulse"></i> : <><i className="fas fa-money-bill-alt"></i> Withdraw Request</>
                            }
                        </button> : null
                }
                <div className='px-8'>
                    {/* Wallet Details */}
                    <div className='col-span-10 xl:col-span-6'>
                        <div className='p-4 rounded'>
                            <center>
                                <div className="mobile">
                                    <div className="header">
                                    </div>
                                    <div className="content">
                                        <div className="total">
                                            <div className="label">Total balance</div>
                                            <div className="value">BDT {wallet?.total_amount || 0}</div>
                                        </div>
                                        <div className="list">
                                            {
                                                wallet?.transactions?.length > 0 ? <>
                                                    {
                                                        wallet?.transactions?.map((transaction, index) => {
                                                            return (
                                                                <>
                                                                    {
                                                                        transaction?.status !== 'REQUESTED' ? <>
                                                                            <div className="item">
                                                                                <div className="section1">
                                                                                    <div className={`icon ${transaction?.status === 'INCOMING' ? 'up' : 'down'}`}>
                                                                                        <i className="fas fa-arrow-up"></i>
                                                                                    </div>
                                                                                    <div className="text">
                                                                                        <div className="title">
                                                                                            <Link passHref href={`/order/${transaction?.order_id}`}>
                                                                                                <h4 className='hover:cursor-pointer font-medium text-sm'><b>{transaction?.order_id}</b></h4>
                                                                                            </Link>
                                                                                        </div>
                                                                                        <div className="description mt-1">{transaction?.updatedAt?.slice(0, 10)}</div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="section2">
                                                                                    <div className={`signal ${transaction?.status === 'INCOMING' ? 'positive' : 'negative'}`}>-</div>
                                                                                    <div className="value">BDT {transaction.amount}</div>
                                                                                </div>
                                                                            </div></> : null
                                                                    }
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </> : null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        </> : null
    )
}