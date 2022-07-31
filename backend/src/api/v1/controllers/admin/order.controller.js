import { cancelOrder, getOrder, getOrders, getDynamicOrders, updateOrder, updateDeliveredDataOrder, shippedOrder, getReturnRequestOrders } from "../../services/admin/order.services";
import { error } from "../../utils"

const orderController = () => {
    return {

        // Get Admin all orders
        getAllOrders: async (req, res) => {
            const orders = await getOrders({});
            return res.status(200).json(orders);
        },

        // Get Admin all pending orders
        getPendingOrders: async (req, res) => {
            const orders = await getDynamicOrders({}, 'PENDING');
            return res.status(200).json(orders);
        },

        // Get Admin all ready to ship orders
        getReadyToShipOrders: async (req, res) => {
            const orders = await getDynamicOrders({}, 'READY_TO_SHIP');
            return res.status(200).json(orders);
        },

        // Get Admin all shipped orders
        getShippedOrders: async (req, res) => {
            const orders = await getDynamicOrders({}, 'SHIPPED');
            return res.status(200).json(orders);
        },

        // Get Admin all pending order counts
        getPendingOrderCounts: async (req, res) => {
            const orders = await getDynamicOrders({}, 'PENDING');
            let count = 0;
            orders?.forEach(order => {
                count += order?.products?.length
            })
            return res.status(200).json(count);
        },

        // Get Admin all shipped order counts
        getReadyToShipOrderCounts: async (req, res) => {
            const orders = await getDynamicOrders({}, 'READY_TO_SHIP');
            let count = 0;
            orders?.forEach(order => {
                count += order?.products?.length
            })
            return res.status(200).json(count);
        },

        // Get Admin all shipped order counts
        getShippedOrderCounts: async (req, res) => {
            const orders = await getDynamicOrders({}, 'SHIPPED');
            let count = 0;
            orders?.forEach(order => {
                count += order?.products?.length
            })
            return res.status(200).json(count);
        },

        // Get Admin all delivered order counts
        getDeliveredOrderCounts: async (req, res) => {
            const orders = await getDynamicOrders({}, 'DELIVERED');
            let count = 0;
            orders?.forEach(order => {
                count += order?.products?.length
            })
            return res.status(200).json(count);
        },

        // Get Admin all canceled order counts
        getCancelledOrderCounts: async (req, res) => {
            const orders = await getDynamicOrders({}, 'CANCELLED');
            let count = 0;
            orders?.forEach(order => {
                count += order?.products?.length
            })
            return res.status(200).json(count);
        },

        // Get Admin all returned order counts
        getReturnedOrderCounts: async (req, res) => {
            const orders = await getDynamicOrders({}, 'RETURNED');
            let count = 0;
            orders?.forEach(order => {
                count += order?.products?.length
            })
            return res.status(200).json(count);
        },

        // Get Admin all failed Delivery order counts
        getFailedDeliveryOrderCounts: async (req, res) => {
            const orders = await getDynamicOrders({}, 'DELIVERY_FAILED');
            let count = 0;
            orders?.forEach(order => {
                count += order?.products?.length
            })
            return res.status(200).json(count);
        },

        // Get Admin all delivered orders
        getDeliveredOrders: async (req, res) => {
            const orders = await getDynamicOrders({}, 'DELIVERED');
            return res.status(200).json(orders);
        },

        // Get Admin all canceled orders
        getCanceledOrders: async (req, res) => {
            const orders = await getDynamicOrders({}, 'CANCELLED');
            return res.status(200).json(orders);
        },

        // Get Admin all returned orders
        getReturnedOrders: async (req, res) => {
            const orders = await getDynamicOrders({}, 'RETURNED');
            return res.status(200).json(orders);
        },

        // Get Admin all returned order counts
        getReturnRequestOrderCounts: async (req, res) => {
            const orders = await getReturnRequestOrders({}, 'DELIVERED');
            let count = 0;
            orders?.forEach(order => {
                count += order?.products?.length
            })
            return res.status(200).json(count);
        },
        
        // Get Admin all returned orders
        getReturnRequestOrders: async (req, res) => {
            const orders = await getReturnRequestOrders({}, 'DELIVERED');
            return res.status(200).json(orders);
        },

        // Get Admin all delivery failed orders
        getFailedDeliveryOrders: async (req, res) => {
            const orders = await getDynamicOrders({}, 'DELIVERY_FAILED');
            return res.status(200).json(orders);
        },

        // Find single product using ID by Admin
        getOrder: async (req, res) => {
            const { order_id } = req.params;
            const order = await getOrder({ _id: order_id });
            if (!order) return error().resourceError(res, 'Sorry! This Order doest not exists or something wrong', 422);
            return res.status(200).json(order)
        },

        // cancel Single Order
        cancelOrder: async (req, res) => {
            const { order_id, product_id } = req.params;
            const { cancellation_reasons } = req.body;
            if (!cancellation_reasons) return error().resourceError(res, 'Cancellation Reasons in Required', 422);
            const order = await getOrder({ _id: order_id });
            if (!order) return error().resourceError(res, 'Sorry! This Order doest not exists or something wrong', 422);

            const orderedSingleProduct = order?.products?.filter(product => String(product.product_id) === String(product_id));
            if (!orderedSingleProduct) return error().resourceError(res, 'Sorry! This Ordered Product doest not exists or something wrong', 422);

            if (orderedSingleProduct[0]?.status === 'PENDING' || orderedSingleProduct[0]?.status === 'READY_TO_SHIP') {
                const canceledOrder = await cancelOrder(order_id, product_id, cancellation_reasons);
                if (!canceledOrder) return error().resourceError(res, 'Sorry! Cancel Request Failed or something wrong', 422);

                return res.status(200).json(canceledOrder);
            }
            return error().resourceError(res, 'Sorry! You can not do this', 422);
        },

        // ready to ship Order
        readyToShippedOrder: async (req, res) => {
            const { order_id, product_id } = req.params;
            const order = await getOrder({ _id: order_id }, req.user?._id);
            if (!order) return error().resourceError(res, 'Sorry! This Order doest not exists or something wrong', 422);

            const orderedSingleProduct = order?.products?.filter(product => String(product.product_id) === String(product_id));
            if (!orderedSingleProduct) return error().resourceError(res, 'Sorry! This Ordered Product doest not exists or something wrong', 422);
            if (orderedSingleProduct[0]?.status !== 'PENDING') return error().resourceError(res, 'Sorry! You can not do this', 422);

            const updatedOrder = await updateOrder(order_id, product_id, 'READY_TO_SHIP');
            if (!updatedOrder) return error().resourceError(res, 'Sorry! Ready to Ship Request failed or something wrong', 422);
            return res.status(200).json(updatedOrder);
        },

        // shipped Order
        shippedOrder: async (req, res) => {
            const { order_id, product_id } = req.params;
            const { delivery } = req.body;
            const order = await getOrder({ _id: order_id }, req.user?._id);
            if (!order) return error().resourceError(res, 'Sorry! This Order doest not exists or something wrong', 422);

            const orderedSingleProduct = order?.products?.filter(product => String(product.product_id) === String(product_id));
            if (!orderedSingleProduct) return error().resourceError(res, 'Sorry! This Ordered Product doest not exists or something wrong', 422);
            if (orderedSingleProduct[0]?.status !== 'READY_TO_SHIP') return error().resourceError(res, 'Sorry! You can not do this', 422);

            const updatedOrder = await shippedOrder(order_id, product_id, 'SHIPPED', delivery);
            if (!updatedOrder) return error().resourceError(res, 'Sorry! Shipped Request failed or something wrong', 422);
            return res.status(200).json(updatedOrder);
        },
        // delivered Order
        deliveredOrder: async (req, res) => {
            const { order_id, product_id } = req.params;
            const order = await getOrder({ _id: order_id }, req.user?._id);
            if (!order) return error().resourceError(res, 'Sorry! This Order doest not exists or something wrong', 422);

            const orderedSingleProduct = order?.products?.filter(product => String(product.product_id) === String(product_id));
            if (!orderedSingleProduct) return error().resourceError(res, 'Sorry! This Ordered Product doest not exists or something wrong', 422);
            if (orderedSingleProduct[0]?.status !== 'SHIPPED') return error().resourceError(res, 'Sorry! You can not do this', 422);

            const updatedOrder = await updateOrder(order_id, product_id, 'DELIVERED');
            await updateDeliveredDataOrder(order_id, product_id);
            if (!updatedOrder) return error().resourceError(res, 'Sorry! Delivered Request failed or something wrong', 422);
            return res.status(200).json(updatedOrder);
        },

        // return Order
        returnedOrder: async (req, res) => {
            const { order_id, product_id } = req.params;
            const order = await getOrder({ _id: order_id }, req.user?._id);
            if (!order) return error().resourceError(res, 'Sorry! This Order doest not exists or something wrong', 422);

            const orderedSingleProduct = order?.products?.filter(product => String(product.product_id) === String(product_id));
            if (!orderedSingleProduct) return error().resourceError(res, 'Sorry! This Ordered Product doest not exists or something wrong', 422);
            if (orderedSingleProduct[0]?.status === 'DELIVERY_FAILED' || orderedSingleProduct[0]?.status === 'DELIVERED') {
                const updatedOrder = await updateOrder(order_id, product_id, 'RETURNED');
                if (!updatedOrder) return error().resourceError(res, 'Sorry! Returned Request failed or something wrong', 422);
                return res.status(200).json(updatedOrder);
            }
            return error().resourceError(res, 'Sorry! You can not do this', 422);
        },

        // return Order
        failedDeliveryOrder: async (req, res) => {
            const { order_id, product_id } = req.params;
            const order = await getOrder({ _id: order_id }, req.user?._id);
            if (!order) return error().resourceError(res, 'Sorry! This Order doest not exists or something wrong', 422);

            const orderedSingleProduct = order?.products?.filter(product => String(product.product_id) === String(product_id));
            if (!orderedSingleProduct) return error().resourceError(res, 'Sorry! This Ordered Product doest not exists or something wrong', 422);
            if (orderedSingleProduct[0]?.status !== 'SHIPPED') return error().resourceError(res, 'Sorry! You can not do this', 422);

            const updatedOrder = await updateOrder(order_id, product_id, 'DELIVERY_FAILED');
            if (!updatedOrder) return error().resourceError(res, 'Sorry! Delivery Failed Request failed or something wrong', 422);
            return res.status(200).json(updatedOrder);
        },

    }
}

export { orderController }