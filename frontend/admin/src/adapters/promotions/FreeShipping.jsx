import { Delete, Get, Post, Update } from "adapters/xhr";

export function addNewFreeShipping(path, data) {
    return Post(path, data);
}
export function UpdateFreeShipping(path, data) {
    return Update(path, data);
}
export function DeleteFreeShipping(path) {
    return Delete(path);
}
export function GetFreeShipments(path) {
    return Get(path);
}