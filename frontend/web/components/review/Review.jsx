import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Rating from 'react-rating'
import ReactPaginate from 'react-paginate';
import { imageHover } from '../image/HoverImage';
function Items({ currentItems }) {
    return (
        <>
            {currentItems?.length ?
                currentItems?.map((item) => (
                    <>
                        <div className="w-full">
                            <div className="border-r border-b border-l border-t border-gray-400 lg:border-gray-400 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                                <div className="mb-8">
                                    <div className="text-sm text-gray-600 flex items-center">
                                        {item?.user_id?.name}
                                    </div>
                                    <div className="text-gray-900 font-bold text-xl mb-2">{
                                        item?.message
                                    }</div>
                                    <Rating
                                        emptySymbol="fa-duotone fa-star"
                                        fullSymbol="fa-solid fa-star text-[#FFD700]"
                                        initialRating={item?.rating}
                                        readonly
                                    />&nbsp; {item?.rating}
                                    <div className="flex my-2">
                                        {
                                            item?.image?.length > 0 ? <>
                                                {
                                                    item?.image?.map(singleImage => {
                                                        return (
                                                            <>
                                                                <div className='h-16 w-16 border p-1 rounded mr-4 hover:cursor-pointer'>
                                                                    {
                                                                        singleImage?.url && <Image alt="image"
                                                                            src={singleImage?.url}
                                                                            width="100%"
                                                                            height="100%"
                                                                            layout="responsive"
                                                                            objectFit="contain"
                                                                            onClick={() => imageHover(singleImage?.url, '')}
                                                                        />
                                                                    }

                                                                </div>
                                                            </>
                                                        )
                                                    })
                                                }

                                            </> : null
                                        }
                                    </div>
                                    <div className="text-gray-700 text-base">{item?.reply}</div>
                                </div>
                            </div>
                        </div>
                    </>
                )) : null
            }
        </>
    );
}

const Review = ({ reviews, rating, itemsPerPage }) => {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(reviews?.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(reviews?.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, reviews]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % reviews?.length;
        setItemOffset(newOffset);
    };
    return (
        <>
            <div className='container mx-auto my-8 rounded-lg shadow-md'>
                <div className='px-3 text-xl border-b py-4'>
                    Customer Reviews & Rating (<b>{reviews?.length}</b>)
                </div>
                <div className='p-4'>
                    <span style={{ fontSize: '20px' }}>
                        <Rating
                            emptySymbol="fa-duotone fa-star"
                            fullSymbol="fa-solid fa-star text-[#FFD700]"
                            initialRating={rating || 0}
                            readonly
                        />
                        &nbsp;&nbsp;&nbsp;{rating || 0} / 5<br></br>{rating || 0} average based on {reviews?.length} reviews.
                    </span>
                    <hr className='my-2' />
                    {
                        reviews?.length ? <>
                            <Items currentItems={currentItems} />
                            <ReactPaginate
                                onPageChange={handlePageClick}
                                pageCount={pageCount}
                                subContainerClassName={'pages pagination'}
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </> : null
                    }
                </div>
            </div>
        </>
    )
}

export default Review