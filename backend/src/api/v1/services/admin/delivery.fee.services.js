import { DeliveryFee } from "../../mongodb/admin";

export const createDeliverFee = async (data) => {
    try {
        return await new DeliveryFee(data).save();
    } catch (err) {
        console.log(err);
    }
}

export const getDeliverFee = async (query) => {
    try {
        return await DeliveryFee.findOne(query).lean();
    } catch (err) {
        console.log(err);
    }
}

export const getAllDeliverFee = async (query) => {
    try {
        return await DeliveryFee.find(query).lean();
    } catch (err) {
        console.log(err);
    }
}


export const updateDeliverFee = async (query, data) => {
    try {
        return await DeliveryFee.findOneAndUpdate(query, {
            $set: data
        }, { new: true }).lean().exec();
    } catch (err) {
        console.log(err);
    }
}

