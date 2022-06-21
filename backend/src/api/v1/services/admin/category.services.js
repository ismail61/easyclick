import { Category } from "../../mongodb/admin";
import { globalErrorHandler } from "../../utils";

// Create category service
export const createCategory = async (data, res) => {
    try {
        return await new Category(data).save();
    } catch (err) {
        console.log(err)
        globalErrorHandler(err, res);
    }
}


// Update single category service
export const updateCategory = async (query, data) => {
    try {
        return await Category.findOneAndUpdate(query, data, { new: true }).lean();
    } catch (err) {
        console.log(err);
    }
}


// Get all category service
export const getAllCategory = async (query) => {
    try {
        const categories = await Category.find(query).lean();
        if (!categories) return [];
        return nestedCategories(categories);
    } catch (err) {
        console.log(err);
    }
}

// Get all category service without children
export const getAllCategoryWithoutChildren = async (query) => {
    try {
        return await Category.find(query).lean();
    } catch (err) {
        console.log(err);
    }
}

// Get all top menu category service
export const getAllTopMenuCategory = async (query) => {
    try {
        const categories = await Category.find(query).lean();
        if (!categories) return [];
        return nestedCategories(categories);
    } catch (err) {
        console.log(err);
    }
}

// Get all home page category service
export const getAllHomePageCategory = async (query) => {
    try {
        const categories = await Category.find(query).lean();
        if (!categories) return [];
        return nestedCategories(categories);
    } catch (err) {
        console.log(err);
    }
}

// Get all home page category service with out children
export const getAllHomePageCategoryWithoutChildren = async (query) => {
    try {
        return await Category.find(query).lean();
    } catch (err) {
        console.log(err);
    }
}



// Get all Product
export const getAllProduct = async (query) => {
    try {
        return await Category.find(query).lean().select('products -_id').populate('products');
    } catch (err) {
        console.log(err);
    }
}

function nestedCategories(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter(cat => cat.parent_id == null);
    } else {
        category = categories.filter(cat => String(cat.parent_id) == String(parentId));
    }

    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            value: cate.name,
            label: cate.name,
            color: cate?.color || false,
            size: cate?.size || false,
            children: nestedCategories(categories, cate._id)
        })
    }
    return categoryList;
}

export const singleNestedCategories = async (id) => {
    const categoryList = [];

    const categories = await Category.find({}).lean();
    if (!categories) return [];

    const cate = await Category.findOne({ _id: id }).lean();
    categoryList.push({
        _id: cate._id,
        value: cate.name,
        label: cate.name,
        color: cate?.color || false,
        size: cate?.size || false,
        children: nestedCategories(categories, cate._id)
    })

    return categoryList;
}

export const singleCategoryWithoutChildren = async (id) => {
    return await Category.findOne({ _id: id }).lean().select('-products').populate({
        path: 'parent_id',
        model : 'Category',
        select: 'name'
    });
}

export const findCategory = async (query) => {
    return await Category.findOne(query).lean();
}
