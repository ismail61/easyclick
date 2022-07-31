import { Post, Get , Update} from "../xhr";

export function createAddress(data) {
    return Post('customer/create-address', data);
}

export function getAllAddresses() {
    return Get('customer/addresses');
}

export function getSingleAddress(id) {
    return Get(`customer/address/${id}`);
}

export function deleteAddress(id) {
    return Get(`customer/delete-address/${id}`);
}

export function updateAddress(id, data) {
    return Update(`customer/address/${id}`, data);
}

export function SetDefaultShippingAddress(id) {
    return Update(`customer/set-shipping-address/${id}`);
}

export function UnsetDefaultShippingAddress(id) {
    return Update(`customer/unset-shipping-address/${id}`);
}

export function getAllRegions() {
    return Get('customer/get-divisions');
}

export function getAllCities(region) {
    return Get(`customer/get-cities/${region}`);
}

export function getAllAreas(city) {
    return Get(`customer/get-post-code/${city}`);
}

