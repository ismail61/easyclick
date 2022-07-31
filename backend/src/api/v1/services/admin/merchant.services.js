import { Discount } from "../../mongodb/admin";
import { Customer } from "../../mongodb/customer";

export const getMerchants = async (query) => {
    try {
        return await Customer.find(query).select('-password -token -seller_id').lean();
    } catch (err) {
        console.log(err);
    }
};

export const getMerchant = async (query) => {
    try {
        return await Customer.findOne(query).select('-password -token -seller_id').lean();
    } catch (err) {
        console.log(err);
    }
};

export const updateMerchant = async (query, data) => {
    try {
        return await Customer.findOneAndUpdate(query, { $set: data }, { new: true }).lean();
    } catch (err) {
        console.log(err);
    }
};

//Discount 
export const createMerchantDiscount = async (data) => {
    try {
        return await Discount.create(data);
    } catch (err) {
        console.log(err);
    }
};

export const getMerchantDiscountPrice = async (query) => {
    try {
        return await Discount.findOne(query).lean();
    } catch (err) {
        console.log(err);
    }
};

export const updateMerchantDiscountPrice = async (query, data) => {
    try {
        return await Discount.findOneAndUpdate(query, data).lean();
    } catch (err) {
        console.log(err);
    }
};