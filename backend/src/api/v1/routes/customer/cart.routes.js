import { cartController } from "../../controllers/customer";
import { tryCatchHandle } from "../../utils";
import { customerAuthentication } from '../../middlewares/customer/'

function cartRoutes(app) {
    app.get('/customer/cart', customerAuthentication, tryCatchHandle(cartController().getCustomerCart));
    app.post('/customer/add-to-cart', customerAuthentication, tryCatchHandle(cartController().addToCart));
    app.delete('/customer/delete-cart/:id', customerAuthentication, tryCatchHandle(cartController().deleteCart));
    app.patch('/customer/update-cart-item', customerAuthentication, tryCatchHandle(cartController().updateCartItem));
    app.delete('/customer/delete-cart-item/', customerAuthentication, tryCatchHandle(cartController().deleteCartItem));
    app.delete('/customer/delete-cart-all-items/', customerAuthentication, tryCatchHandle(cartController().deleteCartAllItem));
}
export { cartRoutes };