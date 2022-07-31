import { Get } from "../xhr";

export function AllProducts() {
    return Get('products');
}

export function getAdminProducts() {
    return Get(`products/admin`);
}

export function getSingleProduct(slug) {
    return Get(`product/${slug}`);
}

export function getSingleProductByID(id) {
    return Get(`product/${id}`);
}

export function getCategoryProducts(slug) {
    return Get(`customer/category/products/${slug}`);
}
