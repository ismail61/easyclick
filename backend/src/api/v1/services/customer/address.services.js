import { Address, Customer } from "../../mongodb/customer";

export const createAddress = async (query, data) => {
    try {
        const createdAddress = await Address.create(data);
        await Customer.findOneAndUpdate(query, {
            $push: {
                'address': createdAddress?._id
            }
            ,
        }, { new: true, upsert: true }).lean();
        return createdAddress;
    } catch (err) {
        console.log(err);
    }
}

export const getSingleAddress = async (data) => {
    try {
        return await Address.findOne(data).lean();
    } catch (err) {
        console.log(err);
    }
}

export const getAllAddress = async (data) => {
    try {
        return await Customer.findOne(data).lean().select('address -_id').populate('address');
    } catch (err) {
        console.log(err);
    }
}

export const deleteAddress = async (query, customer_id) => {
    try {
        const deletedAddress = await Address.findOneAndDelete(query).lean();
        let addresses = await Customer.findOne({ _id: customer_id }).lean().select('address -_id');
        if (!addresses) return deletedAddress;
        addresses = addresses.filter(address => address !== deletedAddress?._id);
        await Customer.findOneAndUpdate({ _id: customer_id }, { address: addresses }, { new: true }).lean();
        return deletedAddress;
    } catch (err) {
        console.log(err);
    }
}

export const updateAddressAndCustomer = async (query, data, customer_id) => {
    try {
        const billingAddressExists = await Customer.findOne({ _id: customer_id }).lean().select('address -_id').populate({
            path: 'address',
            match: {
                default_billing_address: true
            }
        })
        if (billingAddressExists?.length !== 0) {
            await Address.findOneAndUpdate({ _id: billingAddressExists[0]?._id }, {
                default_billing_address: false
            }).lean()
        }
        return await Address.findOneAndUpdate(query, { $set: data }, { new: true }).lean();
    } catch (err) {
        console.log(err);
    }
}

export const updateAddress = async (query, data) => {
    try {
        return await Address.findOneAndUpdate(query, { $set: data }, { new: true }).lean();
    } catch (err) {
        console.log(err);
    }
}