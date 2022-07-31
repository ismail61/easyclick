import CategorySection from '../components/category/CategorySection'
import { getAllHomePageCategories } from '../adapters/category'

export default function Categories({ categories }) {
    return (
        <div className='sm:mt-[48px] md:mt-[10px] mobile-page'>
            <CategorySection categories={categories} title="Top Categories" />
        </div>
    )
}

export async function getServerSideProps() {
    try {
        const categories = await getAllHomePageCategories();
        return {
            props: {
                categories: categories?.data,
            },
        }
    } catch (error) {
    }
}

