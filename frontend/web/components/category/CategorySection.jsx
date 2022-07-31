import Link from 'next/link'
import React from 'react'

export default function CategorySection({ title = "", categories = [] }) {
    return (
        <div className='container mx-auto mb-8 mt-2 px-4'>
            <div className='text-left p-4 border-b-2 mb-4'>
                <h1 className='text-2xl select-all'>{title}</h1>
            </div>
            <div className='hidden sm:block'>
                <div className='grid sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-6'>
                    {
                        categories?.length > 0 ? categories?.map((category, index) => {
                            return (
                                <span key={index} className='cursor-pointer'>
                                    <Link passHref href={`/category/${category?.slug}`}>
                                        <div className="rounded-lg shadow-md hover:shadow-lg bg-white">
                                            <div>
                                                <img className="p-8 rounded-t-lg" src={category?.image?.url} alt="category image" />
                                            </div>
                                            <div className="px-5 pb-5">
                                                <div>
                                                    <h5 className="font-semibold tracking-tight text-gray-900 dark:text-white">{(category?.name)}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </span>
                            )
                        }) : null
                    }
                </div>
            </div>

            <div className='grid grid-cols-2 gap-2 px-2 sm:hidden'>
                {
                    categories?.length > 0 ? categories?.map((category, index) => {
                        return (
                            <span key={index} className='cursor-pointer'>
                                <Link passHref href={`/category/${category?.slug}`}>
                                    <div className=" bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700  hover:bg-gray-200">
                                        <div>
                                            <img className="p-8 rounded-t-lg" src={category?.image?.url} alt="category image" />
                                        </div>
                                        <div className="px-5 pb-5">
                                            <div>
                                                <h5 className="font-semibold tracking-tight text-gray-900 dark:text-white">{(category?.name)}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </span>
                        )
                    }) : null
                }
            </div>
        </div>
    )
}
