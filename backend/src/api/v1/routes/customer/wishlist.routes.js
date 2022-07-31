import { wishlistController } from "../../controllers/customer";
import { tryCatchHandle } from "../../utils";
import { customerAuthentication } from '../../middlewares/customer/'

function wishlistRoutes(app) {
    app.get('/customer/wishlist', customerAuthentication, tryCatchHandle(wishlistController().getCustomerWishlist));
    app.post('/customer/add-to-wishlist', customerAuthentication, tryCatchHandle(wishlistController().addToWishlist));
    app.delete('/customer/delete-wishlist/:id', customerAuthentication, tryCatchHandle(wishlistController().deleteWishlist));
    // app.patch('/customer/update-wishlist-item', customerAuthentication, tryCatchHandle(wishlistController().updateWishlistItem));
    app.delete('/customer/delete-wishlist-item/:product_id', customerAuthentication, tryCatchHandle(wishlistController().deleteWishlistItem));
    app.delete('/customer/delete-wishlist-all-items/', customerAuthentication, tryCatchHandle(wishlistController().deleteWishlistAllItem));
}
export { wishlistRoutes };