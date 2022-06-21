import { Voucher } from "../../mongodb/common";
import { Customer } from "../../mongodb/customer";

export const AddCustomerVoucher = async (query, id) => {
    try {
        return await Customer.findOneAndUpdate(query, {
            $push: {
                vouchers: id
            }
        }, { $new: true }).lean().select('vouchers').populate({
            path: 'vouchers',
            model: "Voucher",
            select: "code start_from end_time min_amount_to_apply total_issued_voucher discount_amount discount_amount_percentage max_discount_amount discount_type",
            match: {
                is_active: true,
                end_time: { $gt: new Date() },
                total_issued_voucher: { $ne: 0 }
            }
        });
    } catch (err) {
        console.log(err);
    }
}

export const RemoveCustomerVoucher = async (query, id) => {
    try {
        return await Customer.findOneAndUpdate(query, {
            $pull: {
                vouchers: id
            }
        }, { $new: true }).lean().select('vouchers').populate({
            path: 'vouchers',
            model: "Voucher",
            select: "code start_from end_time min_amount_to_apply total_issued_voucher discount_amount discount_amount_percentage max_discount_amount discount_type",
            match: {
                is_active: true,
                end_time: { $gt: new Date() },
                total_issued_voucher: { $ne: 0 }
            }
        });
    } catch (err) {
        console.log(err);
    }
}

export const findAllCustomerVouchers = async (query) => {
    try {
        return await Customer.findOne(query).lean().select('vouchers').populate({
            path: 'vouchers',
            model: "Voucher",
            select: "code start_from end_time min_amount_to_apply total_issued_voucher discount_amount discount_amount_percentage max_discount_amount discount_type",
            match: {
                is_active: true,
                end_time: { $gt: new Date() },
                total_issued_voucher: { $ne: 0 }
            }
        });
    } catch (err) {
        console.log(err);
    }
}

export const checkVoucherCodeValidity = async (query) => {
    try {
        return await Voucher.findOne(query).lean();
    } catch (err) {
        console.log(err);
    }
}

export const AdminVouchers = async (query) => {
    try {
        return await Voucher.find(query).lean();
    } catch (err) {
        console.log(err);
    }
}

export const VoucherUpdate = async (query, data) => {
    try {
        return await Voucher.findOneAndUpdate(query, data).lean();
    } catch (err) {
        console.log(err);
    }
}