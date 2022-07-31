import { getCustomerOrders, getSingleOrder, createCustomerOrder, cancelOrder, returnRequestOrder } from "../../services/common/"
import { checkVoucherCodeValidity, getSingleProduct, VoucherUpdate } from "../../services/customer";
import { error } from "../../utils"
import { orderValidation } from "../../validations"
const FIVE_DAYS = 5 * 24 * 60 * 60 * 1000;
const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;

const orderController = () => {
    return {

        // create an order by customer
        createOrder: async (req, res) => {
            const validation = orderValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);
            const {
                products,
                shipment_fee_discount,
                discount_amount,
                code,
                total_amount,
                total_shipping_fee
            } = req.body;

            let grand_total = 0;
            let shipping_fee = 0;

            await products?.forEach(product => {
                const { quantity, price, shipment_fee } = product;
                const total_price = Number(quantity) * Number(price);
                product.total_price = total_price + Number(shipment_fee);
                product.estimate_delivery_time = new Date(new Date().getTime() + (FIVE_DAYS));
                product.ship_on_time = new Date(new Date().getTime() + (THREE_DAYS));
                grand_total += total_price + + Number(shipment_fee);
                shipping_fee += Number(shipment_fee);
            })

            let voucher;
            if (code) {
                voucher = await checkVoucherCodeValidity({
                    code,
                    end_time: { $gt: new Date() },
                    start_from: { $lt: new Date() },
                    total_issued_voucher: { $ne: 0 },
                    is_active: true
                });

                if (!voucher) return error().resourceError(res, 'Invalid Voucher', 422);
            }

            if (Number(shipping_fee) !== Number(total_shipping_fee) || Number(total_amount) !== Number(grand_total - Number(discount_amount))) {
                return error().resourceError(res, 'You can not order right now.Please try again', 409);
            }
            const discount = Number(shipment_fee_discount || 0) + Number(discount_amount || 0);
            grand_total -= discount;
            shipping_fee -= Number(shipment_fee_discount || 0);

            let flag = true;
            //check Product Quantity
            await products?.forEach(async (orderedSingleProduct) => {
                const product = await getSingleProduct({ _id: orderedSingleProduct?.product_id });
                await product?.variant_stock_price?.forEach(async variant => {
                    if (variant.color_family === orderedSingleProduct?.color) {
                        await variant?.sizes?.forEach(nestedSize => {
                            if (nestedSize?.size === orderedSingleProduct?.size) {
                                if (nestedSize?.quantity < 1 || orderedSingleProduct?.quantity > nestedSize?.quantity) {
                                    flag = false;
                                }
                            }
                        })
                    }
                })
            })
            if (!flag) return error().resourceError(res, 'Sorry! You can not order now.Because some of products are not available or Sold Out.', 422);
            else if (flag) {
                const createdOrder = await createCustomerOrder(req.user?._id, {
                    ...req.body,
                    products,
                    grand_total,
                    total_shipment_fee: shipping_fee,
                    user_id: req.user?._id,
                }, res);

                if (code) {
                    await VoucherUpdate({
                        code,
                    }, { $inc: { total_issued_voucher: -1 } });
                }
                return res.status(200).json(createdOrder);
            }
        },

        // Find single product using ID by customer
        getCustomerSingleOrder: async (req, res) => {
            //if(typeof req.params?.id !== mongoose.Types.ObjectId) return error().resourceError(res, 'Invalid Params Id', 422);
            const order = await getSingleOrder({ $and: [{ _id: req.params?.id }, { user_id: req.user?._id }] });
            if (!order) return error().resourceError(res, 'Sorry! This Order doest not exists or something wrong', 422);
            return res.status(200).json(order)
        },

        // Get customer all orders
        getCustomerAllOrders: async (req, res) => {
            const Orders = await getCustomerOrders({ _id: req.user?._id })
            return res.status(200).json(Orders)
        },

        // Cancel ordered single product into single order using ID by customer
        cancelOrder: async (req, res) => {
            const { order_id, product_id } = req.params; // here product id means ordered single product id
            const { cancellation_reasons } = req.body;
            if (!cancellation_reasons) return error().resourceError(res, 'Cancellation Reasons in Required', 422);

            const order = await getSingleOrder({ _id: order_id, user_id: req.user?._id });
            if (!order) return error().resourceError(res, 'Sorry! This Order doest not exists or something wrong', 422);

            const orderedSingleProduct = order?.products?.filter(product => String(product.product_id?._id) === String(product_id));
            if (!orderedSingleProduct) return error().resourceError(res, 'Sorry! This Ordered Product doest not exists or something wrong', 422);
            if (orderedSingleProduct[0]?.status !== 'PENDING') return error().resourceError(res, 'Sorry! You can not cancel this order right now', 422);

            const canceledOrder = await cancelOrder(order_id, product_id, cancellation_reasons);
            if (!canceledOrder) return error().resourceError(res, 'Sorry! Cancel Request Failed or something wrong', 422);

            return res.status(200).json(canceledOrder);
        },

        // return ordered single product into single order using ID by customer
        returnOrderedProduct: async (req, res) => {
            const { order_id, product_id } = req.params; // here product id means ordered single product id
            const { return_on_reasons } = req.body;
            if (!return_on_reasons) return error().resourceError(res, 'Return Reasons in Required', 422);

            const order = await getSingleOrder({ _id: order_id, user_id: req.user?._id });
            if (!order) return error().resourceError(res, 'Sorry! This Order doest not exists or something wrong', 422);

            const orderedSingleProduct = order?.products?.filter(product => String(product.product_id?._id) === String(product_id));
            if (!orderedSingleProduct) return error().resourceError(res, 'Sorry! This Ordered Product doest not exists or something wrong', 422);
            if (orderedSingleProduct[0]?.status !== 'DELIVERED') return error().resourceError(res, 'Sorry! You can not return this order right now', 422);

            const returnedOrder = await returnRequestOrder(order_id, product_id, return_on_reasons);
            if (!returnedOrder) return error().resourceError(res, 'Sorry! Return Request failed or something wrong', 422);

            return res.status(200).json(returnedOrder);
        },
    }
}

export { orderController }