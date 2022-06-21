import { FreeShipment } from "../../mongodb/admin";

export const createFreeShipping = async (data) => {
    try {
        return await new FreeShipment(data).save();
    } catch (err) {
        console.log(err);
    }
};

export const getSingleFreeShipping = async (query) => {
    try {
        return await FreeShipment.findOne(query).lean();
    } catch (err) {
        console.log(err);
    }
};

export const getAllFreeShippings = async (query) => {
    try {
        return await FreeShipment
            .find(query)
            .lean();
    } catch (err) {
        console.log(err);
    }
};

export const getDynamicFreeShippings = async (query, status) => {
    try {
        return await FreeShipment
            .find({ ...query, is_active: status })
            .lean();
    } catch (err) {
        console.log(err);
    }
};
export const updateFreeShipping = async (query, data) => {
    try {
        return await FreeShipment.findOneAndUpdate(
            query,
            { $set: data },
            { new: true }
        ).lean();
    } catch (err) {
        console.log(err);
    }
};

export const deleteFreeShipping = async (query) => {
    try {
        return await FreeShipment.findOneAndDelete(query).lean();
    } catch (err) {
        console.log(err);
    }
};

export const getFreeShippingList = async (query) => {
    try {
        const freeShippingList = await FreeShipment.find(query).lean();
        let temp = [];
        freeShippingList?.map(freeShipping => {
            if (freeShipping?.period_type === 'SPECIFIC_PERIOD' && freeShipping?.specific_period) {
                if (freeShipping?.specific_period?.start_date < new Date() && freeShipping?.specific_period?.end_date > new Date()) {
                    temp.push(freeShipping);
                }
            } else {
                temp.push(freeShipping);
            }
        });
        return temp;
    } catch (err) {
        console.log(err);
    }
};