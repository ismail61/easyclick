import { Order } from "../../mongodb/common"
import { Customer, Wallet } from '../../mongodb/customer'
import { globalErrorHandler } from "../../utils"
import _ from 'lodash'
import { cartItemDelete } from "../customer"
import { Product } from "../../mongodb/admin"
import { getProduct, updateProductQuantity } from "../admin/product.services"

export const createCustomerOrder = async (user_id, data, res) => {
    const { merchant_discount } = data;
    try {
        const newOrder = await new Order(data);
        const savedOrder = await newOrder.save()
        await pushCustomerOrders(user_id, newOrder._id);
        const { products } = data;
        productQuantityUpdate(products, newOrder._id);
        deleteFromCart(user_id, products);
        pushWalletAmount(user_id, newOrder._id, merchant_discount)
        return savedOrder;
    } catch (err) {
        console.log(err);
        globalErrorHandler(err, res);
    }
}

const pushWalletAmount = async (user_id, order_id, merchant_discount) => {
    const doesMerchantWallet = await Wallet.findOne({ user_id });
    if (doesMerchantWallet) {
        doesMerchantWallet.total_amount += merchant_discount;
        doesMerchantWallet.transactions?.push({
            amount: merchant_discount,
            order_id
        });
        await Wallet.findOneAndUpdate({ user_id }, doesMerchantWallet).lean();
    } else {
        await Wallet.create({
            user_id,
            total_amount: merchant_discount,
            transactions: [
                {
                    amount: merchant_discount,
                    order_id
                }
            ]
        })
    }
}

const productQuantityUpdate = async (products, order_id) => {
    await products?.forEach(async (orderedSingleProduct) => {
        const product = await getProduct({ _id: orderedSingleProduct?.product_id });
        product?.variant_stock_price?.forEach(variant => {
            if (variant.color_family === orderedSingleProduct?.color) {
                variant?.sizes?.forEach(nestedSize => {
                    if (nestedSize?.size === orderedSingleProduct?.size) {
                        nestedSize.quantity -= orderedSingleProduct?.quantity;
                    }
                })
            }
        })
        await updateProductQuantity({ _id: orderedSingleProduct?.product_id }, product);
        let ordersArray = await Product.findOne({ _id: product?._id }).lean().select('orders -_id');
        const { orders } = ordersArray;
        orders?.push(order_id);
        const hello = await Product.findOneAndUpdate({ _id: product?._id }, { orders }).lean().exec();
    })
}

const deleteFromCart = async (user_id, products) => {
    await products?.forEach(async (orderedSingleProduct) => {
        const item = {
            product_id: orderedSingleProduct?.product_id,
            color_family: orderedSingleProduct?.color,
            size: orderedSingleProduct?.size
        }
        await cartItemDelete(user_id, item);
    })
}

const pushCustomerOrders = async (user_id, order_id) => {
    let ordersArray = await Customer.findOne({ _id: user_id }).lean().select('orders -_id') || [];
    const { orders } = ordersArray;
    orders?.push(order_id);
    await Customer.findOneAndUpdate({ _id: user_id }, { orders }).lean();
}


export const getSingleOrder = async (query) => {
    try {
        return await Order.findOne(query).lean().populate([
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
                path: 'products.product_id',
                model: 'Product',
                select: 'slug'
            },
        ])
    } catch (err) {
        console.log(err)
    }
}

export const getCustomerOrders = async (data) => {
    try {
        return await Customer.find(data).lean().select('orders -_id').populate({
            path: 'orders',
            model: 'Order',
            options: { sort: { 'createdAt': -1 } }
        });
    } catch (err) {
        console.log(err)
    }
}

export const returnOrder = async (order_id, product_id, status, return_on_reasons) => {
    try {
        return await Order.findOneAndUpdate({
            _id: order_id,
            'products.product_id': product_id,
        }, { $set: { 'products.$.status': status, 'products.$.return_on_reasons': return_on_reasons } }, { new: true }).lean().exec()
    } catch (err) {
        console.log(err)
    }
}

export const returnRequestOrder = async (order_id, product_id, return_on_reasons) => {
    try {
        return await Order.findOneAndUpdate({
            _id: order_id,
            'products.product_id': product_id,
        }, { $set: { 'products.$.return_request': true, 'products.$.return_on_reasons': return_on_reasons } }, { new: true }).lean().exec()
    } catch (err) {
        console.log(err)
    }
}

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

export const readyToShipOrder = async (order_id, product_id, orderedSingleProduct) => {
    try {
        return await Order.findOneAndUpdate({
            _id: order_id,
            'products.product_id': product_id,
        }, { $set: { 'products.$.status': 'READY_TO_SHIP' } }, { new: true }).lean().exec()
    } catch (err) {
        console.log(err)
    }
}