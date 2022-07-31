import { createMerchantDiscount, getMerchant, getMerchantDiscountPrice, getMerchants, updateMerchant, updateMerchantDiscountPrice } from "../../services/admin";
import { error } from "../../utils";

const merchantController = () => {
    return {
        // Get all Merchant
        getAllMerchants: async (req, res) => {
            const Merchant = await getMerchants({ merchant: true });
            return res.status(200).json(Merchant);
        },

        // Get a single Merchant
        getSingleMerchant: async (req, res) => {
            const Merchant = await getMerchant({ _id: req.params?.id, merchant: true });
            if (!Merchant)
                return error().resourceError(
                    res,
                    "Sorry! This Merchant doest not exists or something wrong",
                    422
                );
            return res.status(200).json(Merchant);
        },

        // Get all deactivated Merchant
        getAllDeActivatedMerchants: async (req, res) => {
            const Merchant = await getMerchants({ active: false, merchant: true });
            return res.status(200).json(Merchant);
        },

        // Get all pending Merchant
        getAllActivatedMerchants: async (req, res) => {
            const Merchant = await getMerchants({ active: true, merchant: true });
            return res.status(200).json(Merchant);
        },

        // Get all deactivated Merchant Counts
        getDeActivatedMerchantCounts: async (req, res) => {
            const Merchant = await getMerchants({ active: false, merchant: true });
            return res.status(200).json(Merchant?.length || 0);
        },

        // Get all pending Merchant Counts
        getActivatedMerchantCounts: async (req, res) => {
            const Merchant = await getMerchants({ active: true, merchant: true });
            return res.status(200).json(Merchant?.length || 0);
        },
        // Active a Merchant
        activeMerchant: async (req, res) => {
            const updatedMerchant = await updateMerchant(
                { _id: req.params?.id },
                { active: true, merchant: true }
            );
            if (!updatedMerchant)
                return error().resourceError(
                    res,
                    "Sorry! This Merchant doest not exists or something wrong",
                    422
                );
            return res.status(200).json(updatedMerchant);
        },

        // De Active a Merchant
        deActiveMerchant: async (req, res) => {
            const updatedMerchant = await updateMerchant(
                { _id: req.params?.id },
                { active: false, merchant: true }
            );
            if (!updatedMerchant)
                return error().resourceError(
                    res,
                    "Sorry! This Merchant doest not exists or something wrong",
                    422
                );
            return res.status(200).json(updatedMerchant);
        },


        // Get Discount
        getMerchantDiscount: async (req, res) => {
            const discount = await getMerchantDiscountPrice({});
            return res.status(200).json(discount);
        },


        // Update Discount
        updateMerchantDiscount: async (req, res) => {
            const { discount } = req.body;
            if (!discount) return error().resourceError(
                res,
                "Sorry! Discount Amount is Required",
                422
            );
            const doestExists = await getMerchantDiscountPrice({});
            if (doestExists) {
                const discount = await updateMerchantDiscountPrice({}, req.body);
                return res.status(200).json(discount);
            } else {
                await createMerchantDiscount(req.body)
                return res.status(200).json(discount);
            }
        },
    };
};

export { merchantController };