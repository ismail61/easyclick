import { deliveryFeeController } from "../../controllers/admin";
import { adminAuthentication } from "../../middlewares/admin";
import { tryCatchHandle } from "../../utils";

function deliveryFeeRoutes(app) {
    app.post('/XYZ!@!/admin/delivery-fee/create-delivery-fee',adminAuthentication, tryCatchHandle(deliveryFeeController().createDeliverFee));
    app.patch('/XYZ!@!/admin/delivery-fee/:id',adminAuthentication, tryCatchHandle(deliveryFeeController().updateDeliverFee));
    app.get('/XYZ!@!/admin/delivery-fees',adminAuthentication, tryCatchHandle(deliveryFeeController().getAllDeliverFee));
}
export { deliveryFeeRoutes };