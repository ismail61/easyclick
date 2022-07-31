import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getCampaignProducts } from '../../adapters/campaign';

export default function CampaignProducts({ campaign }) {
    const router = useRouter()
    const buyNowHandle = (product, vendor, price) => {
        const item = {
            product_id: product?._id,
            slug: product?.slug,
            name: product?.product_name,
            vendor_id: {
                _id: vendor?._id
            },
            color_family: product?.color,
            size: product?.size,
            price: Number(product?.price),
            image: product?.images,
            special_price: product?.special_price || null,
            quantity: 1,
            discount_price: price || null,
        }
        router.push({
            pathname: '/checkout',
            query: { item: JSON.stringify(item) }
        }, '/checkout')
    }
    return (
        <div className='sm:mt-[50px] md:mt-[1px] mobile-page'>
            {

                campaign?.vendors?.length > 0 ? campaign?.vendors?.map((vendor, index) => {
                    return (
                        <div key={index} className='m-4'>
                            {
                                vendor?.products?.length > 0 ? <>
                                    <div className='hidden sm:block'>
                                        <div className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-x-4 gap-y-6'>
                                            {
                                                vendor?.products?.map(product => {
                                                    return (
                                                        <>
                                                            <span>
                                                                <div className='transition-all duration-150 cursor-pointer rounded-md overflow-hidden shadow-md hover:shadow-lg'>
                                                                    <div className='bg-white'>
                                                                        <div>
                                                                            {
                                                                                product?.image ? <>
                                                                                    <Image alt="image"
                                                                                        src={product?.image}
                                                                                        width="100%"
                                                                                        height="100%"
                                                                                        layout="responsive"
                                                                                        objectFit="contain"
                                                                                    />
                                                                                </> : null
                                                                            }
                                                                        </div>
                                                                        <div className='p-2'>
                                                                            <h4 className='text-sm h-6 whitespace-nowrap overflow-hidden text-ellipsis'>{product?.product_name}</h4>
                                                                            <div>
                                                                                <span className='ml-2'>
                                                                                    ৳  <u>{parseInt(product?.price).toLocaleString()}</u>
                                                                                </span>
                                                                                <span className='ml-2 px-5'>
                                                                                    ৳ {parseInt(Number(product?.price) - ((Number(product?.price) * Number(campaign?.discount)) / 100)).toLocaleString()}
                                                                                </span>
                                                                            </div>
                                                                            <center>
                                                                                <button onClick={() => buyNowHandle(product, vendor, Number(product?.price) - ((Number(product?.price) * Number(campaign?.discount)) / 100))}
                                                                                    className='w-full sm:w-auto col-span-1 hover:shadow-md text-white sm:px-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 sm:p-2 font-semibold rounded-md md:my-2 sm:my-2'>
                                                                                    Buy Now
                                                                                </button>
                                                                            </center>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </span>
                                                        </>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className='sm:hidden'>
                                        <div className='grid grid-cols-2 gap-2 px-2'>
                                            {
                                                vendor?.products?.map(product => {
                                                    return (
                                                        <>
                                                            <span>
                                                                <div className='transition-all duration-150 cursor-pointer rounded-md overflow-hidden shadow-md hover:shadow-lg'>
                                                                    <div className='bg-white'>
                                                                        <div>
                                                                            {
                                                                                product?.image ? <>
                                                                                    <Image alt="image"
                                                                                        src={product?.image}
                                                                                        width="100%"
                                                                                        height="100%"
                                                                                        layout="responsive"
                                                                                        objectFit="contain"
                                                                                    />
                                                                                </> : null
                                                                            }
                                                                        </div>
                                                                        <div className='p-2'>
                                                                            <h4 className='text-sm h-6 whitespace-nowrap overflow-hidden text-ellipsis'>{product?.product_name}</h4>
                                                                            <div>
                                                                                <span className='ml-2'>
                                                                                    ৳  <u>{parseInt(product?.price).toLocaleString()}</u>
                                                                                </span>
                                                                                <span className='ml-2 px-5'>
                                                                                    ৳ {parseInt(Number(product?.price) - ((Number(product?.price) * Number(campaign?.discount)) / 100)).toLocaleString()}
                                                                                </span>
                                                                            </div>
                                                                            <center><button onClick={() => buyNowHandle(product, vendor, Number(product?.price) - ((Number(product?.price) * Number(campaign?.discount)) / 100))}
                                                                                className=' p-1 my-1 sm:w-auto col-span-1 hover:shadow-md text-white sm:px-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 sm:p-2 font-semibold rounded-md md:my-2 sm:my-2'>
                                                                                Buy Now
                                                                            </button></center>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </span>
                                                        </>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </> : <>
                                    <center className="p-16">
                                        Sorry ... No Products Found!
                                    </center>
                                </>
                            }
                        </div>
                    )
                }) : <center className="p-16">
                    Sorry ... No Products Found!
                </center>
            }
        </div>
    )
}

export async function getServerSideProps(context) {
    try {
        const response = await getCampaignProducts(context.query?.id);
        return {
            props: {
                campaign: response.data
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

