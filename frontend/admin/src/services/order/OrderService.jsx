import { CountOrders, AdminOrders, SingleOrder, UpdateOrder } from "adapters/order/Order";
export function getOrders(type) {
    switch (type) {
        case 'all':
            return AdminOrders('orders');
        case 'pending':
            return AdminOrders('pending-orders');
        case 'ready_to_ship':
            return AdminOrders('ready-to-ship-orders');
        case 'shipped':
            return AdminOrders('shipped-orders');
        case 'delivered':
            return AdminOrders('delivered-orders');
        case 'canceled':
            return AdminOrders('canceled-orders');
        case 'returned':
            return AdminOrders('returned-orders');
        case 'return_request':
            return AdminOrders('returned-request-orders');
        case 'failed_delivery':
            return AdminOrders('failed_delivery-orders');
        default:
            return null;
    }
}

export function getOrder(id) {
    return SingleOrder(`order/${id}`);
}

export function cancelOrder(order_id, product_id, cancel_reason) {
    return UpdateOrder(`cancel-order/${order_id}/${product_id}`, { cancellation_reasons: cancel_reason });
}
export function shipOrder(order_id, product_id, data) {
    return UpdateOrder(`shipped-order/${order_id}/${product_id}`, data);
}

export function readyToShipOrder(order_id, product_id) {
    return UpdateOrder(`ready-to-ship-order/${order_id}/${product_id}`, {});
}

export function deliveryOrder(order_id, product_id) {
    return UpdateOrder(`delivered-order/${order_id}/${product_id}`, {});
}
export function failOrder(order_id, product_id) {
    return UpdateOrder(`failed-delivery-order/${order_id}/${product_id}`, {});
}
export function returnOrder(order_id, product_id) {
    return UpdateOrder(`returned-order/${order_id}/${product_id}`, {});
}
export function getOrderCount(type) {
    switch (type) {
        case 'pending':
            return CountOrders('pending-order-counts');
        case 'ready_to_ship':
            return CountOrders('ready_to_ship-order-counts');
        case 'shipped':
            return CountOrders('shipped-order-counts');
        case 'delivered':
            return CountOrders('delivered-order-counts');
        case 'canceled':
            return CountOrders('cancelled-order-counts');
        case 'returned':
            return CountOrders('returned-order-counts');
        case 'returned_request':
            return CountOrders('returned-request-order-counts');
        case 'failed':
            return CountOrders('failed_delivery-order-counts');
        default:
            return null;
    }
}


