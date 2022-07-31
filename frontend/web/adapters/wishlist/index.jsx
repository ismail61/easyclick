import { Post, Get , Update, Delete} from "../xhr";

export function getCustomerWishlist() {
    return Get('customer/wishlist');
}

export function addToWishlist(data) {
    return Post('customer/add-to-wishlist', data);
}

export function updateWishlistOnDB(id, data) {
    return Update(`customer/update-wishlist/${id}`, data);
}

export function deleteWishlist(id){
    return Delete(`customer/delete-Wishlist/${id}`)
}

export function updateWishlistItem(item){
    return Update(`customer/update-wishlist-item/`, item)
}

export function deleteWishlistItem(id) {
    return Delete(`customer/delete-wishlist-item/${id}`)
}

export function deleteWishlistAllItem(){
    return Delete('customer/delete-wishlist-all-items/')
}

