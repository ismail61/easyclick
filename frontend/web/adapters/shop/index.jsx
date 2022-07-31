import { Post, Get , Update} from "../xhr";

export function getVendorInfo(slug) {
    return Get(`customer/shop/slug/${slug}`);
}


