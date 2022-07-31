import { Get } from "../xhr";

export function getAllDistrict() {
    return Get('get-all-district');
}