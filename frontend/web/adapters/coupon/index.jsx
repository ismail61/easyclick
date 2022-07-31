import { Get, Update } from "../xhr";

export function CouponAdd(id) {
    return Update(`customer/voucher/add/${id}`, {});
}

export function CouponRemove(id) {
    return Update(`customer/voucher/remove/${id}`, {});
}

export function checkAllCollectedCoupons() {
    return Get(`customer/collected-vouchers`);
}

export function getAdminVouchers() {
    return Get(`admin-vouchers`);
}

