import {
    createVoucher,
    getDynamicVoucher,
    getSingleVoucher,
    getVouchers,
    updateVoucher,
} from "../../../services/admin";
import { error } from "../../../utils";

function voucherController() {
    return {
        // Create a new Voucher
        createVoucher: async (req, res) => {
            

            const codeMatch = await getSingleVoucher({ code: req.body?.code });
            if (codeMatch) return error().resourceError(
                res,
                'Voucher Code is Duplicate.Please enter different code.',
                422
            );
            const addedVoucher = await createVoucher({
                ...req.body,
                created_by: 'ADMIN',
                is_active: true
            }, res);
            return res.status(200).json(addedVoucher);
        },

        // Find single voucher by ID
        getSingleVoucher: async (req, res) => {
            const voucher = await getSingleVoucher({ _id: req.params?.id });
            if (!voucher) return error().resourceError(res, 'Sorry! This Voucher doest not exists or something wrong', 422);
            return res.status(200).json(voucher);
        },

         // Get all Active Vouchers
         getAllActiveVouchers: async (req, res) => {
            const Vouchers = await getDynamicVoucher({}, true);
            return res.status(200).json(Vouchers);
        },

        // Get all DeActive Vouchers
        getAllDeActiveVouchers: async (req, res) => {
            const Vouchers = await getDynamicVoucher({}, false);
            return res.status(200).json(Vouchers);
        },

        // Get all Vouchers
        getAllVouchers: async (req, res) => {
            const Vouchers = await getVouchers({});
            return res.status(200).json(Vouchers);
        },


    

        // Update single Voucher by ID
        updateVoucher: async (req, res) => {
            const updatedVoucher = await updateVoucher(
                { _id: req.params?.id },
                req.body
            );
            if (!updatedVoucher) return error().resourceError(res, 'Sorry! This Voucher doest not exists or something wrong', 422);
            return res.status(200).json(updatedVoucher);
        },


        // Active single Voucher by ID
        activeVoucher: async (req, res) => {
            const updatedVoucher = await updateVoucher(
                { _id: req.params?.id },
                { is_active: true }
            );
            if (!updatedVoucher) return error().resourceError(res, 'Sorry! This Voucher doest not exists or something wrong', 422);
            return res.status(200).json(updatedVoucher);
        },

        // De Active single Voucher by ID
        deActiveVoucher: async (req, res) => {
            const updatedVoucher = await updateVoucher(
                { _id: req.params?.id },
                { is_active: false }
            );
            if (!updatedVoucher) return error().resourceError(res, 'Sorry! This Voucher doest not exists or something wrong', 422);
            return res.status(200).json(updatedVoucher);
        },
    };
}

export { voucherController };
