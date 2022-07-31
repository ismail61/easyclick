import { CountMerchants, UpdateMerchant, Merchants } from "adapters/merchant/Merchant";

export function getMerchants(type) {
    switch (type) {
        case 'de_active':
            return Merchants('deactivated-merchants');
        case 'active':
            return Merchants('activated-merchants');
        default:
            return null;
    }
}

export function activeMerchant(id) {
    return UpdateMerchant(`active-merchant/${id}`, {});
}
export function deActiveMerchant(id) {
    return UpdateMerchant(`de_active-merchant/${id}`, {});
}
export function getMerchantDiscount() {
    return Merchants('merchant-discount');
}
export function getWithdrawRequestMerchantCount() {
    return Merchants('request-wallets');
}
export function updateMerchantDiscount(data) {
    return UpdateMerchant('update-merchant-discount', data);
}
export function getMerchantCount(type) {
    switch (type) {
        case 'de_active':
            return CountMerchants('deactivated-merchant-counts');
        case 'active':
            return CountMerchants('activated-merchant-counts');
        default:
            return null;
    }
}

export function deleteMerchantTransaction(id, transaction_id) {
    return UpdateMerchant(`request-wallet-delete/${id}/${transaction_id}`, {});
}

export function paidMerchantTransaction(id, transaction_id, amount) {
    return UpdateMerchant(`request-wallet-paid/${id}/${transaction_id}`, { amount });
}

