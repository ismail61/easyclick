
import { error } from "../../utils";
import _ from "lodash";
import { createDeliverFee, getAllDeliverFee, getDeliverFee, updateDeliverFee } from "../../services/admin/delivery.fee.services";
import { getFreeShippingList } from "../../services/admin";

function deliveryFeeController() {
    return {
        // Create Delivery Fee
        createDeliverFee: async (req, res) => {
            const { city, fee } = req.body;
            if (!city || !fee) return error().resourceError(res, 'City & Delivery Fee is Required', 422);

            //check district fee
            const match = await getDeliverFee({ city });
            if (match) return error().resourceError(res, 'Delivery Fee Already exists', 422);

            const delivered_fee = await createDeliverFee({ city, fee });
            return res.status(200).json(delivered_fee)
        },
        // Update Delivery Fee
        updateDeliverFee: async (req, res) => {
            const { id } = req.params;
            if (!id) return error().resourceError(res, 'Id is Required', 422);

            const delivered_fee = await updateDeliverFee({ _id: id }, req.body);
            return res.status(200).json(delivered_fee)
        },

        // Get Delivery Fee
        getAllDeliverFee: async (req, res) => {
            const delivered_fees = await getAllDeliverFee({});
            return res.status(200).json(delivered_fees)
        },

        //customer

        // Get Delivery Fee
        getDeliverFeeByCity: async (req, res) => {
            const { city } = req.params;
            if (!city) return error().resourceError(res, 'District is Required', 422);
            const delivered_fees = await getDeliverFee({ city });
            return res.status(200).json(delivered_fees)
        },

        // Get Delivery Fee
        getAdminFreeShippingList: async (req, res) => {
            const { quantity, total_amount } = req.body;
            const freeShippingList = await getFreeShippingList(
                { is_active: true, created_by: 'ADMIN' }
            );
            if (freeShippingList?.length) {
                freeShippingList?.forEach(freeShipping => {
                    if (freeShipping?.condition_type === 'SHOP_ITEM_QUANTITY_ABOVE') {
                        if (freeShipping?.quantity >= quantity) {
                            return error().resourceError(res, `You need to buy more ${(freeShipping?.quantity - quantity) + 1 || 0} Quantity to get Free Shipping`, 422);
                        } else {
                            return res.status(200).json(freeShipping)
                        }

                    } else if (freeShipping?.condition_type === 'SHOP_ORDER_AMOUNT_ABOVE') {
                        if (freeShipping?.amount >= total_amount) {
                            return error().resourceError(res, `You need to buy more ${(freeShipping?.amount - total_amount) + 1 || 0} BDT to get Free Shipping`, 422);
                        } else {
                            return res.status(200).json(freeShipping)
                        }
                    } else {
                        return res.status(200).json(freeShipping)
                    }
                })
            } else {
                return res.status(200).json(null)
            }
        },
    }
}
export { deliveryFeeController };