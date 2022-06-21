import { Banner } from "../../mongodb/admin";
import { globalErrorHandler } from "../../utils";

// Create Banner service
export const createBanner = async (data, res) => {
    try {
        return await new Banner(data).save();
    } catch (err) {
        console.log(err)
        globalErrorHandler(err, res);
    }
}


// Update single Banner service
export const updateBanner = async (query, data) => {
    try {
        return await Banner.findOneAndUpdate(query, data, { new: true }).lean();
    } catch (err) {
        console.log(err);
    }
}

// Get all Banner service without children
export const getAllBanner = async (query) => {
    try {
        return await Banner.find(query).lean();
    } catch (err) {
        console.log(err);
    }
}


// Get all home page Banner service with out children
export const getAllHomePageBanner = async (query) => {
    try {
        return await Banner.find(query).lean().select('-show_on_home_page -_id');
    } catch (err) {
        console.log(err);
    }
}


export const singleBanner = async (id) => {
    return await Banner.findOne({ _id: id }).lean();
}
