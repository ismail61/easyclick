import { getCategoryProducts } from '../../adapters/product';
import MobileProductSection from '../../components/home/mobile/MobileProductSection';
import ProductSection from '../../components/home/ProductSection';

export default function CategoryProducts({ products }) {
    return (
        <div className='sm:mt-[48px] md:mt-[10px] mobile-page '>
            {
                products?.length > 0 ? <>
                    <div className='hidden sm:block'>
                        <ProductSection products={products} title="All Products is Here" />
                    </div>
                    <div className='sm:hidden'>
                        <MobileProductSection products={products} title="All Products is Here" />
                    </div>

                </> : <center className="p-36 text-red-600">No Products Found</center>
            }
        </div>
    )
}

export async function getServerSideProps(context) {
    try {
        const response = await getCategoryProducts(context.query?.slug);
        return {
            props: {
                products: response.data
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