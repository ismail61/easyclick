import ProductSection from '../components/home/ProductSection'
import { AllProducts } from '../adapters/product'
import MobileProductSection from '../components/home/mobile/MobileProductSection'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FilterProducts } from '../utils/searchValue'

export default function Products({ products }) {
    const router = useRouter()
    const [searchValue, setSearchValue] = useState('')
    const fetcher = () => {
        setSearchValue(router?.query?.value)
    }
    useEffect(() => {
        fetcher()
    }, [router?.query?.value])

    let filterProducts = FilterProducts(products, searchValue);

    return (
        <div className='sm:mt-[48px] md:mt-[10px] mobile-page'>
            {
                filterProducts?.length > 0 ? <>
                    <div className='hidden sm:block'>
                        <ProductSection products={filterProducts} title="" />
                    </div>

                    {/* only visible on mobile device */}
                    <div className='sm:hidden'>
                        <div className='mb-8'>
                            <MobileProductSection products={filterProducts} title="" />
                        </div>
                    </div>
                </> :
                    <center className="p-16">
                        <b>
                            Sorry! &#129300; <br /> We could not find any products.
                        </b>
                    </center>
            }
        </div>
    )
}

export async function getServerSideProps() {
    try {
        const response = await AllProducts()
        return {
            props: {
                products: response?.data,
            },
        }
    } catch (error) {
    }
}

