import { Category, Product } from "../../mongodb/admin";
import { globalErrorHandler } from "../../utils";

export const addProduct = async (data, res) => {
    try {
        const newProduct = await new Product(data);
        const savedProduct = await newProduct.save();
        savedProduct?.category?.forEach(async cate => {
            await pushCategoryProduct(cate?._id, newProduct._id);
        })
        return savedProduct;
    } catch (err) {
        console.log(err);
        globalErrorHandler(err, res);
    }
}

const pushCategoryProduct = async (category_id, product_id) => {
    let productsArray = await Category.findOne({ _id: category_id }).lean().select('products -_id') || [];
    const { products } = productsArray;
    products?.push(product_id);
    await Category.findOneAndUpdate({ _id: category_id }, { products }).lean();
}

export const getProducts = async (query) => {
    try {
        return await Product.find(query).lean();
    } catch (err) {
        console.log(err)
    }
}

export const getAdminProducts = async (query) => {
    try {
        return await Product.find(query).lean();
    } catch (err) {
        console.log(err)
    }
}

export const getProduct = async (query) => {
    try {
        return await Product.findOne(query).lean();
    } catch (err) {
        console.log(err);
    }
}

export const updateProduct = async (query, data) => {
    try {
        return await Product.findOneAndUpdate(query, { $set: data }, { new: true }).lean();
    } catch (err) {
        console.log(err);
    }
}

export const updateProductQuantity = async (query, data, res) => {
    try {
        return await Product.findOneAndUpdate(query, { $set: data }, { new: true }).lean()
    } catch (err) {
        console.log(err);
        globalErrorHandler(err, res)
    }
}