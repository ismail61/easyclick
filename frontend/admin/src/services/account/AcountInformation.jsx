import { SellerBankInformation, UpdateSellerBankInformation } from "adapters/account/BankInfo";
import { SellerBusinessInformation,UpdateSellerBusinessInformation } from "adapters/account/BusinessAccountInfo";
import { GetSellerProfileImage, GetSellerShopLogo, UpdateSellerProfileImage, UpdateSellerShopLogo } from "adapters/account/Image";
import { PasswordChange } from "adapters/account/Password";
import { SellerAccountInformation, UpdateSellerAccountInformation } from "adapters/account/SellerAccountinfo";

export function getSellerAccountInfo() {
    return SellerAccountInformation('seller-account-info');
}
export function updateSellerAccountInfo(data) {
    return UpdateSellerAccountInformation('seller-account-info', data);
}

//Business Information
export function getBusinessInfo() {
    return SellerBusinessInformation('business-info');
}
export function updateBusinessInfo(data) {
    return UpdateSellerBusinessInformation('business-info', data);
}

//Bank Information
export function getBankInfo() {
    return SellerBankInformation('bank-info');
}
export function updateBankInfo(data) {
    return UpdateSellerBankInformation('bank-info', data);
}

//Warehouse Address
export function SellerWarehouseAddress() {
    return SellerBankInformation('warehouse-address');
}
export function updateWarehouseAddress(data) {
    return UpdateSellerBankInformation('warehouse-address', data);
}


//Return Address
export function SellerReturnAddress() {
    return SellerBankInformation('return-address');
}
export function updateReturnAddress(data) {
    return UpdateSellerBankInformation('return-address', data);
}


//Seller Shop Logo
export function updateLogo(data) {
    return UpdateSellerShopLogo('shop-logo', data);
}

export function getSellerShopLogo() {
    return GetSellerShopLogo('shop-logo');
}

//Seller profile Image
export function updateProfileImage(data) {
    return UpdateSellerProfileImage('seller-photo', data);
}

export function getSellerProfileImage() {
    return GetSellerProfileImage('seller-photo');
}

//password Change
export function ChangePassword(data){
    return PasswordChange('change-password',data)
}