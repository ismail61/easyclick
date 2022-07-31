import { Get, Post, Update } from "adapters/xhr";

export function addNewVoucher(path, data) {
    return Post(path, data);
}
export function GetVouchers(path) {
    return Get(path);
}
export function UpdateVoucher(path, data) {
    return Update(path, data);
}