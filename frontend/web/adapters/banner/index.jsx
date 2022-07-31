import { Get } from "../xhr";

export function getBanners() {
    return Get('customer/banners');
}
