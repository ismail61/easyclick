import { Post, Get , Update, Delete} from "../xhr";

export function getCustomerCart() {
    return Get('customer/cart/');
}

export function addToCart(data) {
    return Post('customer/add-to-cart', data);
}

export function updateCartOnDB(id, data) {
    return Update(`customer/update-cart/${id}`, data);
}

export function deleteCart(id){
    return Delete(`customer/delete-cart/${id}`)
}

export function updateCartItem(item){
    return Update(`customer/update-cart-item/`, item)
}

export function deleteCartItem(item) {
    return Delete(`customer/delete-cart-item/`, item)
}

export function deleteCartAllItem(){
    return Delete('customer/delete-cart-all-items/')
}


