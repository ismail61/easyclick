import { tryCatchHandle } from "../../utils";
import { deliveryFeeController } from "../../controllers/admin/delivery.fee.controller";

function shippingFeeRoutes(app) {
    app.get('/customer/shipping-fee/:city', tryCatchHandle(deliveryFeeController().getDeliverFeeByCity));
    app.post('/customer/admin-free-shipping-list', tryCatchHandle(deliveryFeeController().getAdminFreeShippingList));
}
export { shippingFeeRoutes };