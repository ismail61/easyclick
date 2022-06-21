import { Customer } from "../../mongodb/customer";
import { globalErrorHandler } from "../../utils";

export const getCustomerAccountInfo = async (data) => {
    try {
        return await Customer.findOne(data).lean().select('-token -password').populate({
            path: 'address',
            model: 'Address'
        });
    } catch (err) {
        console.log(err);
    }
}

export const updateCustomerAccountInfo = async (query, data , res) => {
    try {
        return await Customer.findOneAndUpdate(query, { $set: data }, { new: true }).lean().select('-token -_id -password');
    } catch (err) {
        console.log(err);
        globalErrorHandler(err, res);
    }
}

export const getCustomerAccountPhoto = async (data) => {
    try {
        return await Customer.findOne(data).lean().select("image -_id")
    } catch (err) {
        console.log(err);
    }
}

export const updateCustomerAccountPhoto = async (query, url) => {
    try {
        return await Customer.findOneAndUpdate(query, { $set: data }, { new: true }).lean().select('image');
    } catch (err) {
        console.log(err);
    }
}

