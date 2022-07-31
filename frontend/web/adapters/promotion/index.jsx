import { Post, Get } from "../xhr";

export function getShippingFee(city) {
    return Get(`customer/shipping-fee/${city}`);
}

export function applyVoucher(data) {
    return Post('customer/voucher-apply', data);
}

export function getAdminFreeShippingList(data) {
    return Post('customer/admin-free-shipping-list', data);
}

