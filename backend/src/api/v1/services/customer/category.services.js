import { Category } from "../../mongodb/admin";

// Get all category service
export const getWebsiteCategory = async (query) => {
    try {
        return await Category.find(query).lean();
        // if (!categories) return [];
        // return nestedCategories(categories);
    } catch (err) {
        console.log(err);
    }
}

export const getMembers = (members) => {
    let children = [];
    const flattenMembers = members.map(m => {
        if (m.children && m.children.length) {
            children = [...children, ...m.children];
        }
        return m;
    });

    return flattenMembers.concat(children.length ? getMembers(children) : children);
};

// Get all category service without children
export const getWebsiteCategoryWithoutChildren = async (query) => {
    try {
        return await Category.find(query).lean();
    } catch (err) {
        console.log(err);
    }
}

// Get all home page category service
export const getWebsiteHomePageCategory = async (query) => {
    try {
        const categories = await Category.find(query).lean();
        if (!categories) return [];
        return nestedCategories(categories);
    } catch (err) {
        console.log(err);
    }
}

// Get all home page category service with out children
export const getWebsiteHomePageCategoryWithoutChildren = async (query) => {
    try {
        return await Category.find(query).lean().select('slug description image');
    } catch (err) {
        console.log(err);
    }
}



// Get all Product
export const getWebsiteProduct = async (query) => {
    try {
        return await Category.findOne(query).lean().select('products -_id').populate({
            path: 'products',
            model: 'Product',
            select: 'product_name slug variant_stock_price rating',
            match: { status: 'APPROVED', is_active: true, is_deleted: false }
        });
    } catch (err) {
        console.log(err);
    }
}


function nestedCategories(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories?.filter(cat => cat?.parent_id == null);
    } else {
        category = categories?.filter(cat => String(cat?.parent_id) == String(parentId));
    }

    for (let cate of category) {
        categoryList.push({
            _id: cate?._id,
            value: cate?.name,
            slug: cate?.slug,
            root: cate?.root,
            children: nestedCategories(categories, cate?._id)
        })
    }
    return categoryList;
}