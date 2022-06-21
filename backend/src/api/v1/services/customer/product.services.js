import { Product } from "../../mongodb/admin";


export const getActivatedAndApprovedProducts = async (query) => {
    try {
        const products = await Product.find(query).lean().select('brand slug product_name orders variant_stock_price rating');
        const filterProduct = products?.map(product => {
            return {
                ...product,
                orders: product?.orders?.length
            }
        });
        return filterProduct;
    } catch (err) {
        console.log(err);
    }
}


export const getSingleProduct = async (query) => {
    try {
        const product = await Product.findOne(query).lean().populate([
            {
                path: 'category._id',
                model: 'Category',
                select: 'slug -_id'
            },
            {
                path: 'reviews',
                model: 'Review',
                select: 'message rating image user_id reply',
                populate: {
                    path: 'user_id',
                    model: 'Customer',
                    select: 'name'
                }
            },
        ]).select('-is_deleted -is_active -status -__v');
        return {
            ...product,
            orders: product?.orders?.length
        }
    } catch (err) {
        console.log(err);
    }
}

export const AddQuestion = async (query, data) => {
    try {
        return await Product.findOneAndUpdate(query, {
            $push: {
                questions_and_answers: data,
            },
        }, { $new: true }).lean().exec();
    } catch (err) {
        console.log(err);
    }
}