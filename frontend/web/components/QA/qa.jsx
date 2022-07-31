import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
function Items({ currentItems }) {
    return (
        <>
            {currentItems?.length &&
                currentItems.map((item) => (
                    <>
                        <div className="w-full">
                            <div className="rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                                <div className="mb-2">
                                    <div className="text-gray-900 text-xl mb-2">
                                        <i className="fa fa-question-circle"></i> {item?.text}
                                    </div>
                                    {
                                        item?.reply ?
                                            <p className="text-gray-700">
                                                <i className="fa-duotone fa-reply"></i>
                                                <span className='text-xl px-2'>
                                                    {item?.reply}
                                                </span>
                                            </p> : null
                                    }
                                </div>
                            </div>
                        </div>
                        <hr />
                    </>
                ))}
        </>
    );
}

const QuestionsAnswers = ({ qas, itemsPerPage, addQuestionHandle }) => {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(qas?.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(qas?.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, qas]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % qas?.length;
        setItemOffset(newOffset);
    };
    return (
        <>
            <div className='container mx-auto my-2 rounded-lg shadow-md mb-8'>
                <div className=' px-3 text-xl border-b py-4'>
                    Customer Questions & Answers (<b>{qas?.length}</b>)
                </div>
                <div className='p-4'>
                    <button onClick={addQuestionHandle} className='sm:w-auto col-span-1 mb-2 text-black hover:shadow-md sm:px-8 bg-[yellow] mr-4 sm:p-2 font-semibold rounded-full'>
                        Ask Question
                    </button>
                    {
                        qas?.length ? <>
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

export default QuestionsAnswers