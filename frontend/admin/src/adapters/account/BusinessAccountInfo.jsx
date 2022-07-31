import { Get, Update } from "../xhr";

export function SellerBusinessInformation(path) {
    return Get(path);
}
export function UpdateSellerBusinessInformation(path, data) {
    return Update(path, data);
}