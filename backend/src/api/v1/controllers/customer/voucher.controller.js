import { AddCustomerVoucher, AdminVouchers, checkVoucherCodeValidity, findAllCustomerVouchers, RemoveCustomerVoucher } from '../../services/customer';
import { error } from '../../utils';

function voucherController() {
    return {
        addVoucher: async (req, res) => {
            const { id } = req.params;
            const voucher = await AddCustomerVoucher({
                _id: req?.user?._id,
                vouchers: { $ne: id }
            }, id);
            if (!voucher) return error().resourceError(res, 'Voucher added Unsuccessful', 422);
            return res.status(200).json(voucher);
        },
        removeVoucher: async (req, res) => {
            const { id } = req.params;
            const voucher = await RemoveCustomerVoucher({
                _id: req?.user?._id,
                vouchers: { $eq: id }
            }, id);
            if (!voucher) return error().resourceError(res, 'Voucher removed Unsuccessful', 422);
            return res.status(200).json(voucher);
        },
        getAllCollectedVouchers: async (req, res) => {
            const Vouchers = await findAllCustomerVouchers({
                _id: req?.user?._id,
            });
            return res.status(200).json(Vouchers?.vouchers);
        },
        getAllAdminVouchers: async (req, res) => {
            const Vouchers = await AdminVouchers({
                is_active: true,
                end_time: { $gt: new Date() },
                start_from: { $lt: new Date() },
            });
            return res.status(200).json(Vouchers);
        },
        applyVoucher: async (req, res) => {
            const { code, products, total_price } = req.body;
            if (!code) return error().resourceError(res, 'Voucher Code is Required', 422);
            const voucher = await checkVoucherCodeValidity({
                code,
                end_time: { $gt: new Date() },
                start_from: { $lt: new Date() },
                total_issued_voucher: { $ne: 0 },
                is_active: true
            });
            if (!voucher) return error().resourceError(res, 'Invalid or Expired Voucher', 422);

            if (voucher?.min_amount_to_apply <= total_price) {
                return res.status(200).json(voucher);
            } else {
                return error().resourceError(res, `You need to buy more ${voucher?.min_amount_to_apply - total_price || 0} BDT from easyclick Mall Shop`, 422);
            }

        },
    }
}
export { voucherController };