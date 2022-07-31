import { Get, Update } from "../xhr";

export function getMerchantDiscount() {
    return Get(`merchant-discount`);
}

export function getCustomerWallet() {
    return Get(`customer/wallet`);
}

export function requestCustomerWallet(wallet_id, data) {
    return Update(`customer/request-wallet/${wallet_id}`, data);
}

