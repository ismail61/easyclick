import { Order } from "../../mongodb/common"
import _ from 'lodash'

//common 
export const cancelOrder = async (order_id, product_id, cancellation_reasons) => {
    try {
        return await Order.findOneAndUpdate({
            _id: order_id,
            'products.product_id': product_id,
        }, { $set: { 'products.$.status': 'CANCELLED', 'products.$.cancellation_reasons': cancellation_reasons } }, { new: true }).lean().exec()
    } catch (err) {
        console.log(err)
    }
}


//Admin orders
export const getOrders = async (query) => {
    try {
        const Orders = await Order.find(query)
            .lean()
            .populate([
                {
                    path: 'billing_address',
                    model: 'Address',
                    select: '-_id -__v'
                },
                {
                    path: 'shipping_address',
                    model: 'Address',
                    select: '-_id -__v'
                },
                {
                    path: 'user_id',
                    model: 'Customer',
                    select: 'name phone -_id'
                }
            ]
            )
        return _.orderBy(Orders, [(obj) => new Date(obj?.createdAt)], ['desc']);
    } catch (err) {
        console.log(err)
    }
}

export const getOrder = async (query) => {
    try {
        const order = await Order.findOne(query).lean()
            .populate({
                path: 'billing_address',
                model: 'Address',
                select: '-_id -__v'
            })
            .populate({
                path: 'shipping_address',
                model: 'Address',
                select: '-_id -__v'
            })
            .populate({
                path: 'user_id',
                model: 'Customer',
                select: 'name phone -_id'
            });
        if (!order && order?.products?.length === 0) return null;
        return order;
    } catch (err) {
        console.log(err)
    }
}

export const getDynamicOrders = async (query, status) => {
    try {
        const Orders = await Order.find(query)
            .lean()
            .populate([
                {
                    path: 'billing_address',
                    model: 'Address',
                    select: '-_id -__v'
                },
                {
                    path: 'shipping_address',
                    model: 'Address',
                    select: '-_id -__v'
                },
                {
                    path: 'user_id',
                    model: 'Customer',
                    select: 'name phone -_id'
                }
            ]
            );
        const AdminOrders = Orders?.map((order) => {
            return { ...order, products: order.products?.filter((orderedProduct) => (orderedProduct?.status === status)) }
        })
        return _.orderBy(AdminOrders, [(obj) => new Date(obj?.createdAt)], ['desc']);
    } catch (err) {
        console.log(err)
    }
}

export const getReturnRequestOrders = async (query, status) => {
    try {
        const Orders = await Order.find(query)
            .lean()
            .populate([
                {
                    path: 'billing_address',
                    model: 'Address',
                    select: '-_id -__v'
                },
                {
                    path: 'shipping_address',
                    model: 'Address',
                    select: '-_id -__v'
                },
                {
                    path: 'user_id',
                    model: 'Customer',
                    select: 'name phone -_id'
                }
            ]
            );
        const AdminOrders = Orders?.map((order) => {
            return { ...order, products: order.products?.filter((orderedProduct) => (orderedProduct?.status === status) && (orderedProduct?.return_request)) }
        })
        return _.orderBy(AdminOrders, [(obj) => new Date(obj?.createdAt)], ['desc']);
    } catch (err) {
        console.log(err)
    }
}

export const updateOrder = async (order_id, product_id, status) => {
    try {
        return await Order.findOneAndUpdate({
            _id: order_id,
            'products.product_id': product_id,
        }, { $set: { 'products.$.status': status } }, { new: true }).lean().exec()
    } catch (err) {
        console.log(err)
    }
}

export const shippedOrder = async (order_id, product_id, status, delivery) => {
    try {
        return await Order.findOneAndUpdate({
            _id: order_id,
            'products.product_id': product_id,
        }, { $set: { 'products.$.status': status, 'products.$.provider.delivery': delivery } }, { new: true }).lean().exec()
    } catch (err) {
        console.log(err)
    }
}


export const updateDeliveredDataOrder = async (order_id, product_id) => {
    try {
        return await Order.findOneAndUpdate({
            _id: order_id,
            'products.product_id': product_id,
        }, { $set: { 'products.$.delivered_time': new Date() } }, { new: true }).lean().exec()
    } catch (err) {
        console.log(err)
    }
}