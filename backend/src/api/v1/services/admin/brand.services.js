import { Brand } from "../../mongodb/admin";
export const createBrand = async (data) => {
    try {
        return await new Brand(data).save();
    } catch (err) {
        console.log(err);
    }
}

export const getAllBrands = async (query) => {
    try {
        return await Brand.find(query).lean();
    } catch (err) {
        console.log(err)
    }
}

export const getBrand = async (query) => {
    try {
        return await Brand.findOne(query).lean();
    } catch (err) {
        console.log(err)
    }
}

export const updateBrand = async (query, data) => {
    try {
        return await Brand.findOneAndUpdate(query, { $set: data }).lean();
    } catch (err) {
        console.log(err)
    }
}


export const deleteBrand = async (query) => {
    try {
        return await Brand.deleteOne(query).lean()
    } catch (err) {
        console.log(err)
    }
}