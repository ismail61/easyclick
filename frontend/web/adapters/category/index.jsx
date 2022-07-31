import { Post, Get , Update, Delete} from "../xhr";

export function getAllHomePageCategories() {
    return Get('customer/home-page-categories');
}

export function getAllCategories() {
    return Get('customer/categories');
}
