import { createCustomerReview, getSingleOrder, getAdminReview, replyReview } from "../../services/common";
import { error, objectValidatorEscape } from "../../utils"
import { reviewValidation } from "../../validations";
import validator from "validator";

const reviewController = () => {
    return {

        // make an order
        createReview: async (req, res) => {

            const validation = reviewValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            const { message, order_id, product_id } = req.body;

            const order = await getSingleOrder({ _id: order_id, user_id: req.user?._id });
            if (!order) return error().resourceError(res, 'Sorry! This Order doest not exists or something wrong', 422);

            const orderedSingleProduct = order?.products?.filter(product => String(product.product_id?._id) === String(product_id));
            if (!orderedSingleProduct) return error().resourceError(res, 'Sorry! This Ordered Product doest not exists or something wrong', 422);
            if (orderedSingleProduct[0]?.status !== 'DELIVERED') return error().resourceError(res, 'Sorry! You can not review this order right now', 422);
            const createdReview = await createCustomerReview(req.user?._id, {
                ...req.body,
                message: validator?.escape(message),
                user_id: req.user?._id
            });
            return res.status(200).json(createdReview);
        },


        //admin
        getAdminReviews: async (req, res) => {
            const reviewsArray = await getAdminReview({});
            return res.status(200).json(reviewsArray);
        },

        // reply review
        replyRAdminReview: async (req, res) => {
            const { review_id } = req.params;

            const refactor_data = objectValidatorEscape(req.body);

            const repliedReview = await replyReview({ _id: review_id }, refactor_data);
            return res.status(200).json(repliedReview);
        },
    }
}

export { reviewController }