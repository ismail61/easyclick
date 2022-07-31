import { Post, Get, Update } from "../xhr";

export function getCustomerAllOrders() {
    return Get('customer/orders');
}

export function getCustomerSingleOrder(id) {
    return Get(`customer/order/${id}`);
}

export function createOrder(data) {
    return Post('customer/create-order', data);
}

export function cancelOrder(orderId, productId, data) {
    return Update(`customer/cancel-order/${orderId}/${productId}`, data);
}

export function returnOrderedProduct(orderId, productId, data) {
    return Update(`customer/return-order/${orderId}/${productId}`, data);
}

